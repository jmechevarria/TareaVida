//variables declaradas globales para poder acceder desde otros ficheros

//variable que representa el mapa
var __map;
//variable que representa el área visible del mapa
var __currentExtent;

/**
 * Configuraciones iniciales para el mapa y la vista
 *
 * @returns {undefined}
 */
function setupMainInterface() {
    /*antes de crear el mapa se define una función de utilidad 'getLayerByName',
     extendiendo el 'prototype' de 'ol.Map',
     esta función servirá para acceder fácilmente a una capa por su nombre*/
    if (ol.Map.prototype.getLayerByName === undefined) {
        ol.Map.prototype.getLayerByName = function(name) {
            var layer;
            this.getLayers().forEach(function(lyr) {
                if (name === lyr.get('name')) {
                    layer = lyr;
                    return false;
                }
            });
            return layer;
        };
    }

    var extent = getInitialExtent();
//    var tiles = {};

    var layerCollection = new ol.Collection([], {
        unique: true
    });
    var view = new ol.View({
        center: ol.extent.getCenter(extent),
        zoom: 11.7,
        projection: 'EPSG:4326'
    });

    //llamar a la función 'removeLoader' cuando todas las capas hayan sido cargadas
    $(document).one('ajaxStop', function() {
        removeLoader();
    });

    createMap(view, layerCollection, extent);
    populateMap(/*tiles,*/ layerCollection);
    applyHierarchicalPadding();
    bindOnClickToMainNavLinks();
    bindOnHoverToMainNavLinks();
    setupLegend();
    view.fit(extent, {
        constrainResolution: false
    });
    __currentExtent = extent;
    bindEvents();
}

/**
 * Usa el <b>extent</b> obtenido de la función
 * <b>getEX_GeographicBoundingBox</b> y lo transforma
 * a la proyección <b>EPSG:3857</b>
 *
 * @returns {ol.Extent}
 */
function getInitialExtent() {
    var parser = new ol.format.WMSCapabilities();
    var result = parser.read(__WMSCapabilities);
    var extent = getEX_GeographicBoundingBox(result);
    return extent;
}

/**
 * Crea el mapa y añade los controles iniciales
 *
 *
 * @param {ol.View} view La vista del mapa
 * @param {ol.Collection} layerCollection Las capas del mapa
 * @param {ol.extent} extent El área rectangular que encapsula al mapa
 * @returns {undefined}
 */
function createMap(view, layerCollection, extent) {
    __map = new ol.Map({
        target: 'map',
        layers: layerCollection,
        view: view,
        controls: ol.control.defaults({
//            attributionOptions: {
//                collapsible: false
//            },
            zoomOptions: {
                delta: 2
            }
        }).extend([
            new ol.control.MousePosition({
                coordinateFormat: function(coord) {
                    return coord[0].toFixed(2) + ', ' + coord[1].toFixed(2)
                }
////                projection: 'EPSG:4326'
            }),
            new ol.control.ScaleLine({
            }), new ol.control.ZoomSlider({
            }), new ol.control.ZoomToExtent({
                extent: extent
            })
        ])
    });
    //Crear el atributo 'selectedLayers' donde se almacenarán las capas que el usuario seleccione en el mapa
    __map.set('selectedLayers', {});
    __map.set('interaction', 'info');
    setupInteractions();
}

/**
 * Añade las capas al mapa y crea el panel de navegación izquierdo
 *
 * @param {type} layerCollection Las capas del mapa
 * @returns {undefined}
 */
function populateMap(layerCollection) {

    //Añadir las capas base de tipo TileWMS
//    var ul = addNode('BASE', __Layers['BASE'], $('ul#layers'));
//    $.each(__Layers['BASE'], function(layerName, data) {
//        var vector = addVectorToMap(data, layerCollection);
//        addBaseLayerNode(data['FriendlyName'], vector, ul);
    //    });

    //Añadir las capas base de tipo TMS
    var tms = new ol.layer.Tile({
        name: 'tms',
        projection: 'EPSG:4326',
        source: new ol.source.XYZ({
            url: '/geocache/tms/vesat/{z}/{x}/{-y}.jpg'
        }),
        zIndex: 0
    });
    layerCollection.push(tms);

    //Añadir el resto de las capas
    $.each(__Layers, function(rootName, children) {
        buildTree(rootName, children, layerCollection, $('ul#layers'));
    });
//    //para mostrar una de las capas bases al inicio
//    var aux = $('[name="base-layers"]:checked');
//    if (aux.presence()) {
//        __map.get(aux.val()).setVisible(true);
//    }
//
//    addSearchUI();
//
//    //para desplegar el nodo 'Información espacial'
//    $('#search-layer + li').children('a, ul').addClass('in');

}

