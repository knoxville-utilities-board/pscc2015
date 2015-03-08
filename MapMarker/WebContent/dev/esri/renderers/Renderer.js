//>>built
define("esri/renderers/Renderer", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/has", "dojox/gfx/_base", "../kernel", "../Color"], function(u, l, e, v, q, w, n) {
    return u(null, {
        declaredClass: "esri.renderer.Renderer",
        constructor: function(a) {
            this._ipDataCache = {};
            if (a && !a.declaredClass) {
                this.rotationInfo = a.rotationInfo;
                if (!this.rotationInfo) {
                    var b = a.rotationType,
                        c = a.rotationExpression;
                    if (b || c) this.rotationInfo = {
                        type: b,
                        expression: c
                    }
                }
                this.setRotationInfo(this.rotationInfo);
                this.setSizeInfo(this._readSizeInfo(a.sizeInfo));
                this.setColorInfo(this._readColorInfo(a.colorInfo));
                this.setOpacityInfo(this._readOpacityInfo(a.transparencyInfo));
                this.setVisualVariables(this._readVariables(a.visualVariables))
            }
            this.getSymbol = l.hitch(this, this.getSymbol)
        },
        getSymbol: function(a) {},
        _readSizeInfo: function(a) {
            a && (a.minSize && (a.minSize = q.pt2px(a.minSize)), a.maxSize && (a.maxSize = q.pt2px(a.maxSize)));
            return a
        },
        _readColorInfo: function(a) {
            a && (e.forEach(a.colors, function(b, c) {
                l.isArray(b) && (a.colors[c] = n.toDojoColor(b))
            }), e.forEach(a.stops, function(b, c) {
                b.color && l.isArray(b.color) && (a.stops[c].color =
                    n.toDojoColor(b.color))
            }));
            return a
        },
        _readOpacityInfo: function(a) {
            var b;
            a && (b = l.mixin({}, a), b.transparencyValues && (b.opacityValues = e.map(b.transparencyValues, function(a) {
                return 1 - a / 100
            }), delete b.transparencyValues), b.stops && (b.stops = e.map(b.stops, function(a) {
                a = l.mixin({}, a);
                a.opacity = 1 - a.transparency / 100;
                delete a.transparency;
                return a
            })));
            return b
        },
        _readVariables: function(a) {
            a && (a = e.map(a, function(a) {
                "sizeInfo" === a.type ? a = this._readSizeInfo(a) : "colorInfo" === a.type ? a = this._readColorInfo(a) : "transparencyInfo" ===
                    a.type && (a = this._readOpacityInfo(a), a.type = "opacityInfo");
                return a
            }, this));
            return a
        },
        setRotationInfo: function(a) {
            if ((a = this.rotationInfo = "string" === typeof a ? {
                    field: a
                } : a) && a.expression && !a.field) {
                var b = a.expression.match(this.rotationRE);
                b && b[1] && (a.field = b[1])
            }
            return this
        },
        rotationRE: /^\[([^\]]+)\]$/i,
        getRotationAngle: function(a) {
            var b = this.rotationInfo,
                c = "arithmetic" === b.type,
                b = b.field,
                d = a.attributes,
                f = 0;
            b && (l.isFunction(b) ? f = b.apply(this, arguments) : d && (f = d[b] || 0), f = (f + (c ? -90 : 0)) * (c ? -1 : 1));
            return f
        },
        setVisualVariables: function(a) {
            var b = this._ipDataCache;
            e.forEach(this.visualVariables, function(a, d) {
                b.hasOwnProperty(d) && (b[d] = null)
            }, this);
            this.visualVariables = a;
            e.forEach(a, function(a, d) {
                "colorInfo" === a.type ? b[d] = this._processColorInfo(a) : "opacityInfo" === a.type && (b[d] = this._processOpacityInfo(a))
            }, this);
            return this
        },
        getVisualVariableValues: function(a) {
            var b = this.visualVariables,
                c;
            b && (c = e.map(b, function(b) {
                var c;
                switch (b.type) {
                    case "sizeInfo":
                        c = this.getSize(a, {
                            sizeInfo: b
                        });
                        break;
                    case "colorInfo":
                        c =
                            this.getColor(a, {
                                colorInfo: b
                            });
                        break;
                    case "opacityInfo":
                        c = this.getOpacity(a, {
                            opacityInfo: b
                        })
                }
                return {
                    variable: b,
                    value: c
                }
            }, this));
            return c
        },
        setSizeInfo: function(a) {
            this.sizeInfo = this.proportionalSymbolInfo = a;
            return this
        },
        setProportionalSymbolInfo: function(a) {
            this.setSizeInfo(a);
            return this
        },
        getSize: function(a, b) {
            var c = a.attributes,
                d = b && b.sizeInfo || this.sizeInfo,
                f = d && d.field,
                g = 0,
                e = "number" === typeof a,
                h = e ? a : null;
            if (f) {
                var k = d.minSize,
                    m = d.maxSize,
                    p = d.minDataValue,
                    n = d.maxDataValue,
                    q = d.valueUnit || "unknown",
                    s = d.valueRepresentation,
                    t = d.normalizationField,
                    r = c ? parseFloat(c[t]) : void 0,
                    d = b && b.shape;
                "number" !== typeof h && (l.isFunction(f) ? h = f.apply(this, arguments) : c && (h = c[f]));
                if (null == h || t && !e && (isNaN(r) || 0 === r)) return null;
                !isNaN(r) && !e && (h /= r);
                if (null != k && null != m && null != p && null != n) g = h <= p ? k : h >= n ? m : k + (h - p) / (n - p) * (m - k);
                else if ("unknown" === q) null != k && null != p && (k && p ? (h /= p, g = "circle" === d ? 2 * Math.sqrt(h * Math.pow(k / 2, 2)) : "square" === d || "diamond" === d || "image" === d ? Math.sqrt(h * Math.pow(k, 2)) : h * k) : g = h + (k || p), g = g < k ? k : g,
                    null != m && g > m && (g = m));
                else {
                    c = (b && b.resolution ? b.resolution : 1) * this._meterIn[q];
                    if ("area" === s) g = Math.sqrt(h / Math.PI) / c, g *= 2;
                    else if (g = h / c, "radius" === s || "distance" === s) g *= 2;
                    null != k && g < k && (g = k);
                    null != m && g > m && (g = m)
                }
            } else d && (g = d.minSize);
            return g = isNaN(g) ? 0 : g
        },
        setColorInfo: function(a) {
            this.colorInfo = a;
            this._ipDataCache.colorInfo = this._processColorInfo(a);
            return this
        },
        _processColorInfo: function(a) {
            a && (e.forEach(a.colors, function(b, c) {
                l.isArray(b) && (a.colors[c] = new n(b))
            }), e.forEach(a.stops, function(b, c) {
                b.color &&
                    l.isArray(b.color) && (a.stops[c].color = new n(b.color))
            }));
            return this._interpolateData(a)
        },
        getColor: function(a, b) {
            var c, d = b && b.colorInfo;
            d && "colorInfo" === d.type ? (c = e.indexOf(this.visualVariables, d), d = this.visualVariables[c]) : (c = "colorInfo", d = this.colorInfo);
            return this._getColorComponent(a, d, this._ipDataCache[c])
        },
        setOpacityInfo: function(a) {
            this.opacityInfo = a;
            this._ipDataCache.opacityInfo = this._processOpacityInfo(a);
            return this
        },
        _processOpacityInfo: function(a) {
            return this._interpolateData(a)
        },
        getOpacity: function(a,
            b) {
            var c, d = b && b.opacityInfo;
            d && "opacityInfo" === d.type ? (c = e.indexOf(this.visualVariables, d), d = this.visualVariables[c]) : (c = "opacityInfo", d = this.opacityInfo);
            return this._getColorComponent(a, d, this._ipDataCache[c], !0)
        },
        _getColorComponent: function(a, b, c, d) {
            var f = a.attributes,
                g = b && b.field,
                e = "number" === typeof a ? a : null,
                h;
            if (g) {
                var k = b.normalizationField,
                    m = f ? parseFloat(f[k]) : void 0;
                "number" !== typeof e && (l.isFunction(g) ? e = g.apply(this, arguments) : f && (e = f[g]));
                null != e && (k && (!isNaN(m) && 0 !== m) && (e /= m), h = d ? this._getOpacity(e,
                    b, c) : this._getColor(e, b, c))
            } else b && (f = b.stops, d ? (h = f && f[0] && f[0].opacity, null == h && (h = b.opacityValues && b.opacityValues[0])) : h = f && f[0] && f[0].color || b.colors && b.colors[0]);
            return h
        },
        _interpolateData: function(a) {
            var b;
            if (a && a.field)
                if (a.colors || a.opacityValues) {
                    var c = (a.colors || a.opacityValues).length,
                        d = a.minDataValue,
                        f = (a.maxDataValue - d) / (c - 1);
                    b = [];
                    for (a = 0; a < c; a++) b[a] = d + a * f
                } else a.stops && (b = e.map(a.stops, function(a) {
                    return a.value
                }));
            return b
        },
        _getOpacity: function(a, b, c) {
            a = this._lookupData(a, c);
            var d;
            b = b || this.opacityInfo;
            a && (c = a[0], d = a[1], c === d ? d = this._getOpacValue(b, c) : (c = this._getOpacValue(b, c), b = this._getOpacValue(b, d), d = c + (b - c) * a[2]));
            return d
        },
        _getOpacValue: function(a, b) {
            return a.opacityValues ? a.opacityValues[b] : a.stops[b].opacity
        },
        _getColor: function(a, b, c) {
            a = this._lookupData(a, c);
            var d;
            b = b || this.colorInfo;
            a && (d = a[0], c = a[1], d = d === c ? this._getColorObj(b, d) : n.blendColors(this._getColorObj(b, d), this._getColorObj(b, c), a[2]));
            return d
        },
        _getColorObj: function(a, b) {
            return a.colors ? a.colors[b] : a.stops[b].color
        },
        _lookupData: function(a, b) {
            var c;
            if (b) {
                var d = 0,
                    f = b.length - 1;
                e.some(b, function(b, c) {
                    if (a < b) return f = c, !0;
                    d = c;
                    return !1
                });
                c = [d, f, (a - b[d]) / (b[f] - b[d])]
            }
            return c
        },
        _meterIn: {
            inches: 39.3701,
            feet: 3.28084,
            yards: 1.09361,
            miles: 6.21371E-4,
            "nautical-miles": 5.39957E-4,
            millimeters: 1E3,
            centimeters: 100,
            decimeters: 10,
            meters: 1,
            kilometers: 0.0010,
            "decimal-degrees": 180 / 20015077
        },
        _writeSizeInfo: function(a) {
            if (a) {
                a = l.mixin({}, a);
                a.minSize && (a.minSize = q.px2pt(a.minSize));
                a.maxSize && (a.maxSize = q.px2pt(a.maxSize));
                var b = a.legendOptions;
                if (b && (a.legendOptions = l.mixin({}, b), b = b.customValues)) a.legendOptions.customValues = b.slice(0)
            }
            return a
        },
        _writeColorInfo: function(a) {
            a && (a = l.mixin({}, a), a.colors && (a.colors = e.map(a.colors, function(a) {
                return n.toJsonColor(a)
            })), a.stops && (a.stops = e.map(a.stops, function(a) {
                a = l.mixin({}, a);
                a.color && (a.color = n.toJsonColor(a.color));
                return a
            })));
            return a
        },
        _writeOpacityInfo: function(a) {
            var b;
            a && (b = l.mixin({}, a), b.opacityValues && (b.transparencyValues = e.map(b.opacityValues, function(a) {
                    return 100 * (1 - a)
                }), delete b.opacityValues),
                b.stops && (b.stops = e.map(b.stops, function(a) {
                    a = l.mixin({}, a);
                    a.transparency = 100 * (1 - a.opacity);
                    delete a.opacity;
                    return a
                })));
            return b
        },
        toJson: function() {
            var a = this.visualVariables,
                b = this.rotationInfo,
                c = b && b.field,
                c = b && (b.expression || c && (l.isFunction(c) ? c : "[" + c + "]"));
            a && (a = e.map(a, function(a) {
                "sizeInfo" === a.type ? a = this._writeSizeInfo(a) : "colorInfo" === a.type ? a = this._writeColorInfo(a) : "opacityInfo" === a.type && (a = this._writeOpacityInfo(a), a.type = "transparencyInfo");
                return a
            }, this));
            return {
                rotationType: c &&
                    (b.type || "geographic"),
                rotationExpression: c,
                colorInfo: this._writeColorInfo(this.colorInfo),
                transparencyInfo: this._writeOpacityInfo(this.opacityInfo),
                sizeInfo: this._writeSizeInfo(this.sizeInfo),
                visualVariables: a
            }
        }
    })
});