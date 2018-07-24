$(document).ready(function() {
    //CANCELAR EL CLICK DE LAS OPCIONES DEL MENÚ HORIZONTAL
//    $('#header-nav #navbar-target-collapse > ul > li > a').click(function(e) {
//        if (e.originalEvent) {
//            e.stopImmediatePropagation();
//        }
//    });

    //COMO RESULTADO DE LO ANTERIOR, MOSTRAR LAS OPCIONES DEL MENÚ HORIZONTAL SIN DAR CLICK
//    $('#header-nav #navbar-target-collapse > ul > li').hover(function() {
//        $(this).children('a').click();
//    });

    $('#header-nav a.dropdown-item').click(function(e) {
//        e.stopPropagation();
    });

//    $('#navbar-toggler').click(function() {
//        $('#header-nav').css('height', 'auto');
//        $('#header-nav').css('min-height', '0px');
//    });
});
