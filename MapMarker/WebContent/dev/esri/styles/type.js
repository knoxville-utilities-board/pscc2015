//>>built
define("esri/styles/type", ["dojo/_base/array", "dojo/_base/lang", "dojo/has", "../kernel", "../Color", "./colors"], function(l, f, m, n, g, r) {
    function q(a, c) {
        var b;
        if (a) switch (b = {}, b.colors = l.map(r[a.colors].stops, function(b) {
            b = new g(b);
            null != a.fillOpacity && (b.a = a.fillOpacity || 1);
            return b
        }), b.noDataColor = new g(a.noDataColor), null != a.fillOpacity && (b.noDataColor.a = a.fillOpacity || 1), c) {
            case "point":
                b.outline = {
                    color: new g(a.outline.color),
                    width: a.outline.width
                };
                b.size = a.size;
                break;
            case "line":
                b.width = a.width;
                break;
            case "polygon":
                b.outline = {
                    color: new g(a.outline.color),
                    width: a.outline.width
                }
        }
        return b
    }

    function s(a) {
        "esriGeometryPoint" === a || "esriGeometryMultipoint" === a ? a = "point" : "esriGeometryPolyline" === a ? a = "line" : "esriGeometryPolygon" === a && (a = "polygon");
        return a
    }
    f = {
        color: [153, 153, 153, 1],
        width: 1
    };
    m = {
        color: [51, 51, 51, 1],
        width: 1
    };
    n = {
        color: [26, 26, 26, 1],
        width: 1
    };
    var h = {
            "default": {
                name: "default",
                label: "Default",
                description: "Default theme for visualizing features by their type.",
                basemapGroups: {
                    light: "streets gray topo terrain national-geographic oceans osm".split(" "),
                    dark: ["satellite", "hybrid", "dark-gray"]
                },
                pointSchemes: {
                    light: {
                        primary: {
                            colors: "cat-dark",
                            noDataColor: "#aaaaaa",
                            outline: f,
                            size: 8
                        },
                        secondary: [{
                            colors: "cat-light",
                            noDataColor: "#aaaaaa",
                            outline: f,
                            size: 8
                        }]
                    },
                    dark: {
                        primary: {
                            colors: "cat-light",
                            noDataColor: "#aaaaaa",
                            outline: n,
                            size: 8
                        },
                        secondary: [{
                            colors: "cat-dark",
                            noDataColor: "#aaaaaa",
                            outline: n,
                            size: 8
                        }]
                    }
                },
                lineSchemes: {
                    light: {
                        primary: {
                            colors: "cat-dark",
                            noDataColor: "#aaaaaa",
                            width: 2
                        },
                        secondary: [{
                            colors: "cat-light",
                            noDataColor: "#aaaaaa",
                            width: 2
                        }]
                    },
                    dark: {
                        primary: {
                            colors: "cat-light",
                            noDataColor: "#aaaaaa",
                            width: 2
                        },
                        secondary: [{
                            colors: "cat-dark",
                            noDataColor: "#aaaaaa",
                            width: 2
                        }]
                    }
                },
                polygonSchemes: {
                    light: {
                        primary: {
                            colors: "cat-dark",
                            noDataColor: "#aaaaaa",
                            outline: f,
                            fillOpacity: 0.8
                        },
                        secondary: [{
                            colors: "cat-light",
                            noDataColor: "#aaaaaa",
                            outline: f,
                            fillOpacity: 0.8
                        }]
                    },
                    dark: {
                        primary: {
                            colors: "cat-light",
                            noDataColor: "#aaaaaa",
                            outline: m,
                            fillOpacity: 0.8
                        },
                        secondary: [{
                            colors: "cat-dark",
                            noDataColor: "#aaaaaa",
                            outline: m,
                            fillOpacity: 0.8
                        }]
                    }
                }
            }
        },
        p = {};
    (function() {
        var a, c, b, d, e, f, g, k;
        for (a in h)
            for (d in c =
                h[a], b = c.basemapGroups, e = p[a] = {
                    basemaps: [].concat(b.light).concat(b.dark),
                    point: {},
                    line: {},
                    polygon: {}
                }, b) {
                f = b[d];
                for (g = 0; g < f.length; g++) k = f[g], c.pointSchemes && (e.point[k] = c.pointSchemes[d]), c.lineSchemes && (e.line[k] = c.lineSchemes[d]), c.polygonSchemes && (e.polygon[k] = c.polygonSchemes[d])
            }
    })();
    return {
        getAvailableThemes: function(a) {
            var c = [],
                b, d, e;
            for (b in h) d = h[b], e = p[b], a && -1 === l.indexOf(e.basemaps, a) || c.push({
                name: d.name,
                label: d.label,
                description: d.description,
                basemaps: e.basemaps.slice(0)
            });
            return c
        },
        getSchemes: function(a) {
            var c = a.theme,
                b = a.basemap,
                d = s(a.geometryType);
            a = p[c];
            var e;
            (a = (a = a && a[d]) && a[b]) && (e = {
                primaryScheme: q(a.primary, d),
                secondarySchemes: l.map(a.secondary, function(a) {
                    return q(a, d)
                })
            });
            return e
        }
    }
});