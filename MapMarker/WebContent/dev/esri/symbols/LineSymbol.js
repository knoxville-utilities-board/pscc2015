//>>built
define("esri/symbols/LineSymbol", ["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "dojox/gfx/_base", "../kernel", "./Symbol"], function(d, b, f, c, g, e) {
    return d(e, {
        declaredClass: "esri.symbol.LineSymbol",
        constructor: function(a) {
            b.isObject(a) ? this.width = c.pt2px(this.width) : this.width = 12
        },
        setWidth: function(a) {
            this.width = a;
            return this
        },
        toJson: function() {
            var a = c.px2pt(this.width),
                a = isNaN(a) ? void 0 : a;
            return b.mixin(this.inherited("toJson", arguments), {
                width: a
            })
        }
    })
});