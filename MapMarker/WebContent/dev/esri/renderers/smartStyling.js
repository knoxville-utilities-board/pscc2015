//>>built
define("esri/renderers/smartStyling", ["require", "module", "dojo/_base/array", "dojo/_base/lang", "dojo/has", "dojo/Deferred", "dojo/number", "dojo/i18n!dojo/cldr/nls/number", "../kernel", "../Color", "../styles/type", "../styles/size", "../styles/choropleth", "../styles/heatmap", "../symbols/SimpleMarkerSymbol", "../symbols/SimpleLineSymbol", "../symbols/SimpleFillSymbol", "./UniqueValueRenderer", "./ClassBreaksRenderer", "./HeatmapRenderer", "dojo/i18n!../nls/jsapi"], function(I, T, s, U, wa, x, V, W, xa, C, X, Y, Z, $, aa, F, ba, ca, D, da, ea) {
    function f(a, b) {
        a.reject(Error(b))
    }

    function q(a, b,
        c, d) {
        var e;
        switch (c) {
            case "point":
                e = new aa;
                e.setColor(b);
                e.setSize(null != d ? d : a.size);
                b = new F;
                b.setColor(a.outline.color);
                b.setWidth(a.outline.width);
                e.setOutline(b);
                break;
            case "line":
                e = new F;
                e.setColor(b);
                e.setWidth(null != d ? d : a.width);
                break;
            case "polygon":
                e = new ba, e.setColor(b), b = new F, b.setColor(a.outline.color), b.setWidth(a.outline.width), e.setOutline(b)
        }
        return e
    }

    function z(a) {
        a = a.geometryType;
        "esriGeometryPoint" === a || "esriGeometryMultipoint" === a ? a = "point" : "esriGeometryPolyline" === a ? a = "line" : "esriGeometryPolygon" ===
            a && (a = "polygon");
        return a
    }

    function fa(a, b) {
        var c = a.scheme;
        c || (c = (c = X.getSchemes({
            theme: a.theme || ga,
            basemap: a.basemap,
            geometryType: b
        })) && c.primaryScheme);
        return c
    }

    function J(a, b) {
        return a.label < b.label ? -1 : a.label > b.label ? 1 : 0
    }

    function K(a, b) {
        return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
    }

    function ha(a, b) {
        var c = b.count - a.count;
        0 === c && (c = J(a, b));
        return c
    }

    function ia(a, b) {
        var c = b.count - a.count;
        0 === c && (c = K(a, b));
        return c
    }

    function ja(a, b, c) {
        var d;
        "count" === b ? (d = ia, c && c.codedValues && (d = ha)) : "value" === b && (d =
            K, c && c.codedValues && (d = J));
        d && a.sort(d)
    }

    function ka(a, b, c) {
        var d = a.uniqueValueInfos,
            e = b.layer,
            l = b.field,
            m = e.getField(l),
            n = e.getDomain(m.name),
            k, g, p = -1,
            h, f = null == b.numTypes ? 10 : -1 === b.numTypes ? d.length : b.numTypes,
            r = null == b.showOthers ? !0 : b.showOthers;
        k = null == b.sortBy ? "count" : b.sortBy;
        var u = b && b.labelCallback,
            A = z(e),
            v = fa(b, A);
        b = new ca(null, l);
        s.forEach(d, function(b, a) {
            var d = b.value,
                c = String(d),
                e = n && n.codedValues ? n.getName(d) : null;
            e ? c = e : "number" === typeof d && "esriFieldTypeDate" !== m.type && (c = V.format(d, {
                places: 20,
                round: -1
            }).replace(la, "$1").replace(ma, ""));
            b.label = c;
            u && (b.label = u(b));
            null === b.value && (p = a)
        }); - 1 < p && (h = d.splice(p, 1)[0]);
        ja(d, k, n);
        g = w.createColors(v.colors, d.length);
        s.forEach(d, function(b, a) {
            b.symbol = q(v, g[a], A)
        });
        g = w.createColors(v.colors, f);
        for (k = 0; k < f; k++)(e = d[k]) && b.addValue({
            value: e.value,
            label: e.label,
            symbol: q(v, g[k], A)
        });
        r && (b.defaultSymbol = q(v, v.noDataColor, A), b.defaultLabel = B.others);
        h && (h.symbol = q(v, v.noDataColor, A), d.push(h));
        c.resolve({
            renderer: b,
            uniqueValueInfos: d,
            source: a.source,
            othersStartIndex: b.infos.length === d.length ? -1 : b.infos.length
        })
    }

    function L(a, b, c) {
        var d = a.scheme;
        d || (d = (d = Z.getSchemes({
            theme: c || a.theme || na,
            basemap: a.basemap,
            geometryType: b
        })) && d.primaryScheme);
        return d
    }

    function G(a, b, c) {
        var d = a + (b - a) / 2,
            e = c[a],
            l = c[d],
            m = c[b],
            n = Math.floor(e),
            k = Math.floor(l),
            g = Math.floor(m);
        n === e && (g === m && k !== l && n !== k && g !== k) && (c[d] = k);
        a + 1 !== d && G(a, d, c);
        d + 1 !== b && G(d, b, c);
        return c
    }

    function oa(a) {
        var b = a.avg,
            c = b - a.stddev,
            d = b + a.stddev,
            e;
        c < a.min && (c = a.min);
        d > a.max && (d = a.max);
        e = [c, c + (b - c) /
            2, b, b + (d - b) / 2, d
        ];
        s.forEach(e, function(b, a) {
            e[a] = Number(b.toFixed(6))
        });
        return G(0, 4, e)
    }

    function H(a, b, c, d, e, l) {
        var m = e.field,
            n = z(e.layer),
            k = null == e.showOthers ? !0 : e.showOthers;
        e = L(e, n);
        var g = e.name && e.name.toLowerCase(),
            f, h, t, r = w.createColors(e.colors, e.colors.length),
            u = new D(null, m);
        k && (u.defaultSymbol = q(e, e.noDataColor, n), u.defaultLabel = B.others);
        u.addBreak({
            label: m,
            minValue: -Number.MAX_VALUE,
            maxValue: Number.MAX_VALUE,
            symbol: q(e, e.noDataColor, n)
        });
        b ? (h = [b.minValue], s.forEach(b.classBreakInfos, function(b) {
                h.push(b.maxValue)
            }),
            f = [0, 1, 2, 3, 4, 5]) : (h = oa(a), f = 0 === g.indexOf("seq-") ? [0, 4] : [0, 2, 4]);
        u.normalizationType = c;
        u.normalizationField = d;
        t = h.length;
        u.setVisualVariables([{
            type: "colorInfo",
            field: m,
            normalizationField: d,
            stops: s.map(h, function(b, a) {
                var d = "";
                0 === a ? d = M.lte + " " : a === t - 1 && (d = M.gte + " ");
                return {
                    value: b,
                    color: r[a],
                    label: -1 < s.indexOf(f, a) ? d + String(b) : null
                }
            })
        }]);
        l.resolve({
            renderer: u,
            statistics: a,
            classBreaks: b
        })
    }

    function N(a, b) {
        var c = a.scheme;
        c || (c = (c = Y.getSchemes({
                theme: a.theme || pa,
                basemap: a.basemap,
                geometryType: b
            })) &&
            c.primaryScheme);
        return c
    }

    function O(a, b) {
        var c;
        switch (b) {
            case "point":
                c = [a.minSize, a.maxSize];
                break;
            case "line":
                c = [a.minWidth, a.maxWidth];
                break;
            case "polygon":
                c = [a.marker.minSize, a.marker.maxSize]
        }
        return c
    }

    function P(a, b, c, d, e) {
        var l = d.field,
            m = z(d.layer),
            f = null == d.showOthers ? !0 : d.showOthers,
            k = N(d, m);
        d = O(k, m);
        var g = "polygon" === m,
            p = g ? k.marker : k,
            k = g ? k.background : null,
            h = new D(null, l);
        f && (h.defaultSymbol = q(p, p.noDataColor, g ? "point" : m), h.defaultLabel = B.others);
        h.addBreak({
            label: l,
            minValue: -Number.MAX_VALUE,
            maxValue: Number.MAX_VALUE,
            symbol: q(p, p.color, g ? "point" : m)
        });
        k && (h.backgroundFillSymbol = q(k, k.color, m));
        h.normalizationType = b;
        h.normalizationField = c;
        h.setVisualVariables([{
            type: "sizeInfo",
            field: l,
            valueUnit: "unknown",
            normalizationField: c,
            minSize: d[0],
            maxSize: d[1],
            minDataValue: a.min,
            maxDataValue: a.max
        }]);
        e.resolve({
            renderer: h,
            statistics: a
        })
    }

    function E(a, b, c) {
        var d, e = [],
            l = 1 / (c + 1);
        for (d = 1; d <= c; d++) e.push(C.blendColors(a, b, l * d));
        return e
    }

    function Q(a, b) {
        var c = [];
        if (1 === b) c = [a[0]];
        else if (2 === b) c = [a[0],
            a[2]
        ];
        else if (3 === b) c = a;
        else {
            var d = b - a.length,
                c = d / 2;
            0 === d % 2 ? (d = E(a[0], a[1], c), c = E(a[1], a[2], c)) : (d = E(a[0], a[1], Math.floor(c)), c = E(a[1], a[2], Math.ceil(c)));
            c = [a[0]].concat(d).concat([a[1]]).concat(c).concat([a[2]])
        }
        return c
    }

    function qa(a, b, c) {
        var d, e = b.length,
            l = -1;
        c && s.some(b, function(b, a) {
            b.hasAvg && (l = a);
            return -1 < l
        });
        if (-1 < l) {
            var f = a.colors;
            a = l + 1;
            b = e - l;
            c = f.slice(0, 3);
            f = f.slice(2);
            c.reverse();
            c = Q(c, a);
            f = Q(f, b);
            c.reverse();
            d = [].concat(c).concat(f.slice(1))
        } else s.some(a.colorsForClassBreaks, function(b) {
            b.numClasses ===
                e && (d = b.colors);
            return !!d
        });
        d && (d = w.createColors(d, d.length));
        return d
    }

    function ra(a, b, c) {
        var d = b.field,
            e = z(b.layer),
            l = null == b.showOthers ? !0 : b.showOthers,
            m = b.classificationMethod || "equal-interval",
            n = "standard-deviation" === m,
            k = b.normalizationType,
            g, p, h, t = a.classBreakInfos;
        (g = L(b, e, n ? "above-and-below" : "high-to-low")) ? (p = qa(g, t, n), !p || p.length != t.length ? f(c, "smartStyling.createClassedColorRenderer: unable to find suitable colors for number of classes.") : (h = new D(null, d), h.classificationMethod = m, h.normalizationType =
            k, h.normalizationField = "field" === k ? b.normalizationField : void 0, h.normalizationTotal = "percent-of-total" === k ? a.normalizationTotal : void 0, l && (h.defaultSymbol = q(g, g.noDataColor, e), h.defaultLabel = B.others), s.forEach(t, function(b, a) {
                h.addBreak({
                    minValue: b.minValue,
                    maxValue: b.maxValue,
                    symbol: q(g, p[a], e),
                    label: b.label
                })
            }), a.renderer = h, c.resolve(a))) : f(c, "smartStyling.createClassedColorRenderer: unable to find suitable style scheme.")
    }

    function sa(a, b, c) {
        b = O(a, b);
        a = b[0];
        b = (b[1] - a) / (4 <= c ? c - 1 : c);
        var d, e = [];
        for (d =
            0; d < c; d++) e.push(a + b * d);
        return e
    }

    function ta(a, b, c) {
        var d = b.field,
            e = z(b.layer),
            l = null == b.showOthers ? !0 : b.showOthers,
            f = b.classificationMethod || "equal-interval",
            n = b.normalizationType,
            k = a.classBreakInfos,
            g = N(b, e),
            p = sa(g, e, k.length),
            h = "polygon" === e,
            t = h ? g.marker : g,
            g = h ? g.background : null,
            r;
        r = new D(null, d);
        r.classificationMethod = f;
        r.normalizationType = n;
        r.normalizationField = "field" === n ? b.normalizationField : void 0;
        r.normalizationTotal = "percent-of-total" === n ? a.normalizationTotal : void 0;
        l && (r.defaultSymbol = q(t,
            t.noDataColor, h ? "point" : e), r.defaultLabel = B.others);
        g && (r.backgroundFillSymbol = q(g, g.color, e));
        s.forEach(k, function(b, a) {
            r.addBreak({
                minValue: b.minValue,
                maxValue: b.maxValue,
                symbol: q(t, t.color, h ? "point" : e, p[a]),
                label: b.label
            })
        });
        a.renderer = r;
        c.resolve(a)
    }

    function ua(a) {
        var b = a.scheme;
        b || (b = (b = $.getSchemes({
            theme: a.theme || va,
            basemap: a.basemap
        })) && b.primaryScheme);
        return b
    }

    function R(a, b, c) {
        var d = b.field,
            e = null == b.blurRadius ? 10 : b.blurRadius,
            f = null == b.minRatio ? 0.01 : b.minRatio,
            m = null == b.maxRatio ? 1 : b.maxRatio,
            n = null == b.fadeToTransparent ? !0 : b.fadeToTransparent;
        b = ua(b).colors;
        var k = b.length,
            g = new da;
        g.setBlurRadius(e);
        g.setField(d);
        g.setMinPixelIntensity(a.min);
        g.setMaxPixelIntensity(a.max);
        var d = b[0],
            p = [{
                ratio: 0,
                color: new C([d.r, d.g, d.b, 0])
            }, {
                ratio: S,
                color: new C([d.r, d.g, d.b, 0])
            }, {
                ratio: n ? f : S,
                color: d
            }],
            h = (m - f) / (k - 1);
        b = w.createColors(b, k);
        s.forEach(b, function(b, a) {
            p.push({
                ratio: f + h * a,
                color: b
            })
        });
        g.setColorStops(p);
        c.resolve({
            renderer: g,
            statistics: a
        })
    }
    var w = {},
        ma = RegExp("\\" + W.decimal + "0+$", "g"),
        la = RegExp("(\\d)0*$",
            "g"),
        M = {
            lte: "\u2264",
            gte: "\u2265",
            pct: "%"
        },
        B = ea.smartStyling,
        ga = "default",
        na = "high-to-low",
        pa = "default",
        va = "default",
        S = 0.01,
        y = I.toAbsMid ? I.toAbsMid("../plugins/FeatureLayerStatistics") : T.id.replace(/\/[^\/]*$/ig, "/") + "../plugins/FeatureLayerStatistics";
    U.mixin(w, {
        createColors: function(a, b) {
            var c = [],
                d = a.length,
                e;
            for (e = 0; e < b; e++) c.push(new C(a[e % d]));
            return c
        },
        createTypeRenderer: function(a) {
            var b = new x;
            if (!a || !a.layer || !a.field || !a.scheme && !a.basemap) return f(b, "smartStyling.createTypeRenderer: missing parameters."),
                b.promise;
            var c = a.layer;
            c.addPlugin(y).then(function() {
                c.statisticsPlugin.getUniqueValues({
                    field: a.field
                }).then(function(d) {
                    ka(d, a, b)
                }).otherwise(function(a) {
                    f(b, "smartStyling.createTypeRenderer: error when calculating unique values.")
                })
            }).otherwise(function(a) {
                f(b, "smartStyling.createTypeRenderer: error when adding feature layer statistics plugin.")
            });
            return b.promise
        },
        createColorRenderer: function(a) {
            var b = new x;
            if (!a || !a.layer || !a.field) return f(b, "smartStyling.createColorRenderer: missing parameters."),
                b.promise;
            var c = a.layer,
                d = a.normalizationField,
                e = d ? "field" : void 0;
            a.statistics ? H(a.statistics, null, e, d, a, b) : c.addPlugin(y).then(function() {
                "group-similar" === a.theme ? c.statisticsPlugin.getClassBreaks({
                    field: a.field,
                    classificationMethod: "natural-breaks",
                    numClasses: 5,
                    normalizationType: e,
                    normalizationField: d
                }).then(function(c) {
                    H(null, c, e, d, a, b)
                }).otherwise(function(a) {
                    f(b, "smartStyling.createColorRenderer: error when calculating class breaks.")
                }) : c.statisticsPlugin.getFieldStatistics({
                    field: a.field,
                    normalizationType: e,
                    normalizationField: d
                }).then(function(c) {
                    H(c, null, e, d, a, b)
                }).otherwise(function(a) {
                    f(b, "smartStyling.createColorRenderer: error when calculating field statistics.")
                })
            }).otherwise(function(a) {
                f(b, "smartStyling.createColorRenderer: error when adding feature layer statistics plugin.")
            });
            return b.promise
        },
        createSizeRenderer: function(a) {
            var b = new x;
            if (!a || !a.layer || !a.field) return f(b, "smartStyling.createSizeRenderer: missing parameters."), b.promise;
            var c = a.layer,
                d = a.normalizationField,
                e = d ? "field" : void 0;
            a.statistics ? P(a.statistics, e, d, a, b) : c.addPlugin(y).then(function() {
                c.statisticsPlugin.getFieldStatistics({
                    field: a.field,
                    normalizationType: e,
                    normalizationField: d
                }).then(function(c) {
                    P(c, e, d, a, b)
                }).otherwise(function(a) {
                    f(b, "smartStyling.createSizeRenderer: error when calculating field statistics.")
                })
            }).otherwise(function(a) {
                f(b, "smartStyling.createSizeRenderer: error when adding feature layer statistics plugin.")
            });
            return b.promise
        },
        createClassedColorRenderer: function(a) {
            var b = new x;
            if (!a || !a.layer ||
                !a.field) return f(b, "smartStyling.createClassedColorRenderer: missing parameters."), b.promise;
            var c = a.layer;
            c.addPlugin(y).then(function() {
                c.statisticsPlugin.getClassBreaks(a).then(function(d) {
                    ra(d, a, b)
                }).otherwise(function(a) {
                    f(b, "smartStyling.createClassedColorRenderer: error when calculating class breaks.")
                })
            }).otherwise(function(a) {
                f(b, "smartStyling.createClassedColorRenderer: error when adding feature layer statistics plugin.")
            });
            return b.promise
        },
        createClassedSizeRenderer: function(a) {
            var b =
                new x;
            if (!a || !a.layer || !a.field) return f(b, "smartStyling.createClassedSizeRenderer: missing parameters."), b.promise;
            var c = a.layer;
            c.addPlugin(y).then(function() {
                c.statisticsPlugin.getClassBreaks(a).then(function(d) {
                    ta(d, a, b)
                }).otherwise(function(a) {
                    f(b, "smartStyling.createClassedSizeRenderer: error when calculating class breaks.")
                })
            }).otherwise(function(a) {
                f(b, "smartStyling.createClassedSizeRenderer: error when adding feature layer statistics plugin.")
            });
            return b.promise
        },
        createHeatmapRenderer: function(a) {
            var b =
                new x;
            if (!a || !a.layer) return f(b, "smartStyling.createHeatmapRenderer: missing parameters."), b.promise;
            var c = a.layer;
            a.statistics ? R(a.statistics, a, b) : c.addPlugin(y).then(function() {
                c.statisticsPlugin.getHeatmapStatistics(a).then(function(c) {
                    R(c, a, b)
                }).otherwise(function(a) {
                    f(b, "smartStyling.createHeatmapRenderer: error when calculating heatmap statistics.")
                })
            }).otherwise(function(a) {
                f(b, "smartStyling.createHeatmapRenderer: error when adding feature layer statistics plugin.")
            });
            return b.promise
        }
    });
    return w
});