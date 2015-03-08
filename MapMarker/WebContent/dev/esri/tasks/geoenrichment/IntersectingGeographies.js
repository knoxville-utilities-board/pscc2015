//>>built
define("esri/tasks/geoenrichment/IntersectingGeographies", ["../../declare", "./StudyAreaOptions", "./GeographyLevel"], function(c, d, b) {
    return c("esri.tasks.geoenrichment.IntersectingGeographies", [d], {
        geographyLevels: null,
        constructor: function(a) {
            this.geographyLevels = b.fromJsonArray(a ? a.intersectingGeographies || a.levels || a.geographyLevels : [{
                layerID: "Admin2"
            }])
        },
        toJson: function() {
            return {
                areaType: "StandardGeography",
                intersectingGeographies: b.toJsonArray(this.geographyLevels)
            }
        }
    })
});