//>>built
define("esri/renderers/HeatmapRenderer", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/dom-construct", "../sniff", "../kernel", "../lang", "../symbols/PictureMarkerSymbol", "../Color", "./Renderer"], function(m, h, k, n, s, t, p, q, l, r) {
    return m([r], {
        declaredClass: "esri.renderer.HeatmapRenderer",
        colors: null,
        blurRadius: 10,
        maxPixelIntensity: 100,
        minPixelIntensity: 0,
        field: null,
        colorStops: null,
        constructor: function(a) {
            (this._supportsCanvas = window.CanvasRenderingContext2D ? !0 : !1) ? ("string" == typeof a && (a = JSON.parse(a)), h.mixin(this, a), this._canvas =
                null, !this.colors && !this.colorStops && (this.colorStops = [{
                    ratio: 0,
                    color: "rgba(255, 140, 0, 0)"
                }, {
                    ratio: 0.75,
                    color: "rgba(255, 140, 0, 1)"
                }, {
                    ratio: 0.9,
                    color: "rgba(255, 0,   0, 1)"
                }]), this.gradient = this._generateGradient(this.colorStops || this.colors)) : console.log("The HeatmapRenderer requires a Canvas enabled Browser.  IE8 and less does not support Canvas.")
        },
        getSymbol: function(a) {
            if (!this._supportsCanvas) return !1;
            var b = a.attributes.imageData;
            a = a.attributes.size;
            if (!a) return null;
            var c = this._getContext(a[0],
                    a[1]),
                d = c.getImageData(0, 0, a[0], a[1]);
            window.ArrayBuffer && b instanceof ArrayBuffer ? b = window.Uint8ClampedArray ? new Uint8ClampedArray(b) : new Uint8Array(b) : b.BYTES_PER_ELEMENT && 1 !== b.BYTES_PER_ELEMENT && (b = window.Uint8ClampedArray ? new Uint8ClampedArray(b.buffer) : new Uint8Array(b.buffer));
            if (window.CanvasPixelArray && d.data instanceof window.CanvasPixelArray)
                for (var f = d.data, e = f.length; e--;) f[e] = b[e];
            else d.data.set(b);
            c.putImageData(d, 0, 0);
            return new q(c.canvas.toDataURL(), a[0], a[1])
        },
        setColors: function(a) {
            if (a &&
                (a instanceof Array || a.colors)) this.gradient = this._generateGradient(a.colors || a), this.colors = a;
            return this
        },
        setColorStops: function(a) {
            if (a && (a instanceof Array || a.colorStops)) this.gradient = this._generateGradient(a.colorStops || a), this.colorStops = a;
            return this
        },
        setMaxPixelIntensity: function(a) {
            this.maxPixelIntensity = a;
            return this
        },
        setMinPixelIntensity: function(a) {
            this.minPixelIntensity = a;
            return this
        },
        setField: function(a) {
            this.field = a;
            return this
        },
        setBlurRadius: function(a) {
            this.blurRadius = a;
            return this
        },
        getStats: function() {},
        getHistogramData: function() {},
        toJson: function() {
            var a = h.mixin(this.inherited(arguments), {
                type: "heatmap",
                blurRadius: this.blurRadius,
                colorStops: this._colorsToStops(this.colorStops || this.colors),
                maxPixelIntensity: this.maxPixelIntensity,
                minPixelIntensity: this.minPixelIntensity,
                field: this.field
            });
            k.forEach(a.colorStops, function(a) {
                a.color = l.toJsonColor(a.color)
            });
            return p.fixJson(a)
        },
        _getContext: function(a, b) {
            this._canvas ? (this._canvas.width = a, this._canvas.height = b) : this._canvas =
                this._initCanvas(a, b);
            return this._canvas.getContext("2d")
        },
        _initCanvas: function(a, b) {
            var c = n.create("canvas", {
                id: "hm_canvas-" + Math.floor(1E3 * Math.random()),
                style: "position: absolute; left: -10000px; top: 0px;"
            }, null);
            c.width = a;
            c.height = b;
            document.body.appendChild(c);
            return c
        },
        _generateGradient: function(a, b) {
            b || (b = 512);
            for (var c = this._colorsToStops(a), d = this._getContext(1, b || 512), f = d.createLinearGradient(0, 0, 0, b), e = 0, g; e < c.length; e++) g = c[e], f.addColorStop(g.ratio, g.color.toCss(!0));
            d.fillStyle = f;
            d.fillRect(0, 0, 1, b);
            return d.getImageData(0, 0, 1, b).data
        },
        _colorsToStops: function(a) {
            function b(a) {
                !a.toRgba && !a.declaredClass && (a = new l(a));
                return a
            }
            var c = [];
            if (!a[0]) return c;
            if (null != a[0].ratio) c = k.map(a, function(a) {
                a.color = b(a.color);
                return a
            });
            else if (null != a[0].value) {
                var d = Infinity,
                    c = -Infinity,
                    f = 0,
                    e;
                for (e = 0; e < a.length; e++) {
                    var g = a[e].value;
                    g < d && (d = g);
                    g > c && (c = g)
                }
                f = c - d;
                this.maxPixelIntensity = c;
                this.minPixelIntensity = d;
                c = k.map(a, function(a) {
                    var c = a.value;
                    a = b(a.color);
                    return {
                        value: c,
                        ratio: (c - d) /
                            f,
                        color: a
                    }
                })
            } else var h = a.length - 1,
                c = k.map(a, function(a, c) {
                    return {
                        color: b(a),
                        ratio: c / h
                    }
                });
            return c
        }
    })
});