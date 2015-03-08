//>>built
define("esri/styles/choropleth", ["dojo/_base/array", "dojo/_base/lang", "dojo/has", "../kernel", "../Color", "./colors"], function(l, g, a, d, n, t) {
    function q(b, m) {
        return l.map(b, function(b) {
            b = new n(b);
            null != m && (b.a = m);
            return b
        })
    }

    function u(b, m) {
        var a = b.basemapGroups,
            c = b.basemaps,
            e, f;
        if (a)
            for (e in a)
                if (c = a[e], c = l.indexOf(c, m), -1 < c) {
                    f = e;
                    break
                }
        return (f = f || m) ? b.schemes[f] : null
    }

    function r(b, a, d) {
        var c, e, f, h;
        if (b) {
            c = {
                name: b
            };
            h = a.fillOpacity;
            null == h && -1 !== l.indexOf(s, b) && (h = 0.8);
            e = t[b];
            c.colors = q(e.stops, h);
            c.colorsForClassBreaks = [];
            for (f in e) "stops" !==
                f && (f = +f, c.colorsForClassBreaks.push({
                    numClasses: f,
                    colors: q(e[f], h)
                }));
            c.noDataColor = new n(-1 !== l.indexOf(s, b) ? v : w);
            null != h && (c.noDataColor.a = h || 1);
            switch (d) {
                case "point":
                    c.outline = {
                        color: new n(a.outline.color),
                        width: a.outline.width
                    };
                    c.size = a.size;
                    break;
                case "line":
                    c.width = a.width;
                    break;
                case "polygon":
                    c.outline = {
                        color: new n(a.outline.color),
                        width: a.outline.width
                    }
            }
        }
        return c
    }

    function x(b) {
        "esriGeometryPoint" === b || "esriGeometryMultipoint" === b ? b = "point" : "esriGeometryPolyline" === b ? b = "line" : "esriGeometryPolygon" ===
            b && (b = "polygon");
        return b
    }
    g = {
        color: [128, 128, 128, 1],
        width: 0.5
    };
    a = {
        color: [153, 153, 153, 1],
        width: 0.5
    };
    d = {
        outline: a,
        fillOpacity: 0.8,
        width: 2,
        size: 8
    };
    var k = {
            outline: g,
            fillOpacity: 0.6,
            width: 2,
            size: 8
        },
        w = "#aaaaaa",
        v = "#ffffff",
        s = "highlight-orange-gray highlight-bluegreen-gray highlight-purple-gray highlight-pink-gray highlight-blue-gray highlight-red-gray highlight-orange-gray-dark highlight-blue-gray-dark highlight-orange-gray-bright highlight-blue-gray-bright extremes-orange-gray extremes-bluegreen-gray extremes-purple-gray extremes-pink-gray extremes-blue-gray extremes-red-gray extremes-orange-gray-dark extremes-blue-gray-dark extremes-orange-gray-bright extremes-blue-gray-bright".split(" "),
        p = {
            "high-to-low": {
                name: "high-to-low",
                label: "TODO",
                description: "TODO",
                basemaps: "streets gray topo terrain national-geographic oceans osm satellite hybrid dark-gray".split(" "),
                schemes: {
                    streets: {
                        common: d,
                        primary: "seq-yellow-orange-red",
                        secondary: ["seq-yellow-red-purple", "seq-yellow-pink-purple", "seq-yellow-purple-blue", "seq-yellow-green-blue"]
                    },
                    gray: {
                        common: d,
                        primary: "seq-yellow-orange-red",
                        secondary: ["seq-orange-red-light", "seq-yellow-red-purple", "seq-yellow-pink-purple", "seq-yellow-purple-blue"]
                    },
                    topo: {
                        common: d,
                        primary: "seq-yellow-pink-purple",
                        secondary: ["seq-yellow-purple-blue", "seq-yellow-red-purple", "seq-yellow-orange-red", "seq-yellow-green-blue"]
                    },
                    terrain: {
                        common: d,
                        primary: "seq-pink-red",
                        secondary: ["seq-yellow-pink-purple", "seq-yellow-red-purple", "seq-yellow-orange-red", "seq-orange-red-light"]
                    },
                    "national-geographic": {
                        common: d,
                        primary: "seq-yellow-red-purple",
                        secondary: ["seq-yellow-orange-red", "seq-yellow-pink-purple", "seq-yellow-purple-blue", "seq-yellow-green-blue"]
                    },
                    oceans: {
                        common: d,
                        primary: "seq-yellow-red-purple",
                        secondary: ["seq-yellow-green-blue", "seq-yellow-orange-red", "seq-yellow-pink-purple", "seq-yellow-purple-blue"]
                    },
                    osm: {
                        common: d,
                        primary: "seq-red-blue-green",
                        secondary: ["seq-yellow-pink-purple", "seq-yellow-red-purple", "seq-yellow-purple-blue"]
                    },
                    satellite: {
                        common: k,
                        primary: "seq-orange-red-dark",
                        secondary: ["seq-yellow-green-blue", "seq-red-blue-green", "seq-yellow-purple-blue"]
                    },
                    hybrid: {
                        common: k,
                        primary: "seq-orange-red-dark",
                        secondary: ["seq-yellow-green-blue", "seq-red-blue-green", "seq-yellow-purple-blue"]
                    },
                    "dark-gray": {
                        common: k,
                        primary: "seq-yellow-orange-red-bright",
                        secondary: []
                    }
                }
            },
            "above-and-below": {
                name: "above-and-below",
                label: "TODO",
                description: "TODO",
                basemaps: "streets gray topo terrain national-geographic oceans osm satellite hybrid dark-gray".split(" "),
                schemes: {
                    streets: {
                        common: d,
                        primary: "div-bluegreen-yellow-orange",
                        secondary: ["div-orange-yellow-blue-light", "div-green-yellow-redpurple", "div-green-yellow-orange"]
                    },
                    gray: {
                        common: d,
                        primary: "div-orange-purple",
                        secondary: ["div-bluegreen-purple", "div-bluegreen-orange",
                            "div-orange-pink"
                        ]
                    },
                    topo: {
                        common: d,
                        primary: "div-orange-pink",
                        secondary: ["div-redpurple-blue", "div-orange-blue", "div-green-pink"]
                    },
                    terrain: {
                        common: d,
                        primary: "div-bluegreen-orange",
                        secondary: ["div-bluegreen-redpurple", "div-green-redpurple", "div-green-orange"]
                    },
                    "national-geographic": {
                        common: d,
                        primary: "div-orange-yellow-blue-light",
                        secondary: ["div-bluegreen-yellow-orange", "div-green-yellow-redpurple"]
                    },
                    oceans: {
                        common: d,
                        primary: "div-red-yellow-pink",
                        secondary: ["div-blue-green", "div-bluegreen-yellow-redpurple",
                            "div-bluegreen-yellow-orange"
                        ]
                    },
                    osm: {
                        common: d,
                        primary: "div-bluegreen-pink",
                        secondary: ["div-bluegreen-redpurple", "div-bluegreen-orange", "div-orange-pink"]
                    },
                    satellite: {
                        common: k,
                        primary: "div-orange-yellow-blue-dark",
                        secondary: ["div-red-yellow-purple", "div-orange-yellow-pink", "div-orange-yellow-blue-light"]
                    },
                    hybrid: {
                        common: k,
                        primary: "div-orange-yellow-blue-dark",
                        secondary: ["div-red-yellow-purple", "div-orange-yellow-pink", "div-orange-yellow-blue-light"]
                    },
                    "dark-gray": {
                        common: k,
                        primary: "div-orange-gray-blue",
                        secondary: ["div-yellow-gray-purple", "div-red-gray-blue", "div-green-gray-purple"]
                    }
                }
            },
            "centered-on": {
                name: "centered-on",
                label: "TODO",
                description: "TODO",
                basemaps: "streets gray topo terrain national-geographic oceans osm satellite hybrid dark-gray".split(" "),
                schemes: {
                    streets: {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "highlight-orange",
                        secondary: ["highlight-bluegreen", "highlight-orange-gray", "highlight-bluegreen-gray"]
                    },
                    gray: {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "highlight-orange",
                        secondary: ["highlight-purple",
                            "highlight-orange-gray", "highlight-purple-gray"
                        ]
                    },
                    topo: {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "highlight-orange",
                        secondary: ["highlight-pink", "highlight-orange-gray", "highlight-pink-gray"]
                    },
                    terrain: {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "highlight-orange",
                        secondary: ["highlight-bluegreen", "highlight-orange-gray", "highlight-bluegreen-gray"]
                    },
                    "national-geographic": {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "highlight-orange",
                        secondary: ["highlight-blue", "highlight-orange-gray", "highlight-blue-gray"]
                    },
                    oceans: {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "highlight-red",
                        secondary: ["highlight-pink", "highlight-red-gray", "highlight-pink-gray"]
                    },
                    osm: {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "highlight-pink",
                        secondary: ["highlight-bluegreen", "highlight-pink-gray", "highlight-bluegreen-gray"]
                    },
                    satellite: {
                        common: {
                            outline: g,
                            width: 2,
                            size: 8
                        },
                        primary: "highlight-orange-dark",
                        secondary: ["highlight-blue-dark", "highlight-orange-gray-dark", "highlight-blue-gray-dark"]
                    },
                    hybrid: {
                        common: {
                            outline: g,
                            width: 2,
                            size: 8
                        },
                        primary: "highlight-orange-dark",
                        secondary: ["highlight-blue-dark", "highlight-orange-gray-dark", "highlight-blue-gray-dark"]
                    },
                    "dark-gray": {
                        common: {
                            outline: g,
                            width: 2,
                            size: 8
                        },
                        primary: "highlight-orange-bright",
                        secondary: ["highlight-blue-bright", "highlight-orange-gray-bright", "highlight-blue-gray-bright"]
                    }
                }
            },
            extremes: {
                name: "extremes",
                label: "TODO",
                description: "TODO",
                basemaps: "streets gray topo terrain national-geographic oceans osm satellite hybrid dark-gray".split(" "),
                schemes: {
                    streets: {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "extremesdiv-bluegreen-yellow-orange",
                        secondary: "extremesdiv-orange-yellow-blue-light extremesdiv-green-yellow-redpurple extremesdiv-green-yellow-orange extremes-orange extremes-bluegreen extremes-orange-gray extremes-bluegreen-gray".split(" ")
                    },
                    gray: {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "extremesdiv-orange-purple",
                        secondary: "extremesdiv-bluegreen-purple extremesdiv-bluegreen-orange extremesdiv-orange-pink extremes-orange extremes-purple extremes-orange-gray extremes-purple-gray".split(" ")
                    },
                    topo: {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "extremesdiv-orange-pink",
                        secondary: "extremesdiv-redpurple-blue extremesdiv-orange-blue extremesdiv-green-pink extremes-orange extremes-pink extremes-orange-gray extremes-pink-gray".split(" ")
                    },
                    terrain: {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "extremesdiv-bluegreen-orange",
                        secondary: "extremesdiv-bluegreen-redpurple extremesdiv-green-redpurple extremesdiv-green-orange extremes-orange extremes-bluegreen extremes-orange-gray extremes-bluegreen-gray".split(" ")
                    },
                    "national-geographic": {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "extremesdiv-orange-yellow-blue-light",
                        secondary: "extremesdiv-bluegreen-yellow-orange extremesdiv-green-yellow-redpurple extremes-orange extremes-blue extremes-orange-gray extremes-blue-gray".split(" ")
                    },
                    oceans: {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "extremesdiv-red-yellow-pink",
                        secondary: "extremesdiv-blue-green extremesdiv-bluegreen-yellow-redpurple extremesdiv-bluegreen-yellow-orange extremes-red extremes-pink extremes-red-gray extremes-pink-gray".split(" ")
                    },
                    osm: {
                        common: {
                            outline: a,
                            width: 2,
                            size: 8
                        },
                        primary: "extremesdiv-bluegreen-pink",
                        secondary: "extremesdiv-bluegreen-redpurple extremesdiv-bluegreen-orange extremesdiv-orange-pink extremes-pink extremes-bluegreen extremes-pink-gray extremes-bluegreen-gray".split(" ")
                    },
                    satellite: {
                        common: {
                            outline: g,
                            width: 2,
                            size: 8
                        },
                        primary: "extremesdiv-orange-yellow-blue-dark",
                        secondary: "extremesdiv-red-yellow-purple extremesdiv-orange-yellow-pink extremesdiv-orange-yellow-blue-light extremes-orange-dark extremes-blue-dark extremes-orange-gray-dark extremes-blue-gray-dark".split(" ")
                    },
                    hybrid: {
                        common: {
                            outline: g,
                            width: 2,
                            size: 8
                        },
                        primary: "extremesdiv-orange-yellow-blue-dark",
                        secondary: "extremesdiv-red-yellow-purple extremesdiv-orange-yellow-pink extremesdiv-orange-yellow-blue-light extremes-orange-dark extremes-blue-dark extremes-orange-gray-dark extremes-blue-gray-dark".split(" ")
                    },
                    "dark-gray": {
                        common: {
                            outline: g,
                            width: 2,
                            size: 8
                        },
                        primary: "extremesdiv-orange-gray-blue",
                        secondary: "extremesdiv-yellow-gray-purple extremesdiv-red-gray-blue extremesdiv-green-gray-purple extremes-orange-bright extremes-blue-bright extremes-orange-gray-bright extremes-blue-gray-bright".split(" ")
                    }
                }
            },
            "group-similar": {
                name: "group-similar",
                label: "TODO",
                description: "TODO",
                basemapGroups: {
                    light: "streets gray topo terrain national-geographic oceans osm".split(" "),
                    dark: ["satellite", "hybrid", "dark-gray"]
                },
                schemes: {
                    light: {
                        common: d,
                        primary: "spectral"
                    },
                    dark: {
                        common: k,
                        primary: "spectral"
                    }
                }
            }
        };
    return {
        getAvailableThemes: function(b) {
            var a = [],
                d, c, e;
            for (d in p) {
                c = p[d];
                e = c.basemapGroups;
                var f = c.basemaps,
                    h = void 0,
                    g = [];
                if (e)
                    for (h in e) g = g.concat(e[h]);
                else f && (g = g.concat(f));
                e = g;
                b && -1 === l.indexOf(e, b) || a.push({
                    name: c.name,
                    label: c.label,
                    description: c.description,
                    basemaps: e
                })
            }
            return a
        },
        getSchemes: function(b) {
            var a = b.theme,
                d = b.basemap,
                c = x(b.geometryType),
                e, f;
            (e = u(p[a], d)) && (f = {
                primaryScheme: r(e.primary, e.common, c),
                secondarySchemes: l.map(e.secondary, function(a, b) {
                    return r(a, e.common, c)
                })
            });
            return f
        }
    }
});