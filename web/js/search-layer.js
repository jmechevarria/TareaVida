/**
 * Habilitar la búsqueda en el menú de capas
 *
 * @returns {$.fn}
 */
$.fn.activateLayerSearch = function() {
    var inputBox = $(this);
    if (inputBox[0].tagName === 'INPUT') {
        var haystack = getHaystack();
        var dropDownList = $('#layer-dropdown-list');
        var spans = [];

        //recorrer arrelgo de nombres para crear la lista a filtrar
        $.each(haystack, function(i, v) { //v -> [friendlyName, name, isLeaf]
            var span = $('<span>' + v[0] + '<label>[' + (v[2] ? 'Capa' : 'Grupo') + ']</label>' + '</span>');
            dropDownList.append(span);
            //al dar click en alguno de los resultados de la lista

            span.on('click', function() {
                inputBox.val($(this).text());
                $('#layer-dropdown-list span').css('display', 'none');
                unfoldNode(v[0]);
            });
            spans.push(span);
        });

        var timeoutId;
        //evento 'input' del cuadro de texto
        $(this).on('input', function() {
            var $this = $(this);
            clearTimeout(timeoutId);
            if ($this.val() !== '') {
                timeoutId = setTimeout(function() {
                    $.each(spans, function(i, span) {
                        //normalize('NFD') básicamente lo que hace es descomponer los caracteres compuestos (ejemplo: á -> 'a).
                        //replace(/[\u0300-\u036f]/g, "") recibe el resultado de normalize('NFD') y reemplaza
                        //los símbolos como (') por una cadena vacía (o sea los elimina).
                        //el resultado final sería: á -> a.
                        //el método <string>.contains(<string>) verifica si el parámetro está contenido en la cadena que llama al método
                        span.css('display',
                                span.text().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                                .contains($this.val().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) ? 'block' : 'none');
                    });
                }, 1000);
            } else
                $('#layer-dropdown-list span').css('display', 'none');

//                spans.every(function(e) {
//                    e.css('display', 'none');
//                });
        });
    } else
        alert("wrong element");

    return this;
};

/**
 * Obtener los nombres de todas las capas (y grupos) en el menú
 *
 * @returns {Array}
 */
function getHaystack() {
    var haystack = {};
    $('#layers li:not(:first-child) a').each(function(i) {
        haystack[i] = [$(this).children('span').text(), $(this).parent().attr('id'), $(this).hasClass('leaf')];
    });

    return haystack;
}

/**
 * Desplegar el nodo seleccionado por el usuario
 *
 * @param {type} text Texto mostrado al usuario como nombre de la capa
 * @returns {undefined}
 */
function unfoldNode(text) {
    var span = $('#layers span').filter(function() {
        return $(this).text() === text;
    });

    var anchor = span.parent();
    var ul = anchor.next('ul');

//    console.log(ul);
    anchor.addClass('in');
    ul.addClass('in').css('display', 'block');

    //desplegar los 'ancestros'
    var closest = anchor.parent().closest('li');
    if (closest.presence())
        unfoldNode(closest.attr('id'));
}