/**
 * Dado un valor de categoría general de cultivo (cat_gral10_cult), devuelve la clasificación correspondiente en número romano
 *
 * @param {type} cat
 * @returns {String}
 */
function categoryToRoman(cat) {
    var categoryToNumber = parseFloat(cat);
    if (categoryToNumber < 2)
        return 'I';
    else if (categoryToNumber < 3)
        return 'II';
    else if (categoryToNumber < 3.7)
        return 'III';
    return 'IV';
}

(function(exports) {

    var colorSueloAfectado = {'I': '#ee9144', 'II': '#9ba011', 'III': '#1fb07b', 'IV': '#a840b3'};
    /**
     * Añade un vector al mapa.
     *
     * @param {type} vectorMetadata Metadatos del vector
     * @param {type} layerCollection Capas del mapa
     * @returns {ol.layer.Vector|addVectorToMap.vector}
     */
    exports.addVectorToMap = function(vectorMetadata, layerCollection) {
        var vectorName = vectorMetadata['Name'];
        //parámtros usados en la creación de la capa
        var params = {
            'LAYERS': '&typeNames=' + __wsName + ':' + vectorName,
//            'CQLFilter': ''
        };

//        params['CQLFilter'] = (vectorMetadata['Filter'] !== null ? ('&CQL_FILTER=' + vectorMetadata['Filter']) : '');

        //capa creada con los datos de geoserver
//        var tile = new ol.layer.Tile({
//            //        name: vectorMetadata['FriendlyName'],
//            source: new ol.source.TileWMS({
//                url: 'http://localhost:8080/geoserver/wms',
//                params: params,
//                serverType: 'geoserver',
//                crossOrigin: 'anonymous'
//            }),
//            zIndex: vectorMetadata['Zindex']
//        });

        var visible = vectorName !== 'municipios';
        //vector creado con los datos de la capa 'tile'. Este será el vector que se muestre en el mapa,
        //permitiendo así un control total a la hora de editarlo visualmente ya que se crea del lado del cliente
        var vector = new ol.layer.Vector({
            name: vectorName,
            source: new ol.source.Vector(),
            zIndex: vectorMetadata['Zindex'],
            visible: visible,
//            tile: tile,
            //para el estilo del vector se utiliza una función para poder
            //asignar un estilo que cambia dinámicamente en dependencia del
            //polígono (feature) y la resolución
            style: function(feature, resolution) {
                var style = new ol.style.Style();
                style.setFill(new ol.style.Fill({
                    //                color: [200, 100, 50, 1]
                    color: vectorMetadata['Background']
                }));
                if (feature !== undefined) {
                    style.setStroke(new ol.style.Stroke({
                        width: 1,
                        //                lineDash: [3, 5]
                    }));
                    style.setText(new ol.style.Text({
                        text: feature.get('name'),
                        font: '15px sans-serif'
//                placement: 'line'
                                //                        text: __map.getView().getZoom() + (__map.getView().getZoom() < 10 ? ' under' : ' above')
                    }));
                    if (vectorName === 'municipios') {
                        style.getText().setText(feature.get('nombre'));
                        if (resolution < 40)
                            style.getText().setText('');
                    }

                    if (vectorName === 'suelo_afectado') {
                        var color = colorSueloAfectado[categoryToRoman(feature.get('cat_gral10_cult'))];
                        style.getStroke().setColor(color);
                        style.getFill().setColor(color);

                        if (feature.get('hoverStyle')) {
                            style.getStroke().setWidth(2);
                            style.getStroke().setColor('lightgray');
                        }
                    }

                    if (vectorName === 'parcela_agricola_afectada') {
                        style.getText().setFont('bold 15px sans-serif');
                        style.getText().setText('');
                        if (resolution < 40)
                            style.getText().setText(feature.get('nombre_tipo_uso') !== '' ? feature.get('nombre_tipo_uso') : 'Otros');
                        style.getFill().setColor('rgba(0, 0, 0, 0.2)');
                        style.getStroke().setColor('black');
                    }

                    if (vectorName === 'ascenso_nmm') {
                        style.getStroke().setColor('transparent');
                        style.getStroke().setWidth(0);
                        //la visibilidad de la capa ascenso_nmm se debe manejar diferente a las demás de acuerdo
                        //al año seleccionado. la variable de control 'visible' determina el estado de cada feature
                        if (feature.get('visible'))
                            style.getFill().setColor('#de1d1d');
                        else
                            style.getFill().setColor('rgba(0, 0, 0, 0)');
                    }

                    if (feature.get('isSelected')) {
                        style.getText().setFont('15px sans-serif');
//                        style.getFill().setColor('#33ffff');
                        //                        style.getFill().setColor(gradient(feature, resolution));
                        style.getFill().setColor(pattern);
                        //                        style.getStroke().setColor('black');
                        style.getStroke().setWidth(2);
                    }
                }
                return style;
            },
            vectorMetadata: vectorMetadata
        });

        //se guarda cada vector en la variable '__map'
        __map.set(vectorName, vector);
        //    tile.set('vector', vector);

        //Crear el atributo 'selectedFeatures' donde se almacenarán los polígonos que el usuario seleccione del vector
        vector.getSource().set('selectedFeatures', {});
        //    vector.getSource().set('friendlyName', vectorMetadata['FriendlyName']);
        var results;
        proj4.defs("EPSG:3795", "+proj=lcc +lat_1=23 +lat_2=21.7 +lat_0=22.35 +lon_0=-81 +x_0=500000 +y_0=280296.016 +datum=NAD27 +units=m +no_defs");
        var url = getFeatureURL + params['LAYERS'] +
//                params['CQLFilter'] +
                '&outputFormat=GML2';
//        if (vectorName === 'parcela_agricola_afectada' || vectorName === 'suelo_afectado') {
            var doneFunction = function(response) {
                results = parser.readFeatures(response);
                $.each(results, function(i, v) {
                    var feature = v;
                    feature.set('isSelected', false);
                    feature.setGeometry(v.getGeometry().clone().transform('EPSG:3795', 'EPSG:4326'));
                    feature.setId(feature.get('gid'));
                    feature.set('vector', vector);
                    vector.getSource().addFeature(feature);

//                    if (i > 100)
//                        return false;
                });
            };
            if (url) {
                var parser = new ol.format.WMSGetFeatureInfo();
                var ajaxCall = $.ajax({
                    url: url
                }).done(doneFunction)
                        .fail(function() {
                            this.url = 'http://localhost:8080/geoserver/wfs?service=wfs&version=1.0.0&request=GetFeature' + params['LAYERS'] + '&outputFormat=GML2';

                            $.ajax(this).done(doneFunction);
                        });
            }
        //}

//            tiles[params['LAYERS']] = tile;

        //    layerCollection.push(tile);
        layerCollection.push(vector);
        return vector;
    }
})(typeof exports !== "undefined" && exports instanceof Object ? exports : window);
///**
// *
// *
// * @returns {undefined}
// */
//function deselectAllLayers() {
//    var selectedLayers = __map.get('selectedLayers');
//    $.each(selectedLayers, function(i, selectedLayer) {
//        selectFeatures(selectedLayer.getSource().get('selectedFeatures'), false);
//    });
//    __map.set('selectedLayer', {});
//}

