//>>built
define("esri/layers/StreamTrackManager", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/has", "../kernel", "../graphic", "../geometry/Polyline", "./TrackManager"], function(p, t, l, u, v, q, r, s) {
    return p([s], {
        declaredClass: "esri.layers._StreamTrackManager",
        constructor: function(b) {
            this.inherited(arguments)
        },
        initialize: function(b) {
            this.inherited(arguments)
        },
        addFeatures: function(b, g) {
            function f(c, a) {
                var b, d, k, f;
                h[c] || (h[c] = []);
                b = h[c];
                0 < e && (a.length > e && a.splice(0, a.length - e), k = a.length + b.length, k > e && (d = b.splice(0, k - e)));
                k = a.length;
                for (f = 0; f < k; f += 1) b.push(a[f]);
                return {
                    deletes: d,
                    adds: a
                }
            }
            var h, a, n, e, d = {},
                c = {},
                k;
            if (g) return this.inherited(arguments), d;
            h = this.trackMap;
            a = this.layer;
            n = a._trackIdField;
            e = a.maximumTrackPoints || 0;
            l.forEach(b, function(a) {
                var e = a.attributes[n];
                a.visible && (c[e] || (c[e] = []), c[e].push(a))
            });
            for (k in c) c.hasOwnProperty(k) && (a = f(k, c[k]), d[k] = a);
            return d
        },
        removeFeatures: function(b) {
            var g = [],
                f = this.layer.objectIdField,
                h = this.layer._trackIdField;
            b && (l.forEach(b, function(a) {
                var b, e, d, c;
                e = a.attributes[h];
                b = a.attributes[f];
                if (d = this.trackMap[e])
                    for (a = 0; a < d.length; a += 1)
                        if (c = d[a], c.attributes[f] === b) {
                            this.trackMap[e].splice(a, 1); - 1 === l.indexOf(e) && g.push(e);
                            break
                        }
            }, this), 0 < b.length && this.refreshTracks(g))
        },
        drawTracks: function(b) {
            function g(c) {
                var b = a[c],
                    d = b && 1 < b.length,
                    g, l, m;
                if ((m = f.trackLineMap[c]) && !d) h.remove(m), delete f.trackLineMap[c], m = null;
                if (!d) return !1;
                d = [];
                for (g = b.length - 1; 0 <= g; g -= 1)(l = b[g].geometry) && d.push([l.x, l.y]);
                b = {};
                b[e] = c;
                1 < d.length && (m ? (c = m.geometry, c.removePath(0), c.addPath(d), m.setGeometry(c)) : (m =
                    new q(new r({
                        paths: [d],
                        spatialReference: n
                    }), null, b), h.add(m), f.trackLineMap[c] = m))
            }
            var f = this,
                h = this.container,
                a, n, e, d;
            if (h)
                if (a = this.trackMap, n = this.map.spatialReference, e = this.layer._trackIdField, b) l.forEach(b, function(a) {
                    g(a)
                });
                else
                    for (d in a) a.hasOwnProperty(d) && g(d)
        },
        refreshTracks: function(b) {
            function g(a) {
                var b, c;
                a = f[a] || [];
                b = a.length;
                for (c = 0; c < b; c++) h._repaint(a[c], null, !0)
            }
            var f = this.trackMap,
                h = this.layer,
                a = h._getRenderer(),
                n;
            this.drawTracks(b);
            if (a && a.latestObservationRenderer)
                if (b) l.forEach(b,
                    function(a) {
                        g(a)
                    });
                else
                    for (n in f) f.hasOwnProperty(n) && g(n)
        },
        destroy: function() {
            this.inherited(arguments);
            this.trackLineMap = null
        }
    })
});