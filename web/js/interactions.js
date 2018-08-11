/**
 *
 * @param {type} exports
 * @returns {undefined}
 */
(function(exports) {
    var interactionsSource = new ol.source.Vector();
    var fragmentsSource = new ol.source.Vector();
    var draw = new ol.interaction.Draw({
        source: interactionsSource, type: /** @type {ol.geom.GeometryType} */ 'Polygon'
    });
    /*POPUP CON LAS COORDENADAS DEL PUNTO*/
    var coordinatesPopup = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
        element: document.getElementById('coordinates-popup'),
        autoPan: true, autoPanAnimation: {
            duration: 250
        }
    }));
    /*POPUP QUE APARECE AL DIBUJAR UNA INTERACCIÓN*/
    var featureInfoPopup = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
        element: document.getElementById('feature-info-popup'),
        autoPan: true, autoPanAnimation: {
            duration: 250
        },
//        stopEvent: false
    }));
    /**
     *
     * @returns {undefined}
     */
    exports.setupInteractions = function() {
        setupMenu();
        var interactionsLayer = new ol.layer.Vector({
            name: 'Interactions',
            source: interactionsSource,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2}),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
                })
            }),
            zIndex: 1000
        });
        __map.addLayer(interactionsLayer);
        var fragmentsLayer = new ol.layer.Vector({
            name: 'Fragments',
            source: fragmentsSource,
            style: function(feature, resolution) {
                var style = new ol.style.Style();
                style.setFill(new ol.style.Fill({
                    color: [255, 0, 0, 1]
                }));
                style.setStroke(new ol.style.Stroke({
                    color: [0, 0, 255, 1]
                }));
//                            style.getFill().setColor([255, 0, 0, 1]);

                return style;
            },
            zIndex: 500
        });
        __map.addLayer(fragmentsLayer);
        bindSelectionInteractionEvents();
        bindSingleClickInteractions();
