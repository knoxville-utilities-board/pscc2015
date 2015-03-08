//>>built
define("esri/layers/FeatureType", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/has", "../kernel", "../lang", "../symbols/jsonUtils", "./RangeDomain", "./CodedValueDomain", "./InheritedDomain", "./FeatureTemplate"], function(g, h, k, s, t, l, m, n, p, q, r) {
    return g(null, {
        declaredClass: "esri.layers.FeatureType",
        constructor: function(a) {
            if (a && h.isObject(a)) {
                this.id = a.id;
                this.name = a.name;
                var c = a.symbol;
                c && (this.symbol = m.fromJson(c));
                var c = a.domains,
                    b, e = this.domains = {};
                for (b in c)
                    if (c.hasOwnProperty(b)) {
                        var d = c[b];
                        switch (d.type) {
                            case "range":
                                e[b] =
                                    new n(d);
                                break;
                            case "codedValue":
                                e[b] = new p(d);
                                break;
                            case "inherited":
                                e[b] = new q(d)
                        }
                    }
                if (b = a.templates) {
                    c = this.templates = [];
                    for (a = 0; a < b.length; a++) c.push(new r(b[a]))
                }
            }
        },
        toJson: function() {
            var a = {
                    id: this.id,
                    name: this.name,
                    symbol: this.symbol && this.symbol.toJson()
                },
                c, b = this.domains,
                e = this.templates,
                d = l.fixJson;
            if (b) {
                var f = a.domains = {};
                for (c in b) b.hasOwnProperty(c) && (f[c] = b[c] && b[c].toJson());
                d(f)
            }
            e && (a.templates = k.map(e, function(a) {
                return a.toJson()
            }));
            return d(a)
        }
    })
});