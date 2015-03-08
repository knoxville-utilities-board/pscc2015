//>>built
define("esri/layers/LayerDataSource", ["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel", "../lang", "./LayerSource", "./TableDataSource", "./QueryDataSource", "./JoinDataSource", "./RasterDataSource"], function(b, k, l, m, c, d, e, f, g, h) {
    return b(d, {
        declaredClass: "esri.layers.LayerDataSource",
        type: "dataLayer",
        constructor: function(a) {
            if (a && a.dataSource) {
                switch (a.dataSource.type) {
                    case "table":
                        a = new e(a.dataSource);
                        break;
                    case "queryTable":
                        a = new f(a.dataSource);
                        break;
                    case "joinTable":
                        a = new g(a.dataSource);
                        break;
                    case "raster":
                        a = new h(a.dataSource);
                        break;
                    default:
                        a = a.dataSource
                }
                this.dataSource = a
            }
        },
        toJson: function() {
            var a = {
                type: "dataLayer",
                dataSource: this.dataSource && this.dataSource.toJson()
            };
            return c.fixJson(a)
        }
    })
});