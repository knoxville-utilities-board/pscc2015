//>>built
define("esri/geometry/Polygon", ["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/has", "../kernel", "../lang", "../SpatialReference", "./Geometry", "./Point", "./Extent", "./mathUtils"], function(A, m, k, E, F, B, C, D, n, v, y) {
    var z = {
            type: "polygon",
            rings: null
        },
        l = A(D, {
            declaredClass: "esri.geometry.Polygon",
            constructor: function(a) {
                k.mixin(this, z);
                this.rings = [];
                this._ring = 0;
                a && (k.isArray(a) ? this.rings = k.isArray(a[0][0]) ? a : [a] : a.rings ? k.mixin(this, a) : this.spatialReference = a, this.spatialReference && (this.spatialReference = new C(this.spatialReference)));
                this.verifySR()
            },
            _extent: null,
            addRing: function(a) {
                this._extent = this._centroid = null;
                this._ring = this.rings.length;
                this.rings[this._ring] = [];
                k.isArray(a[0]) ? m.forEach(a, this._addPointArr, this) : m.forEach(a, this._addPoint, this);
                return this
            },
            _addPointArr: function(a) {
                this.rings[this._ring].push(a)
            },
            _addPoint: function(a) {
                this.rings[this._ring].push([a.x, a.y])
            },
            _insertPoints: function(a, b) {
                this._extent = this._centroid = null;
                this._ring = b;
                this.rings[this._ring] || (this.rings[this._ring] = []);
                m.forEach(a, this._addPoint,
                    this)
            },
            _validateInputs: function(a, b) {
                return null !== a && void 0 !== a && (0 > a || a >= this.rings.length) || null !== b && void 0 !== a && (0 > b || b >= this.rings[a].length) ? !1 : !0
            },
            getPoint: function(a, b) {
                if (this._validateInputs(a, b)) return new n(this.rings[a][b], this.spatialReference)
            },
            setPoint: function(a, b, c) {
                if (this._validateInputs(a, b)) return this._extent = this._centroid = null, this.rings[a][b] = [c.x, c.y], this
            },
            insertPoint: function(a, b, c) {
                if (this._validateInputs(a) && B.isDefined(b) && 0 <= b && b <= this.rings[a].length) return this._extent =
                    this._centroid = null, this.rings[a].splice(b, 0, [c.x, c.y]), this
            },
            removeRing: function(a) {
                if (this._validateInputs(a, null)) {
                    this._extent = this._centroid = null;
                    a = this.rings.splice(a, 1)[0];
                    var b, c = a.length,
                        d = this.spatialReference;
                    for (b = 0; b < c; b++) a[b] = new n(a[b], d);
                    return a
                }
            },
            removePoint: function(a, b) {
                if (this._validateInputs(a, b)) return this._extent = this._centroid = null, new n(this.rings[a].splice(b, 1)[0], this.spatialReference)
            },
            getExtent: function() {
                var a;
                if (this._extent) return a = new v(this._extent), a._partwise =
                    this._partwise, a;
                a = this.rings;
                var b = a.length;
                if (b && a[0].length) {
                    var c, d, e, g, h, f, p, q, l = g = a[0][0][0],
                        w = h = a[0][0][1],
                        k = Math.min,
                        m = Math.max,
                        n = this.spatialReference,
                        x = [],
                        r, s, t, u;
                    for (f = 0; f < b; f++) {
                        c = a[f];
                        r = s = c[0] && c[0][0];
                        t = u = c[0] && c[0][1];
                        q = c.length;
                        for (p = 0; p < q; p++) d = c[p], e = d[0], d = d[1], l = k(l, e), w = k(w, d), g = m(g, e), h = m(h, d), r = k(r, e), t = k(t, d), s = m(s, e), u = m(u, d);
                        x.push(new v({
                            xmin: r,
                            ymin: t,
                            xmax: s,
                            ymax: u,
                            spatialReference: n ? n.toJson() : null
                        }))
                    }
                    this._extent = {
                        xmin: l,
                        ymin: w,
                        xmax: g,
                        ymax: h,
                        spatialReference: n ? n.toJson() : null
                    };
                    this._partwise = 1 < x.length ? x : null;
                    a = new v(this._extent);
                    a._partwise = this._partwise;
                    return a
                }
            },
            contains: function(a) {
                var b = this.rings,
                    c, d = !1,
                    e, g, h, f, p, q, k = b.length;
                c = this.spatialReference;
                e = a.spatialReference;
                var l = a.x;
                a = a.y;
                c && (e && !c.equals(e) && c._canProject(e)) && (a = c.isWebMercator() ? n.lngLatToXY(l, a) : n.xyToLngLat(l, a, !0), l = a[0], a = a[1]);
                for (q = 0; q < k; q++) {
                    c = b[q];
                    h = c.length;
                    for (p = f = 0; p < h; p++)
                        if (f++, f === h && (f = 0), e = c[p], g = c[f], (e[1] < a && g[1] >= a || g[1] < a && e[1] >= a) && e[0] + (a - e[1]) / (g[1] - e[1]) * (g[0] - e[0]) <
                            l) d = !d
                }
                return d
            },
            getCentroid: function() {
                if (null != this._centroid) return this._centroid;
                var a, b, c, d, e = [],
                    g, h;
                m.forEach(this.rings, function(d) {
                    a = b = c = 0;
                    m.forEach(d, function(e, l) {
                        l < d.length - 1 && (g = d[l + 1], h = e[0] * g[1] - g[0] * e[1], a += (e[0] + g[0]) * h, b += (e[1] + g[1]) * h, c += h)
                    });
                    0 < c && (c *= -1);
                    e.push([a, b, c / 2])
                });
                e.sort(function(a, c) {
                    return a[2] - c[2]
                });
                d = 6 * e[0][2];
                return this._centroid = new n(e[0][0] / d, e[0][1] / d, this.spatialReference)
            },
            isClockwise: function(a) {
                var b = 0,
                    c, d = a.length,
                    e = k.isArray(a[0]) ? function(a, c) {
                        return a[0] *
                            c[1] - c[0] * a[1]
                    } : function(a, c) {
                        return a.x * c.y - c.x * a.y
                    };
                for (c = 0; c < d; c++) b += e(a[c], a[(c + 1) % d]);
                return 0 >= b / 2
            },
            isSelfIntersecting: function(a) {
                a = a || this;
                var b, c, d, e, g, h, f, l = a.rings.length,
                    k;
                for (d = 0; d < l; d++) {
                    for (b = 0; b < a.rings[d].length - 1; b++) {
                        g = [
                            [a.rings[d][b][0], a.rings[d][b][1]],
                            [a.rings[d][b + 1][0], a.rings[d][b + 1][1]]
                        ];
                        for (c = d + 1; c < l; c++)
                            for (e = 0; e < a.rings[c].length - 1; e++)
                                if (h = [
                                        [a.rings[c][e][0], a.rings[c][e][1]],
                                        [a.rings[c][e + 1][0], a.rings[c][e + 1][1]]
                                    ], (f = y._getLineIntersection2(g, h)) && !(f[0] === g[0][0] &&
                                        f[1] === g[0][1] || f[0] === h[0][0] && f[1] === h[0][1] || f[0] === g[1][0] && f[1] === g[1][1] || f[0] === h[1][0] && f[1] === h[1][1])) return !0
                    }
                    e = a.rings[d].length;
                    if (!(4 >= e))
                        for (b = 0; b < e - 3; b++) {
                            k = e - 1;
                            0 === b && (k = e - 2);
                            g = [
                                [a.rings[d][b][0], a.rings[d][b][1]],
                                [a.rings[d][b + 1][0], a.rings[d][b + 1][1]]
                            ];
                            for (c = b + 2; c < k; c++)
                                if (h = [
                                        [a.rings[d][c][0], a.rings[d][c][1]],
                                        [a.rings[d][c + 1][0], a.rings[d][c + 1][1]]
                                    ], (f = y._getLineIntersection2(g, h)) && !(f[0] === g[0][0] && f[1] === g[0][1] || f[0] === h[0][0] && f[1] === h[0][1] || f[0] === g[1][0] && f[1] === g[1][1] ||
                                        f[0] === h[1][0] && f[1] === h[1][1])) return !0
                        }
                }
                return !1
            },
            toJson: function() {
                var a = {
                        rings: k.clone(this.rings)
                    },
                    b = this.spatialReference;
                b && (a.spatialReference = b.toJson());
                return a
            }
        });
    l.defaultProps = z;
    l.createEllipse = function(a) {
        var b = a.center.x,
            c = a.center.y,
            d = a.longAxis,
            e = a.shortAxis,
            g = a.numberOfPoints,
            h = a.map,
            f, k, m;
        a = [];
        var n = 2 * Math.PI / g;
        for (k = 0; k < g; k++) f = Math.cos(k * n), m = Math.sin(k * n), f = h.toMap({
            x: d * f + b,
            y: e * m + c
        }), a.push(f);
        a.push(a[0]);
        b = new l(h.spatialReference);
        b.addRing(a);
        return b
    };
    l.createCircle = function(a) {
        return l.createEllipse({
            center: a.center,
            longAxis: a.r,
            shortAxis: a.r,
            numberOfPoints: a.numberOfPoints,
            map: a.map
        })
    };
    l.fromExtent = function(a) {
        var b = a.normalize();
        a = a.spatialReference;
        return new l({
            rings: m.map(b, function(a) {
                return [
                    [a.xmin, a.ymin],
                    [a.xmin, a.ymax],
                    [a.xmax, a.ymax],
                    [a.xmax, a.ymin],
                    [a.xmin, a.ymin]
                ]
            }),
            spatialReference: a ? a.toJson() : null
        })
    };
    return l
});