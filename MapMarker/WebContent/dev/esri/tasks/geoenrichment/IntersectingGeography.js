//>>built
define("esri/tasks/geoenrichment/IntersectingGeography", ["../../declare"], function(b) {
    return b("esri.tasks.geoenrichment.IntersectingGeography", null, {
        name: null,
        geometryType: "esriGeometryPoint",
        spatialRel: "esriSpatialRelIntersects",
        outFields: null,
        constructor: function(a) {
            a && (this.name = a.name || null, this.outFields = a.outFields || null, a.intersectionInfo ? (a.intersectionInfo.geometryType && (this.geometryType = a.intersectionInfo.geometryType), a.intersectionInfo.spatialRel && (this.spatialRel = a.intersectionInfo.spatialRel)) : (a.geometryType && (this.geometryType =
                a.geometryType), a.spatialRel && (this.spatialRel = a.spatialRel)))
        },
        toJson: function() {
            return {
                name: this.name,
                outFields: this.outFields,
                intersectionInfo: {
                    geometryType: this.geometryType,
                    spatialRel: this.spatialRel
                }
            }
        }
    })
});