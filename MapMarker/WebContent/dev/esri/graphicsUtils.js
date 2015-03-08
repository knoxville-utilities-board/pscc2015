//>>built
define("esri/graphicsUtils", ["dojo/_base/lang", "dojo/_base/array", "dojo/has", "./kernel", "./geometry/Extent"], function(k, f, l, m, h) {
    return {
        graphicsExtent: function(d) {
            var a = d[0].geometry,
                b = a.getExtent(),
                c, e, g = d.length;
            null === b && (b = new h(a.x, a.y, a.x, a.y, a.spatialReference));
            for (e = 1; e < g; e++) c = (a = d[e].geometry).getExtent(), null === c && (c = new h(a.x, a.y, a.x, a.y, a.spatialReference)), b = b.union(c);
            return 0 > b.getWidth() && 0 > b.getHeight() ? null : b
        },
        getGeometries: function(d) {
            return f.map(d, function(a) {
                return a.geometry
            })
        },
        _encodeGraphics: function(d,
            a) {
            var b = [],
                c, e, g;
            f.forEach(d, function(d, f) {
                c = d.toJson();
                e = {};
                c.geometry && (g = a && a[f], e.geometry = g && g.toJson() || c.geometry);
                c.attributes && (e.attributes = c.attributes);
                b[f] = e
            });
            return b
        }
    }
});