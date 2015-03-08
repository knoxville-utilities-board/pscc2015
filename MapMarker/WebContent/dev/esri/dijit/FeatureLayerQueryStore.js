//>>built
define("esri/dijit/FeatureLayerQueryStore", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/has", "../tasks/query", "../dijit/FeatureLayerQueryResult", "dojo/i18n!../nls/jsapi"], function(f, h, k, p, l, m, q) {
    return f(null, {
        queryUrl: "",
        idProperty: "id",
        data: [],
        constructor: function(a, g) {
            f.safeMixin(this, a);
            this.layer = a.layer;
            this.objectIds = a.objectIds;
            this.where = a.where;
            this.orderByFields = a.orderByFields;
            this.totalCount = a.totalCount;
            this.batchCount = a.batchCount || 25;
            this.idProperty = this.layer.objectIdField
        },
        get: function(a, g) {
            return this.data[a]
        },
        getIdentity: function(a) {
            return a[this.idProperty]
        },
        query: function(a, g) {
            var e = new l,
                d = g.start || 0,
                f = this.batchCount;
            this.objectIds ? e.objectIds = this.objectIds.length >= d + this.batchCount ? this.objectIds.slice(d, d + f) : this.objectIds.slice(d) : (e.start = d, e.num = f, e.where = this.where, e.orderByFields = this.orderByFields);
            e.returnGeometry = !1;
            e.outFields = ["*"];
            var n = this.totalCount,
                d = this.layer.queryFeatures(e);
            d.total = d.then(h.hitch(this, function(c) {
                if (this.objectIds) {
                    var a = c.objectIdFieldName;
                    if (!a)
                        for (var b = 0; b <
                            c.fields.length; b++)
                            if ("esriFieldTypeOID" == c.fields[b].type) {
                                a = c.fields[b].name;
                                break
                            }
                    for (var d = {}, b = 0; b < c.features.length; b++) d[c.features[b].attributes[a]] = c.features[b];
                    c.features = k.map(e.objectIds, function(a) {
                        return d[a]
                    })
                }
                for (b = 0; b < c.features.length; b++) c.features[b] = c.features[b].attributes, this.data[c.features[b][a]] = c.features[b];
                c = c.features;
                return n
            }), function() {
                console.log("FeatureLayerQueryStore queryFeatures failed.");
                return 0
            });
            return new m(d)
        }
    })
});