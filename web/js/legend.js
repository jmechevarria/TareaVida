//$(document).ready(function() {
//function setupLegend()

function setupLegend() {
    var layerSueloAfectado = __map.getLayerByName('suelo_afectado');

    $('#legend div.suelo_afectado div.card-header').click(function() {
        var icon = $(this).children('i');
        if (icon.hasClass('fa-chevron-down')) {
            $('#legend div.suelo_afectado ul').hide(500);
        } else {
            $('#legend div.suelo_afectado ul').show(500);
        }
        icon.toggleClass('fa-chevron-down fa-chevron-up');
    });

    $('#legend div.suelo_afectado ul li').hover(function() {
        var category = $(this).attr('id');
        $.each(layerSueloAfectado.getSource().getFeatures(), function(i, feature) {
            var cat = feature.get('cat_gral10_cult');
            if (categoryToRoman(cat) === category) {
                feature.set('hoverStyle', true);
            }
        });
    }, function() {
        $.each(layerSueloAfectado.getSource().getFeatures(), function(i, feature) {
            feature.set('hoverStyle', false);
        });
    });
}

//});