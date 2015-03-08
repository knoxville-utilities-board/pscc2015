//>>built
define("esri/plugins/FeatureLayerStatistics", ["dojo/_base/lang", "dojo/_base/array", "dojo/_base/declare", "dojo/has", "dojo/Deferred", "dojo/on", "dojo/promise/all", "../kernel", "../tasks/query", "../tasks/StatisticDefinition", "../tasks/GenerateRendererTask", "../tasks/UniqueValueDefinition", "../tasks/ClassBreaksDefinition", "../tasks/GenerateRendererParameters", "../tasks/generateRenderer", "../layers/HeatmapManager", "../workers/heatmapCalculator", "../graphicsUtils", "../geometry/scaleUtils", "../geometry/mathUtils"], function(t, q, F, P, p, B, G, Q, v, C, H, I, D, x, J, K, E, L, y, z) {
    var M = E.prototype._calculateIntensityMatrix,
        N = E.prototype.calculateStats,
        O = K.prototype._getScreenPoints,
        A = F(null, {
            declaredClass: "esri.plugins.FeatureLayerStatistics",
            sampleSize: 500,
            samplingThreshold: 2E4,
            numBins: 10,
            numClasses: 5,
            classificationMethod: "equal-interval",
            constructor: function(a) {
                t.mixin(this, a);
                this._scaleCache = {};
                if (this.layer.loaded) this._createGRTask();
                else B.once(this.layer, "load", t.hitch(this, this._createGRTask))
            },
            destroy: function() {
                this.layer = this._grTask = this._scaleCache = null
            },
            getUniqueValues: function(a) {
                var b = new p;
                !a || !a.field ?
                    this._rejectDfd(b, "FeatureLayerStatistics.getUniqueValues: 'field' parameter is missing.") : this._callAfterLoad(this._findUniqueValues, {
                        dfd: b,
                        params: a
                    });
                return b.promise
            },
            getFieldStatistics: function(a) {
                var b = new p;
                !a || !a.field ? this._rejectDfd(b, "FeatureLayerStatistics.getFieldStatistics: 'field' parameter is missing.") : this._callAfterLoad(this._getFieldStats, {
                    dfd: b,
                    params: a
                });
                return b.promise
            },
            getSpatialStatistics: function(a) {
                var b = new p;
                !a || !a.features || !a.features.length ? this._rejectDfd(b, "FeatureLayerStatistics.getSpatialStatistics: 'features' parameter is missing or it has no features.") :
                    this._callAfterLoad(this._spatialStats, {
                        dfd: b,
                        params: a
                    });
                return b.promise
            },
            getHeatmapStatistics: function(a) {
                var b = new p;
                this._callAfterLoad(this._getHeatmapStats, {
                    dfd: b,
                    params: a
                });
                return b.promise
            },
            getHistogram: function(a) {
                var b = new p;
                !a || !a.field ? this._rejectDfd(b, "FeatureLayerStatistics.getHistogram: 'field' parameter is missing.") : this._callAfterLoad(this._getHistogram, {
                    dfd: b,
                    params: a
                });
                return b.promise
            },
            getSampleFeatures: function(a) {
                var b = new p;
                this._callAfterLoad(this._sampleFeatures, {
                    dfd: b,
                    params: a
                });
                return b.promise
            },
            getSuggestedScaleRange: function(a) {
                var b = new p;
                this._callAfterLoad(this._getScaleRange, {
                    dfd: b,
                    params: a
                });
                return b.promise
            },
            getClassBreaks: function(a) {
                var b = new p;
                !a || !a.field ? this._rejectDfd(b, "FeatureLayerStatistics.getClassBreaks: 'field' parameter is missing.") : this._callAfterLoad(this._findClassBreaks, {
                    dfd: b,
                    params: a
                });
                return b.promise
            },
            _srcQuery: "service-query",
            _srcGenRend: "service-generate-renderer",
            _srcMemory: "features-in-memory",
            _log10e: Math.LOG10E,
            _reNumber: /\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*/gi,
            _getFieldStats: function(a) {
                var b = this,
                    c = a.params,
                    d = this.layer.getField(c.field);
                this._rejectNonNumeric(a.dfd, d, "getFieldStatistics") || (c.normalizationType ? this._statsFromGenRend(c) : this._statsFromQuery(c)).then(function(b) {
                    a.dfd.resolve(b)
                }).otherwise(function(d) {
                    b._statsFromMemory(c).then(function(b) {
                        a.dfd.resolve(b)
                    }).otherwise(function(c) {
                        b._rejectDfd(a.dfd, "FeatureLayerStatistics.getFieldStatistics: unable to calculate field statistics.")
                    })
                })
            },
            _statsFromQuery: function(a) {
                var b = this.layer,
                    c = new p;
                if (b.url && b.supportsStatistics) {
                    var d = new v,
                        e = this;
                    d.outStatistics = q.map("min max avg stddev count sum var".split(" "), function(b) {
                        var c = new C;
                        c.statisticType = b;
                        c.onStatisticField = a.field;
                        c.outStatisticFieldName = "var" === b ? "variance" : b;
                        return c
                    });
                    b.queryFeatures(d).then(function(a) {
                        a = (a = a && a.features) && a[0] && a[0].attributes;
                        var b, d = {
                            source: e._srcQuery
                        };
                        for (b in a) d[b.toLowerCase()] = a[b];
                        c.resolve(d)
                    }).otherwise(function(a) {
                        e._rejectDfd(c, "FeatureLayerStatistics: Statistics query operation failed.")
                    })
                } else this._rejectDfd(c,
                    "FeatureLayerStatistics: Statistics query requires a layer that supports statistics.");
                return c.promise
            },
            _statsFromMemory: function(a) {
                var b = this.layer,
                    c = new p,
                    d = a.field,
                    e, f, g = [];
                q.forEach(b.graphics, function(a) {
                    f = (e = a.attributes) && e[d];
                    null != f && g.push(f)
                });
                a = this._calcStatistics(g);
                a.source = this._srcMemory;
                c.resolve(a);
                return c.promise
            },
            _calcStatistics: function(a) {
                var b = Infinity,
                    c = -Infinity,
                    d = 0,
                    e = null,
                    f = null,
                    g = null,
                    k = null;
                q.forEach(a, function(a) {
                    d++;
                    e += a;
                    a < b && (b = a);
                    a > c && (c = a)
                });
                if (d) {
                    var f = e / d,
                        m =
                        0;
                    q.forEach(a, function(a) {
                        m += Math.pow(a - f, 2)
                    });
                    k = 1 < d ? m / (d - 1) : 0;
                    g = Math.sqrt(k)
                }
                return {
                    min: d ? b : null,
                    max: d ? c : null,
                    count: d,
                    sum: e,
                    avg: f,
                    stddev: g,
                    variance: k
                }
            },
            _statsFromGenRend: function(a) {
                var b = new p,
                    c = this,
                    d = a.normalizationType,
                    e = a.normalizationField;
                this.getClassBreaks({
                    field: a.field,
                    classificationMethod: "standard-deviation",
                    standardDeviationInterval: 0.25,
                    normalizationType: d,
                    normalizationField: "field" === d ? e : void 0
                }).then(function(a) {
                    var d, e, m;
                    q.some(a.classBreakInfos, function(a, b) {
                        a.hasAvg && (d = a);
                        return !!d
                    });
                    d && (m = d.maxValue - d.minValue, e = d.minValue + m / 2, m *= 4);
                    b.resolve({
                        min: a.minValue,
                        max: a.maxValue,
                        avg: e,
                        stddev: m,
                        source: c._srcGenRend
                    })
                }).otherwise(function(a) {
                    c._rejectDfd(b, "FeatureLayerStatistics.getFieldStatistics: unable to calculate class breaks.")
                });
                return b.promise
            },
            _spatialStats: function(a) {
                var b = a.params.features,
                    c = this.layer.geometryType,
                    d = {},
                    c = {
                        point: "esriGeometryPoint" === c,
                        mPoint: "esriGeometryMultipoint" === c,
                        line: "esriGeometryPolyline" === c,
                        polygon: "esriGeometryPolygon" === c
                    };
                c.point ? d = this._getPointStats(b) :
                    c.mPoint ? d = this._getPointStats(b, !0) : c.line ? d = this._getLineStats(b) : c.polygon && (d = this._getPolygonStats(b));
                if (b = this._getAvgXY(b, c)) d.avgX = b.x, d.avgY = b.y;
                a.dfd.resolve(d)
            },
            _getPointStats: function(a, b) {
                var c, d, e = a.length,
                    f, g, k = {},
                    m = {},
                    h = 0,
                    l = 0,
                    n = Infinity,
                    s = -Infinity,
                    r = 0,
                    p = 0,
                    q, w, u = [];
                if (b)
                    for (c = 0; c < e; c++) a[c].geometry && u.push.apply(u, a[c].geometry.points);
                else u = a;
                e = u.length;
                for (c = 0; c < e; c++)
                    if (b ? (k.x = u[c][0], k.y = u[c][1], f = k) : f = u[c].geometry, f) {
                        q = Infinity;
                        w = -Infinity;
                        for (d = 0; d < e; d++) d !== c && (b ? (m.x = u[d][0],
                            m.y = u[d][1], g = m) : g = u[d].geometry, g && (g = z.getLength(f, g), 0 < g && (g < q && (q = g), g < n && (n = g), g > w && (w = g), g > s && (s = g))));
                        Infinity !== q && (++r, h += q); - Infinity !== w && (++p, l += w)
                    }
                return {
                    minDistance: Infinity !== n ? n : null,
                    maxDistance: -Infinity !== s ? s : null,
                    avgMinDistance: r ? h / r : null,
                    avgMaxDistance: p ? l / p : null
                }
            },
            _getLineStats: function(a) {
                var b, c = a.length,
                    d, e = {},
                    f = {},
                    g = Infinity,
                    k = -Infinity,
                    m = 0,
                    h = 0;
                for (b = 0; b < c; b++)
                    if (d = a[b].geometry) d = this._getLineLength(d, e, f), 0 < d && (++h, m += d, d < g && (g = d), d > k && (k = d));
                return {
                    minLength: Infinity !==
                        g ? g : null,
                    maxLength: -Infinity !== k ? k : null,
                    avgLength: h ? m / h : null
                }
            },
            _getLineLength: function(a, b, c) {
                a = a.paths;
                var d, e = a.length,
                    f, g, k = 0;
                for (d = 0; d < e; d++) f = a[d], g = f[0], f = f[f.length - 1], g && f && (b.x = g[0], b.y = g[1], c.x = f[0], c.y = f[1], g = z.getLength(b, c), 0 < g && (k += g));
                return k
            },
            _getPolygonStats: function(a) {
                var b, c = a.length,
                    d, e = Infinity,
                    f = -Infinity,
                    g = 0,
                    k = 0;
                for (b = 0; b < c; b++)
                    if (a[b].geometry && (d = a[b].geometry.getExtent())) d = (d.getWidth() + d.getHeight()) / 2, 0 < d && (++k, g += d, d < e && (e = d), d > f && (f = d));
                return {
                    minSize: Infinity !== e ?
                        e : null,
                    maxSize: -Infinity !== f ? f : null,
                    avgSize: k ? g / k : null
                }
            },
            _getAvgXY: function(a, b) {
                var c, d, e, f = a.length,
                    g, k, m, h, l = null,
                    n = null,
                    s = 0,
                    r;
                for (c = 0; c < f; c++)
                    if (d = a[c].geometry)
                        if (b.point) ++s, l += d.x, n += d.y;
                        else if (b.mPoint) {
                    m = d.points;
                    k = m.length;
                    for (d = 0; d < k; d++) ++s, l += m[d][0], n += m[d][1]
                } else if (b.line) {
                    h = d.paths;
                    g = h.length;
                    for (d = 0; d < g; d++) {
                        m = h[d];
                        k = m.length;
                        for (e = 0; e < k; e++) ++s, l += m[e][0], n += m[e][1]
                    }
                } else if (b.polygon) {
                    h = d.rings;
                    g = h.length;
                    for (d = 0; d < g; d++) {
                        m = h[d];
                        k = m.length;
                        for (e = 0; e < k; e++) ++s, l += m[e][0], n += m[e][1]
                    }
                }
                null !=
                    l && null != n && (r = {
                        x: l / s,
                        y: n / s
                    });
                return r
            },
            _getHeatmapStats: function(a) {
                var b = this,
                    c = a.params,
                    d = c.field && this.layer.getField(c.field);
                (!c.field || !this._rejectNonNumeric(a.dfd, d, "getHeatmapStatistics")) && this._heatStatsFromMemory(c).then(function(b) {
                    a.dfd.resolve(b)
                }).otherwise(function(c) {
                    b._rejectDfd(a.dfd, "FeatureLayerStatistics.getHeatmapStatistics: unable to calculate heatmap statistics.")
                })
            },
            _heatStatsFromMemory: function(a) {
                var b = new p,
                    c = a.blurRadius || 10,
                    d = this.layer,
                    e = d.getMap(),
                    f;
                e && (f = (a = M(O(d.graphics,
                    e, d), e.width, e.height, c, a.field)) && a.matrix && N.call({}, 1, a.matrix));
                f ? b.resolve({
                    min: f.min,
                    max: f.max,
                    avg: f.mean,
                    stddev: f.stdDev,
                    source: this._srcMemory
                }) : this._rejectDfd(b, "FeatureLayerStatistics.getHeatmapStatistics: unable to calculate heatmap statistics.");
                return b.promise
            },
            _getHistogram: function(a) {
                var b = this,
                    c = a.params,
                    d = c.minValue,
                    e = c.maxValue,
                    f = null != d && null != e,
                    g = this.layer.getField(c.field);
                this._rejectNonNumeric(a.dfd, g, "getHistogram") || (c.normalizationType || c.classificationMethod && "equal-interval" !==
                    c.classificationMethod ? this._binParamsFromGenRend(c).then(function(g) {
                        f ? d > g.max || e < g.min ? b._rejectDfd(a.dfd, "FeatureLayerStatistics.getHistogram: custom value range is beyond field value range.") : (g = b._getFieldExpr(c, g.normTotal), g = b._getRangeExpr(g, d, e), b._binParamsFromGenRend(c, g).then(function(c) {
                                b._getBins(a, c.sqlExpr, c.min, c.max, c.intervals, c.source, c.normTotal, c.excludeZerosExpr)
                            }).otherwise(function(c) {
                                b._rejectDfd(a.dfd, "FeatureLayerStatistics.getHistogram: unable to calculate histogram parameters using custom min/max values.")
                            })) :
                            b._getBins(a, g.sqlExpr, g.min, g.max, g.intervals, g.source, g.normTotal, g.excludeZerosExpr)
                    }).otherwise(function(c) {
                        b._rejectDfd(a.dfd, "FeatureLayerStatistics.getHistogram: unable to calculate min/max from generate renderer operation.")
                    }) : f ? this._getBins(a, null, d, e, null, "parameters") : this.getFieldStatistics(c).then(function(c) {
                        b._getBins(a, null, c.min, c.max, null, c.source)
                    }).otherwise(function(c) {
                        b._rejectDfd(a.dfd, "FeatureLayerStatistics.getHistogram: unable to calculate min/max.")
                    }))
            },
            _getBins: function(a,
                b, c, d, e, f, g, k) {
                var m = this,
                    h = a.params.field,
                    l = a.params.numBins || this.numBins,
                    n = (d - c) / l,
                    s, r = c,
                    p;
                if (!e) {
                    e = [];
                    for (s = 1; s <= l; s++) p = r + n, e.push([r, p]), r = p
                }
                this._queryBins(b || h, e, k).then(function(b) {
                    b = q.map(b, function(a, b) {
                        return {
                            minValue: e[b][0],
                            maxValue: e[b][1],
                            count: a
                        }
                    });
                    a.dfd.resolve({
                        bins: b,
                        minValue: c,
                        maxValue: d,
                        normalizationTotal: g,
                        source: m._srcQuery,
                        statisticsSource: f
                    })
                }).otherwise(function(b) {
                    m._binsFromMemory(a.params, c, d, e, g).then(function(b) {
                        a.dfd.resolve({
                            bins: b,
                            minValue: c,
                            maxValue: d,
                            normalizationTotal: g,
                            source: m._srcMemory,
                            statisticsSource: f
                        })
                    }).otherwise(function(b) {
                        m._rejectDfd(a.dfd, "FeatureLayerStatistics: unable to calculate histogram.")
                    })
                })
            },
            _queryBins: function(a, b, c) {
                var d = this.layer,
                    e, f, g = [],
                    k = b.length;
                for (e = 0; e < k; e++) f = new v, f.where = (c ? c + " AND " : "") + a + " \x3e\x3d " + b[e][0] + (null !== b[e][1] ? " AND " + a + (e === k - 1 ? " \x3c\x3d " : " \x3c ") + b[e][1] : ""), g.push(f);
                return G(q.map(g, function(a) {
                    return d.queryCount(a)
                }))
            },
            _binsFromMemory: function(a, b, c, d, e) {
                var f = new p,
                    g = a.field,
                    k = a.normalizationType;
                a =
                    a.normalizationField;
                var m = this.layer.graphics,
                    h, l, n, s, r, q = [];
                s = d.length;
                for (n = 0; n < s; n++) q.push({
                    minValue: d[n][0],
                    maxValue: d[n][1],
                    count: 0
                });
                s = m.length;
                for (n = 0; n < s; n++) h = (l = (h = m[n]) && h.attributes) && l[g], null != h && (k ? (r = null, l = l && parseFloat(l[a]), "log" === k && 0 != h ? r = Math.log(h) * this._log10e : "percent-of-total" === k && !isNaN(e) && 0 != e ? r = 100 * (h / e) : "field" === k && (!isNaN(l) && 0 != l) && (r = h / l)) : r = h, null != r && (!isNaN(r) && r >= b && r <= c) && (h = this._binIndex(d, r), -1 < h && q[h].count++));
                f.resolve(q);
                return f.promise
            },
            _binIndex: function(a,
                b) {
                var c, d, e = -1;
                for (c = a.length - 1; 0 <= c; c--)
                    if (d = a[c][0], b >= d) {
                        e = c;
                        break
                    }
                return e
            },
            _binParamsFromGenRend: function(a, b) {
                var c = this.layer,
                    d = new p,
                    e = this;
                if (c.url && 10.1 <= c.version) {
                    var f = a.field,
                        g = a.classificationMethod || this.classificationMethod,
                        k = a.normalizationType,
                        m = a.normalizationField,
                        h = this._getGRWhereInfo(c, a),
                        c = h.where,
                        l = new D;
                    l.classificationField = f;
                    l.breakCount = a.numBins || this.numBins;
                    l.classificationMethod = g;
                    l.standardDeviationInterval = "standard-deviation" === g ? a.standardDeviationInterval : void 0;
                    l.normalizationType = k;
                    l.normalizationField = "field" === k ? m : void 0;
                    f = new x;
                    f.classificationDefinition = l;
                    f.where = c ? c + (b ? " AND " + b : "") : b;
                    this._grTask.execute(f).then(function(b) {
                        var c, f, g = [],
                            k = b.infos;
                        f = k.length;
                        c = k[0].minValue;
                        f = k[f - 1].maxValue;
                        q.forEach(k, function(a, b) {
                            g.push([a.minValue, a.maxValue])
                        });
                        d.resolve({
                            min: c,
                            max: f,
                            intervals: g,
                            sqlExpr: e._getFieldExpr(a, b.normalizationTotal),
                            excludeZerosExpr: h.excludeZerosExpr,
                            normTotal: b.normalizationTotal,
                            source: e._srcGenRend
                        })
                    }).otherwise(function(a) {
                        e._rejectDfd(d,
                            "FeatureLayerStatistics: Generate renderer operation failed.")
                    })
                } else this._rejectDfd(d, "FeatureLayerStatistics: Generate renderer operation requires server version 10.1 or later.");
                return d.promise
            },
            _getGRWhereInfo: function(a, b) {
                var c = b.field,
                    d = b.normalizationType,
                    e = b.normalizationField,
                    f = a.getDefinitionExpression(),
                    g;
                "log" === d ? g = "(NOT " + c + " \x3d 0)" : "field" === d && (g = "(NOT " + e + " \x3d 0)");
                return {
                    where: g ? g + (f ? " AND " + f : "") : f,
                    excludeZerosExpr: g
                }
            },
            _getFieldExpr: function(a, b) {
                var c = a.field,
                    d = a.normalizationType,
                    e = a.normalizationField,
                    f = c;
                "percent-of-total" === d ? f = '(("' + c + '" / ' + b + ") * 100)" : "log" === d ? f = '(log("' + c + '") * ' + this._log10e + ")" : "field" === d && (f = '("' + c + '" / "' + e + '")');
                return f
            },
            _getRangeExpr: function(a, b, c) {
                b = null != b ? a + " \x3e\x3d " + b : "";
                a = null != c ? a + " \x3c\x3d " + c : "";
                c = "";
                return (c = b && a ? b + " AND " + a : b || a) ? "(" + c + ")" : ""
            },
            _sampleFeatures: function(a) {
                var b = this,
                    c = a.params,
                    d = this.layer,
                    e = d.graphics,
                    f = c && c.sampleSize || this.sampleSize;
                f <= e.length ? this._resolveSample(a.dfd, this._pickItems(e, f), this._srcMemory) :
                    (c = new v, c.where = "1\x3d1", d.queryCount(c).then(function(c) {
                        f > d.maxRecordCount && (f = d.maxRecordCount);
                        c <= f ? (c = new v, c.where = "1\x3d1", b._queryFeatures(c, d, e, a.dfd)) : c <= b.samplingThreshold ? (c = new v, c.where = "1\x3d1", d.queryIds(c).then(function(c) {
                            var g = new v;
                            g.objectIds = b._pickItems(c, f);
                            b._queryFeatures(g, d, e, a.dfd)
                        }).otherwise(function(c) {
                            b._resolveSample(a.dfd, b._pickItems(e, e.length), b._srcMemory)
                        })) : (c = new v, c.where = "1\x3d1", b._queryFeatures(c, d, e, a.dfd))
                    }).otherwise(function(c) {
                        b._resolveSample(a.dfd,
                            b._pickItems(e, e.length), b._srcMemory)
                    }))
            },
            _queryFeatures: function(a, b, c, d) {
                var e = this;
                b.queryFeatures(a).then(function(a) {
                    (a = a && a.features) && a.length ? e._resolveSample(d, a, e._srcQuery) : e._resolveSample(d, e._pickItems(c, c.length), e._srcMemory)
                }).otherwise(function(a) {
                    e._resolveSample(d, e._pickItems(c, c.length), e._srcMemory)
                })
            },
            _pickItems: function(a, b) {
                var c = a.length,
                    d = [],
                    e, f = [];
                if (b >= c) f = a.slice(0);
                else
                    for (; f.length < b;) e = this._getRandomInt(0, c), -1 === q.indexOf(d, e) && (d.push(e), f.push(a[e]));
                return f
            },
            _getRandomInt: function(a, b) {
                return Math.floor(Math.random() * (b - a)) + a
            },
            _resolveSample: function(a, b, c) {
                a.resolve({
                    features: b || [],
                    source: c
                })
            },
            _getScaleRange: function(a) {
                var b = a.params,
                    c = this._scaleCache,
                    d = b && b.sampleSize || this.sampleSize;
                if (c[d] && (!b || !0 !== b.recalculate)) a.dfd.resolve(t.mixin({}, c[d]));
                else {
                    var e = this,
                        f = this.layer,
                        g = b && b.map || f.getMap(),
                        k;
                    k = g && f.fullExtent ? (b = this._getLODForExtent(f.fullExtent, g)) ? b.scale : y.getScale(g, f.fullExtent) : f.minScale;
                    g ? this.getSampleFeatures({
                        sampleSize: d
                    }).then(function(b) {
                        var h =
                            e._getMaxScale(g, f, b.features);
                        e._resolveScaleRange(a.dfd, c, d, k, h, b.source)
                    }).otherwise(function(b) {
                        e._resolveScaleRange(a.dfd, c, d, k, f.maxScale)
                    }) : this._resolveScaleRange(a.dfd, c, d, k, f.maxScale)
                }
            },
            _resolveScaleRange: function(a, b, c, d, e, f) {
                d = Math.ceil(d);
                e = Math.floor(e);
                b[c] = {
                    minScale: d,
                    maxScale: e,
                    sampleSource: f
                };
                a.resolve(t.mixin({}, b[c]))
            },
            _getMaxScale: function(a, b, c) {
                var d = b.geometryType,
                    e;
                "esriGeometryPoint" === d ? (c = this._getClosestPoints(c), 2 === c.length && (e = L.graphicsExtent(c))) : e = (e = this._getSmallestFeature(c)) &&
                    e.geometry.getExtent();
                return (e = e && e.expand("esriGeometryPolygon" === d ? 2 : 4)) ? y.getScale(a, e) : b.maxScale
            },
            _getClosestPoints: function(a) {
                var b, c, d = a.length,
                    e, f = Infinity,
                    g = [];
                for (b = 0; b < d; b++)
                    for (c = b + 1; c < d; c++) a[b].geometry && a[c].geometry && (e = z.getLength(a[b].geometry, a[c].geometry), 0 < e && e < f && (f = e, g[0] = a[b], g[1] = a[c]));
                return g
            },
            _getSmallestFeature: function(a) {
                var b, c = a.length,
                    d, e = Infinity,
                    f;
                for (b = 0; b < c; b++)
                    if (a[b].geometry && (d = a[b].geometry.getExtent())) d = d.getWidth() * d.getHeight(), 0 < d && d < e && (e = d, f = a[b]);
                return f
            },
            _getLODForExtent: function(a, b) {
                var c = b.__tileInfo,
                    c = c && c.lods,
                    d;
                if (c && c.length) {
                    a = new a.constructor(a.toJson());
                    a = b._fixAspectRatio(a);
                    var e, f = y.getScale(b, a),
                        g = c[b.getMinZoom()],
                        k = c[b.getMaxZoom()];
                    if (f >= g.scale) d = g;
                    else if (f <= k.scale) d = k;
                    else
                        for (e = c.length - 1; 0 <= e; e--)
                            if (!(c[e].level < g.level || c[e].level > k.level) && c[e].scale >= f) {
                                d = c[e];
                                break
                            }
                }
                return d
            },
            _findUniqueValues: function(a) {
                var b = this,
                    c = a.params,
                    d = this.layer.getField(c.field);
                d ? this._uvFromStatisticsQuery(c).then(function(c) {
                    b._resolveUVDfd(c,
                        a, d, b._srcQuery)
                }).otherwise(function(e) {
                    b._uvFromGenRenderer(c, d).then(function(c) {
                        b._resolveUVDfd(c, a, d, b._srcGenRend)
                    }).otherwise(function(e) {
                        b._uvFromMemory(c).then(function(c) {
                            b._resolveUVDfd(c, a, d, b._srcMemory)
                        }).otherwise(function(c) {
                            b._rejectDfd(a.dfd, "FeatureLayerStatistics: unable to calculate unique values.")
                        })
                    })
                }) : this._rejectDfd(a.dfd, "FeatureLayerStatistics.getUniqueValues: unknown 'field'.")
            },
            _uvFromStatisticsQuery: function(a) {
                var b = this.layer,
                    c = new p;
                if (b.url && b.supportsStatistics) {
                    var d =
                        "countOF" + a.field,
                        e = this,
                        f = new C;
                    f.statisticType = "count";
                    f.onStatisticField = a.field;
                    f.outStatisticFieldName = d;
                    var g = new v;
                    g.outStatistics = [f];
                    g.groupByFieldsForStatistics = [a.field];
                    b.queryFeatures(g).then(function(f) {
                        var m, h, l = {},
                            n, p;
                        q.forEach(f.features, function(b) {
                            m = b.attributes;
                            h = this._getAttributeVal(m, a.field);
                            n = this._getAttributeVal(m, d);
                            null === h && 0 === n && (p = !0);
                            if (null == h || "" === h || "string" === typeof h && "" === t.trim(h)) h = null;
                            null == l[h] ? l[h] = {
                                count: n,
                                data: h
                            } : l[h].count += n
                        }, e);
                        p ? (g = new v, g.where =
                            a.field + " is NULL", b.queryCount(g).then(function(a) {
                                l["null"].count += a || 0;
                                c.resolve({
                                    count: l
                                })
                            }).otherwise(function(a) {
                                c.resolve({
                                    count: l
                                })
                            })) : c.resolve({
                            count: l
                        })
                    }).otherwise(function(a) {
                        e._rejectDfd(c, "FeatureLayerStatistics: Statistics query operation failed.")
                    })
                } else this._rejectDfd(c, "FeatureLayerStatistics: Statistics query requires a layer that supports statistics.");
                return c.promise
            },
            _uvFromGenRenderer: function(a, b) {
                var c = this.layer,
                    d = new p,
                    e = this;
                if (c.url && 10.1 <= c.version) {
                    var f = new I;
                    f.attributeField =
                        a.field;
                    var g = new x;
                    g.classificationDefinition = f;
                    g.where = c.getDefinitionExpression();
                    this._grTask.execute(g).then(function(a) {
                        var c = {},
                            f, g = -1 < q.indexOf(e._numericTypes, b.type);
                        q.forEach(a.infos, function(a) {
                            f = a.value;
                            if (null == f || "" === f || "string" === typeof f && ("" === t.trim(f) || "\x3cnull\x3e" === f.toLowerCase())) f = null;
                            null == c[f] ? c[f] = {
                                count: a.count,
                                data: g && f ? Number(f) : f
                            } : c[f].count += a.count
                        });
                        d.resolve({
                            count: c
                        })
                    }).otherwise(function(a) {
                        e._rejectDfd(d, "FeatureLayerStatistics: Generate renderer operation failed.")
                    })
                } else this._rejectDfd(d,
                    "FeatureLayerStatistics: Generate renderer operation requires server version 10.1 or later.");
                return d.promise
            },
            _uvFromMemory: function(a) {
                var b = this.layer,
                    c = new p,
                    d = a.field,
                    e, f, g = {};
                q.forEach(b.graphics, function(a) {
                    f = (e = a.attributes) && e[d];
                    if (null == f || "" === f || "string" === typeof f && "" === t.trim(f)) f = null;
                    null == g[f] ? g[f] = {
                        count: 1,
                        data: f
                    } : g[f].count++
                });
                c.resolve({
                    count: g
                });
                return c.promise
            },
            _resolveUVDfd: function(a, b, c, d) {
                a = a.count;
                var e;
                c = [];
                var f;
                for (e in a) f = a[e], c.push({
                    value: f.data,
                    count: f.count
                });
                b.dfd.resolve({
                    source: d,
                    uniqueValueInfos: c
                })
            },
            _findClassBreaks: function(a) {
                var b = this,
                    c = a.params,
                    d = this.layer.getField(c.field);
                this._rejectNonNumeric(a.dfd, d, "getClassBreaks") || this._cbFromGenRend(c).then(function(d) {
                    b._resolveCBDfd(a.dfd, c, d, b._srcGenRend)
                }).otherwise(function(d) {
                    b._cbFromMemory(c).then(function(d) {
                        b._resolveCBDfd(a.dfd, c, d, b._srcMemory)
                    }).otherwise(function(c) {
                        b._rejectDfd(a.dfd, "FeatureLayerStatistics: unable to calculate class breaks.")
                    })
                })
            },
            _cbFromGenRend: function(a) {
                var b =
                    this.layer,
                    c = new p,
                    d = this;
                if (b.url && 10.1 <= b.version) {
                    var e = this._createCBDefn(a);
                    a = this._getGRWhereInfo(b, a);
                    b = new x;
                    b.classificationDefinition = e;
                    b.where = a.where;
                    this._grTask.execute(b).then(function(a) {
                        c.resolve(a)
                    }).otherwise(function(a) {
                        d._rejectDfd(c, "FeatureLayerStatistics: Generate renderer operation failed.")
                    })
                } else this._rejectDfd(c, "FeatureLayerStatistics: Generate renderer operation requires server version 10.1 or later.");
                return c.promise
            },
            _cbFromMemory: function(a) {
                var b = new p;
                a = this._createCBDefn(a);
                a = J.createClassBreaksRenderer({
                    features: this.layer.graphics,
                    definition: a
                });
                b.resolve(a);
                return b.promise
            },
            _createCBDefn: function(a) {
                var b = a.field,
                    c = a.classificationMethod || this.classificationMethod,
                    d = a.normalizationType,
                    e = a.normalizationField,
                    f = new D;
                f.classificationField = b;
                f.breakCount = a.numClasses || this.numClasses;
                f.classificationMethod = c;
                f.standardDeviationInterval = "standard-deviation" === c ? a.standardDeviationInterval : void 0;
                f.normalizationType = d;
                f.normalizationField = "field" === d ? e : void 0;
                return f
            },
            _resolveCBDfd: function(a, b, c, d) {
                var e = c.infos,
                    f = e[0].minValue,
                    g = e[e.length - 1].maxValue,
                    k = "standard-deviation" === b.classificationMethod,
                    m = this._reNumber,
                    h, l, n, e = q.map(e, function(a) {
                        n = a.label;
                        l = {
                            minValue: a.minValue,
                            maxValue: a.maxValue,
                            label: n
                        };
                        k && n && (h = n.match(m), h = q.map(h, function(a) {
                            return +t.trim(a)
                        }), 2 === h.length ? (l.minStdDev = h[0], l.maxStdDev = h[1], 0 > h[0] && 0 < h[1] && (l.hasAvg = !0)) : 1 === h.length && (-1 < n.indexOf("\x3c") ? (l.minStdDev = null, l.maxStdDev = h[0]) : -1 < n.indexOf("\x3e") && (l.minStdDev = h[0], l.maxStdDev =
                            null)));
                        return l
                    });
                a.resolve({
                    minValue: f,
                    maxValue: g,
                    classBreakInfos: e,
                    normalizationTotal: c.normalizationTotal,
                    source: d
                })
            },
            _rejectDfd: function(a, b) {
                a.reject(Error(b))
            },
            _rejectNonNumeric: function(a, b, c) {
                var d;
                if (b) {
                    if (b.name === this.layer.objectIdField || -1 === q.indexOf(this._numericTypes, b.type)) this._rejectDfd(a, "FeatureLayerStatistics." + c + ": 'field' should be numeric."), d = !0
                } else this._rejectDfd(a, "FeatureLayerStatistics." + c + ": unknown 'field'."), d = !0;
                return d
            },
            _getAttributeVal: function(a, b) {
                var c,
                    d;
                b = b.toLowerCase();
                if (a)
                    for (d in a)
                        if (d.toLowerCase() === b) {
                            c = a[d];
                            break
                        }
                return c
            },
            _callAfterLoad: function(a, b) {
                if (this.layer.loaded) a.call(this, b);
                else B.once(this.layer, "load", t.hitch(this, a, b))
            },
            _numericTypes: ["esriFieldTypeInteger", "esriFieldTypeSmallInteger", "esriFieldTypeSingle", "esriFieldTypeDouble"],
            _createGRTask: function() {
                this._grTask = new H(this.layer, {
                    source: this.layer.source,
                    gdbVersion: this.layer.gdbVersion
                })
            }
        });
    t.mixin(A, {
        add: function(a, b) {
            if (!a.statisticsPlugin) {
                var c = b || {};
                c.layer =
                    a;
                a.statisticsPlugin = new A(c)
            }
        },
        remove: function(a) {
            a.statisticsPlugin && (a.statisticsPlugin.destroy(), delete a.statisticsPlugin)
        }
    });
    return A
});