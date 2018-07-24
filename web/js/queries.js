$(document).ready(function() {
    (function(exports) {
        var queryContainer = $('#query');
        var close = queryContainer.find('button#query-close');
        var minimize = queryContainer.find('button#query-minimize');
        var titleDiv = queryContainer.find('#query-title');
        //evento click para cerrar #query
        close.click(function() {
            $('tr.selected').click();
            queryContainer.children().not('div#buttons, #query-title').remove();
            queryContainer.hide();
        });

        //evento click para minimizar #query
        minimize.click(function() {
            $(this).children('i').toggleClass('fa-window-minimize fa-window-maximize');
            $('#query div.tab-content').toggleClass('minimized');
        });

        function resetMinimizeButton() {
            minimize.children('i').attr('class', 'fa fa-window-minimize');
            $('#query div.tab-content').removeClass('minimized');
        }

        var queryAjax = undefined;
        //evento click de la consulta Agroproductividad en los suelos
        $('#agroprod-suelos').click(function(e) {
            titleDiv.text($(this).text());
            resetMinimizeButton();
            if (queryAjax !== undefined)
                queryAjax.abort();
            queryAjax = $.ajax({
                url: agroprod_suelos
            }).done(function(data) {
                $('#feature-info-popup-closer').click();
                //objeto JS con el área de cada categoría agrupadas por municipio
                var jsonObject = getJSONObject(data);
                //cerrar el que estaba abierto
                close.click();
                var tabs = $('<ul class="nav nav-tabs">');
                var tabContent = $('<div class="tab-content">');
                var romanCats = {1: 'I', 2: 'II', 3: 'III', 4: 'IV'};
                //recorrer los municipios [municipio => cats]
                $.each(jsonObject, function(municipio, cats) {
                    //por cada municipio se crea un <div id="' + tabPaneID + '" class="tab-pane fade">
                    //cuyo id es el nombre de dicho municipio
                    var tabPaneID = municipio.toLowerCase().replace(/ /g, '_'),
                            tabPane = $('<div id="' + tabPaneID + '" class="tab-pane fade">'),
                            table = $('<table class="table table-dark">'),
                            thead = $('<thead>'),
                            tbody = $('<tbody>'),
                            totalArea = 0;
                    //recorrer las categorías [cat => area]
                    $.each(cats, function(cat, area) {
                        var tr = $('<tr>');
                        //mostrar los datos de la fila en el mapa
                        tr.click(function(e) {
                            var $tr = $(this);
                            //desmarcar la que esté marcada
                            $tr.siblings('tr.selected').click();
                            $tr.toggleClass('selected');
                            var isSelected = $tr.hasClass('selected');
                            var features = [];
                            var layer = __map.getLayerByName('suelo_afectado');
                            //si la fila fue seleccionada
                            if (isSelected) {
                                //si NO estamos en la pestaña TOTAL
                                if (tabPaneID !== 'total') {
                                    $.each(layer.getSource().getFeatures(), function(i, feature) {
                                        if (feature.get('municipio').toLowerCase().replace(/ /g, '_') === tabPaneID &&
                                                categoryToRoman(feature.get('cat_gral10_cult')) === romanCats[cat]) {
                                            features.push(feature);
                                        }
                                    });
                                } else {
                                    $.each(layer.getSource().getFeatures(), function(i, feature) {
                                        if (categoryToRoman(feature.get('cat_gral10_cult')) === romanCats[cat]) {
                                            features.push(feature);
                                        }
                                    });
                                }
                                selectLayers([layer], true);
                                selectFeatures(features, true);
                            } else
                                selectLayers([layer], false);
                        });

                        tbody.append(tr.append('<td>' + romanCats[cat] + '</td><td>' + area.toFixed(2) + '</td>'));
                        totalArea += area;
                    });

                    thead.append('<tr><th>Categoría</th><th>Área (ha)</th></tr>');
                    var tab = $('<li class="nav-item">');
                    //desmarcar las filas al cambiar de tab
                    tab.click(function() {
                        $('#query tr.selected').click();
                    });
                    tabs.append(tab.append('<a class="nav-link" data-toggle="tab" href="#' + tabPaneID + '">' + municipio + '</a>'));
                    tabContent.append(tabPane.append(table.append(thead).append(tbody)));
                });
                tabs.find('a:first').addClass('active');
                tabContent.children('div:first').addClass('active show');
                queryContainer.append(tabs).append(tabContent).show();
            });
        });

        //evento click de la consulta Parcelas afectadas por tipo de uso
        $('#parcelas-afectadas-tipo-uso').click(function(e) {
            titleDiv.text($(this).text());
            resetMinimizeButton();
            if (queryAjax !== undefined)
                queryAjax.abort();
            queryAjax = $.ajax({
                url: parcelas_afectadas_tipo_uso
            }).done(function(data, textStatus, jqXHR) {
                //jsonObject[0] contiene un arreglo que relaciona cada municipio con los tipos de uso que
                //corresponden a dicho municipio
                //
                //jsonObject[1] contiene un arreglo que relaciona cada tipo de uso con las parcelas
                //que corresponden a dicho tipo de uso. Así se muestran las parcelas en el mapa cada vez que
                //se hace click sobre un tipo de uso en la tabla
                var jsonObject = getJSONObject(data);
                //cerrar el que estaba abierto
                close.click();
                var tabs = $('<ul class="nav nav-tabs">');
                var tabContent = $('<div class="tab-content">');
                //recorrer los municipios [municipio => tiposuso]
                $.each(jsonObject[0], function(municipio, tiposuso) {
                    //por cada municipio se crea un <div id="' + tabPaneID + '" class="tab-pane fade">
                    //cuyo id es el nombre de dicho municipio
                    var tabPaneID = municipio.toLowerCase().replace(/ /g, '_'),
                            tabPane = $('<div id="' + tabPaneID + '" class="tab-pane fade">'),
                            table = $('<table class="table table-dark">'),
                            thead = $('<thead>'),
                            tbody = $('<tbody>'),
                            totalArea = 0;
                    //recorrer los tipos de uso [tipouso => area]
                    $.each(tiposuso, function(tipouso, area) {
                        var tr = $('<tr>');
                        //mostrar los datos de la fila en el mapa
                        tr.click(function(e) {
                            var $tr = $(this);
                            //desmarcar la que esté marcada
                            $tr.siblings('tr.selected').click();
                            $tr.toggleClass('selected');
                            var isSelected = $tr.hasClass('selected');
                            var features = [];
                            var layer = __map.getLayerByName('parcela_agricola_afectada');
                            //si la fila fue seleccionada
                            if (isSelected) {
                                //si NO estamos en la pestaña TOTAL
                                if (tabPaneID !== 'total') {
                                    $.each(layer.getSource().getFeatures(), function(i, feature) {
                                        if (Object.values(jsonObject[1][tipouso]).includes(feature.getId()) &&
                                                feature.get('municipio_nombre').toLowerCase().replace(/ /g, '_') === tabPaneID) {
                                            features.push(feature);
                                        }
                                    });
                                } else {
                                    $.each(layer.getSource().getFeatures(), function(i, feature) {
                                        if (Object.values(jsonObject[1][tipouso]).includes(feature.getId())) {
                                            features.push(feature);
                                        }
                                    });
                                }
                                selectFeatures(features, true);
                                selectLayers([layer], true);
                                if (layer.getVisible())
                                    centerFeaturesOnMap(features);
                            } else
                                selectLayers([layer], false);
                        });
                        tbody.append(tr.append('<td>' + tipouso + '</td><td>' + area.toFixed(2) + '</td>'));
                        totalArea += area;
                    });
                    thead.append('<tr><th>Tipo de uso</th><th>Área (ha)</th></tr>');
                    var tab = $('<li class="nav-item">');
                    //desmarcar las filas al cambiar de tab
                    tab.click(function() {
                        $('#query tr.selected').click();
                    });
                    tabs.append(tab.append('<a class="nav-link" data-toggle="tab" href="#' + tabPaneID + '">' + municipio
                            + '<br>' + totalArea.toFixed(2) + ' ha</a>'));
                    tabContent.append(tabPane.append(table.append(thead).append(tbody)));
                });
                tabs.find('a:first').addClass('active');
                tabContent.children('div:first').addClass('active show');
                queryContainer.append(tabs).append(tabContent).show();
            });
        });

        //evento click de la consulta Usufructuarios afectados
        $('#usufructuarios-afectados').click(function(e) {
            titleDiv.text($(this).text());
            resetMinimizeButton();
            if (queryAjax !== undefined)
                queryAjax.abort();
            queryAjax = $.ajax({
                url: usufructuarios_afectados
            }).done(function(data, textStatus, jqXHR) {
                var jsonObject = getJSONObject(data);
                //cerrar el que estaba abierto
                close.click();
                var tabs = $('<ul class="nav nav-tabs">');
                var tabContent = $('<div class="tab-content">');
                //recorrer los municipios [municipio => datos]
                $.each(jsonObject, function(municipio, datos) {
                    //por cada municipio se crea un <div id="' + tabPaneID + '" class="tab-pane fade">
                    //cuyo id es el nombre de dicho municipio
                    var tabPaneID = municipio.toLowerCase().replace(/ /g, '_'),
                            tabPane = $('<div id="' + tabPaneID + '" class="tab-pane fade">'),
                            table = $('<table class="table table-dark">'),
                            thead = $('<thead>'),
                            tbody = $('<tbody>');
                    thead.append('<tr><th>Cantidad</th><th>Área (ha)</th></tr>');
                    tbody.append('<tr><td>' + datos['usufructos'] + '</td><td>'
                            + (Math.floor(parseFloat(datos['area'])) / 10000).toFixed(2) + '</td></tr>');
                    tabs.append('<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#' + tabPaneID + '">' + municipio + '</a></li>');
                    tabContent.append(tabPane.append(table.append(thead).append(tbody)));
                });
                tabs.find('a:first').addClass('active');
                tabContent.children('div:first').addClass('active show');
                queryContainer.append(tabs).append(tabContent).show();
            });
        });

        //evento click de la consulta Afectaciones por forma productiva
        $('#afectaciones-forma-productiva').click(function(e) {
            titleDiv.text($(this).text());
            resetMinimizeButton();
            if (queryAjax !== undefined)
                queryAjax.abort();
            queryAjax = $.ajax({
               url: afectaciones_forma_productiva
            }).done(function(data, textStatus, jqXHR) {
                //objeto que contiene los datos de las afectaciones, agrupado primero por municipio y luego por forma productiva.
                var jsonObject = getJSONObject(data);
                //cerrar el que estaba abierto
                close.click();
                //Esta vista es diferente (más compleja) que las anteriores. Tenemos dos filas de tabs horizontales; una
                //para los municipios y otra para las formas productivas

                //fila de tabs para los municipios
                var tabsMunicipios = $('<ul class="nav nav-tabs">');

                var tabContentMunicipios = $('<div id="tab-content-municipios" class="tab-content resumen-activo">');

                //tab especial para mostrar la vista resumen
                var linkResumen = $('<a class="nav-link" data-toggle="tab" href="#resumen-municipio">RESUMEN</a>');
                tabsMunicipios.prepend($('<li class="nav-item">').append(linkResumen));

                //añadir clase resumen-activo a #tab-content-municipios
                linkResumen.click(function() {
                    tabContentMunicipios.addClass('resumen-activo');
                });
                //quitar clase resumen-activo de #tab-content-municipios
                linkResumen.parent().siblings().children('a').click(function() {
                    tabContentMunicipios.removeClass('resumen-activo');
                });

                var tabPaneResumenMunicipio = $('<div id="resumen-municipio" class="tab-pane fade">');
                var tablaResumenMunicipio = $('<table class="table table-dark">'), tbodyResumenMunicipio = $('<tbody>');
                var municipiosHeader = $('<tr class="fila">');
                tabContentMunicipios.prepend(
                        tabPaneResumenMunicipio.append(
                                tablaResumenMunicipio.append(
                                        $('<thead class="header">').append(
                                        municipiosHeader)).append(
                                tbodyResumenMunicipio
                                )));

                //variable de control para no repetir forma productiva en las filas
                var formaProdListadas = {};
                municipiosHeader.append('<th>');
                //recorrer los municipios [municipio => formasProd]
                $.each(jsonObject, function(municipio, formasProd) {
                    municipiosHeader.append($('<th>' + municipio + '</th>'));
                    var tabPaneIDMunicipio = municipio.toLowerCase().replace(/ /g, '_'),
                            tabPaneMunicipio = $('<div id="' + tabPaneIDMunicipio + '" class="tab-pane fade">');
                    //fila de tabs para las formas producivas
                    var tabsFormasProd = $('<ul class="nav nav-tabs">');

                    var tabContentFormasProd = $('<div id="tab-content-forma-prod-' + municipio + '" class="tab-content">');
                    //recorrer las formas productivas [forma => datos]
                    $.each(formasProd, function(forma, datos) {
                        //verificar si la forma productiva 'forma' no ha sido añadida al resumen
                        if (formaProdListadas[forma] === undefined) {
                            var fila = $('<tr class="fila"><td>' + forma + '</td></tr>');
                            tbodyResumenMunicipio.append(fila);
                            formaProdListadas[forma] = fila;
                        }

                        var tabPaneIDFormaProd = (municipio + '_' + forma).toLowerCase().replace(/ /g, '_'),
                                tabPaneFormaProd = $('<div id="' + tabPaneIDFormaProd + '" class="tab-pane fade">'),
                                totalArea = 0;
                        var table = $('<table class="table table-dark">'),
                                thead = $('<thead>'),
                                tbody = $('<tbody>');
                        //recorrer los datos de cada forma productiva [i => d]
                        $.each(datos, function(i, d) {
                            var tr = $('<tr>');
                            var area = Math.floor(parseFloat(d['area']));
                            tr.append($(
                                    '<td>' + d['nombre'] + '</td>' +
                                    '<td>' + (area / 10000).toFixed(2) + '</td>'
                                    ));
                            totalArea += area;
                            //mostrar los datos de la fila en el mapa
                            tr.click(function(e) {
                                var $tr = $(this);
                                //desmarcar la que esté marcada
                                $tr.siblings('tr.selected').click();
                                $tr.toggleClass('selected');
                                var isSelected = $tr.hasClass('selected');
                                var features = [];
                                var layer = __map.getLayerByName('parcela_agricola_afectada');
                                if (isSelected) {
                                    $.each(layer.getSource().getFeatures(), function(i, feature) {
                                        if (feature.get('forma_prod') === d['idFormaProd']) {
                                            features.push(feature);
                                        }
                                    });
                                    selectFeatures(features, true);
                                    selectLayers([layer], true);
                                    if (layer.getVisible()) {
                                        centerFeaturesOnMap(features);
                                    }
                                } else
                                    selectLayers([layer], false);
                            });
                            tbody.append(tr);
                        });

                        //variable que representa cada celda en la vista resumen
                        var tdCelda = $('<td class="celda"><div>' + (datos.length) + '</div><div>'
                                + (totalArea / 10000).toFixed(2) + ' ha</div></td>');
                        formaProdListadas[forma].append(tdCelda);
                        //si la celda no contiene ninguna forma productiva (ej: Encrucijada no posee CCS's)
                        if (datos.length === 0)
                            tdCelda.addClass('empty');
                        else
                            tdCelda.hover(function() {
                                municipiosHeader.children().eq($(this).index()).addClass('hovered');
                                $(this).parent().children().first().addClass('hovered');
                            }, function() {
                                municipiosHeader.children().eq($(this).index()).removeClass('hovered');
                                $(this).parent().children().first().removeClass('hovered');
                            }).click(function() {
                                var $tdCelda = $(this);
                                //desmarcar la que esté marcada
                                $('#resumen-municipio td.celda.selected').not(this).click();

                                $tdCelda.toggleClass('selected');
                                var isSelected = $tdCelda.hasClass('selected');
                                var features = [];
                                var layer = __map.getLayerByName('parcela_agricola_afectada');
                                if (isSelected) {
                                    //Fue necesario 'normalizar' el nombre del municipio ya que en la base de datos, cambia la forma
                                    //en que está almacenado de tabla en tabla. Ej: en una tabla tenemos 'Caibarién' y en otra 'CAIBARIEN'
                                    var municipioNormalizado = municipio.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                                    var codigoFormaProd = datos[0]['idFormaProd'].substr(0, 5);

                                    //Esta estructura if-else contempla 4 posibles casos
                                    //1. Todas las parcelas de la región que están asociadas a cualquier tipo de forma productiva
                                    if (municipioNormalizado === 'total' && forma === 'TOTAL') {
                                        $.each(layer.getSource().getFeatures(), function(i, feature) {
                                            if (feature.get('forma_prod'))
                                                features.push(feature);
                                        });
                                    }//2. Todas las parcelas de la región que están asociadas al tipo de forma productiva seleccionado
                                    else if (municipioNormalizado === 'total') {
                                        $.each(layer.getSource().getFeatures(), function(i, feature) {
                                            var featureFormaProd = feature.get('forma_prod');
                                            if (featureFormaProd && featureFormaProd.substr(0, 5) === codigoFormaProd)
                                                features.push(feature);
                                        });
                                    }//3. Todas las parcelas del municipio seleccionado que están asociadas a cualquier tipo de forma productiva
                                    else if (forma === 'TOTAL') {
                                        $.each(layer.getSource().getFeatures(), function(i, feature) {
                                            var featureMunicipioNombre = feature.get('municipio_nombre');
                                            if (feature.get('forma_prod') && featureMunicipioNombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") === municipioNormalizado) {
                                                features.push(feature);
                                            }
                                        });
                                    }//4. Todas las parcelas del municipio seleccionado que están asociadas al tipo de forma productiva seleccionado
                                    else {
                                        $.each(layer.getSource().getFeatures(), function(i, feature) {
                                            var featureMunicipioNombre = feature.get('municipio_nombre');
                                            var featureFormaProd = feature.get('forma_prod');
                                            if (featureFormaProd && featureFormaProd.substr(0, 5) === codigoFormaProd
                                                    && featureMunicipioNombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") === municipioNormalizado)
                                                features.push(feature);
                                        });
                                    }
                                    selectFeatures(features, true);
                                    selectLayers([layer], true);
                                    if (layer.getVisible()) {
                                        centerFeaturesOnMap(features);
                                    }
                                } else
                                    selectLayers([layer], false);
                            });
                        var tabFormaProd = $('<li class="nav-item">');
                        //desmarcar las filas al cambiar de tab
                        tabFormaProd.click(function() {
                            $('#query tr.selected').click();
                        });

                        tabsFormasProd.append(tabFormaProd.append('<a class="nav-link" data-toggle="tab" href="#'
                                + tabPaneIDFormaProd + '">' + forma + ' (' + (totalArea / 10000).toFixed(2) + ' ha)</a>'));
                        tabContentFormasProd.append(tabPaneFormaProd);
                        tabPaneFormaProd.append(table.append(thead).append(tbody));
                        thead.append('<tr><th>Forma productiva</th><th>Área (ha)</th></tr>');
                    });

                    if (municipio !== 'TOTAL') {
                        var tabMunicipio = $('<li class="nav-item">');
                        //desmarcar las filas al cambiar de tab
                        tabMunicipio.click(function() {
                            $('#resumen-municipio td.celda.selected').click();
                            $('#query tr.selected').click();
                        });

                        tabsMunicipios.append(tabMunicipio.append('<a class="nav-link" data-toggle="tab" href="#' + tabPaneIDMunicipio + '">' + municipio + '</a>'));
                        tabContentMunicipios.append(tabPaneMunicipio);
                    }
                    tabsFormasProd.find('a:first').addClass('active');
                    tabContentFormasProd.children('div:first').addClass('active show');
                    tabPaneMunicipio.append(tabsFormasProd).append(tabContentFormasProd);

                });
                tabsMunicipios.find('a:first').addClass('active');
                tabContentMunicipios.children('div:first').addClass('active show');
                queryContainer.append(tabsMunicipios).append(tabContentMunicipios).show();
            });
        });

        //evento click de la consulta Área de ascenso del nivel del mar
        $('#area-ascenso-nmm').click(function(e) {
            titleDiv.text($(this).text());
            resetMinimizeButton();
            //cerrar el que estaba abierto
            close.click();

            var tabs = $('<ul class="nav nav-tabs">');
            var tabContent = $('<div class="tab-content">');
            var municipios = {'TOTAL': {}};
            var layer = __map.getLayerByName('ascenso_nmm');
            $.each(layer.getSource().getFeatures(), function(i, feature) {
                if (municipios[feature.get('municipio')] === undefined)
                    municipios[feature.get('municipio')] = {};
                if (municipios[feature.get('municipio')][feature.get('year_ascenso')] === undefined)
                    municipios[feature.get('municipio')][feature.get('year_ascenso')] = 0;
                if (municipios['TOTAL'][feature.get('year_ascenso')] === undefined)
                    municipios['TOTAL'][feature.get('year_ascenso')] = 0;
                municipios[feature.get('municipio')][feature.get('year_ascenso')] += parseFloat(feature.get('area'));
                municipios['TOTAL'][feature.get('year_ascenso')] += parseFloat(feature.get('area'));
            });
            var areaSum = 0;
            //recorrer los municipios [municipio => annos]
            $.each(municipios, function(municipio, annos) {
                var tabPaneID = municipio.toLowerCase().replace(/ /g, '_'),
                        tabPane = $('<div id="' + tabPaneID + '" class="tab-pane fade">'),
                        table = $('<table class="table table-dark">'),
                        thead = $('<thead>'),
                        tbody = $('<tbody>');
                //recorrer los annos [anno => area]
                $.each(annos, function(anno, area) {
                    var tr = $('<tr><td>' + anno + '</td><td>' + area.toFixed(2) + '</td></tr>');
                    //mostrar los datos de la fila en el mapa
                    tr.click(function() {
//                        var $tr = $(this);
//                        //desmarcar la que esté marcada
//                        $tr.siblings('tr.selected').click();
//
//                        $tr.toggleClass('selected');
//                        var isSelected = $tr.hasClass('selected');
//                        var features = [];
//
//                        //si la fila fue seleccionada
//                        if (isSelected) {
//                            $.each(layer.getSource().getFeatures(), function(i, feature) {
////                            if () {
////                                features.push(feature);
////                            }
//                            });
//
//                            selectLayers([layer], true);
//                            selectFeatures(features, true);
//                        } else
//                            selectLayers([layer], false);
                    });
                    tbody.append(tr);
                    areaSum += parseFloat(area);
                });
                var tab = $('<li class="nav-item">');
                //desmarcar las filas al cambiar de tab
                tab.click(function() {
                    $('#query tr.selected').click();
                });
                tabs.append(tab.append('<a class="nav-link" data-toggle="tab" href="#' + tabPaneID + '">' + municipio +
                        ' (' + areaSum + ' ha)</a>'));
                thead.append('<tr><th>Año</th><th>Área (ha)</th></tr>');
                tabContent.append(tabPane.append(table.append(thead).append(tbody)));
            });
            tabs.find('a:first').addClass('active');
            tabContent.children('div:first').addClass('active show');
            queryContainer.append(tabs).append(tabContent).show();
        });

        //evento click de la consulta Acciones por forma productiva
        $('#acciones-forma-prod').click(function(e) {
        });
    })(typeof exports !== "undefined" && exports instanceof Object ? exports : window);
});