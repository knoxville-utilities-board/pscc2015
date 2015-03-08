//>>built
define("esri/tasks/locationproviders/CoordinatesLocationProvider", ["../../declare", "../../geometry/Point", "./LocationProviderClientBase"], function(c, d, e) {
    return c("esri.tasks.locationproviders.CoordinatesLocationProvider", e, {
        xField: null,
        yField: null,
        geometryType: "esriGeometryPoint",
        getGeometry: function(a) {
            var b = parseFloat(a.attributes[this.xField]);
            a = parseFloat(a.attributes[this.yField]);
            if (!isNaN(b) && !isNaN(a)) return new d(b, a, this.inSpatialReference)
        }
    })
});