$(document).ready(function() {
    (function(exports) {
        var bodyOverlay = $('#body-overlay');
        //        var loading = true;

        /**
         * Quita la vista de presentación al terminar de cargar las capas
         *
         * @returns {undefined}
         */
        exports.removeLoader = function() {
//            loading = false;
            bodyOverlay.remove();
            $('#loader-styles').remove();
        };
//        var elements = $('#loader-container div');
//        var transitions = [
//            {left: '50%', 'border-radius': '50%'},
//            {top: '50%', 'border-radius': 0},
//            {left: 0, 'border-radius': '50%'},
//            {top: 0, 'border-radius': 0}
//        ];
//        var animationCount = 0;
//        function move(el, index) {
//            if (loading) {
////            if (test-- > 0) {
//                $(el).animate(transitions[index], {
//                    duration: 'slow',
//                    step: function(now) {
//                        // in the step-callback (that is fired each step of the animation),
//                        // you can use the `now` paramter which contains the current
//                        // animation-position (`0` up to `angle`)
////                        console.log(now);
//                        $(el).css({
//                            transform: 'rotate(' + now + 'deg)'
//                        });
//                    },
//                    complete: function() {
//                        move(el, index !== 3 ? index + 1 : 0);
//                    }});
//            }
//        }
//
//        for (var e = 0; e < 4; e++)
//            move(elements[e], e);
//    move(1);
//    move(2);
//    move(3);

//var div1 = $('<div></div>');
//
//var div3 = $('<div class="row">');
//var div4 = $('<div></div>');
//
//var img1 = $('<div class="col-4"><img src="' + '../images/enpa.jpg' + '"/></div>');
//var img2 = $('<div class="col-4"><img src="' + '../images/citma.jpg' + '"/></div>');
//var img3 = $('<div class="col-4"><img src="' + '../images/minag.jpg' + '"/></div>');
//
//div3.append(img1).append(img2).append(img3);
//var loaderContainer = $('<div id="loader-container">');
//var elements = [$('<div id="e1">'), $('<div id="e2">'), $('<div id="e3">'), $('<div id="e4">')];
//loaderContainer.append(elements);
//loaderContainer.append('<i class="fa fa-spinner fa-spin">');
//$('body').after(bodyOverlay);
    })(typeof exports !== "undefined" && exports instanceof Object ? exports : window);
});