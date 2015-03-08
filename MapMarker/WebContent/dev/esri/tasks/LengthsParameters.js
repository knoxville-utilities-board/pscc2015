//>>built
define("esri/tasks/LengthsParameters", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/json", "dojo/has", "../kernel"], function(d, f, e, c, g, h) {
    return d(null, {
        declaredClass: "esri.tasks.LengthsParameters",
        polylines: null,
        lengthUnit: null,
        geodesic: null,
        calculationType: null,
        toJson: function() {
            var b = e.map(this.polylines, function(a) {
                    return a.toJson()
                }),
                a = {};
            a.polylines = c.toJson(b);
            b = this.polylines[0].spatialReference;
            a.sr = b.wkid ? b.wkid : c.toJson(b.toJson());
            this.lengthUnit && (a.lengthUnit = this.lengthUnit);
            this.geodesic &&
                (a.geodesic = this.geodesic);
            this.calculationType && (a.calculationType = this.calculationType);
            return a
        }
    })
});