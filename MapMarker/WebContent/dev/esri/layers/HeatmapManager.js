//>>built
define("esri/layers/HeatmapManager", ["dojo/_base/declare", "dojo/_base/lang", "dojo/on", "dojo/aspect", "dojo/_base/array", "require", "../kernel", "../sniff", "../geometry/Point", "./MapImageLayer", "./MapImage", "./FeatureLayer", "../renderers/HeatmapRenderer", "../tasks/query"], function(s, r, D, t, u, v, E, F, w, x, y, z, q, A) {
    function B() {}

    function C(b) {
        var a = b.layer;
        return {
            geometry: b.geometry,
            attributes: b.attributes,
            getLayer: function() {
                return a
            }
        }
    }
    return s(null, {
        declaredClass: "esri.layers.HeatmapManager",
        heatmapRenderer: null,
        sourceLayer: null,
        imageLayer: null,
        useTiles: !0,
        useWorker: !1,
        map: null,
        constructor: function(b) {
            this.sourceLayer = b;
            this._hndls = []
        },
        initialize: function(b) {
            this.map = b;
            var a = this.sourceLayer,
                c = a.renderer;
            a.setDrawMode(!1);
            var a = this.imageLayer = new x({
                    className: "heatmapImgLyr"
                }),
                d = this;
            this.heatmapRenderer = c instanceof q ? c : (c.getRendererInfoByZoom(b.getZoom()) || c.getRendererInfoByScale(b.getScale())).renderer;
            this.recalculateHeatmap = this.recalculateHeatmap.bind(this);
            this._removeRenderer = this._removeRenderer.bind(this);
            this._handleRendererChange = this._handleRendererChange.bind(this);
            this._rendererChangeHandle = this.sourceLayer.on("renderer-change", this._handleRendererChange);
            b.addLayer(a);
            v(["../workers/heatmapCalculator"], function(a) {
                d._calculator = new a(r.mixin({
                    width: d.map.width,
                    height: d.map.height
                }, d._getOptions()));
                d._setupRenderer();
                d.heatmapRenderer.getStats = function(a) {
                    return d._calculator.calculateStats(a || 1)
                };
                d.heatmapRenderer.getHistogramData = function(a, b) {
                    return d._calculator.getHistogramData(a, b)
                }
            })
        },
        destroy: function() {
            this._removeHandlers();
            this.map.removeLayer(this.imageLayer);
            this._rendererChangeHandle.remove();
            this._rendererChangeHandle = this.sourceLayer = this.imageLayer = this.map = this.heatmapRenderer = this._hndls = null
        },
        _handleRendererChange: function(b) {
            var a = b.renderer,
                c = a instanceof q;
            this.heatmapRenderer ? c ? this.heatmapRenderer = a : this._removeRenderer(b) : c && (this.heatmapRenderer = a, this.sourceLayer && this.map && this._setupRenderer())
        },
        _setupRenderer: function() {
            var b = this._hndls,
                a = this.sourceLayer,
                c = this.map,
                d = this;
            a._originalDraw = a._draw;
            a._draw = B;
            a._div.clear();
            setTimeout(this._resetGraphics.bind(this),
                250);
            b.push(a.on("update-end", function(a) {
                d.recalculateHeatmap()
            }));
            b.push(a.on("suspend", function(a) {
                d.imageLayer.suspend()
            }));
            b.push(a.on("resume", function(a) {
                d.imageLayer.resume()
            }));
            b.push(t.after(a, "redraw", this.recalculateHeatmap));
            b.push(c.on("layer-remove", function(b) {
                b.layer == a && (c.removeLayer(d.imageLayer), d._removeRenderer({
                    target: a
                }))
            }));
            a.mode !== z.MODE_ONDEMAND && (b.push(c.on("resize, pan-end", function(a) {
                setTimeout(d.recalculateHeatmap, 16)
            })), b.push(c.on("zoom-end", function(b) {
                setTimeout(function() {
                    a._getRenderer().isInstanceOf(q) &&
                        d.recalculateHeatmap()
                }, 16)
            })));
            this.imageLayer.suspended && this.imageLayer.resume();
            a.graphics && a.graphics.length && this.recalculateHeatmap()
        },
        _removeRenderer: function(b) {
            var a = b.target;
            a._draw = a._originalDraw;
            delete a._originalDraw;
            a.setDrawMode(!0);
            this._removeHandlers();
            this._hndls = [];
            a.renderer != b.renderer && a.renderer.getRendererInfo ? (this.heatmapRenderer = null, this.imageLayer.suspend()) : (a.redraw(), this.destroy())
        },
        recalculateHeatmap: function() {
            this._calculator ? this._doMainCalculation() : this._calculatorClient &&
                this._doWorkerCalculation()
        },
        _doWorkerCalculation: function() {},
        _doMainCalculation: function() {
            var b = this.sourceLayer,
                a = this.imageLayer,
                c = this.map,
                d = this.heatmapRenderer,
                g = this.map.extent,
                n = this.map.width,
                f = this.map.height,
                h = this._calculator,
                l = this,
                k = function(e) {
                    e = l._getScreenPoints(e.features, c, b);
                    e = h.calculateImageData(r.mixin({
                        screenPoints: e,
                        mapinfo: {
                            extent: [g.xmin, g.ymin, g.xmax, g.ymax],
                            resolution: c.getResolution()
                        },
                        width: n,
                        height: f
                    }, l._getOptions()));
                    e = d.getSymbol(C({
                        geometry: c.extent,
                        attributes: {
                            size: [n,
                                f
                            ],
                            imageData: e
                        },
                        layer: b
                    }));
                    e = new y({
                        extent: c.extent,
                        href: e.url
                    });
                    a.addImage(e);
                    setTimeout(function() {
                        var b = a._mapImages.slice(0, -1),
                            c = b.length;
                        if (1E3 < c) b = a._mapImages[c], a.removeAllImages(), a.addImage(b);
                        else
                            for (; c-- && b[c];) a.removeImage(b[c])
                    }, 250)
                },
                p = {
                    geometry: c.extent,
                    timeExtent: c.timeExtent,
                    spatialRelationship: A.SPATIAL_REL_INTERSECTS
                };
            null != b._canDoClientSideQuery(p) ? b.queryFeatures(p, k) : k({
                features: b.graphics
            })
        },
        _getScreenPoints: function(b, a, c) {
            var d = [],
                g = b.length,
                n = 0,
                f = 0,
                h, l = new w(a.extent.xmin,
                    a.extent.ymax, a.spatialReference),
                k = a.toScreen(l),
                p = k.x,
                k = k.y,
                e = a.getResolution(),
                m;
            for (a.extent._parts && (m = u.map(a.extent._parts, function(b) {
                    return c._intersects(a, b.extent)[0]
                })); g--;) f = b[g], f.geometry && (h = {
                x: Math.ceil((f.geometry.x - l.x) / e + p),
                y: Math.floor((l.y - f.geometry.y) / e - k),
                attributes: f.attributes
            }, m && (f = 1 < m.length && h.x < -m[0] ? m[1] : m[0], h.x += f), d[n++] = h);
            return d
        },
        _removeHandlers: function() {
            for (var b = this._hndls.length; b--;) this._hndls[b].remove()
        },
        _getOptions: function() {
            var b = this.heatmapRenderer;
            return {
                blurRadius: b.blurRadius,
                gradient: b.gradient,
                maxPixelIntensity: b.maxPixelIntensity,
                minPixelIntensity: b.minPixelIntensity,
                field: b.field
            }
        },
        _resetGraphics: function() {
            for (var b = this.sourceLayer.graphics, a = b.length, c; a--;) c = b[a], c._shape = c._offsets = void 0
        }
    })
});