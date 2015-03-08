//>>built
define("esri/renderers/SimpleRenderer", ["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel", "../lang", "../symbols/jsonUtils", "./Renderer"], function(c, d, h, k, e, f, g) {
    return c(g, {
        declaredClass: "esri.renderer.SimpleRenderer",
        constructor: function(a) {
            if (a && !a.declaredClass) {
                var b = a;
                this.symbol = (a = b.symbol) && (a.declaredClass ? a : f.fromJson(a));
                this.label = b.label;
                this.description = b.description
            } else this.symbol = a
        },
        getSymbol: function(a) {
            return this.symbol
        },
        toJson: function() {
            var a = d.mixin(this.inherited(arguments), {
                type: "simple",
                label: this.label,
                description: this.description,
                symbol: this.symbol && this.symbol.toJson()
            });
            return e.fixJson(a)
        }
    })
});