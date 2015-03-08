//>>built
define("esri/layers/LayerTimeOptions", ["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel", "../lang"], function(b, c, e, f, d) {
    return b(null, {
        declaredClass: "esri.layers.LayerTimeOptions",
        constructor: function(a) {
            a && c.mixin(this, a)
        },
        toJson: function() {
            return d.fixJson({
                timeDataCumulative: this.timeDataCumulative,
                timeOffset: this.timeOffset,
                timeOffsetUnits: this.timeOffsetUnits,
                useTime: this.useTime
            })
        }
    })
});