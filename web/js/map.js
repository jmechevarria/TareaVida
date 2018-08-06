//variables declaradas globales para poder acceder desde otros ficheros

//el espacio de trabajo de la aplicación en geoserver
var __wsName = 'dbtarea_vida';
//geoservicios.enpa.vcl.minag.cu
var capabilitiesURL = 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities';
var getFeatureURL = 'http://geoservicios.enpa.vcl.minag.cu/geoserver/wfs?service=wfs&version=1.0.0&request=GetFeature';
//WMSCapabilities del servidor
var __WMSCapabilities;
//grupos de capas obtenidos del servidor
var __Layers = {};
$(document).ready(function() {
    runAsynchronousCalls();
});
/**
 * Esta función es la que primero se ejecuta.
 * Obtiene todos los datos del servidor de manera asíncrona.
 *
 * @returns {Boolean}
 */
function runAsynchronousCalls() {
    getWMSCapabilities();
    getLayersMetadata(layers_metadata);
    //esperar a las llamadas ajax de 'getWMSCapabilities' y 'getLayers' para comenzar la construcción del mapa
    $(document).one('ajaxStop', function() {
        setupMainInterface();
    });
}

/**
 * Guardar las WMSCapabilities del servidor en la variable
 * global <b>__WMSCapabilities</b>
 *
 * @returns {undefined}
 */
function getWMSCapabilities() {
//    fetch(capabilitiesURL, {mode: 'cors'}).then(function(response) {
//        return response.text();
//    }).then(function(text) {
//        __WMSCapabilities = text;
//    });

    $.ajax({
        url: capabilitiesURL,
//        beforeSend: function(xhr) {
//            xhr.overrideMimeType("application/json; charset=UTF-8");
//        }
    }).done(function(responseText) {
        __WMSCapabilities = responseText;
    }).fail(function() {
        this.url = 'http://localhost:8080/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities';
        $.ajax(this).done(function(responseText) {
            __WMSCapabilities = responseText;
        });
    });
}
/**
 * Guardar los metadatos de las capas en la variable
 * global <b>__Layers</b>.
 * El parámetro es la URL que apunta a la función PHP que obtiene los metadatos
 * de la base de datos
 * @returns {undefined}
 */
function getLayersMetadata() {
    $.ajax({
        url: layers_metadata
    }).done(function(data) {
        data = getJSObject(data);
        $.each(data, function(group, arr) {
            __Layers[group] = arr;
        });
    }).fail(function() {
        console.log('Ocurrió un error obteniendo los metadatos de las capas', 'Url: ' + layers_metadata);
    });
}