//        bindCoordinatesInteractionEvents();
//        bindFeatureInfoInteractionEvents();

        /**
         * Seleccionar la interacción con el mapa a través del menú vertical derecho #interactions
         */
        $('#interactions div span').click(function() {
            __map.removeInteraction(draw);
            $('[id$="popup-closer"]').click();
            //probar cambiar las dos líneas siguientes por __map.getOverlays().clear();
            __map.removeOverlay(coordinatesPopup);
            __map.removeOverlay(featureInfoPopup);
            __map.set('interaction', 'info');
            __map.getLayerByName('Interactions').getSource().clear(true);
            __map.getLayerByName('Fragments').getSource().clear(true);
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                setInteraction('info');
            } else {
                $('#interactions span').removeClass('selected');
                $(this).addClass('selected');
                setInteraction($(this).parent().attr('id'));
            }
        });
        //ESTABLECER LA INTERACCIÓN POR DEFECTO
        setInteraction('info');
        /**
         * Para verificar si el polígono añadido a la capa es válido, si no lo es se elimina
         */
        __map.getLayerByName('Interactions').getSource().on('addfeature', function(event) {
            if (event.feature) {
                var parser = new jsts.io.OL3Parser();
                var geometry = event.feature.getGeometry();
                if (geometry.getCoordinates() !== undefined && !parser.read(geometry).isValid()
                        || geometry.getType() === 'Circle') {
                    this.removeFeature(event.feature);
                }
            }
        });
    };
    /**
     * PARA LAS ANIMACIONES DEL MENÚ DE INTERACCIONES DE LA DERECHA
     *
     * @returns {undefined}
     */
    function setupMenu() {
        $('#lock').click(function() {
            $('#interactions').toggleClass('unlocked locked');
            $(this).children('i').toggleClass('fa-unlock-alt fa-lock');
        });
    }

    /**
     * ESTABLECER LAS FUNCIONES PARA LOS EVENTOS drawstart Y drawend PARA LA INTERACCIÓN DE SELECCIÓN
     *
     * @returns {undefined}
     */
    function bindSelectionInteractionEvents() {
        draw.on('drawstart', function(evt) {
            if (__map.get('interaction') === 'selection') {
                __map.getLayerByName('Interactions').getSource().clear(true);
                __map.getLayerByName('Fragments').getSource().clear(true);
            }
        });
        draw.on('drawend', function(evt) {
            if (__map.get('interaction') === 'selection') {
                var parser = new jsts.io.OL3Parser();
                var geometryDrawn = evt.feature.getGeometry();
//                var geom = parser.read(evt.feature.getGeometry());
                if (parser.read(geometryDrawn).isValid()) {
                    var coordinatesDrawn = geometryDrawn.getCoordinates();
                    var poly1 = getTurfHelper('Polygon', coordinatesDrawn);
                    var error = undefined;
                    var interactionInfoPopupContent = {};
//                    var union = undefined;

                    __map.getLayers().forEach(function(layer, i, a) {
                        if (layer.getVisible()) {
                            if (layer.getSource() instanceof ol.source.Vector) {
                                $.each(layer.getSource().getFeatures(), function(i, feature) {
                                    var intersection;
                                    var featureGeometryType = feature.getGeometry().getType();
                                    var featureGeometryCoordinates = feature.getGeometry().getCoordinates();
                                    var poly2 = getTurfHelper(featureGeometryType, featureGeometryCoordinates);
//                                    poly2 = turf.truncate(poly2, {precision: 3});
                                    if (feature.get('nombre') !== 'Sagua La Grande')
                                        try {
                                            intersection = turf.intersect(poly1, poly2);
                                        } catch (e) {
//                                            error = feature.get('municipio_nombre') + " ";
                                            error = e.message;
                                            console.log(error);
                                            return false;
                                        }

                                    if (error === undefined && intersection !== undefined && intersection !== null) {
                                        var fragmentGeometry = getOLHelper(intersection.geometry.type, intersection.geometry.coordinates);
                                        var part = new ol.Feature({
                                            geometry: fragmentGeometry
                                        });
                                        fragmentsSource.addFeature(part);
                                        interactionInfoPopupContent[feature.get('gid')] = feature.get('name');
//                                        var intersectionPoly = getTurfHelper(intersection.type, intersection.geometry.coordinates);
//                                        console.log(union);
//                                        if (union !== undefined) {
//                                            var unionPoly = getTurfHelper(union.geometry.type, union.geometry.coordinates);
//                                            console.log(unionPoly);
//                                            union = turf.union(unionPoly, intersectionPoly.geometry);
//                                        } else {
//                                            union = intersectionPoly;
//                                        }
                                    }
                                });
                            }
                        }
                    });
//                    showInteractionInfo(evt, interactionInfoPopupContent);
                } else {
                    console.log('not valid');
                }
            }
        });
    }

    function bindSingleClickInteractions() {
        var singleClickAjax = undefined;
        __map.on('singleclick', function(evt) {
            var coordinate = evt.coordinate;

            if (__map.get('interaction') === 'info') {
                __map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                    if (layer.getType() === 'VECTOR') {
//                        console.log(layer.get('name'));
                        if (layer && layer.get('name') !== 'Fragments' && layer.get('name') !== 'Interactions'
                                && layer.get('name') !== 'ascenso_nmm_2050'/*evitar el click sobre la capa ascenso_nmm*/
                                && layer.get('name') !== 'ascenso_nmm_2100'/*evitar el click sobre la capa ascenso_nmm*/
                                && layer.get('name') !== 'area_intrusion_marina'/*evitar el click sobre la capa area_intrusion_marina*/) {
                            selectLayers(__map.get('selectedLayers'), false);
                            selectLayers([layer], true);
                            selectFeatures([feature], true);
                            var featureExtent = feature.getGeometry().getExtent();
                            var extentTopLine = getTurfHelper('LineString',
                                    [[featureExtent[0], featureExtent[3]], [featureExtent[2], featureExtent[3]]]);
                            var lineIntersect = turf.lineIntersect(extentTopLine, getTurfHelper(feature.getGeometry().getType(), feature.getGeometry().getCoordinates()));
                            var newCoordinate = lineIntersect['features'][0]['geometry']['coordinates'];
                            if (newCoordinate)
                                coordinate = newCoordinate;

                            if (singleClickAjax !== undefined)
                                singleClickAjax.abort();
                            singleClickAjax = setFeatureInfoContent(feature, layer);
                            $('#feature-info-popup-closer').click(function() {
                                if (singleClickAjax !== undefined)
                                    singleClickAjax.abort();
                                selectLayers([layer], false);
                                featureInfoPopup.setPosition(undefined);
                                this.blur();
                                $(this).off('click');//sin esta línea, se añade el mismo evento .click varias veces innecesariamente
                                return false;
                            });
                            featureInfoPopup.setPosition(coordinate);
                            return true;
                        }

                    }
//                    else if (layer.getType() === 'TILE') {
//                    }
                });
            } else if (__map.get('interaction') === 'popup') {
                var hdms = ol.coordinate.toStringHDMS(coordinate);
                document.getElementById('coordinates-popup-content').innerHTML = '<p>Coordenadas:</p><code>' + hdms + '</code>';
                document.getElementById('coordinates-popup-closer').onclick = function() {
                    coordinatesPopup.setPosition(undefined);
                    this.blur();
                    return false;
                };
                coordinatesPopup.setPosition(coordinate);
//                makeDraggable(coordinatesPopup);
            }
        });
    }
    /**
     * Ubica el contenido del popup que se muestra al dar click sobre una feature.
     * Retorna el objeto devuelto por la llamada ajax (jqXHR) para poder cancelarla en caso necesario.
     *
     * @param {type} feature
     * @param {type} layer
     * @returns {jqXHR}
     */
    function setFeatureInfoContent(feature, layer) {
        var content = $('#feature-info-popup-content');
        content.empty();
        var layerName = layer.get('name');
        var jqXHR;
        var list = $('<ul>');
        if (layerName === 'municipio') {
            content.append('<p>' + feature.get('nombre') + '</p>');
        } else if (layerName === 'parcela_agricola_afectada') {
            content.append('<p><b>' +
                    (feature.get('nombre') !== undefined ? feature.get('nombre')
                            : '&lt;SIN NOMBRE REGISTRADO&gt;') + '</b></p>');
            content.append(list);
            list.append('<li>Tipo de uso: ' + feature.get('nombre_tipo_uso') + '</li>');
            list.append('<li>Municipio: ' + feature.get('municipio_nombre') + '</li>');
            var geometriaParcela = feature.getGeometry();
            var coordenadasParcela = geometriaParcela.getCoordinates();
            var tipoGeometriaParcela = geometriaParcela.getType();
            var poly1 = getTurfHelper(tipoGeometriaParcela, coordenadasParcela);
            var areaParcelaM2 = Math.floor(turf.area(poly1));
            list.append('<li>Área: ' + Math.floor(areaParcelaM2 / 100) / 100 + 'ha</li>'); //se convierte a hectárea y se muestran 2 lugares decimales
            var spinner = $('<label style="color: lightgreen"><i class="fa fa-spinner fa-spin"></i> Obteniendo información, por favor espere...</label>');
            content.prepend(spinner);
            var intersectionCount = 0, areas = {};
            var suelosIntersectados = [];
            $.each(__map.getLayerByName('suelo_afectado').getSource().getFeatures(), function(i, f) {
                var featureGeometryType = f.getGeometry().getType();
                var featureGeometryCoordinates = f.getGeometry().getCoordinates();
                var poly2 = getTurfHelper(featureGeometryType, featureGeometryCoordinates);
                var parser = new jsts.io.OL3Parser();
                if (parser.read(f.getGeometry()).isValid()) {
                    var intersection = turf.intersect(poly1, poly2);
                    if (intersection !== undefined && intersection !== null) {
                        var areaM2 = Math.floor(turf.area(intersection));
//                        var fragmentGeometry = getOLHelper(intersection.geometry.type, intersection.geometry.coordinates);
//
//                        var part = new ol.Feature({
//                            geometry: fragmentGeometry
//                        });
//
//                        fragmentsSource.addFeature(part);
//                    intersectionCount++;
                        var roman = categoryToRoman(f.get('cat_gral10_cult'));
                        if (areas[roman] === undefined)
                            areas[roman] = areaM2;
                        else
                            areas[roman] += areaM2;
                        //guardar los ids de las features de suelo_afectado que intersectan con la parcela
                        //para pedir (ajax) las acciones de mejoramiento de cada una
                        suelosIntersectados.push(f.get('gid'));
                    }
                } else
                    console.log('geometría no válida');
            });
//            var li = $('<li><label></label></li>');
            var porcientosTipoSuelo = $('<div id="porcientos-tipo-suelo"></div>');
            var sumaAreas = 0;
            var cantAreas = Object.keys(areas).length;
            var iter = 0;
            $.each(areas, function(i, a) {
                if (iter++ === cantAreas - 1)
                    a = areaParcelaM2 - sumaAreas;
                var areaHA = Math.floor(a / 100) / 100; //se convierte a hectárea y se muestran 2 lugares decimales
                var porciento = Math.floor((a * 100 / areaParcelaM2) * 100) / 100; //se calcula el porciento y se muestran 2 lugares decimales
                var colorDiv = $('<div class="category-percent-colorbar ' + i +
                        '" style="width: ' + porciento +
                        '%;" title="' + areaHA + 'ha (' + porciento + '%)">'
                        + areaHA + 'ha (' + porciento + '%)</div>');
                porcientosTipoSuelo.append(colorDiv);
                sumaAreas += a;
            });

            var tipoDeSueloAccordion = $('<div class="accordion" id="tipo-suelo-accordion">');
            var card = $('<div class="card">');
            var cardHeader = $('<div class="card-header" id="tipo-suelo-accordion-heading">');
            var h5 = $('<h5 class="mb-0">');
            var button = $('<button class="btn btn-link" type="button" data-toggle="collapse" \n\
                    data-target="#tipo-suelo-accordion-body" aria-expanded="false" aria-controls="tipo-suelo-accordion-body">Tipos de suelo</button>');
            var tipoDeSueloAccordionBody = $('<div id="tipo-suelo-accordion-body" class="collapse" aria-labelledby="tipo-suelo-accordion-heading" data-parent="#tipo-suelo-accordion">');
            var cardBody = $('<div class="card-body">');
            tipoDeSueloAccordion.append(card.append(cardHeader.append(h5.append(button))).append(tipoDeSueloAccordionBody.append(cardBody.append(porcientosTipoSuelo))));

            content.append(tipoDeSueloAccordion);
//            list.after(tipoDeSueloAccordion);

            jqXHR = $.ajax({
                url: interaccion_parcela_afectada,
                data: {
                    poseedor: feature.get('poseedor'),
                    suelos_intersectados: suelosIntersectados
                }
            }).done(function(responseData) {
                responseData = getJSArray(responseData);
                list.children('li:first').before('<li>Poseedor: ' + responseData['poseedor'] + '</li>');

                if (responseData['acciones'].length > 0) {
                    var accionesAccordion = $('<div class="accordion" id="acciones-accordion">');
                    var card = $('<div class="card">');
                    var cardHeader = $('<div class="card-header" id="acciones-accordion-heading">');
                    var h5 = $('<h5 class="mb-0">');
                    var button = $('<button class="btn btn-link" type="button" data-toggle="collapse" \n\
                        data-target="#acciones-accordion-body" aria-expanded="false" aria-controls="acciones-accordion-body">');
                    var accionesAccordionBody = $('<div id="acciones-accordion-body" class="collapse" aria-labelledby="acciones-accordion-heading" data-parent="#acciones-accordion">');
                    var cardBody = $('<div class="card-body">');
                    var listaAcciones = $('<ul id="lista-acciones" class="list-unstyled">');
                    accionesAccordion.append(card.append(cardHeader.append(h5.append(button))).append(accionesAccordionBody.append(cardBody.append(listaAcciones))));

                    content.append(accionesAccordion);
                    button.text('Acciones de mejoramiento del suelo (' + responseData['acciones'].length + ')');
                    $.each(responseData['acciones'], function(i, accion) {
                        var li = $('<li>');
                        listaAcciones.append(li
                                .append('&nbsp;').append(accion['nombre']));
                    });
                }
                //quitar spinner
                spinner.remove();
            });
        } else if (layerName === 'suelo_afectado') {
            //'limpiar' el contenido del popup e insertar una copia del elemento html que se va a utilizar
            content.empty().append($('#parcela-suelo-popup-content').clone().show());

            var spinner = $('<label style="color: lightgreen"><i class="fa fa-spinner fa-spin"></i> Obteniendo información, por favor espere...</label>');
            content.prepend(spinner);
            var list = content.find('ul.atributos');
            list.append('<li>Tipo: ' + feature.get('tipos') + '</li>');
            list.append('<li>Subtipo: ' + feature.get('subtipos') + '</li>');
            var roman = categoryToRoman(feature.get('cat_gral10_cult'));
            list.append('<li>Categoría: ' + roman + '</li>');
            list.append('<li>Área: ' + parseFloat(feature.get('area')).toFixed(2) + ' ha</li>');
            //buscar en el servidor las acciones correspondientes a esta parcela de suelo
            jqXHR = $.ajax({
                url: gestionar_acciones,
                data: {
                    suelo: feature.get('gid')
                }
            }).done(function(responseData) {
                responseData = getJSArray(responseData);
                var accionesAsociadas = responseData[0];
                var accionesDisponibles = responseData[1];
                var accionesAccordion = content.find('div.accordion');
                accionesAccordion.show();
                var tituloAccordion = content.find('div.card-header button');
                var cantidadAcciones = $('<span>' + accionesAsociadas.length + '</span>');
                tituloAccordion.append('Acciones de mejoramiento del suelo (').append(cantidadAcciones).append(')');
                var tablaAcciones = $('#tabla-acciones');
                var tbodyAcciones = tablaAcciones.children('tbody');
                var guardarCambios = content.find('div.opciones button');

                //en esta variable se guardarán los cambios realizados a la lista de acciones para ser actualizados
                //en la base de datos cuando el usuario presione el botón 'Guardar cambios'
                var accionesActualizadas = {};
//                var hechas = 0;
//                var acciones = [];

                //recorrer cada acción y conformar el contenido de la tabla
                $.each(accionesAsociadas, function(i, accion) {
                    //inicializar el objeto con los datos de las acciones
                    //este objeto se actualizará con los cambios realizados por el usuario durante todo el ciclo de vida del popup
                    //para utilizarlo en el momento de guardar
                    accionesActualizadas[accion['id']] = [accion['hecho']];
                    var tr = $('<tr id="' + accion['id'] + '" class="accion">');
                    var checkboxAccion = $('<i class="fa fa-square-o">');
                    var eliminarAccion = $('<i class="fa fa-remove">');
                    if (accion['hecho']) {
                        tr.addClass('hecho');
                        checkboxAccion.toggleClass('fa-square-o fa-check-square');
                    }

                    checkboxAccionClick(checkboxAccion, accion);
                    eliminarAccionClick(eliminarAccion, accion);

                    tbodyAcciones.append(tr
                            .append($('<td>').append(accion['nombre']))
                            .append($('<td>').append(checkboxAccion))
                            .append($('<td>').append(eliminarAccion))
                            );
                });

                var marcarTodas = $('#marcar-todas');

                //si todas las acciones están hechas
                if (todasHechas()) {
                    marcarTodas.attr('data-original-title', 'Desmarcar todas');
                    marcarTodas.attr('class', 'fa fa-check-square');
                }

                //evento .click para marcar/desmarcar todas las acciones como hechas
                marcarTodas.click(function() {
                    marcarTodas.toggleClass('fa-square-o fa-check-square');
                    if (marcarTodas.hasClass('fa-check-square')) {
                        marcarTodas.attr('data-original-title', 'Desmarcar todas');
                        tablaAcciones.find('tr.accion i.fa-square-o').click();
                    } else {
                        marcarTodas.attr('data-original-title', 'Marcar todas');
                        tablaAcciones.find('tr.accion i.fa-check-square').click();
                    }
                });

                var accionesDisponiblesSelect = $('#acciones-disponibles');
                var nuevaAccion = $('#nueva-accion');

                $.each(accionesDisponibles, function(i, accion) {
                    accionesDisponiblesSelect.append('<option value="' + accion['id'] + '">' + accion['nombre'] + '</option>');
                });

                nuevaAccion.click(function() {
                    if (accionesDisponiblesSelect.children().length) {
                        var nuevaAccionID = accionesDisponiblesSelect.val();
                        var accionSeleccionada = accionesDisponiblesSelect.children(':selected');
                        var nuevaAccionNombre = accionSeleccionada.text();
                        var checkboxNuevaAccion = $('<i class="fa fa-square-o">');
                        var eliminarNuevaAccion = $('<i class="fa fa-remove">');
                        var nuevaFila = $('<tr id="' + nuevaAccionID + '" class="accion">')
                                .append($('<td>').append(nuevaAccionNombre))
                                .append($('<td>').append(checkboxNuevaAccion))
                                .append($('<td>').append(eliminarNuevaAccion))
                                ;
                        checkboxAccionClick(checkboxNuevaAccion, {'id': nuevaAccionID});
                        eliminarAccionClick(eliminarNuevaAccion, {'id': nuevaAccionID});
                        tbodyAcciones.append(nuevaFila);
                        accionSeleccionada.remove();
                        cantidadAcciones.text(parseInt(cantidadAcciones.text()) + 1);
                        marcarTodas
                                .removeClass('fa-check-square').addClass('fa-square-o')
                                .attr('data-original-title', 'Marcar todas');

                        guardarCambios.empty();
                        guardarCambios.text('Guardar cambios');
                        guardarCambios.prop('disabled', false);
                        accionesActualizadas[nuevaAccionID] = [false];
                    }
                });

                //evento .click para actualizar en la base de datos y la vista los cambios realizados
                guardarCambios.click(function() {
                    guardarCambios.prop('disabled', true);
                    var savingSpinner = $('<i class="fa fa-spinner fa-spin">');
                    guardarCambios.empty();
                    guardarCambios.append(savingSpinner).append('&nbsp;').append('Guardando...');
                    //actualizar en la base de datos los cambios realizados
                    $.ajax({
                        url: gestionar_acciones,
                        method: 'POST',
                        data: {
                            suelo: feature.get('gid'),
                            acciones: accionesActualizadas
                        }
                    }).done(function(responseData) {
//                        acciones eliminadas
//                        responseData = getJSArray(responseData);
//                        hechas = $('tr.hecho:not(.eliminar)').length;
                        guardarCambios.empty();
                        guardarCambios.text('Acciones actualizadas');
                    });
                });
                $('[data-toggle=tooltip]').tooltip();
                //quitar spinner
                spinner.remove();


                /**
                 * Evento .click de cada checkbox que marca la acción como hecho o por hacer
                 *
                 * @param {type} checkboxAccion
                 * @param {type} accion
                 * @returns {undefined}
                 */
                function checkboxAccionClick(checkboxAccion, accion) {
                    checkboxAccion.click(function(e) {
                        $(this).toggleClass('fa-square-o fa-check-square');
                        if ($(this).hasClass('fa-square-o')) {
//                            hechas--;
                        } else {
//                            hechas++;
                        }

                        checkboxAccion.closest('tr').toggleClass('hecho');
                        accionesActualizadas[accion['id']][0] = !accionesActualizadas[accion['id']][0];

                        if (e.originalEvent) {
                            if (todasHechas()) {
                                marcarTodas.attr('data-original-title', 'Desmarcar todas');
                                marcarTodas.attr('class', 'fa fa-check-square');
                            }
                            else {
                                marcarTodas.attr('data-original-title', 'Marcar todas');
                                marcarTodas.attr('class', 'fa fa-square-o');
                            }
                        }
                        guardarCambios.empty();
                        guardarCambios.text('Guardar cambios');
                        guardarCambios.prop('disabled', false);
                    });
                }

                /**
                 * Evento .click que marca la acción para eliminar o no
                 *
                 * @param {type} eliminarAccion
                 * @param {type} accion
                 * @returns {undefined}
                 */
                function eliminarAccionClick(eliminarAccion, accion) {
                    eliminarAccion.click(function(e) {
                        cantidadAcciones.text(parseInt(cantidadAcciones.text()) - 1);
                        var fila = eliminarAccion.closest('tr');
                        fila.remove();

                        var accionesDisponibles = $('#acciones-disponibles');
                        if (accionesDisponibles.presence())
                            accionesDisponibles.append('<option value="' + fila.attr('id') + '">' + fila.children('td').first().text() + '</option>');

                        delete accionesActualizadas[accion['id']];

                        guardarCambios.empty();
                        guardarCambios.text('Guardar cambios');
                        guardarCambios.prop('disabled', false);
                    });
                }

                /**
                 * Retorna true si todas las acciones están marcadas como hechas
                 *
                 * @returns {undefined}
                 */
                function todasHechas() {
                    var result = true;
                    $.each(accionesActualizadas, function(i, accion) {
                        if (!accion[0]) {
                            result = false;
                            return false;
                        }
                    });

                    return result;
                }
            });
        }
        return jqXHR;
    }

    /**
     *
     * @param {type} interactionType
     * @returns {undefined}
     */
    function setInteraction(interactionType) {
        __map.set('interaction', interactionType);
        if (interactionType === 'selection') {
            setSelectionInteraction('Polygon');
        } else if (interactionType === 'popup') {
            setCoordinatesInteraction();
        } else if (interactionType === 'info') {
            setFeatureInfoInteraction();
        }
    }

    function setSelectionInteraction() {
        __map.addInteraction(draw);
    }

    function setCoordinatesInteraction() {
        __map.addOverlay(coordinatesPopup);
    }

    function setFeatureInfoInteraction() {
        __map.addOverlay(featureInfoPopup);
    }

    /**
     * Función utilidad para seleccionar el 'helper' adecuado de la librería Turf de acuerdo al tipo de geometría
     *
     * @param {type} type
     * @param {type} coordinates
     * @returns {unresolved}
     */
    function getTurfHelper(type, coordinates) {
        if (type === 'Polygon') {
            return turf.polygon(coordinates);
        } else if (type === 'MultiLineString') {
            return turf.multiLineString(coordinates);
        } else if (type === 'MultiPolygon') {
            return turf.multiPolygon(coordinates);
        } else if (type === 'Point') {
            return turf.point(coordinates);
        } else if (type === 'LineString') {
            return turf.lineString(coordinates);
        } else if (type === 'Feature') {
            var geometry = {
                "type": "Feature",
                "coordinates": coordinates
            };
            return turf.feature(geometry);
        }
        return undefined;
    }

    /**
     *
     * Función utilidad para devolver el objeto de geometría adecuado de la librería OpenLayers de acuerdo al tipo de geometría (type)
     *
     * @param {type} type Tipo de geometría
     * @param {type} coordinates Coordenadas de la geometría
     * @returns {unresolved}
     */
    function getOLHelper(type, coordinates) {
        if (type === 'Polygon') {
            return new ol.geom.Polygon(coordinates);
        } else if (type === 'MultiLineString') {
            return new ol.geom.MultiLineString(coordinates);
        } else if (type === 'MultiPolygon') {
            return new ol.geom.MultiPolygon(coordinates);
        } else if (type === 'Point') {
            return new ol.geom.Point(coordinates);
        } else if (type === 'LineString') {
            return new ol.geom.LineString(coordinates);
        }
        return undefined;
    }
})(typeof exports !== "undefined" && exports instanceof Object ? exports : window);