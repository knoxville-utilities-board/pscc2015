//>>built
define("esri/styles/heatmap", ["dojo/_base/array", "dojo/_base/lang", "dojo/has", "../kernel", "../Color"], function(e, p, q, r, n) {
    function g(c, b) {
        return e.map(c, function(a) {
            a = new n(a);
            null != b && (a.a = b);
            return a
        })
    }
    var m = {
            v1: "#85c1c8 #90a1be #9c8184 #a761aa #af4980 #b83055 #c0182a #c80000 #d33300 #de6600 #e99900 #f4cc00 #ffff00".split(" "),
            v2: "#f3e4e5 #e4becb #d498b2 #c57298 #b95685 #ae3972 #a21d5e #96004b #ab006f #c00093 #d500b7 #ea00db #ff00ff".split(" "),
            v3: "#d4e3f5 #b3c5f7 #93a6fa #7288fc #566ffd #3955fe #1d3bfe #0022ff #334ecc #667a99 #99a766 #ccd333 #ffff00".split(" "),
            v4: "#0022c8 #2b1ca7 #551785 #801164 #aa0b43 #d50621 #ff0000 #ff3900 #ff7100 #ffaa00 #ffc655 #ffe3aa #ffffff".split(" ")
        },
        h = {
            "default": {
                name: "default",
                label: "Default",
                description: "Default theme for visualizing features using heatmap.",
                basemapGroups: {
                    light: "streets gray topo terrain national-geographic oceans osm".split(" "),
                    dark: ["satellite", "hybrid", "dark-gray"]
                },
                schemes: {
                    light: {
                        primary: "v1",
                        secondary: ["v2", "v3", "v4"]
                    },
                    dark: {
                        primary: "v4",
                        secondary: ["v1", "v2", "v3"]
                    }
                }
            }
        },
        l = {};
    (function() {
        var c, b, a, d,
            f, e, k, g;
        for (c in h)
            for (d in b = h[c], a = b.basemapGroups, f = l[c] = {
                    basemaps: [].concat(a.light).concat(a.dark)
                }, a) {
                e = a[d];
                for (k = 0; k < e.length; k++) g = e[k], b.schemes && (f[g] = b.schemes[d])
            }
    })();
    return {
        getAvailableThemes: function(c) {
            var b = [],
                a, d, f;
            for (a in h) d = h[a], f = l[a], c && -1 === e.indexOf(f.basemaps, c) || b.push({
                name: d.name,
                label: d.label,
                description: d.description,
                basemaps: f.basemaps.slice(0)
            });
            return b
        },
        getSchemes: function(c) {
            var b = c.basemap;
            c = l[c.theme];
            var a;
            (b = c && c[b]) && (a = {
                primaryScheme: {
                    colors: g(m[b.primary],
                        0.7)
                },
                secondarySchemes: e.map(b.secondary, function(a) {
                    return {
                        colors: g(m[a], 0.7)
                    }
                })
            });
            return a
        }
    }
});