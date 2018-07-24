$(document).ready(function() {
    var discard = true;
    $('#raise-delete-modal').avgrund({
        showClose: true, // switch to 'true' for enabling close button
        closeByEscape: true, // enables closing popup by 'Esc'..
        closeByDocument: false, // ..and by clicking document itself
        template: $('[id$="delete_several"]'),
        afterLoad: function() {
            $('a.avgrund-close').click(function() {
                $('body').removeClass('avgrund-active');
            });
            $('.avgrund-popin').children('div:first').removeClass('hidden');
            $('.modal-close').click(function() {
                $('a.avgrund-close').click();
            });
            var trs = $('.table tbody tr.to-be-deleted');
            var amount = trs.length;
            $('#delete_several').find('#modal-body').append($('<h>Se eliminarán las filas seleccionadas - '
                    + amount + '<br>Esta acción es irreversible.</h>'));
            $('#delete_several #ajax_delete').click(function() {
                $('body').removeClass('avgrund-active');
                discard = false;
                //&quot;Precauciones\UserBundle\Controller\TestEntityController::indexAction&quot;
                if (amount > 0) {
//                oneAtATime(trs, 0);
                    allAtOnce(trs);
//                    __action = __action.replace(/&quot;/ig, '');
//                    var action_as_array = __action.split('\\');
//                    var bundle_name = action_as_array[1];
//                    var entity_class_name = action_as_array[3].split("Controller")[0];
//                    var id_list = [];
//                    var pos = 0;
//                    $(trs).each(function() {
//                        id_list[pos++] = $(this).attr('dbid');
//                    });
//
//                    var goalURL = __request_scheme + '://'
//                            + __http_host
//                            + __base + '/'
//                            + (__env === 'prod' ? '' : 'app_dev.php/')
//                            + 'delete_several_' + entity_class_name.toLowerCase() + '/';
//                    var spinner = $('<i class="fa-spinner fa-spin" style="\n\
//    font-size: 50px; color: gray; position: fixed; left: 50%; top: 50%;"></i>');
//
//                    $.ajax({type: "POST",
//                        url: goalURL,
//                        data: {
//                            id_list: id_list,
//                            bundle_name: bundle_name,
//                            entity_class_name: entity_class_name
//                        },
//                        error: function(jqXHR, textStatus, errorThrown) {
//                            $('body').removeClass('avgrund-active');
//                            spinner.remove();
//
//                            showToastr(['error', 'Error en los datos',
//                                jqXHR.responseText, {}]);
//                            shakeIt($('#toast-container'));
//                        },
//                        beforeSend: function() {
//                            $('.avgrund-popin').remove();
//                            $('.avgrund-overlay').append(spinner);
//                        },
//                        success: function(response, textStatus, jqXHR) {
////                            console.log(response);
//                            $('body').removeClass('avgrund-active');
//                            spinner.remove();
//
////                            window.open(response, '_self');
//                        }
//                    });
                }
                $('a.avgrund-close').click();
            });
        },
        onUnload: function() {
            $('#delete_several').find('#modal-body').empty();
            $(this).trigger('unload');
        }
//        , onClosing: function(e) {
//            console.log(e);
//            if (e.target)
//                $(this).trigger('discard');
//            return this;
//        }
    });

    function allAtOnce(trs) {
        var amount = trs.length;
        $(trs).each(function(i) {
            $(this).animate({
                'opacity': 0,
                'line-height': '0px',
                'font-size': 0,
                'height': 0
            }
            , 1000, 'linear', function() {
                $(this).remove();
            });
            $(trs).children('td').each(function() {
                $(this).animate({'padding': 0}, 800);
            });
        });
        if ($('#rows-shown')[0]) {
            var text = $('#rows-shown').text();
            $('#rows-shown').text('(' + (parseInt(text.substring(text.indexOf('(') + 1, text.indexOf(')'))) - amount) + ')');
        }
    }

    function oneAtATime(trs, i) {
        var ini_top = trs.eq(i).offset().top;
        var target = $('#raise-delete-modal');
        var final_top = target.offset().top;
        trs.eq(i).css('position', 'relative').animate({
            'top': final_top - ini_top - parseInt(trs.eq(i).css('height')) / 2,
            'height': 0,
            'width': 0,
            'font-size': 0
        }, 2000, 'easeOutBounce', function() {
            trs.eq(i).remove();
            if (trs.eq(i + 1)[0])
                oneAtATime(trs, i + 1);
        });
    }
});
