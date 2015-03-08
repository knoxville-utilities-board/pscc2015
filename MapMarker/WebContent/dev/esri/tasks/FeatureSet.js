//>>built
define("esri/tasks/FeatureSet", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/has", "../kernel", "../lang", "../graphic", "../SpatialReference", "../graphicsUtils", "../geometry/jsonUtils", "../symbols/jsonUtils"], function(n, q, r, x, y, s, t, u, v, h, w) {
    return n(null, {
        declaredClass: "esri.tasks.FeatureSet",
        constructor: function(a) {
            if (a) {
                q.mixin(this, a);
                var b = this.features,
                    c = a.spatialReference,
                    d = h.getGeometryType(a.geometryType),
                    c = this.spatialReference = new u(c);
                this.geometryType = a.geometryType;
                a.fields && (this.fields = a.fields);
                r.forEach(b,
                    function(a, g) {
                        var p = a.geometry && a.geometry.spatialReference;
                        b[g] = new t(d && a.geometry ? new d(a.geometry) : null, a.symbol && w.fromJson(a.symbol), a.attributes);
                        b[g].geometry && !p && b[g].geometry.setSpatialReference(c)
                    });
                this._hydrate()
            } else this.features = []
        },
        displayFieldName: null,
        geometryType: null,
        spatialReference: null,
        fieldAliases: null,
        toJson: function(a) {
            var b = {};
            this.displayFieldName && (b.displayFieldName = this.displayFieldName);
            this.fields && (b.fields = this.fields);
            this.spatialReference ? b.spatialReference =
                this.spatialReference.toJson() : this.features[0] && this.features[0].geometry && (b.spatialReference = this.features[0].geometry.spatialReference.toJson());
            this.features[0] && (this.features[0].geometry && (b.geometryType = h.getJsonType(this.features[0].geometry)), b.features = v._encodeGraphics(this.features, a));
            b.exceededTransferLimit = this.exceededTransferLimit;
            return s.fixJson(b)
        },
        _hydrate: function() {
            var a = this.transform;
            if (a) {
                var b = this.features,
                    c, d = a.translate[0],
                    h = a.translate[1],
                    g = a.scale[0],
                    p = a.scale[1],
                    n = function(a, b, c) {
                        if ("esriGeometryPoint" === a) return function(a) {
                            a.x = b(a.x);
                            a.y = c(a.y)
                        };
                        if ("esriGeometryPolyline" === a || "esriGeometryPolygon" === a) return function(a) {
                            a = a.rings || a.paths;
                            var e, g, f, h, d, k, l, m;
                            e = 0;
                            for (g = a.length; e < g; e++) {
                                d = a[e];
                                f = 0;
                                for (h = d.length; f < h; f++) k = d[f], 0 < f ? (l += k[0], m += k[1]) : (l = k[0], m = k[1]), k[0] = b(l), k[1] = c(m)
                            }
                        };
                        if ("esriGeometryEnvelope" === a) return function(a) {
                            a.xmin = b(a.xmin);
                            a.ymin = c(a.ymin);
                            a.xmax = b(a.xmax);
                            a.ymax = c(a.ymax)
                        };
                        if ("esriGeometryMultipoint" === a) return function(a) {
                            a =
                                a.points;
                            var e, d, f;
                            e = 0;
                            for (d = a.length; e < d; e++) f = a[e], f[0] = b(void 0), f[1] = c(void 0)
                        }
                    }(this.geometryType, function(a) {
                        return a * g + d
                    }, function(a) {
                        return h - a * p
                    }),
                    a = 0;
                for (c = b.length; a < c; a++) b[a].geometry && n(b[a].geometry);
                this.transform = null
            }
        }
    })
});