//function scrollTable(layer, feature) {
//    var table = $('#info-panel div.tab-content div#' + layer.get('name')).find('table');
//    var rows = table.find('tr');
//    var scrollDistance = 0;
//    if (feature)
//        rows.each(function() {
//            if ($(this).attr('featureId') === feature.get('gid'))
//                return false;
//            scrollDistance += $(this).height();
//        });
//    else {
//        rows.each(function() {
//            if (!$(this).hasClass('highlighted')) {
//                scrollDistance += $(this).height();
//            } else
//                return false;
//        });
//    }
////    scrollDistance -= table.find('thead').height();
//    $('#info-panel .tab-content').animate({
//        scrollTop: scrollDistance
//    }, 500, 'easeOutCubic');
//}
//
//function showInfoPanel() {
//    $('#info-panel').addClass('visible-info');
//    $('#map-wrapper').addClass('visible-info');
//    __map.updateSize();
//}
//
//function hideInfoPanel() {
//    //se quita el atribute 'style' manualmente para eliminar los estilos que queden como consecuencia del evento 'drag'
////    $('#info-panel').removeAttr('style');
//    $('#info-panel').removeClass('visible-info');
//
//    $('#map-wrapper').removeClass('visible-info');
//    __map.updateSize();
//}
//
//function clearInfoPanel() {
//    $('#info-panel div.tabbable').children('ul.nav, div.tab-content').empty();
//}
//
//function addLayerToPanel(layer) {
//    var layerName = layer.get('name');
//    var div = $('#info-panel div div.tab-content div#' + layerName);
//    var tab = $('<li></li>');
//    //evento click de las etiquetas del panel de info
//    bindOnClickEventToTab(tab);
//    var a = $('<a data-toggle="tab" href="#' + layerName + '"></a>');
//    var label = $('<label>' + layer.get('vectorMetadata')['FriendlyName'] + ' </label>');
//    var span = $('<span class="label label-contrast">0</span>');
//    var close = $('<span class="close">X</span>');
//    close.click(function() {
//        selectLayers([layer], false);
//        removeLayersFromPanel([layer]);
//        var first = $('#info-panel div.tab-content').children('div').first();
//        if (first.presence())
//            centerFeaturesOnMap(__map.get('selectedLayers')[first.attr('id')]);
//    });
//    tab.append(a);
//    a.append(label).append('&nbsp;').append(span).append('&nbsp;').append(close);
//    $('#info-panel ul.nav').append(tab);
//    div = $('<div class="tab-pane keep" id="' + layerName + '"></div>');
//    var table = $('<table class="table"><thead></thead><tbody></tbody></table>');
//    div.append(table);
//    $('#info-panel div.tab-content').append(div);
//    populateFeaturesTable(layer.get('vectorMetadata')['FriendlyName'], table, layer.getSource().getFeatures());
//    bindOnClickEventToEachRow(layer, table);
//    tab.addClass('active').siblings('.active').removeClass('active');
//    div.addClass('active').siblings('.active').removeClass('active');
//    if ($('#info-panel:not(.visible-info) div.tab-content').children().length === 1) {
//        showInfoPanel();
//    }
//
////    var widths = [];
////    $(table).find('thead tr').children().each(function(i) {
////        $(this).css('width', $(this).css('width'));
////        widths.push($(this).css('width'));
////    });
////
////    $(table).children('tbody').find('td').filter(function() {
////        $(this).css('width', widths[$(this).index()]);
////    });
//
////    $(table).addClass('fixedTHead');
////    $(table).find('tbody').css('top', $(table).find('thead').height());
//}
//
//function removeLayersFromPanel(layers) {
//    $.each(layers, function(i, layer) {
//        $('#info-panel div div.tab-content div#' + layer.get('name')).remove();
//        $('#info-panel ul.nav a[href="#' + layer.get('name') + '"]').parent().remove();
//    });
//    var divs = $('#info-panel div.tab-content').children();
//    if (divs.length === 0) {
//        hideInfoPanel();
//    } else {
//        focusLayerInPanel(__map.get('selectedLayers')[Object.keys(__map.get('selectedLayers'))[0]]);
//    }
//}
//
//function focusLayerInPanel(layer, feature) {
//    var layerName = layer.get('name');
//    var tab = $('#info-panel div ul.nav a[href="#' + layerName + '"]').parent();
//    var div = $('#info-panel div.tab-content div#' + layerName);
//    tab.addClass('active').siblings('.active').removeClass('active');
//    div.addClass('active').siblings('.active').removeClass('active');
//    scrollTable(layer, feature);
//}
//
//function isInPanel(layer) {
//    return $('#info-panel div div.tab-content div#' + layer.get('name')).presence();
//}
//
//function removeAllLayersFromPanel() {
//    $('#info-panel div ul.nav li').remove();
//    $('#info-panel div.tab-content div').remove();
//}
//
//function removeAllOtherLayersFromPanel(layer, feature) {
//    $('#info-panel div ul.nav a').not('[href="#' + layer.get('name') + '"]').parent().remove();
//    $('#info-panel div div.tab-content div').not('#' + layer.get('name')).remove();
//    focusLayerInPanel(layer, feature);
//}
//
//function isVisibleInPanel(layer) {
//    return $('#info-panel div div.tab-content div#' + layer.get('name')).hasClass('active');
//}
//
//function selectFeaturesInTable(layer, features, action) {
//    var div = $('#info-panel div.tab-content div#' + layer.get('name'));
//    var tableBody = div.find('tbody');
//    $.each(features, function(i, feature) {
//        tableBody.children('tr[featureId="' + feature.get('gid') + '"]').toggleClass('highlighted', action);
//        var span = $('#info-panel div ul.nav a[href="#' + layer.get('name') + '"]').children('span.label');
//        span.text(parseInt(span.text()) + (action ? 1 : -1));
//    });
//}
//
//function deselectAllFeaturesInTable(layer) {
//    var div = $('#info-panel div.tab-content div#' + layer.get('name'));
//    var tableBody = div.find('tbody');
//    tableBody.children('tr').removeClass('highlighted');
//    var span = $('#info-panel div ul.nav a[href="#' + layer.get('name') + '"]').children('span.label');
//    span.text(0);
//}
//
//function populateFeaturesTable(label, table, features) {
//    var thead = table.children('thead');
//    var theadTR = $('<tr></tr>');
//    var tbody = table.children('tbody');
//    thead.append(theadTR);
//    var firstFeature = Object.values(features)[0];
//    var keys = firstFeature.getKeys();
//    var geometryName = firstFeature.getGeometryName();
//    var temp = 0;
//    $.each(keys, function(i, key) {
////        if (temp++ < 1000) {
//        if (true) {
//            if (label === 'Municipios') {
//                console.log(label);
//                if (key === 'nombre' || key === 'area')
////        if (key !== geometryName && key !== 'isSelected' && key !== 'source')
//                    theadTR.append('<th>' + key + '</th>');
//            } else if (label === 'Área de intrusión marina') {
//                console.log(label);
//                if (key === 'municipio' || key === 'area')
////        if (key !== geometryName && key !== 'isSelected' && key !== 'source')
//                    theadTR.append('<th>' + key + '</th>');
//            }
////            else if (label === 'Parcelas agrícolas afectadas') {
////                console.log(label);
////                if (key === 'nombre' || key === 'area' || key === 'poseedor'
////                        || key === 'propietari' || key === 'riego' || key === 'roturacion' || key === 'usufructo'
////                        || key === 'nombre_municipio')
//////        if (key !== geometryName && key !== 'isSelected' && key !== 'source')
////                    theadTR.append('<th>' + key + '</th>');
////            }
//            else {
//                if (key !== geometryName && key !== 'isSelected' && key !== 'source')
//                    theadTR.append('<th>' + key + '</th>');
//            }
//        }
//    });
//    temp = 0;
//
//    $.each(features, function(i, feature) {
////        if (temp++ < 1000) {
//        if (true) {
//            var properties = feature.getProperties();
//            var bodyTR = $('<tr ' + ' featureId="' + feature.get('gid') + '"></tr>');
//            tbody.append(bodyTR);
//            $.each(properties, function(ii, v) {
//                if (label === 'Municipios') {
//                    if (ii === 'nombre' || ii === 'area')
//                        if (ii !== geometryName && ii !== 'isSelected' && ii !== 'source')
//                            bodyTR.append('<td>' + v + '</td>');
//                } else if (label === 'Área de intrusión marina') {
//                    console.log(label);
//                    if (ii === 'municipio' || ii === 'area')
////        if (key !== geometryName && key !== 'isSelected' && key !== 'source')
//                        bodyTR.append('<td>' + v + '</td>');
//                }
////                else if (label === 'Parcelas agrícolas afectadas') {
////                    console.log(label);
////                    if (iii === 'nombre' || iii === 'area' || iii === 'poseedor'
////                            || iii === 'propietari' || iii === 'riego' || iii === 'roturacion' || iii === 'usufructo'
////                            || iii === 'nombre_municipio')
//////        if (key !== geometryName && key !== 'isSelected' && key !== 'source')
////                        bodyTR.append('<td>' + v + '</td>');
////                }
//                else {
//                    if (ii !== geometryName && ii !== 'isSelected' && ii !== 'source')
//                        bodyTR.append('<td>' + v + '</td>');
//                }
//            });
//        }
//    });
//}

