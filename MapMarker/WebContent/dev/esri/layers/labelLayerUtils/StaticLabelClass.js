//>>built
define("esri/layers/labelLayerUtils/StaticLabelClass", ["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../../kernel", "../GraphicsLayer", "../../geometry/Extent", "../../geometry/Polygon"], function(B, D, E, F, C, z, A) {
    return B(C, {
        declaredClass: "esri.layers.labelLayerUtils.StaticLabel",
        constructor: function() {
            this._preparedLabels = [];
            this._placedLabels = [];
            this._extent = null;
            this._ymax = this._ymin = this._xmax = this._xmin = 0;
            this._scale = 1;
            this._LINE_STEP_CONST = 1.5;
            this._POLYGON_X_STEP_CONST = 1;
            this._POLYGON_Y_STEP_CONST = 0.75
        },
        setMap: function(b, c) {
            this._labelLayer =
                c;
            this._map = b;
            this._xmin = b.extent.xmin;
            this._xmax = b.extent.xmax;
            this._ymin = b.extent.ymin;
            this._ymax = b.extent.ymax;
            this._scale = (this._xmax - this._xmin) / b.width
        },
        _process: function(b) {
            var c, d, f, a, e, h, g, k;
            this._preparedLabels = b;
            this._placedLabels = [];
            for (b = this._preparedLabels.length - 1; 0 <= b; b--) {
                c = this._preparedLabels[b];
                a = c.labelWidth;
                e = c.labelHeight;
                g = (h = c.options) && void 0 !== h.lineLabelPlacement ? h.lineLabelPlacement : "PlaceAtCenter";
                k = h && void 0 !== h.lineLabelPosition ? h.lineLabelPosition : "Above";
                d = h && void 0 !==
                    h.labelRotation ? h.labelRotation : !0;
                f = c.angle * (Math.PI / 180);
                var n = [];
                if ("point" === c.geometry.type) this._generatePointPositions(c.geometry.x, c.geometry.y, c.text, f, a, e, c.symbolWidth, c.symbolHeight, h, n);
                else if ("multipoint" === c.geometry.type)
                    for (d = 0; d < c.geometry.points.length; d++) this._generatePointPositions(c.geometry.points[d][0], c.geometry.points[d][1], c.text, f, a, e, c.symbolWidth, c.symbolHeight, h, n);
                else if ("polyline" === c.geometry.type)
                    if ("PlaceAtStart" === g) this._generateLinePositionsPlaceAtStart(c.geometry, !0, c.text, a, e, 2 * c.symbolHeight + e, g, k, d, n);
                    else if ("PlaceAtEnd" === g) this._generateLinePositionsPlaceAtEnd(c.geometry, !0, c.text, a, e, 2 * c.symbolHeight + e, g, k, d, n);
                else {
                    h = [];
                    var m = c.geometry.getExtent(),
                        l = this._map.extent;
                    m.getWidth() < a * this._scale && m.getHeight() < a * this._scale || (0.5 * m.getWidth() < l.getWidth() && 0.5 * m.getHeight() < l.getHeight() ? (l = 0.1 * Math.min(this._map.width, this._map.height) * this._scale, this._generateLinePositionsPlaceAtCenter(c.geometry, !1, l, c.text, a, e, 2 * c.symbolHeight + e, g, k, d, h)) : (l = this._LINE_STEP_CONST *
                        Math.min(this._map.width, this._map.height) * this._scale, this._generateLinePositionsPlaceAtCenter(c.geometry, !0, l, c.text, a, e, 2 * c.symbolHeight + e, g, k, d, h)));
                    this._postSorting(m, h, n)
                } else if ("polygon" === c.geometry.type)
                    for (d = 0; d < c.geometry.rings.length; d++) {
                        g = c.geometry.rings[d];
                        for (var l = m = h = k = null, q = 0; q < g.length; q++) {
                            var s = g[q][0],
                                r = g[q][1];
                            null === k && (k = s);
                            null === m && (m = s);
                            null === h && (h = r);
                            null === l && (l = r);
                            s < k && (k = s);
                            s > m && (m = s);
                            r < h && (h = r);
                            r > l && (l = r)
                        }
                        m - k < 4 * a * this._scale && l - h < 4 * e * this._scale || A.prototype.isClockwise(g) &&
                            this._generatePolygonPositionsForManyLabels(g, c.geometry.spatialReference, c.text, f, a, e, n)
                    }
                for (d = 0; d < n.length; d++) g = n[d].x, k = n[d].y, void 0 !== n[d].angle && (f = n[d].angle), this._findPlace(c, c.text, g, k, f, a, e)
            }
            return this._placedLabels
        },
        _generatePointPositions: function(b, c, d, f, a, e, h, g, k, n) {
            d = k && k.pointPriorities ? k.pointPriorities : "AboveRight";
            a = (h + a) * this._scale;
            e = (g + e) * this._scale;
            switch (d.toLowerCase()) {
                case "aboveleft":
                    b -= a;
                    c += e;
                    break;
                case "abovecenter":
                    c += e;
                    break;
                case "aboveright":
                    b += a;
                    c += e;
                    break;
                case "centerleft":
                    b -=
                        a;
                    break;
                case "centercenter":
                    break;
                case "centerright":
                    b += a;
                    break;
                case "belowleft":
                    b -= a;
                    c -= e;
                    break;
                case "belowcenter":
                    c -= e;
                    break;
                case "belowright":
                    b += a;
                    c -= e;
                    break;
                default:
                    return
            }
            n.push({
                x: b,
                y: c
            })
        },
        _generateLinePositionsPlaceAtStart: function(b, c, d, f, a, e, h, g, k, n) {
            h = f * this._scale;
            var m = this._LINE_STEP_CONST * Math.min(this._map.width, this._map.height) * this._scale,
                l, q, s, r, u, v, p, w;
            for (l = 0; l < b.paths.length; l++) {
                var t = b.paths[l],
                    y = h,
                    x = 0;
                for (q = 0; q < t.length - 1; q++) s = t[q][0], r = t[q][1], u = t[q + 1][0], v = t[q + 1][1], p =
                    u - s, w = v - r, p = Math.sqrt(p * p + w * w), x + p > y ? (x = this._generatePositionsOnLine(b.spatialReference, c, y, m, x, s, r, u, v, d, f, a, e, g, k, n), y = m) : x += p
            }
        },
        _generateLinePositionsPlaceAtEnd: function(b, c, d, f, a, e, h, g, k, n) {
            h = f * this._scale;
            var m = this._LINE_STEP_CONST * Math.min(this._map.width, this._map.height) * this._scale,
                l, q, s, r, u, v, p, w;
            for (l = 0; l < b.paths.length; l++) {
                var t = b.paths[l],
                    y = h,
                    x = 0;
                for (q = t.length - 2; 0 <= q; q--) s = t[q + 1][0], r = t[q + 1][1], u = t[q][0], v = t[q][1], p = u - s, w = v - r, p = Math.sqrt(p * p + w * w), x + p > y ? (x = this._generatePositionsOnLine(b.spatialReference,
                    c, y, m, x, s, r, u, v, d, f, a, e, g, k, n), y = m) : x += p
            }
        },
        _generateLinePositionsPlaceAtCenter: function(b, c, d, f, a, e, h, g, k, n, m) {
            var l, q, s, r, u, v, p, w;
            for (g = 0; g < b.paths.length; g++) {
                var t = b.paths[g];
                if (!(2 > t.length)) {
                    var y = 0;
                    for (l = 0; l < t.length - 1; l++) s = t[l][0], r = t[l][1], u = t[l + 1][0], v = t[l + 1][1], p = u - s, w = v - r, y += Math.sqrt(p * p + w * w);
                    var x = 0;
                    for (l = 0; l < t.length - 1; l++) {
                        s = t[l][0];
                        r = t[l][1];
                        u = t[l + 1][0];
                        v = t[l + 1][1];
                        p = u - s;
                        w = v - r;
                        p = Math.sqrt(p * p + w * w);
                        if (x + p > y / 2) break;
                        x += p
                    }
                    l == t.length - 1 && l--;
                    s = t[l][0];
                    r = t[l][1];
                    u = t[l + 1][0];
                    v = t[l + 1][1];
                    p = u - s;
                    w = v - r;
                    x = y / 2 - x;
                    w = Math.atan2(w, p);
                    p = s + x * Math.cos(w);
                    w = r + x * Math.sin(w);
                    s = this._angleAndShifts(s, r, u, v, h, k, n);
                    m.push({
                        x: p + s.shiftX,
                        y: w + s.shiftY,
                        angle: s.angle
                    });
                    var y = p,
                        z = w,
                        x = 0;
                    for (q = l; q < t.length - 1; q++) q == l ? (s = y, r = z) : (s = t[q][0], r = t[q][1]), u = t[q + 1][0], v = t[q + 1][1], p = u - s, w = v - r, p = Math.sqrt(p * p + w * w), x = x + p > d ? this._generatePositionsOnLine(b.spatialReference, c, d, d, x, s, r, u, v, f, a, e, h, k, n, m) : x + p;
                    x = 0;
                    for (q = l; 0 <= q; q--) q == l ? (s = y, r = z) : (s = t[q + 1][0], r = t[q + 1][1]), u = t[q][0], v = t[q][1], p = u - s, w = v - r, p = Math.sqrt(p * p + w *
                        w), x = x + p > d ? this._generatePositionsOnLine(b.spatialReference, c, d, d, x, s, r, u, v, f, a, e, h, k, n, m) : x + p
                }
            }
        },
        _generatePositionsOnLine: function(b, c, d, f, a, e, h, g, k, n, m, l, q, s, r, u) {
            n = Math.atan2(k - h, g - e);
            m = e;
            l = h;
            var v = m,
                p = l;
            do
                if (a = d - a, m += a * Math.cos(n), l += a * Math.sin(n), this._belongs(m, l, e, h, g, k)) a = this._angleAndShifts(e, h, g, k, q, s, r), d = m + a.shiftX, p = l + a.shiftY, c ? this._labelLayer._isWithinScreenArea(new z(d, p, d, p, b)) && u.push({
                    x: d,
                    y: p,
                    angle: a.angle
                }) : u.push({
                    x: d,
                    y: p,
                    angle: a.angle
                }), v = m, p = l, a = 0, d = f;
                else return b = g - v, k -=
                    p, Math.sqrt(b * b + k * k);
            while (1)
        },
        _postSorting: function(b, c, d) {
            if (b && 0 < c.length) {
                var f = 0.5 * (b.xmin + b.xmax);
                b = 0.5 * (b.ymin + b.ymax);
                for (var a = c[0].x, e = c[0].y, h = Math.sqrt((a - f) * (a - f) + (e - b) * (e - b)), g = c[0].angle, k = 0; k < c.length; k++) {
                    var n = c[k].x,
                        m = c[k].y,
                        l = Math.sqrt((n - f) * (n - f) + (m - b) * (m - b));
                    l < h && (a = n, e = m, h = l, g = c[k].angle)
                }
                d.push({
                    x: a,
                    y: e,
                    angle: g
                })
            }
        },
        _belongs: function(b, c, d, f, a, e) {
            if (a == d && e == f) return !1;
            if (a > d) {
                if (b > a || b < d) return !1
            } else if (b < a || b > d) return !1;
            if (e > f) {
                if (c > e || c < f) return !1
            } else if (c < e || c > f) return !1;
            return !0
        },
        _angleAndShifts: function(b, c, d, f, a, e, h) {
            for (b = Math.atan2(f - c, d - b); b > Math.PI / 2;) b -= Math.PI;
            for (; b < -(Math.PI / 2);) b += Math.PI;
            f = Math.sin(b);
            var g = Math.cos(b);
            d = c = 0;
            "Above" == e && (c = a * f * this._scale, d = a * g * this._scale);
            "Below" == e && (c = -a * f * this._scale, d = -a * g * this._scale);
            a = [];
            a.angle = h ? -b : 0;
            a.shiftX = -c;
            a.shiftY = d;
            return a
        },
        _generatePolygonPositionsForManyLabels: function(b, c, d, f, a, e, h) {
            f = this._calcRingExtent(b);
            if (0.75 * (f.xmax - f.xmin) > this._map.width * this._scale || 0.75 * (f.ymax - f.ymin) > this._map.height *
                this._scale) {
                var g = this._findCentroidForRing(b);
                e = this._map.width * this._scale < f.xmax - f.xmin ? this._POLYGON_X_STEP_CONST * this._map.width * this._scale : this._POLYGON_X_STEP_CONST * (f.xmax - f.xmin);
                a = this._map.height * this._scale < f.ymax - f.ymin ? this._POLYGON_Y_STEP_CONST * this._map.height * this._scale : this._POLYGON_Y_STEP_CONST * (f.ymax - f.ymin);
                var k = g[0] - Math.round((g[0] - f.xmin) / e) * e,
                    n = g[1] - Math.round((g[1] - f.ymin) / a) * a,
                    m, g = !0;
                for (m = n; m < f.ymax; m += a)
                    if (g = !g, !(m < this._ymin || m > this._ymax))
                        for (n = k + (g ? 0 : e / 2); n < f.xmax; n +=
                            e) this._labelLayer._isWithinScreenArea(new z(n, m, n, m, c)) && this._isPointWithinRing(d, b, n, m) && h.push({
                            x: n,
                            y: m
                        })
            } else {
                g = this._findCentroidForRing(b);
                for (f = 0; 10 > f; f++)
                    if (a = g[0], k = g[1] + (f % 2 ? -1 : 1) * Math.floor(f / 2) * e * this._scale, this._labelLayer._isWithinScreenArea(new z(a, k, a, k, c)) && this._isPointWithinRing(d, b, a, k)) {
                        h.push({
                            x: a,
                            y: k
                        });
                        break
                    }
            }
        },
        _calcRingExtent: function(b) {
            var c, d;
            d = new z;
            for (c = 0; c < b.length - 1; c++) {
                var f = b[c][0],
                    a = b[c][1];
                if (void 0 === d.xmin || f < d.xmin) d.xmin = f;
                if (void 0 === d.ymin || a < d.ymin) d.ymin =
                    a;
                if (void 0 === d.xmax || f > d.xmax) d.xmax = f;
                if (void 0 === d.ymax || a > d.ymax) d.ymax = a
            }
            return d
        },
        _isPointWithinPolygon: function(b, c, d, f) {
            var a;
            for (a = 0; a < c.rings.length; a++)
                if (this._isPointWithinRing(b, c.rings[a], d, f)) return !0;
            return !1
        },
        _isPointWithinRing: function(b, c, d, f) {
            var a, e, h, g, k = [],
                n = c.length;
            for (b = 0; b < n - 1; b++)
                if (a = c[b][0], e = c[b][1], h = c[b + 1][0], g = c[b + 1][1], !(a == h && e == g)) {
                    if (e == g)
                        if (f == e) k.push(a);
                        else continue;
                    a == h ? (e < g && (f >= e && f < g) && k.push(a), e > g && (f <= e && f > g) && k.push(a)) : (e = (h - a) / (g - e) * (f - e) + a, a < h &&
                        (e >= a && e < h) && k.push(e), a > h && (e <= a && e > h) && k.push(e))
                }
            k.sort(function(a, b) {
                return a - b
            });
            for (b = 0; b < k.length - 1; b++)
                if (a = k[b], h = k[b + 1], d >= a && d < h)
                    if (b % 2) break;
                    else return !0;
            return !1
        },
        _findCentroidForRing: function(b) {
            for (var c = b.length, d = [0, 0], f = 0, a = b[0][0], e = b[0][1], h = 1; h < c - 1; h++) {
                var g = b[h][0],
                    k = b[h][1],
                    n = b[h + 1][0],
                    m = b[h + 1][1],
                    l = (g - a) * (m - e) - (n - a) * (k - e);
                d[0] += l * (a + g + n);
                d[1] += l * (e + k + m);
                f += l
            }
            d[0] /= 3 * f;
            d[1] /= 3 * f;
            return d
        },
        _findCentroidForFeature: function(b) {
            for (var c = 0, d = [0, 0], f = 0; f < b.rings.length; f++)
                for (var a =
                        b.rings[f], e = a.length, h = a[0][0], g = a[0][1], k = 1; k < e - 1; k++) {
                    var n = a[k][0],
                        m = a[k][1],
                        l = a[k + 1][0],
                        q = a[k + 1][1],
                        s = (n - h) * (q - g) - (l - h) * (m - g);
                    d[0] += s * (h + n + l);
                    d[1] += s * (g + m + q);
                    c += s
                }
            d[0] /= 3 * c;
            d[1] /= 3 * c;
            return d
        },
        _findPlace: function(b, c, d, f, a, e, h) {
            if (isNaN(d) || isNaN(f)) return !1;
            for (var g = 0; g < this._placedLabels.length; g++) {
                var k = this._placedLabels[g].angle,
                    n = this._placedLabels[g].width * this._scale,
                    m = this._placedLabels[g].height * this._scale,
                    l = this._placedLabels[g].x - d,
                    q = this._placedLabels[g].y - f;
                if (0 === a && 0 === k) {
                    if (this._findPlace2(-e *
                            this._scale, -h * this._scale, e * this._scale, h * this._scale, l - n, q - m, l + n, q + m)) return !1
                } else {
                    var s = new z(-e * this._scale, -h * this._scale, e * this._scale, h * this._scale, null),
                        r = 0,
                        u = 1;
                    0 !== a && (r = Math.sin(a), u = Math.cos(a));
                    var v = l * u - q * r,
                        l = l * r + q * u,
                        k = k - a,
                        r = Math.sin(k),
                        u = Math.cos(k),
                        p = -n * u - -m * r,
                        q = -n * r + -m * u,
                        k = +n * u - -m * r,
                        w = +n * r + -m * u,
                        n = v + p,
                        m = l - q,
                        r = v + k,
                        u = l - w,
                        p = v - p,
                        q = l + q,
                        v = v - k,
                        l = l + w,
                        k = new A;
                    k.addRing([
                        [n, m],
                        [r, u],
                        [p, q],
                        [v, l],
                        [n, m]
                    ]);
                    if (s.intersects(k)) return !1
                }
            }
            for (; a > Math.PI / 2;) a -= Math.PI;
            for (; a < -(Math.PI / 2);) a += Math.PI;
            g = {};
            g.layer = b;
            g.text = c;
            g.angle = a;
            g.x = d;
            g.y = f;
            g.width = e;
            g.height = h;
            this._placedLabels.push(g);
            return !0
        },
        _findPlace2: function(b, c, d, f, a, e, h, g) {
            return (b >= a && b <= h || d >= a && d <= h || b <= a && d >= h) && (c >= e && c <= g || f >= e && f <= g || c <= e && f >= g) ? !0 : !1
        }
    })
});