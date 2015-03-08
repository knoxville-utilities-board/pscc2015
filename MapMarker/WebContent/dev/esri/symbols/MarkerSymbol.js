//>>built
define("esri/symbols/MarkerSymbol", ["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "dojox/gfx/_base", "../kernel", "./Symbol"], function(f, e, h, b, k, g) {
    return f(g, {
        declaredClass: "esri.symbol.MarkerSymbol",
        angle: 0,
        xoffset: 0,
        yoffset: 0,
        size: 12,
        constructor: function(a) {
            a && e.isObject(a) && (this.size = "auto" === this.size ? this.size : b.pt2px(this.size), this.xoffset = b.pt2px(this.xoffset), this.yoffset = b.pt2px(this.yoffset), this.angle && (this.angle *= -1))
        },
        setAngle: function(a) {
            this.angle = a;
            return this
        },
        setSize: function(a) {
            this.size = a;
            return this
        },
        setOffset: function(a, b) {
            this.xoffset = a;
            this.yoffset = b;
            return this
        },
        toJson: function() {
            var a = b.px2pt(this.size),
                a = isNaN(a) ? void 0 : a,
                c = b.px2pt(this.xoffset),
                c = isNaN(c) ? void 0 : c,
                d = b.px2pt(this.yoffset),
                d = isNaN(d) ? void 0 : d;
            return e.mixin(this.inherited("toJson", arguments), {
                size: "auto" === this.size ? this.size : a,
                angle: this.angle && -1 * this.angle,
                xoffset: c,
                yoffset: d
            })
        }
    })
});