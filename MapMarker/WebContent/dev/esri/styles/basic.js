//>>built
define("esri/styles/basic", ["dojo/_base/array", "dojo/_base/lang", "dojo/has", "../kernel", "../Color"], function(n, r, s, t, k) {
    function p(a, c) {
        var b;
        if (a) switch (b = {}, b.color = new k(a.color), c) {
            case "point":
                b.outline = {
                    color: new k(a.outline.color),
                    width: a.outline.width
                };
                b.size = a.size;
                break;
            case "line":
                b.width = a.width;
                break;
            case "polygon":
                b.outline = {
                    color: new k(a.outline.color),
                    width: a.outline.width
                }
        }
        return b
    }

    function q(a) {
        "esriGeometryPoint" === a || "esriGeometryMultipoint" === a ? a = "point" : "esriGeometryPolyline" === a ? a = "line" : "esriGeometryPolygon" ===
            a && (a = "polygon");
        return a
    }
    var f = {
            "default": {
                name: "default",
                label: "Default",
                description: "Default theme for basic visualization of features.",
                basemapGroups: {
                    light: "streets gray topo terrain national-geographic oceans osm".split(" "),
                    dark: ["satellite", "hybrid", "dark-gray"]
                },
                pointSchemes: {
                    light: {
                        primary: {
                            color: [77, 77, 77, 1],
                            outline: {
                                color: [255, 255, 255, 1],
                                width: 1
                            },
                            size: 8
                        },
                        secondary: [{
                            color: [226, 119, 40, 1],
                            outline: {
                                color: [255, 255, 255, 1],
                                width: 1
                            },
                            size: 8
                        }, {
                            color: [255, 255, 255, 1],
                            outline: {
                                color: [51, 51, 51, 1],
                                width: 1
                            },
                            size: 8
                        }]
                    },
                    dark: {
                        primary: {
                            color: [255, 255, 255, 1],
                            outline: {
                                color: [26, 26, 26, 1],
                                width: 1
                            },
                            size: 8
                        },
                        secondary: [{
                            color: [226, 119, 40, 1],
                            outline: {
                                color: [255, 255, 255, 1],
                                width: 1
                            },
                            size: 8
                        }, {
                            color: [26, 26, 26, 1],
                            outline: {
                                color: [178, 178, 178, 1],
                                width: 1
                            },
                            size: 8
                        }]
                    }
                },
                lineSchemes: {
                    light: {
                        primary: {
                            color: [77, 77, 77, 1],
                            width: 2
                        },
                        secondary: [{
                            color: [226, 119, 40, 1],
                            width: 2
                        }, {
                            color: [255, 255, 255, 1],
                            width: 2
                        }]
                    },
                    dark: {
                        primary: {
                            color: [255, 255, 255, 1],
                            width: 2
                        },
                        secondary: [{
                            color: [226, 119, 40, 1],
                            width: 2
                        }, {
                            color: [26, 26, 26, 1],
                            width: 2
                        }]
                    }
                },
                polygonSchemes: {
                    light: {
                        primary: {
                            color: [227, 139, 79, 0.8],
                            outline: {
                                color: [255, 255, 255, 1],
                                width: 1
                            }
                        },
                        secondary: [{
                            color: [128, 128, 128, 0.8],
                            outline: {
                                color: [255, 255, 255, 1],
                                width: 1
                            }
                        }, {
                            color: [255, 255, 255, 0.8],
                            outline: {
                                color: [128, 128, 128, 1],
                                width: 1
                            }
                        }]
                    },
                    dark: {
                        primary: {
                            color: [227, 139, 79, 0.8],
                            outline: {
                                color: [51, 51, 51, 1],
                                width: 1
                            }
                        },
                        secondary: [{
                            color: [178, 178, 178, 0.8],
                            outline: {
                                color: [51, 51, 51, 1],
                                width: 1
                            }
                        }, {
                            color: [26, 26, 26, 0.8],
                            outline: {
                                color: [128, 128, 128, 1],
                                width: 1
                            }
                        }]
                    }
                }
            }
        },
        l = {};
    (function() {
        var a, c, b, d, e, m, g, h;
        for (a in f)
            for (d in c =
                f[a], b = c.basemapGroups, e = l[a] = {
                    basemaps: [].concat(b.light).concat(b.dark),
                    point: {},
                    line: {},
                    polygon: {}
                }, b) {
                m = b[d];
                for (g = 0; g < m.length; g++) h = m[g], c.pointSchemes && (e.point[h] = c.pointSchemes[d]), c.lineSchemes && (e.line[h] = c.lineSchemes[d]), c.polygonSchemes && (e.polygon[h] = c.polygonSchemes[d])
            }
    })();
    return {
        getAvailableThemes: function(a) {
            var c = [],
                b, d, e;
            for (b in f) d = f[b], e = l[b], a && -1 === n.indexOf(e.basemaps, a) || c.push({
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
                d = q(a.geometryType);
            a = l[c];
            var e;
            (a = (a = a && a[d]) && a[b]) && (e = {
                primaryScheme: p(a.primary, d),
                secondarySchemes: n.map(a.secondary, function(a) {
                    return p(a, d)
                })
            });
            return e
        }
    }
});