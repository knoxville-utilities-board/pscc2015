//>>built
define("esri/layers/Field", ["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel", "./RangeDomain", "./CodedValueDomain"], function(c, b, f, g, d, e) {
    return c(null, {
        declaredClass: "esri.layers.Field",
        constructor: function(a) {
            if (a && b.isObject(a) && (this.name = a.name, this.type = a.type, this.alias = a.alias, this.length = a.length, this.editable = a.editable, this.nullable = a.nullable, (a = a.domain) && b.isObject(a))) switch (a.type) {
                case "range":
                    this.domain = new d(a);
                    break;
                case "codedValue":
                    this.domain = new e(a)
            }
        }
    })
});