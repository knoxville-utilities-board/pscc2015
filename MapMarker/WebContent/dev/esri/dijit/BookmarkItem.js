//>>built
define("esri/dijit/BookmarkItem", ["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel"], function(c, d, e, f) {
    return c(null, {
        declaredClass: "esri.dijit.BookmarkItem",
        constructor: function(a) {
            this.name = a.name;
            this.extent = a.extent
        },
        toJson: function() {
            var a = {},
                b = this.extent.toJson();
            a.extent = {
                spatialReference: b.spatialReference,
                xmax: b.xmax,
                xmin: b.xmin,
                ymax: b.ymax,
                ymin: b.ymin
            };
            a.name = this.name;
            return a
        }
    })
});