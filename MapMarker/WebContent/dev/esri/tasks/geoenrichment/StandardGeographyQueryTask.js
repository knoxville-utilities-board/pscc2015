//>>built
define("esri/tasks/geoenrichment/StandardGeographyQueryTask", ["../../declare", "dojo/_base/array", "dojo/_base/lang", "./taskHelper", "../FeatureSet", "./GeographyQueryBase", "./GeographyQuery", "./BatchGeographyQuery", "./SubGeographyQuery"], function(d, l, e, b, f, g, h, c, k) {
    return d("esri.tasks.geoenrichment.StandardGeographyQueryTask", null, {
        constructor: function(a) {
            this.url = a || location.protocol + "//geoenrich.arcgis.com/arcgis/rest/services/World/GeoenrichmentServer"
        },
        execute: function(a) {
            a instanceof g || (a = a.returnSubGeographyLayer ? new k(a) : a.geographyQueries || e.isArray(a.where) ?
                new c(a) : new h(a));
            return b.invokeMethod(this, a instanceof c ? "/StandardGeographiesBatchQuery/execute" : "/StandardGeographyQuery/execute", function() {
                return b.jsonToRest(a.toJson())
            }, function(a) {
                (!a.results || 1 > a.results.length || !a.results[0].value) && b.throwEmptyResponse();
                return {
                    featureSet: new f(a.results[0].value),
                    messages: a.messages
                }
            }, "onExecuteComplete", "onError")
        },
        onExecuteComplete: function(a) {},
        onError: function(a) {}
    })
});