//>>built
define("esri/styles/size", ["dojo/_base/array", "dojo/_base/lang", "dojo/has", "../kernel", "../Color"], function(r, l, m, f, g) {
    function s(a, e) {
        var b, c, d;
        if (a) switch (b = {}, e) {
            case "point":
                b.color = new g(a.color);
                b.noDataColor = new g(a.noDataColor);
                b.outline = {
                    color: new g(a.outline.color),
                    width: a.outline.width
                };
                b.size = a.size;
                b.minSize = a.minSize;
                b.maxSize = a.maxSize;
                break;
            case "line":
                b.color = new g(a.color);
                b.noDataColor = new g(a.noDataColor);
                b.width = a.width;
                b.minWidth = a.minWidth;
                b.maxWidth = a.maxWidth;
                break;
            case "polygon":
                c = a.marker,
                    d = a.background, b.marker = {
                        color: new g(c.color),
                        noDataColor: new g(c.noDataColor),
                        outline: {
                            color: new g(c.outline.color),
                            width: c.outline.width
                        },
                        size: c.size,
                        minSize: c.minSize,
                        maxSize: c.maxSize
                    }, b.background = {
                        color: new g(d.color),
                        outline: {
                            color: new g(d.outline.color),
                            width: d.outline.width
                        }
                    }
        }
        return b
    }

    function t(a) {
        "esriGeometryPoint" === a || "esriGeometryMultipoint" === a ? a = "point" : "esriGeometryPolyline" === a ? a = "line" : "esriGeometryPolygon" === a && (a = "polygon");
        return a
    }
    l = [255, 255, 255, 1];
    m = [128, 128, 128, 1];
    f = [255,
        255, 255, 0.8
    ];
    var h = [128, 128, 128, 0.8];
    f = {
        primary: {
            color: [227, 139, 79, 0.8],
            noDataColor: f,
            outline: {
                color: [255, 255, 255, 1],
                width: 1
            },
            size: 4,
            minSize: 8,
            maxSize: 50
        },
        secondary: [{
            color: [128, 128, 128, 0.8],
            noDataColor: f,
            outline: {
                color: [255, 255, 255, 1],
                width: 1
            },
            size: 4,
            minSize: 8,
            maxSize: 50
        }, {
            color: [255, 255, 255, 0.8],
            noDataColor: f,
            outline: {
                color: [128, 128, 128, 1],
                width: 1
            },
            size: 4,
            minSize: 8,
            maxSize: 50
        }]
    };
    var h = {
            primary: {
                color: [227, 139, 79, 0.8],
                noDataColor: h,
                outline: {
                    color: [51, 51, 51, 1],
                    width: 1
                },
                size: 4,
                minSize: 8,
                maxSize: 50
            },
            secondary: [{
                color: [178, 178, 178, 0.8],
                noDataColor: h,
                outline: {
                    color: [51, 51, 51, 1],
                    width: 1
                },
                size: 4,
                minSize: 8,
                maxSize: 50
            }, {
                color: [26, 26, 26, 0.8],
                noDataColor: h,
                outline: {
                    color: [128, 128, 128, 1],
                    width: 1
                },
                size: 4,
                minSize: 8,
                maxSize: 50
            }]
        },
        k = {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        },
        p = {
            color: k,
            outline: {
                color: {
                    r: 170,
                    g: 170,
                    b: 170,
                    a: 1
                },
                width: 2
            }
        },
        k = {
            color: k,
            outline: {
                color: {
                    r: 77,
                    g: 77,
                    b: 77,
                    a: 1
                },
                width: 2
            }
        },
        n = {
            "default": {
                name: "default",
                label: "Default",
                description: "Default theme for visualizing features by varying their size to show data.",
                basemapGroups: {
                    light: "streets gray topo terrain national-geographic oceans osm".split(" "),
                    dark: ["satellite", "hybrid", "dark-gray"]
                },
                pointSchemes: {
                    light: f,
                    dark: h
                },
                lineSchemes: {
                    light: {
                        primary: {
                            color: [226, 119, 40, 1],
                            noDataColor: l,
                            width: 1,
                            minWidth: 1,
                            maxWidth: 18
                        },
                        secondary: [{
                            color: [77, 77, 77, 1],
                            noDataColor: l,
                            width: 1,
                            minWidth: 1,
                            maxWidth: 18
                        }, {
                            color: [153, 153, 153, 1],
                            noDataColor: l,
                            width: 1,
                            minWidth: 1,
                            maxWidth: 18
                        }]
                    },
                    dark: {
                        primary: {
                            color: [226, 119, 40, 1],
                            noDataColor: m,
                            width: 1,
                            minWidth: 1,
                            maxWidth: 18
                        },
                        secondary: [{
                            color: [255, 255, 255, 1],
                            noDataColor: m,
                            width: 1,
                            minWidth: 1,
                            maxWidth: 18
                        }, {
                            color: [153, 153, 153, 1],
                            noDataColor: m,
                            width: 1,
                            minWidth: 1,
                            maxWidth: 18
                        }]
                    }
                },
                polygonSchemes: {
                    light: {
                        primary: {
                            marker: f.primary,
                            background: k
                        },
                        secondary: [{
                            marker: f.secondary[0],
                            background: k
                        }, {
                            marker: f.secondary[1],
                            background: k
                        }]
                    },
                    dark: {
                        primary: {
                            marker: h.primary,
                            background: p
                        },
                        secondary: [{
                            marker: h.secondary[0],
                            background: p
                        }, {
                            marker: h.secondary[1],
                            background: p
                        }]
                    }
                }
            }
        },
        q = {};
    (function() {
        var a, e, b, c, d, g, f, h;
        for (a in n)
            for (c in e = n[a], b = e.basemapGroups, d = q[a] = {
                    basemaps: [].concat(b.light).concat(b.dark),
                    point: {},
                    line: {},
                    polygon: {}
                }, b) {
                g = b[c];
                for (f = 0; f <
                    g.length; f++) h = g[f], e.pointSchemes && (d.point[h] = e.pointSchemes[c]), e.lineSchemes && (d.line[h] = e.lineSchemes[c]), e.polygonSchemes && (d.polygon[h] = e.polygonSchemes[c])
            }
    })();
    return {
        getAvailableThemes: function(a) {
            var e = [],
                b, c, d;
            for (b in n) c = n[b], d = q[b], a && -1 === r.indexOf(d.basemaps, a) || e.push({
                name: c.name,
                label: c.label,
                description: c.description,
                basemaps: d.basemaps.slice(0)
            });
            return e
        },
        getSchemes: function(a) {
            var e = a.theme,
                b = a.basemap,
                c = t(a.geometryType);
            a = q[e];
            var d;
            (a = (a = a && a[c]) && a[b]) && (d = {
                primaryScheme: s(a.primary,
                    c),
                secondarySchemes: r.map(a.secondary, function(a) {
                    return s(a, c)
                })
            });
            return d
        }
    }
});