$(document).ready(function() {
    var sideBar = (function(exports) {

//variable para acceder fácilmente a los tres posibles estados de un checkbox en el menú de capas
        var checkboxStates = {'all': 'fa-check-square', 'some': 'fa-indeterminate-checkbox', 'none': 'fa-square-o'};
        /**
         * Crear un árbol de jerarquía de capas
         *
         * @param {type} rootName Nombre del nodo raíz
         * @param {type} children Las capas y grupos hijos si tiene, si no, sus datos
         * @param {type} layerCollection Objeto que contiene las capas para construir el mapa
         * @param {type} container Elemento <ul> al que se añadirán las capas del árbol
         * @returns {undefined}
         */
        exports.buildTree = function(rootName, children, layerCollection, container) {
            if (children['IsLeaf']) {
                var vector = addVectorToMap(children, layerCollection);
                addLeaf(children['Friendlyname'], vector, container);
            } else {
                var ul = addNode(rootName, children, container);
                $.each(children, function(name, grandchildren) {
                    buildTree(name, grandchildren, layerCollection, ul);
                });
            }
        };
        /**
         * Añade la interfaz de búsqueda en el menú de capas
         *
         * @returns {undefined}
         */
        exports.addSearchUI = function() {
            var searchLayerLI = $('<li id="search-layer">');
            var inputGroupDiv = $('<div class="input-group">');
            var input = $('<input class="form-control"/>'); //cuadro de texto para la búsqueda
            var inputGroupButtonDiv = $('<div class="input-group-btn">');
            var button = $('<button class="btn"><i class="fa fa-map-marker">');
            searchLayerLI.append(inputGroupDiv);
            inputGroupDiv.append(input).append(inputGroupButtonDiv);
            inputGroupButtonDiv.append(button);
            var dropDownList = $('<div id="layer-dropdown-list">'); //lista desplegable
            inputGroupDiv.append(dropDownList);
            $('#layers li:first').after(searchLayerLI);
            input.activateLayerSearch();
        };
        /**
         * Añadir un nodo 'hoja' al árbol
         *
         * @param {type} label Nombre del nodo
         * @param {type} vector Vector del mapa que corresponde al nodo
         * @param {type} container Elemento <ul> al que se añadirá el nodo
         * @returns {$}
         */
        function addLeaf(label, vector, container) {
            var li = $('<li>');
            var layerName = vector.get('name');
            li.attr('id', layerName);
            var anchor = $('<a class="leaf">');
            var input = $('<i class="fa fa-square-o tree-checkbox">');
            vector.setVisible(input.hasClass('fa-check-square'));
            container.append(li);
            li.append(anchor);
            var rowDiv = $('<div class="row">');
            var col1 = $('<div class="col-8">');
            var col2 = $('<div class="col-4">');
            anchor.append(rowDiv.append(col1).append(col2));
            var span = $('<span class="badge unselectable">' + label + '&nbsp;</span>');
            col1.append(input).append(span);

            //evento click() común para todas las capas
            $(input).click(function(e) {
                if (e.originalEvent) {
                    $(this).toggleClass('fa-check-square fa-square-o');
                    propagateUp($(this));
                }

                vector.setVisible($(this).hasClass('fa-check-square'));
                $('#feature-info-popup-closer').click();
                //cerrar la tabla correspondiente en #info-panel
//            $('#info-panel a[href="#' + layerName + '"] span.close').click();
            });

//        BARRA DE OPACIDAD DE LA CAPA
            //la capa parcela_agricola_afectada es transparente por lo que no tiene barra de opacidad
            if (layerName !== 'parcela_agricola_afectada') {
                var opacityBar = $('<input type="range" class="opacity-bar custom-range" value="100" min="0" max="100" step="1"/>');
                opacityBar.on('input', function() {
                    vector.setOpacity($(this).val() / $(this).prop('max'));
                });
                var opacityBarBackground = vector.getStyle().call(window).getFill().getColor();
                if (layerName === 'suelo_afectado') {
                    opacityBarBackground = 'transparent linear-gradient(to right, #ee9144 25%, #9ba011 25%, #9ba011 50%, #1fb07b 50%, #1fb07b 75%, #a840b3 75%, #a840b3 75%) repeat scroll 0% 0%';
                }
//                console.log($('input.custom-range::-moz-range-thumb'));
               // $('input.custom-range::-moz-range-thumb').css('background', opacityBarBackground);

//                var opacityBarContainer = $('<div class="opacity-bar-container">');
//                var opacityBarBackground = vector.getStyle().call(window).getFill().getColor();
//                if (layerName === 'suelo_afectado') {
//                    opacityBarBackground = 'transparent linear-gradient(to right, #ee9144 25%, #9ba011 25%, #9ba011 50%, #1fb07b 50%, #1fb07b 75%, #a840b3 75%, #a840b3 75%) repeat scroll 0% 0%';
//                }
//                var opacityBar = $('<div class="opacity-bar" style="background: ' + opacityBarBackground + '">');
//                var opacityBarKnob = $('<div class="opacity-bar-knob">');
//                opacityBarContainer.append(opacityBar.append(opacityBarKnob));
//                col2.append(opacityBarContainer);
                col2.append(opacityBar);
//                (function() {
//                    var opacityBarKnobWidth = opacityBarKnob.width();
//                    opacityBar.on('mousedown', function(e) {
//                        var iniBarWidth = opacityBar.width();
//                        var iniPageX = e.pageX;
//                        var iniLeft = iniPageX - $(this).offset().left - opacityBarKnobWidth / 2;
//                        var rightLimit = iniBarWidth - opacityBarKnobWidth / 2;
//                        if (iniLeft >= 0 && iniLeft <= rightLimit) {
//                            opacityBarKnob.css('left', iniLeft);
//                            vector.setOpacity(iniLeft / rightLimit);
//                        }
//
//                        function move(evt) {
//                            var distance = evt.pageX - iniPageX;
//                            var newLeft = iniLeft + distance;
//                            if (newLeft >= 0 && newLeft <= rightLimit) {
//                                opacityBarKnob.css('left', newLeft);
//                                vector.setOpacity(newLeft / rightLimit);
//                            }
//                        }
//
//                        function end() {
//                            opacityBarContainer.closest('li').off('mousemove', move);
//                            $(window).off('mouseup', end);
//                            iniLeft = parseInt(opacityBarKnob.css('left'));
//                        }
//
//                        opacityBarContainer.closest('li').on('mousemove', move);
//                        $(window).on('mouseup', end);
//                    });
//                })();
            }
            //BARRA DE OPACIDAD DE LA CAPA - FIN

            if (vector.get('name') === 'ascenso_nmm') {
                //para seleccionar el año
                var yearSelect = $('<select id="' + vector.get('name') + '_year">');
                $(input).one('click', function() {
                    //si aún no se le han añadido los años a yearSelect.
                    //esta acción se realiza dentro del evento click() porque en el momento de cargar la página
                    //la variable vector aún no contiene features
                    var temp = [];
                    $.each(vector.getSource().getFeatures(), function(i, feature) {
                        var year = feature.get('year_ascenso');
                        if (!temp.includes(year)) {
                            yearSelect.append($('<option value="' + year + '">' + year + '</option>'));
                            temp.push(year);
                        }
                    });
                }).click(function() {
                    var checked = $(this).hasClass('fa-check-square');
                    //para mostrar el input de los años
                    yearSelect.toggle(checked);
                    $.each(vector.getSource().getFeatures(), function(i, feature) {
                        feature.set('visible', feature.get('year_ascenso') === yearSelect.val());
                    });
                });
                yearSelect.change(function() {
                    $.each(vector.getSource().getFeatures(), function(i, feature) {
                        feature.set('visible', feature.get('year_ascenso') === yearSelect.val());
                    });
                });
                col2.prepend(yearSelect);
            } else {
                $(input).click(function() {
                    var checked = $(this).hasClass('fa-check-square');
                    $('#legend div.' + vector.get('name')).toggle(checked);
                });
            }


//            var arrowUp = $('<i class="fa fa-arrow-up">');
//            arrowUp.click(function() {
//                $(this).closest('li').prev().before($(this).closest('li'));
//                updateZIndices();
//            });
//            span.append(arrowUp);

            //MOVER ELEMENTOS DEL MENÚ PARA CAMBIAR EL zIndex DE LA CAPA (O GRUPO DE CAPAS) CORRESPONDIENTE
//            (function() {
////                $('#sidebar span').mousedown(function(e) {
////                    if (e.dragging) {
////                        console.log(e.pageX);
////                    }
////                });
//                dragElement(li[0]);
//
//                function dragElement(element) {
//                    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//                    var elmntHeight = element.height;
//                    $(element).find('span.unselectable')[0].onmousedown = dragMouseDown;
//
//                    function dragMouseDown(e) {
//                        e = e || window.event;
//                        var offsetTop = element.offsetTop;//top relativo a la UL que contiene a 'element'
//
//                        element.style.position = 'absolute';
//                        // get the mouse cursor position at startup:
//                        pos3 = e.clientX;
//                        pos4 = e.clientY;
//                        element.style.left = "0px";
//                        element.style.top = offsetTop + "px";
////                        console.log($(element).index());
////                        console.log(elmntHeight);
//                        document.onmouseup = closeDragElement;
//                        // call a function whenever the cursor moves:
//                        document.onmousemove = elementDrag;
//                    }
//
//                    function elementDrag(e) {
//                        e = e || window.event;
//                        // calculate the new cursor position:
//                        pos1 = pos3 - e.clientX;
//                        pos2 = pos4 - e.clientY;
//                        pos3 = e.clientX;
//                        pos4 = e.clientY;
//                        // set the element's new position:
//                        element.style.top = (element.offsetTop - pos2) + "px";
//                        element.style.left = (element.offsetLeft - pos1) + "px";
//                    }
//
//                    function closeDragElement() {
//                        /* stop moving when mouse button is released:*/
//                        document.onmouseup = null;
//                        document.onmousemove = null;
//                        element.style.position = 'static';
//                    }
//                }
//            })();
            //MOVER ELEMENTOS DEL MENÚ PARA CAMBIAR EL zIndex DE LA CAPA (O GRUPO DE CAPAS) CORRESPONDIENTE - FIN

            return li;
        }

        /**
         * Añadir un nodo que representa una capa base del mapa
         *
         * @param {type} label Nombre del nodo
         * @param {type} vector Vector del mapa que corresponde al nodo
         * @param {type} container Elemento <ul> al que se añadirá el nodo
         * @returns {$}
         */
        exports.addBaseLayerNode = function(label, vector, container) {
            var li = $('<li>');
            li.attr('id', vector.get('name'));
            var anchor = $('<a>');
            var input = $('<input/>');
            input.attr('type', 'radio');
            input.attr('name', 'base-layers');
            input.prop('checked', true);
            input.val(vector.get('vectorMetadata')['Name']);
            vector.setVisible(false);
            var prevRadio;
            $(input).on('focus', function() {
                prevRadio = $('[name="base-layers"]:checked');
            });
            $(input).change(function() {
                if (prevRadio.presence())
                    __map.get(prevRadio.val()).setVisible(false);
                vector.setVisible(true);
            });
            var span = $('<span class="unselectable">' + label + '</span>');
            container.append(li);
            li.append(anchor);
            anchor.append(input).append(span);
            return li;
        };
        /**
         * Añadir un nodo 'intermedio' al árbol
         *
         * @param {type} label Nombre del nodo
         * @param {type} data Datos del nodo
         * @param {type} container Elemento <ul> al que se añadirá el nodo
         * @returns {$}
         */
        exports.addNode = function(label, data, container) {
            var li = $('<li>');
            li.attr('id', data['Name']);
            var anchor = $('<a>');
            var span = $('<span class="badge unselectable">' + label + '&nbsp;</span>');
            if (label !== 'BASE') {
                var input = $('<i class="fa fa-square-o tree-checkbox"/>');
                anchor.append(input);
                input.click(function(e) {
                    e.stopPropagation();
                    goToNextState($(this));
                    propagateDown(input);
                    propagateUp(input);
                });
            } else {
                anchor.append('<i class="fa fa-bold">');
            }

            var icon = $('<i class="fa fa-chevron-left"></i>');
            anchor.append(span).append(icon);
            container.append(li);
            li.append(anchor);
            anchor.addClass('dropdown-collapse');
//            var arrowUp = $('<i class="fa fa-arrow-up">');
//            arrowUp.click(function() {
//                $(this).closest('li').prev().before($(this).closest('li'));
//                updateZIndices();
//            });
//            span.append(arrowUp);

//            span.append(icon);
            var ul = $('<ul>');
            ul.attr('id', li.attr('id'));
            ul.addClass('nav');
//        ul.css('display', 'block');
            li.append(ul);
            return ul;
        };
        /**
         * Al dar click sobre un checkbox del menú de capas, se debe ejecutar un efecto de propagación para cambiar los estados de los
         * 'descendientes' en el árbol
         *
         * @param {type} checkbox Elemento desde donde nace la propagación
         * @returns {undefined}
         */
        function propagateDown(checkbox) {             //si no es hoja
            if (!checkbox.closest('a').hasClass('leaf')) {                 //buscar los hijos
                var next = checkbox.parent().siblings('ul').children('li').children('a').find('i.tree-checkbox');
                //por cada uno establecer su estado y propagar
                next.each(function() {
                    propagateDown($(this).attr('class', checkbox.attr('class')));
                });
            } else {                 //establecer el estado
                checkbox.click();
            }
        }
        /**
         * Al dar click sobre un checkbox del menú de capas, se debe ejecutar un efecto de propagación para cambiar los estados de los
         * 'ancestros' en el árbol
         *
         * @param {type} checkbox Elemento desde donde nace la propagación
         * @returns {undefined}
         */
        function propagateUp(checkbox) {
            var next = checkbox.parents('ul').first().siblings('a').children('i.tree-checkbox');
            if (next.presence()) {
                next.attr('class', next.attr('class').replace(/fa-((\w|-)+)/, checkboxStates[getLevelState(checkbox)]));
                propagateUp(next);
            }
        }

        /**
         * Realizar la transición al próximo estado del checkbox (se usa la variable <b>checkboxStates</b>)
         *
         * @param {type} checkbox
         * @returns {undefined}
         */
        function goToNextState(checkbox) {
            if (checkbox.hasClass(checkboxStates['all']))
                checkbox.attr('class', checkbox.attr('class').replace(checkboxStates['all'], checkboxStates['none']));
            else if (checkbox.hasClass(checkboxStates['some']))
                checkbox.attr('class', checkbox.attr('class').replace(checkboxStates['some'], checkboxStates['none']));
            else
                checkbox.attr('class', checkbox.attr('class').replace(checkboxStates['none'], checkboxStates['all']));
        }

        /**
         * Devuelve el estado ('all', 'some', 'none') del nivel del checkbox en el árbol
         *
         * @param {type} checkbox
         * @returns {String}
         */
        function getLevelState(checkbox) {
            if (checkbox.hasClass(checkboxStates['some']))
                return 'some';
            var lis = checkbox.parents('li').first().siblings();
            var isOn = checkbox.hasClass(checkboxStates['all']), isOff = !isOn;
            var result = isOn ? 'all' : 'none';
            lis.each(function() {
                var cousin = $(this).find('i.tree-checkbox').first();
                if (cousin.hasClass(checkboxStates['all']))
                    isOn = true;
                else
                    isOff = true;
                if (isOn && isOff || cousin.hasClass(checkboxStates['some'])) {
                    result = 'some';
                    return false;
                }
            });
            return result;
        }

        /**
         * Cerrar y abrir cada 'grupo' en el menú de capas
         *
         * @returns {undefined}
         */
        exports.bindOnClickToMainNavLinks = function() {
            $("#sidebar i.fa-chevron-left").on('click', function(e) {
                var icon, list;
                e.preventDefault();
                icon = $(this);
                list = icon.closest('li').find("> ul");
                if (list.is(":visible")) {
                    list.slideUp(300, function() {
                        return $(this);
                    });
                    icon.css('transform', 'rotateZ(0deg)');
                } else {
                    list.slideDown(300, function() {
                        return $(this);
                    });
                    icon.css('transform', 'rotateZ(-450deg)');
                }
            });
        };
        /**
         * Resaltar el grupo de capas al pasar el mouse
         *
         * @returns {undefined}
         */
        exports.bindOnHoverToMainNavLinks = function() {
            var prevTarget;
//        $("#sidebar li").on('mouseover', function(e) {
//            e.stopPropagation();
//            if (prevTarget !== undefined)
//                $(prevTarget).removeClass('hovered');
//            prevTarget = e.currentTarget;
//            $(this).addClass('hovered');
//        }).on('mouseleave', function(e) {
//            $(this).removeClass('hovered');
//        });
            $("#sidebar li").on('mouseover', function(e) {
                e.stopPropagation();
                $("#sidebar li").removeClass('hovered');
                $(this).addClass('hovered');
            }).on('mouseleave', function(e) {
                $(this).removeClass('hovered');
            });
        };
        /**
         * separar cada capa de la izquierda de la pantalla de acuerdo a su nivel en su árbol de capas
         *
         * @returns {undefined}
         */
        exports.applyHierarchicalPadding = function() {
            $('#sidebar ul#layers li').each(function() {
                $(this).children('a').css('padding-left', (getLevel($(this)) * 4) + '%');
            });
        };
        /**
         * Obtener la 'altura' de un nodo en el árbol
         *
         * @param {type} node Nodo del árbol
         * @returns {Number}
         */
        function getLevel(node) {
            var parent = node.parent();
            if (parent.is('#layers'))
                return 1;
            else
                return getLevel(parent.parent()) + 1;
        }

//        function updateZIndices() {
//            var liElements = $('#layers li');
//            var firstZIndex = liElements.length;
//            $('#layers li').each(function() {
//                if ($(this).children('a.leaf').presence()) {
//                    __map.getLayerByName($(this).attr('id')).setZIndex(firstZIndex--);
//                }
//            });
//        }

    })(typeof exports !== "undefined" && exports instanceof Object ? exports : window);

    /**
     * Esconder y mostrar el #sidebar
     */
    $('#sidebar-wrapper').on('click', 'div.sidebar-header i', function(e) {
        var $this = $(this);
        var $delegate = $(e.delegateTarget);
        if ($delegate.hasClass('hidden')) {
            $delegate.removeClass('hidden');
            $this.toggleClass('fa-bars fa-close');
            $delegate.animate({
                left: 0
            }, 500);
        }
        else {
            $delegate.animate({
                left: '-400px'
            }, 500, function() {
                $delegate.addClass('hidden');
                $this.toggleClass('fa-bars fa-close');
            });
        }
    });

    //para ocultar el menú izquierdo por defecto en displays menores de 600px de ancho
    if ($(window).width() < 600)
        $('#sidebar-wrapper div.sidebar-header i').click();

    /**
     * Esconder y mostrar el icono de .sidebar-header
     */
    (function($) {
//        var icon = $('#sidebar div.sidebar-header i');
//        var iniRight;
//        $(document).mousemove(function(e) {
//            if ($('#sidebar-wrapper').hasClass('hidden')) {
//                if (e.pageX < 50 && !icon.hasClass('peek')) {
//                    icon.addClass('peek').one('mouseover', function() {
//                        $(this).stop(true).css('right', iniRight);
//                    });
//                    iniRight = icon.css('right');
//                    shake(icon, iniRight);
//                } else if (e.pageX > 50 && icon.hasClass('peek')) {
//                    icon.stop(true).removeClass('peek').css('right', iniRight);
//                }
//            }
//        });
//        function shake(it, iniRight, iniTop) {
//            var callback;
//            var right = parseInt(iniRight);
//            for (var i = 0, j = 1; i < 10; i++, j *= -1) {
//                if (i === 9)
//                    callback = function() {
//                        $(this).stop(true).css('right', iniRight);
//                    };
//                it.animate({
//                    right: right + (5 * j)
//                }, 100, 'linear', callback);
//            }
//        }
    })(jQuery);
});