function bindEvents() {

    //evento singleclick del mapa
//    __map.on('singleclick', function(evt) {
//        if (__map.get('interaction') === 'info') {
//            __map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
//                if (layer && layer.get('name') !== 'Fragments' && layer.get('name') !== 'Interactions') {
//                    if (layer.getType() === 'VECTOR') {
////si la tecla Ctrl está presionada
//                        if (evt.originalEvent.ctrlKey) {
////si el polígono ya está seleccionado
//                            if (feature.get('isSelected')) {
//                                //si es el último polígono en la capa
//                                if (Object.keys(layer.getSource().get('selectedFeatures')).length === 1) {
//                                    selectLayers([layer], false);
////                                    removeLayersFromPanel([layer]);
//                                } else {
//                                    selectFeatures([feature], false);
////                                    selectFeaturesInTable(layer, [feature], false);
//                                    //si layer es la capa mostrada actualmente en el panel de info
////                                    if (isVisibleInPanel(layer))
////                                        scrollTable(layer);
//                                }
//                            } else {
//                                selectLayers([layer], true);
//                                selectFeatures([feature], true);
//                                //si es el primer polígono
////                                if (Object.keys(layer.getSource().get('selectedFeatures')).length === 1)
////                                    addLayerToPanel(layer);
////                                focusLayerInPanel(layer, feature);
////                                selectFeaturesInTable(layer, [feature], true);
//                            }
//                        } else {
////                            deselectAllLayers();
//                            selectLayers([layer], true);
//                            selectFeatures([feature], true);
////                            if (isInPanel(layer)) {
////                                removeAllOtherLayersFromPanel(layer, feature);
////                                deselectAllFeaturesInTable(layer);
////                            } else {
////                                removeAllLayersFromPanel();
////                                addLayerToPanel(layer);
////                                focusLayerInPanel(layer, feature);
////                            }
////                            selectFeaturesInTable(layer, [feature], true);
//                        }
//                    } else if (layer.getType() === 'TILE') {
//                    }
//                    return true;
//
//                }
//            });
//        }
//    });
}

