//>>built
define("esri/layers/FeatureEditResult", ["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel"], function(b, c, d, e) {
    return b(null, {
        declaredClass: "esri.layers.FeatureEditResult",
        constructor: function(a) {
            a && c.isObject(a) && (this.objectId = a.objectId, this.success = a.success, a.success || (a = a.error, this.error = Error(), this.error.code = a.code, this.error.message = a.description))
        }
    })
});