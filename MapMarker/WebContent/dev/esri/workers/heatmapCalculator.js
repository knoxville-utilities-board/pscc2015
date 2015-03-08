//>>built
(function(k, s) {
    "function" === typeof define && define.amd ? define("esri/workers/heatmapCalculator", [], s) : k.HeatmapCalculator = s();
    if (k.importScripts && "function" === typeof k.importScripts) {
        var r;
        k.addEventListener("message", function(n) {
            var a = n.data,
                d = a.action;
            n = a.msgId;
            d && n && ("initialize" == d ? (r = new k.HeatmapCalculator(a), postMessage({
                msgId: n
            })) : "calculate" == d && (a = r.calculateImageData(a), postMessage({
                msgId: n,
                imageData: a
            }, a)))
        }, !1)
    }
})(this, function() {
    function k(a) {
        this.radius = a.blurRadius || 10;
        this.maxVal = a.maxPixelIntensity;
        this.minVal = a.minPixelIntensity;
        this.field = a.field;
        this.width = a.width;
        this.height = a.height;
        this.gradient = a.gradient;
        this.stats = null
    }

    function s(a, d) {
        for (var h = Array(a), b = 0; b < a; b++)
            for (var e = h[b] = Array(d), c = 0; c < d; c++) e[c] = 0;
        return h
    }

    function r(a, d) {
        return a - d
    }
    var n = window.ArrayBuffer ? !0 : !1;
    k.prototype.calculateImageData = function(a) {
        var d = this.radius = a.blurRadius || this.blurRadius;
        this.maxVal = null != a.maxPixelIntensity ? a.maxPixelIntensity : this.maxPixelIntensity;
        this.minVal = null != a.minPixelIntensity ? a.minPixelIntensity : this.minPixelIntensity;
        var h = this.field = "field" in a ? a.field : this.field,
            b = a.screenPoints,
            e = a.gradient;
        if (e) this.gradient = e;
        else if (this.gradient) e = this.gradient;
        else return !1;
        var c = a.features,
            g = a.mapinfo;
        b || (c && g ? b = this.screenPoints = this._calculateScreenPoints(c, g) : !g && this.screenPoints && (c = !0, a.width && a.width != this.width && (c = !1, this.width = a.width), a.height && a.height != this.height && (c = !1, this.height = a.height), c ? b = this.screenPoints : this.screenPoints = null));
        if (!b) return !1;
        c = g.width || a.width || this.width;
        a = g.height || a.height ||
            this.height;
        d = this._calculateIntensityMatrix(b, c, a, d, h);
        this._lastMatrix = d.matrix;
        this._maxIntVal = d.max;
        return this._createImageData(c, a, this._lastMatrix, e)
    };
    k.prototype._calculateScreenPoints = function(a, d) {
        var h = d.resolution,
            b = d.width,
            e = d.height,
            c = d.extent,
            g = [];
        if (c) h || (h = e ? Math.abs(c[3] - c[1]) / e : Math.abs(c[2] - c[0]) / b);
        else return !1;
        b = 0;
        for (e = a.length; b < e; b++) {
            var f = a[b];
            g[b] = {
                x: Math.round((f.geometry.x - c[0]) / h),
                y: Math.round((c[3] - f.geometry.y) / h),
                attributes: f.attributes
            }
        }
        return g
    };
    k.prototype._calculateIntensityMatrix =
        function(a, d, h, b, e) {
            var c = s(h, d),
                g = Math.round(4.5 * b),
                f = b * b,
                u = [],
                p = 2 * g + 1,
                l = -1,
                k = 1,
                q = -Infinity,
                m;
            for (e = function(a) {
                    return "function" == typeof a ? a : a ? function(b) {
                        return +b.attributes[a]
                    } : function() {
                        return 1
                    }
                }(e); ++l < p;) u[l] = Math.exp(-Math.pow(l - g, 2) / (2 * f)) / Math.sqrt(2 * Math.PI) * (b / 2);
            for (l = 0; l < a.length; l++) {
                m = a[l];
                b = m.x - g;
                for (var f = m.y - g, p = b, n = f, k = +e(m), r = Math.min(m.y + g, h - 1), w = Math.min(m.x + g, d - 1); f <= r;) {
                    for (var x = u[f - n]; b <= w;) - 1 < b && -1 < f && (m = c[f][b] += x * u[b - p] * k, m > q && (q = m)), b++;
                    f++;
                    b = p
                }
            }
            return {
                matrix: c,
                max: q
            }
        };
    k.prototype._createImageData = function(a, d, h, b) {
        if (!n) return this._createPixelData(a, d, h, b);
        var e = new Uint32Array(a * d);
        b = b.buffer ? new Uint32Array(b.buffer) : new Uint32Array((new Uint8Array(b)).buffer);
        for (var c = this.minVal, g = b.length / (this.maxVal - c), f = 0; f < d; f++)
            for (var k = h[f], p = 0; p < a; p++) {
                var l = Math.floor((k[p] - c) * g);
                e[f * a + p] = 0 > l ? b[0] : l < b.length ? b[l] : b[b.length - 1]
            }
        return e
    };
    k.prototype._createPixelData = function(a, d, h, b) {
        for (var e = Array(4 * a * d), c = this.minVal, g = b.length / 4 / (this.maxVal - c), f = 3, k = 0; k < d; k++)
            for (var p =
                    h[k], l = 0; l < a; l++) {
                var n = 4 * (k * a + l) + 3,
                    q = 4 * Math.floor((p[l] - c) * g) + 3;
                3 > q ? q = 3 : q > b.length - 1 && (q = b.length - 1);
                for (f = 4; f--;) e[n - f] = b[q - f]
            }
        return e
    };
    k.prototype.calculateStats = function(a, d) {
        d = d || this._lastMatrix;
        a = a || this.minVal;
        var h = d.length,
            b = 0,
            e = 0,
            c = 0,
            g = 0,
            f = Infinity,
            k = -Infinity,
            p, l, n, q, m;
        if (this._maxIntVal) var t = s(10, 0),
            v = this._maxIntVal / 10;
        for (; h--;) {
            n = d[h];
            for (p = n.length; p--;)
                if (m = n[p], 0 <= a && m > a || 0 > a) q || (q = m), t && v && t[Math.min(Math.floor(m / v), 9)].push(m), l = m - q, g += m, b += l, e += l * l, m < f && (f = m), m > k && (k = m), c++
        }
        t &&
            (this._sorted = t.reduce(function(a, b) {
                return a.concat(b.sort(r))
            }, []));
        return this.stats = h = {
            mean: g / c,
            stdDev: Math.sqrt((e - b * b / c) / c),
            min: f,
            max: k,
            mid: (k - f) / 2
        }
    };
    k.prototype.getHistogramData = function(a, d, h) {
        if (!h && !(h = this._sorted)) {
            h = this._lastMatrix;
            for (var b = h.length, e = h[0].length, c = Array(b * e), g = 0, f; b--;) {
                f = h[b];
                for (e = f.length; e--;) c[g++] = f[e]
            }
            h = c.sort(r)
        }
        b = this.stats || this.calculateStats();
        if (!h || !b) return !1;
        e = d ? b.stdDev : (b.max - b.min) / a;
        c = 0;
        g = b.min + e;
        for (d = []; c < a; c++, g += e) d[c] = g;
        d[c] = Infinity;
        g = c = e =
            0;
        f = [];
        for (var k = h.length; g < k; g++) a = h[g], a <= d[c] ? e++ : (f[c++] = {
            range: [d[c - 2] || b.min, d[c - 1]],
            count: e
        }, e = 0);
        f[c] = {
            range: [d[c - 1], d[c]],
            count: e
        };
        return f
    };
    return k
});