/**
 * Añade o elimina las capas pasadas por parámetro al arreglo actual de capas seleccionadas (<b>__map.get('selectedLayers')</b>)
 * en dependencia del parámetro <b>action</b>. En caso de eliminar capas del arreglo (<b>action</b> = <b>false</b>) también se encarga
 * de eliminar las features correspondientes a dichas capas
 *
 * @param {type} layers Capas a seleccionar
 * @param {type} action Si es verdadero, se añade la capa a las seleccionadas, si no se quita de las seleccionadas
 * @returns {undefined}
 */
function selectLayers(layers, action) {
    $.each(layers, function(name, layer) {
        var selectedLayers = __map.get('selectedLayers');
        if (action)
            selectedLayers[layer.get('name')] = layer;
        else {
            selectFeatures(layer.getSource().get('selectedFeatures'), false);
            delete selectedLayers[layer.get('name')];
        }
    });
}

/**
 * Añade o elimina los polígonos pasados por parámetro al arreglo actual de polígonos seleccionados (<b>vector.getSource().get('selectedFeatures')</b>)
 * en dependencia del parámetro <b>action</b>. Funciona equivalentemente al método <b>selectLayers</b> sólo que a nivel de feature
 *
 * @param {type} features
 * @param {type} action
 * @returns {undefined}
 */
