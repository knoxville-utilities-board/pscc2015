//>>built
define("esri/tasks/geoenrichment/GeoenrichmentTask", ["../../declare", "dojo/_base/array", "dojo/dom-construct", "./taskHelper", "../FeatureSet", "./EnrichParameters", "./ReportParameters", "../../IdentityManager", "../../geometry/Point", "../../geometry/Polygon", "../../geometry/Polyline", "dojo/i18n!../../nls/jsapi"], function(r, s, g, d, t, l, m, u, v, w, x, h) {
    function n(a) {
        this.name = "UserError";
        this.message = a || ""
    }

    function p(a, b) {
        return a.getAvailableCountries().then(function(a) {
            for (var c = 0; c < a.length; c++)
                if (a[c].id == b) return a[c].name
        })
    }

    function q(a) {
        a = a.getExtent();
        return new v((a.xmin +
            a.xmax) / 2, (a.ymin + a.ymax) / 2, a.spatialReference)
    }
    h = h.geoenrichment.task.GeoenrichmentTask;
    n.prototype = Error.prototype;
    return r("esri.tasks.geoenrichment.GeoenrichmentTask", null, {
        token: null,
        url: null,
        constructor: function(a) {
            this.url = a || location.protocol + "//geoenrich.arcgis.com/arcgis/rest/services/World/GeoenrichmentServer"
        },
        enrich: function(a) {
            return d.invokeMethod(this, "/Geoenrichment/enrich", function() {
                a instanceof l || (a = new l(a));
                return d.jsonToRest(a.toJson())
            }, function(a) {
                (!a.results || 1 > a.results.length ||
                    !a.results[0].value || !a.results[0].value.FeatureSet || 1 > a.results[0].value.FeatureSet.length) && d.throwEmptyResponse();
                var e = {
                    featureSets: [],
                    messages: a.messages
                };
                a = a.results[0].value.FeatureSet;
                for (var c = 0; c < a.length; c++) e.featureSets.push(new t(a[c]));
                return e
            }, "onEnrichComplete", "onError")
        },
        getAvailableCountries: function() {
            return d.invokeMethod(this, "/Geoenrichment/Countries", null, function(a) {
                if (a.error) throw a.error;
                a = a.countries;
                for (var b = 0; b < a.length; b++) {
                    var e = a[b].datasets;
                    delete a[b].datasets;
                    a[b].datasetIDs = e
                }
                return a
            }, "onGetAvailableCountriesComplete", "onError")
        },
        getDataCollections: function(a, b, e) {
            var c;
            b ? c = "/GetDataCollections/execute" : (c = "/Geoenrichment/DataCollections", a && (c += "/" + a));
            return d.invokeMethod(this, c, function() {
                var f = {
                    suppressNullValues: !0
                };
                e && (f.outFields = 0 === e.length ? "none" : JSON.stringify(e));
                b && (a && (f.sourcecountry = a), f.searchtext = "id:" + b);
                return f
            }, function(a) {
                if (a.error) throw a.error;
                a = a.results || a.dataCollections || a.DataCollections;
                for (var c = 0; c < a.length; c++) a[c] = {
                    id: a[c].dataCollectionID,
                    metadata: a[c].metadata,
                    variables: a[c].data
                };
                return a
            }, "onGetDataCollectionsComplete", "onError")
        },
        createReport: function(a) {
            var b = this;
            u.getCredential(this.url).then(function(e) {
                try {
                    var c = g.create("form", {
                        target: "_blank",
                        action: b.url + "/Geoenrichment/CreateReport",
                        method: "post"
                    });
                    a instanceof m || (a = new m(a));
                    var f = d.jsonToRest(a.toJson());
                    f.f = "bin";
                    f.token = e.token;
                    for (var k in f) f.hasOwnProperty(k) && g.create("input", {
                        type: "hidden",
                        name: k,
                        value: f[k]
                    }, c);
                    g.place(c, document.body);
                    c.submit();
                    g.destroy(c)
                } catch (y) {
                    b.onError(y)
                }
            }, function(a) {
                b.onError(a)
            })
        },
        getReports: function(a) {
            var b = this;
            return p(this, a).then(function(a) {
                return d.invokeMethod(b, "/Geoenrichment/Reports/" + a, null, function(a) {
                    for (var b = 0; b < a.reports.length; b++) {
                        var e = a.reports[b].reportID;
                        delete a.reports[b].reportID;
                        a.reports[b].id = e
                    }
                    return a.reports
                }, "onGetReportsComplete", "onError")
            })
        },
        getStandardGeographyLevels: function(a) {
            function b(a) {
                return d.invokeMethod(e, a, null, function(a) {
                    a = a.geographyLevels;
                    for (var b =
                            0; b < a.length; b++) {
                        var c = a[b];
                        c.id = c.countryID;
                        delete c.countryID;
                        c.name = c.countryName;
                        delete c.countryName;
                        for (var c = c.datasets, e = 0; e < c.length; e++) {
                            var d = c[e];
                            d.id = d.datasetID;
                            delete d.datasetID;
                            d.geographyLayers = d.levels;
                            delete d.levels
                        }
                    }
                    return a
                }, "onGetStandardGeographyLevelsComplete", "onError")
            }
            var e = this;
            return a ? p(this, a).then(function(a) {
                return b("/Geoenrichment/StandardGeographyLevels/" + a)
            }) : b("/Geoenrichment/StandardGeographyLevels")
        },
        getServiceLimits: function() {
            return d.invokeMethod(this,
                "/Geoenrichment/ServiceLimits", null,
                function(a) {
                    return a.serviceLimits.value
                }, "onGetServiceLimitsComplete", "onError")
        },
        getCountries: function(a) {
            var b;
            switch (a.type) {
                case "point":
                    b = a;
                    break;
                case "polyline":
                    b = a.paths[0];
                    a = new x(a.spatialReference);
                    a.addPath(b);
                    b = q(a);
                    break;
                case "polygon":
                    b = a.rings[0], a = new w(a.spatialReference), a.addRing(b), b = q(a)
            }
            return this.enrich({
                variables: ["GlobalIntersect.*"],
                studyAreas: [{
                    geometry: b
                }],
                forStorage: !1
            }).then(function(a) {
                var c = [];
                a = a.featureSets[0].features;
                for (var b =
                        0; b < a.length; b++) {
                    var d = a[b].attributes.sourceCountry;
                    0 > s.indexOf(c, d) && c.push(d)
                }
                if (0 === c.length) throw new n(h.noData);
                return c
            })
        },
        onEnrichComplete: function(a) {},
        onGetAvailableCountriesComplete: function(a) {},
        onGetDataCollectionsComplete: function(a) {},
        onCreateReportComplete: function(a) {},
        onGetReportsComplete: function(a) {},
        onGetStandardGeographyLevelsComplete: function(a) {},
        onGetServiceLimitsComplete: function(a) {},
        onError: function(a) {}
    })
});