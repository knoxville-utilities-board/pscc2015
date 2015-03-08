//>>built
define("esri/tasks/locationproviders/StandardGeographyQueryLocationProvider", ["../../declare", "dojo/_base/lang", "dojo/_base/array", "dojo/string", "../../lang", "../../geometry/jsonUtils", "./LocationProviderRemoteBase"], function(k, l, m, e, n, p, q) {
    return k("esri.tasks.locationproviders.StandardGeographyQueryLocationProvider", q, {
        standardGeographyQueryTask: null,
        queryParameters: null,
        geographyQueryTemplate: null,
        geometryType: "esriGeometryPolygon",
        constructor: function() {
            this.queryParameters || (this.queryParameters = {});
            this.queryParameters.returnCentroids && (this.geometryType = "esriGeometryPoint")
        },
        _batchWillOverflow: function(a, b) {
            return 100 < a.length + 1
        },
        _locateBatch: function(a) {
            var b = l.mixin({}, this.queryParameters, {
                geographyQueries: m.map(a, function(a, b) {
                    var d = a.expression;
                    d.OBJECTID = b;
                    return d
                })
            });
            n.isDefined(b.generalizationLevel) || (b.generalizationLevel = 6);
            b.returnGeometry = !1 === this.queryParameters.returnGeometry ? !1 : !0;
            return this.standardGeographyQueryTask.execute(b).then(function(b) {
                for (var e = [], d = 0; d < b.featureSet.features.length; d++) {
                    var f = b.featureSet.features[d];
                    if (f)
                        for (var c = 0; c < a.length; c++) {
                            var g =
                                a[c];
                            if (g.expression.OBJECTID == f.attributes.ResultID) {
                                for (c = 0; c < g.features.length; c++) {
                                    var h = g.features[c];
                                    f.geometry && (h.geometry = p.fromJson(f.geometry), e.push(h))
                                }
                                break
                            }
                        }
                }
                return e
            })
        },
        _createKey: function(a, b) {
            return e.substitute(this.geographyQueryTemplate, a.attributes)
        },
        _createQueryExpression: function(a) {
            return {
                QUERY: e.substitute(this.geographyQueryTemplate, a.attributes)
            }
        }
    })
});