function selectFeatures(features, action) {
    $.each(features, function(i, feature) {
        feature.set('isSelected', action);
        if (action)
            feature.get('vector').getSource().get('selectedFeatures')[feature.get('gid')] = feature;
        else
            delete feature.get('vector').getSource().get('selectedFeatures')[feature.get('gid')];
    });
}

/**
 * Centra en el mapa los polígonos pasados por parámetro
 *
 * @param {type} features
 * @returns {undefined}
 */
function centerFeaturesOnMap(features) {
    var extent = [9999999999, 9999999999, -9999999999, -9999999999];
    //    var features = layer.getSource().get('selectedFeatures');

    $.each(features, function(i, feature) {
        if (feature.getGeometry().getExtent()[0] < extent[0])
            extent[0] = feature.getGeometry().getExtent()[0];
        if (feature.getGeometry().getExtent()[1] < extent[1])
            extent[1] = feature.getGeometry().getExtent()[1];
        if (feature.getGeometry().getExtent()[2] > extent[2])
            extent[2] = feature.getGeometry().getExtent()[2];
        if (feature.getGeometry().getExtent()[3] > extent[3])
            extent[3] = feature.getGeometry().getExtent()[3];
    });
    __map.getView().fit(extent, {
        size: [__map.getSize()[0], __map.getSize()[1]],
        duration: 200,
        constrainResolution: false
    });
    __currentExtent = extent;
}

