//>>built
define("esri/layers/CodedValueDomain", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/has", "../kernel", "../lang", "./Domain"], function(d, b, e, h, k, f, g) {
    return d([g], {
        declaredClass: "esri.layers.CodedValueDomain",
        constructor: function(a) {
            a && b.isObject(a) && (this.codedValues = a.codedValues)
        },
        getName: function(a) {
            var c;
            e.some(this.codedValues, function(b) {
                b.code == a && (c = b.name);
                return !!c
            });
            return c
        },
        toJson: function() {
            var a = this.inherited(arguments);
            a.codedValues = b.clone(this.codedValues);
            return f.fixJson(a)
        }
    })
});