$(document).ready(function() {
    /*ON COLLAPSE LEFT NAVBAR*/
//    $("#info-panel").bind('oanimationend animationend webkitAnimationEnd', function() {
//        alert("fin")
//    });

    $('#sidebarCollapse').click(function() {
        $('#sidebar').toggleClass('hidden');
    });

    $('a.toggle-nav').click(function(e) {
        $('body').toggleClass("main-nav-opened main-nav-closed");
        $(this).children('i').toggleClass('fa-caret-square-o-left fa-caret-square-o-right');

        e.stopImmediatePropagation();

        if ($('body').hasClass('main-nav-closed')) {
            $('#map-wrapper, #info-panel').animate({
                left: 0,
                width: '100%'
            }, 500, function() {
//                console.log('open', $('#info-panel').css('display'));
                //IMPORTANTE; al cambiar la prop 'width' con '.animate()', #info-panel se queda con 'display: none'
                //esta es la solución por el momento
                $('#info-panel').css('display', '');
                __map.updateSize();
            });
        } else {
            $('#map-wrapper, #info-panel').animate({
                left: '16%',
                width: '84%'
            }, 500, function() {
//                console.log('close', $(this).css('display'));
//                $(this).css('display', 'block');//IMPORTANTE; al cambiar la prop 'width' con '.animate()', #info-panel se queda con 'display: none'
                //esta es la solución por el momento
                $('#info-panel').css('display', '');
                __map.updateSize();
            });
        }
    });
    /*ON COLLAPSE LEFT NAVBAR - END*/

    /*PERMITIR AL USUARIO CAMBIAR LA ALTURA DEL PANEL DE INFO*/
//    var $dragging = null;
//    var $infoPanel = $('#info-panel');
//    var $mapWrapper = $('#map-wrapper');
//    var $currentY, $infoPanelCurrentHeight, $mapWrapperCurrentHeight, $storeTransition = $infoPanel.css('transition');
//
//    $('#handle').hover(function() {
//        $(this).css('background', '#999999');
//    }, function() {
//        $(this).css('background', 'transparent');
//    });
//
//    $(document).on("mousemove", function(e) {
//        if ($dragging) {
//            $infoPanel.height($infoPanelCurrentHeight + $currentY - e.pageY);
//            $infoPanel.offset({
//                top: e.pageY
//            });
//            $mapWrapper.height($mapWrapperCurrentHeight - $currentY + e.pageY);
//        }
//    });
//
//    $(document.body).on("mousedown", "#handle", function(e) {
//        $infoPanel.css('transition', 'none');
//        $currentY = e.pageY;
//        $infoPanelCurrentHeight = $infoPanel.height();
//        $mapWrapperCurrentHeight = $mapWrapper.height();
//        $dragging = $(e.target);
//    });
//
//    $(document.body).on("mouseup", function(e) {
//        if ($dragging) {
//            $infoPanel.css('transition', $storeTransition);
//        }
//        $dragging = null;
//        __map.updateSize();
//
//    });
    /*PERMITIR AL USUARIO CAMBIAR LA ALTURA DEL PANEL DE INFO - END*/

    $('#testbutton').click(function() {
        $('#map-section').prepend('<div class="accordion" id="accordionExample"><div class="card"><div class="card-header" id="headingOne"><h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Acciones de mejoramiento del suelo</button></h5></div><div style="" id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample"><div class="card-body"><ul class="list-unstyled"><li>Sembrar</li><li>Aplicar MO a razón de 5 Tn/ha</li><li>Incorporar restos de cosechas y abonos verdes</li><li>Limpieza de canales</li><li>Limpieza de canales o hacer zanjas de drenaje</li><li>Descompactación</li><li>Sembrar especies protectoras</li><li>Mantener con cobertura viva</li></ul></div></div></div></div>');
    });
});

function getJSArray(value) {
    return $.parseJSON(value.replace(/&quot;/ig, '"'));
}

/**
 * If <b>this</b> is an empty object, the method returns false, else it returns <b>this</b>
 * @returns {$.fn|Boolean}
 */
$.fn.presence = function() {
    return this.length !== 0 && this;
};

$.fn.elementAt = function(i) {
    var object = this[0];
    return $(Object.values(object)[i]);
};