//function clearMap() {
//    $.each(__map.getOverlays(), function(i, overlay) {
//        overlay.setPosition(undefined);
//    })
//
//    selectLayers(__map.get('selectedLayers'), false);
//}
//function bindOnClickEventToTab(tab) {
//    tab.on('click', function() {
//        //esto funciona porq focusLayerInPanel(layer); se está ejecutando antes de scrollTable, hay que buscar una forma de
//        //ejecutar este evento luego del evento original
//        if (!$(this).hasClass('active')) {
//            var layerName = $(this).children('a').attr('href').substr(1);
//            var layer = __map.get('selectedLayers')[layerName];
//            focusLayerInPanel(layer);
//            centerFeaturesOnMap(layer);
//        }
//    });
//}

//function bindOnClickEventToEachRow(layer, table) {
//    table.children('tbody').children('tr').click(function(e) {
//        if (e.ctrlKey) {
//            if ($(this).hasClass('highlighted')) {
//                if ($(this).siblings('.highlighted').presence()) {
//                    var feature = layer.getSource().get('selectedFeatures')[$(this).attr('featureId')];
//                    selectFeaturesInTable(layer, [feature], false);
//                    selectFeatures([feature], false);
//                }
//            } else {
//                selectFeatures([layer.getSource().getFeatureById($(this).attr('featureId'))], true);
//                selectFeaturesInTable(layer, [layer.getSource().getFeatureById($(this).attr('featureId'))], true);
//            }
//        } else {
//            var feature = layer.getSource().getFeatureById($(this).attr('featureId'));
//            selectFeaturesInTable(layer, layer.getSource().get('selectedFeatures'), false);
//            selectFeaturesInTable(layer, [feature], true);
//            selectFeatures(layer.getSource().get('selectedFeatures'), false);
//            selectFeatures([feature], true);
//        }
//        centerFeaturesOnMap(layer);
//    });
//}

function gradient(feature, resolution) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var extent = feature.getGeometry().getExtent();
    var pixelRatio = ol.has.DEVICE_PIXEL_RATIO;
    // Gradient starts on the left edge of each feature, and ends on the right.
    // Coordinate origin is the top-left corner of the extent of the geometry, so
    // we just divide the geometry's extent width by resolution and multiply with
    // pixelRatio to match the renderer's pixel coordinate system.
    var grad = context.createLinearGradient(0, 0, ol.extent.getWidth(extent) / resolution * pixelRatio, 0);
    grad.addColorStop(0, 'red');
    grad.addColorStop(3 / 6, 'orange');
    grad.addColorStop(5 / 6, 'yellow');
//    var gradient = ctx.createRadialGradient(100, 100, 50, 100, 100, 100);
//    gradient.addColorStop(0, 'white');
//    gradient.addColorStop(1, 'green');
//    ctx.fillStyle = gradient;
    //    ctx.fillRect(0, 0, 200, 200);

    return grad;
}

var pattern = (function() {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var pixelRatio = ol.has.DEVICE_PIXEL_RATIO;
    canvas.width = 11 * pixelRatio;
    canvas.height = 11 * pixelRatio;
    // white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // outer circle
//    context.fillStyle = 'rgba(102, 0, 102, 0.5)';
//    context.beginPath();
//    context.arc(5 * pixelRatio, 5 * pixelRatio, 4 * pixelRatio, 0, 2 * Math.PI);
    //    context.fill();
    // inner circle
    context.fillStyle = 'rgb(55, 0, 170)';
    context.beginPath();
    context.arc(5 * pixelRatio, 5 * pixelRatio, 2 * pixelRatio, 0, 2 * Math.PI);
    context.fill();
//    var canvas = document.createElement('canvas');
//    var context = canvas.getContext("2d");
//
//    var x0 = 36;
//    var x1 = -4;
//    var y0 = -2;
//    var y1 = 18;
//    var offset = 32;
//
//    context.strokeStyle = "#FF0000";
//    context.lineWidth = 2;
//    context.beginPath();
//    context.moveTo(x0, y0);
//    context.lineTo(x1, y1);
//    context.moveTo(x0 - offset, y0);
//    context.lineTo(x1 - offset, y1);
//    context.moveTo(x0 + offset, y0);
//    context.lineTo(x1 + offset, y1);
//    context.stroke();
//
    //    context.fillRect(0, 0, canvas.width, canvas.height);
    return context.createPattern(canvas, 'repeat');
}());