//>>built
define("esri/dijit/Legend", ["dojo/_base/kernel", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/json", "dojo/_base/Color", "dojo/has", "dojo/sniff", "dojo/DeferredList", "dojo/json", "dojo/number", "dojo/dom", "dojo/dom-construct", "dojo/dom-style", "dijit/_Widget", "dojox/gfx", "dojox/gfx/matrix", "dojox/html/entities", "../kernel", "../config", "../request", "../lang", "../renderers/SimpleRenderer", "../renderers/UniqueValueRenderer", "../renderers/ClassBreaksRenderer", "../renderers/ScaleDependentRenderer", "../renderers/DotDensityRenderer", "../renderers/TemporalRenderer", "../renderers/HeatmapRenderer", "../symbols/SimpleMarkerSymbol", "../symbols/PictureFillSymbol", "../symbols/jsonUtils", "./_EventedWidget", "dojo/i18n!../nls/jsapi", "dojo/i18n!dojo/cldr/nls/number"], function(A, K, s, m, n, L, y, v, $, M, N, F, q, e, t, O, G, P, Q, aa, H, I, D, B, J, E, R, S, T, U, V, W, C, X, Y, Z) {
    var x = K([X, O], {
        declaredClass: "esri.dijit.Legend",
        widgetsInTemplate: !1,
        layers: null,
        alignRight: !1,
        hoverLabelShowing: !1,
        dotDensitySwatchSize: 26,
        dotCoverage: 75,
        reZeros: RegExp("\\" + Z.decimal + "0+$", "g"),
        reZerosFractional: RegExp("(\\d)0*$", "g"),
        _ieTimer: 100,
        _isRightToLeft: !1,
        _align: null,
        _legendAlign: null,
        constructor: function(a, b) {
            s.mixin(this, Y.widgets.legend);
            a = a || {};
            a.map ? b ? (this.map = a.map, this.layerInfos = a.layerInfos, this._respectCurrentMapScale = !1 === a.respectCurrentMapScale ? !1 : !0, this.arrangement = a.arrangement === x.ALIGN_RIGHT ? x.ALIGN_RIGHT : x.ALIGN_LEFT, this.arrangement === x.ALIGN_RIGHT && (this.alignRight = !0), this.autoUpdate = !1 === a.autoUpdate ? !1 : !0, this._surfaceItems = []) : console.error("esri.dijit.Legend: must specify a container for the legend") : console.error("esri.dijit.Legend: unable to find the 'map' property in parameters")
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            var a = ["ar", "he"],
                b, c;
            for (b = 0; b < a.length; b += 1) c = a[b], A.locale &&
                -1 !== A.locale.indexOf(c) && (-1 !== A.locale.indexOf("-") ? -1 !== A.locale.indexOf(c + "-") && (this._isRightToLeft = !0) : this._isRightToLeft = !0);
            this._isRightToLeft ? (this._align = this.alignRight ? "left" : "right", this._legendAlign = this.alignRight ? "esriLegendLeft" : "esriLegendRight") : (this._align = this.alignRight ? "right" : "left", this._legendAlign = this.alignRight ? "esriLegendRight" : "esriLegendLeft")
        },
        startup: function() {
            this.inherited(arguments);
            this._initialize();
            9 > v("ie") && (this._repaintItems = s.hitch(this, this._repaintItems),
                setTimeout(this._repaintItems, this._ieTimer))
        },
        destroy: function() {
            this._deactivate();
            this._removeHoverHandlers();
            this.inherited(arguments)
        },
        refresh: function(a) {
            if (this.domNode) {
                a ? (this.layerInfos = a, this.layers = [], m.forEach(this.layerInfos, function(a) {
                    this._isSupportedLayerType(a.layer) && (a.title && (a.layer._titleForLegend = a.title), a.layer._hideDefaultSymbol = !1 === a.defaultSymbol ? !0 : !1, a.hideLayers ? (a.layer._hideLayersInLegend = a.hideLayers, this._addSubLayersToHide(a)) : a.layer._hideLayersInLegend = [],
                        a.hoverLabel && (a.layer._hoverLabel = a.hoverLabel), a.hoverLabels && (a.layer._hoverLabels = a.hoverLabels), this.layers.push(a.layer))
                }, this)) : this.useAllMapLayers && (this.layers = this.layerInfos = null);
                for (a = this.domNode.children.length - 1; 0 <= a; a--) e.destroy(this.domNode.children[a]);
                this._removeHoverHandlers();
                this.startup()
            }
        },
        _legendUrl: "http://utility.arcgis.com/sharing/tools/legend",
        _initialize: function() {
            this.layerInfos && (this.layers = [], m.forEach(this.layerInfos, function(a) {
                this._isSupportedLayerType(a.layer) &&
                    (a.title && (a.layer._titleForLegend = a.title), a.layer._hideDefaultSymbol = !1 === a.defaultSymbol ? !0 : !1, a.hideLayers ? (a.layer._hideLayersInLegend = a.hideLayers, this._addSubLayersToHide(a)) : a.layer._hideLayersInLegend = [], a.hoverLabel && (a.layer._hoverLabel = a.hoverLabel), a.hoverLabels && (a.layer._hoverLabels = a.hoverLabels), this.layers.push(a.layer))
            }, this));
            this.useAllMapLayers = !1;
            if (!this.layers) {
                this.useAllMapLayers = !0;
                this.layers = [];
                var a = [],
                    b = [];
                m.forEach(this.map.layerIds, function(c) {
                    c = this.map.getLayer(c);
                    var d;
                    this._isSupportedLayerType(c) && (c.arcgisProps && c.arcgisProps.title && (c._titleForLegend = c.arcgisProps.title), this.layers.push(c));
                    "esri.layers.KMLLayer" == c.declaredClass && (d = c.getLayers(), m.forEach(d, function(b) {
                        a.push(b.id)
                    }, this));
                    "esri.layers.GeoRSSLayer" == c.declaredClass && (d = c.getFeatureLayers(), m.forEach(d, function(a) {
                        b.push(a.id)
                    }, this))
                }, this);
                m.forEach(this.map.graphicsLayerIds, function(c) {
                    var d = this.map.getLayer(c); - 1 == m.indexOf(a, c) && -1 == m.indexOf(b, c) && (this._isSupportedLayerType(d) &&
                        d._params && d._params.drawMode) && (d.arcgisProps && d.arcgisProps.title && (d._titleForLegend = d.arcgisProps.title), this.layers.push(d))
                }, this)
            }
            this._createLegend()
        },
        _activate: function() {
            this._deactivate();
            this.autoUpdate && (this._respectCurrentMapScale && (this._ozeConnect = n.connect(this.map, "onZoomEnd", this, "_refreshLayers")), this.useAllMapLayers && (this._olaConnect = n.connect(this.map, "onLayerAdd", this, "_updateAllMapLayers"), this._olrConnect = n.connect(this.map, "onLayerRemove", this, "_updateAllMapLayers"), this._olroConnect =
                n.connect(this.map, "onLayersReordered", this, "_updateAllMapLayers")), m.forEach(this.layers, function(a) {
                a.ovcConnect = n.connect(a, "onVisibilityChange", this, "_refreshLayers");
                a.oscConnect = n.connect(a, "onScaleRangeChange", this, "_refreshLayers");
                "esri.layers.ArcGISDynamicMapServiceLayer" === a.declaredClass && a.supportsDynamicLayers && (a.odcConnect = n.connect(a, "_onDynamicLayersChange", s.hitch(this, "_updateDynamicLayers", a)));
                "esri.layers.ArcGISImageServiceLayer" === a.declaredClass && (a.oirConnect = n.connect(a,
                    "onRenderingChange", s.partial(this._updateImageServiceLayers, this, a)))
            }, this))
        },
        _deactivate: function() {
            this._ozeConnect && n.disconnect(this._ozeConnect);
            this._olaConnect && n.disconnect(this._olaConnect);
            this._olroConnect && n.disconnect(this._olroConnect);
            this._olrConnect && n.disconnect(this._olrConnect);
            m.forEach(this.layers, function(a) {
                a.ovcConnect && n.disconnect(a.ovcConnect);
                a.oscConnect && n.disconnect(a.oscConnect);
                a.odcConnect && n.disconnect(a.odcConnect);
                a.oirConnect && n.disconnect(a.oirConnect)
            }, this)
        },
        _updateDynamicLayers: function(a) {
            delete a.legendResponse;
            this._refreshLayers()
        },
        _updateImageServiceLayers: function(a, b) {
            delete b.legendResponse;
            a._refreshLayers()
        },
        _refreshLayers: function() {
            this.refresh()
        },
        _updateAllMapLayers: function() {
            this.layers = [];
            m.forEach(this.map.layerIds, function(a) {
                a = this.map.getLayer(a);
                this._isSupportedLayerType(a) && this.layers.push(a)
            }, this);
            m.forEach(this.map.graphicsLayerIds, function(a) {
                a = this.map.getLayer(a);
                this._isSupportedLayerType(a) && (a._params && a._params.drawMode) &&
                    this.layers.push(a)
            }, this);
            this.refresh()
        },
        _createLegend: function() {
            var a = !1;
            t.set(this.domNode, "position", "relative");
            e.create("div", {
                id: this.id + "_msg",
                className: "esriLegendMsg",
                innerHTML: this.NLS_creatingLegend + "..."
            }, this.domNode);
            var b = [];
            m.forEach(this.layers, function(c) {
                if ("esri.layers.KMLLayer" == c.declaredClass || "esri.layers.GeoRSSLayer" == c.declaredClass) {
                    var f;
                    c.loaded ? ("esri.layers.KMLLayer" == c.declaredClass ? f = c.getLayers() : "esri.layers.GeoRSSLayer" == c.declaredClass && (f = c.getFeatureLayers(),
                        c._hideLayersInLegend && (f = m.filter(f, function(a) {
                            return -1 == m.indexOf(c._hideLayersInLegend, a.id)
                        }))), m.forEach(f, function(a) {
                        "esri.layers.FeatureLayer" == a.declaredClass && c._titleForLegend && (a._titleForLegend = c._titleForLegend + " - ", "esriGeometryPoint" == a.geometryType ? a._titleForLegend += this.NLS_points : "esriGeometryPolyline" == a.geometryType ? a._titleForLegend += this.NLS_lines : "esriGeometryPolygon" == a.geometryType && (a._titleForLegend += this.NLS_polygons), b.push(a))
                    }, this)) : n.connect(c, "onLoad", s.hitch(this,
                        function() {
                            this.refresh(this.layerInfos)
                        }))
                } else if ("esri.layers.WMSLayer" === c.declaredClass)
                    if (c.loaded) {
                        if (c.visible && 0 < c.layerInfos.length && m.some(c.layerInfos, function(a) {
                                return a.legendURL
                            })) {
                            var g = !1;
                            m.forEach(c.layerInfos, function(b) {
                                b.legendURL && -1 < m.indexOf(c.visibleLayers, b.name) && (g || (e.create("div", {
                                    innerHTML: "\x3cspan class\x3d'esriLegendServiceLabel'\x3e" + (c._titleForLegend || c.name || c.id) + "\x3c/span\x3e"
                                }, this.domNode), g = !0), e.create("div", {
                                        innerHTML: "\x3cimg src\x3d'" + b.legendURL + "'/\x3e"
                                    },
                                    this.domNode), a = !0)
                            }, this)
                        }
                    } else n.connect(c, "onLoad", s.hitch(this, function() {
                        this.refresh(this.layerInfos)
                    }));
                else b.push(c)
            }, this);
            var c = [];
            m.forEach(b, function(a) {
                if (a.loaded) {
                    if (!0 === a.visible && (a.layerInfos || a.renderer || "esri.layers.ArcGISImageServiceLayer" == a.declaredClass)) {
                        var b = e.create("div", {
                            id: this.id + "_" + a.id,
                            style: {
                                display: "none"
                            },
                            "class": "esriLegendService"
                        });
                        e.create("span", {
                            innerHTML: this._getServiceTitle(a),
                            "class": "esriLegendServiceLabel"
                        }, e.create("td", {
                            align: this._align
                        }, e.create("tr", {}, e.create("tbody", {}, e.create("table", {
                            width: "95%"
                        }, b)))));
                        e.place(b, this.id, "first");
                        a.legendResponse || a.renderer ? this._createLegendForLayer(a) : c.push(this._legendRequest(a))
                    }
                } else var g = n.connect(a, "onLoad", this, function(a) {
                    n.disconnect(g);
                    g = null;
                    this.refresh()
                })
            }, this);
            0 === c.length && !a ? (q.byId(this.id + "_msg").innerHTML = this.NLS_noLegend, this._activate()) : (new M(c)).addCallback(s.hitch(this, function(b) {
                a ? q.byId(this.id + "_msg").innerHTML = "" : q.byId(this.id + "_msg").innerHTML = this.NLS_noLegend;
                this._activate()
            }))
        },
        _createLegendForLayer: function(a) {
            if (a.legendResponse || a.renderer) {
                var b = !1;
                if (a.legendResponse) {
                    var c = a.dynamicLayerInfos || a.layerInfos;
                    c && c.length ? m.forEach(c, function(c, f) {
                        if (!a._hideLayersInLegend || -1 == m.indexOf(a._hideLayersInLegend, c.id)) {
                            var g = this._buildLegendItems(a, c, f);
                            b = b || g
                        }
                    }, this) : "esri.layers.ArcGISImageServiceLayer" == a.declaredClass && (b = this._buildLegendItems(a, {
                        id: 0,
                        name: null,
                        title: a.name,
                        subLayerIds: null,
                        parentLayerId: -1
                    }, 0))
                } else a.renderer && (c = a.url ? a.url.substring(a.url.lastIndexOf("/") +
                    1, a.url.length) : "fc_" + a.id, b = this._buildLegendItems(a, {
                    id: c,
                    name: null,
                    subLayerIds: null,
                    parentLayerId: -1
                }, 0));
                b && (t.set(q.byId(this.id + "_" + a.id), "display", "block"), t.set(q.byId(this.id + "_msg"), "display", "none"))
            }
        },
        _legendRequest: function(a) {
            if (a.loaded) return 10.01 <= a.version ? this._legendRequestServer(a) : this._legendRequestTools(a);
            n.connect(a, "onLoad", s.hitch(this, "_legendRequest"))
        },
        _legendRequestServer: function(a) {
            var b = a.url,
                c = b.indexOf("?"),
                b = -1 < c ? b.substring(0, c) + "/legend" + b.substring(c) : b + "/legend";
            (c = a._getToken()) && (b += "?token\x3d" + c);
            var d = s.hitch(this, "_processLegendResponse"),
                c = {
                    f: "json"
                };
            a._params.dynamicLayers && (c.dynamicLayers = N.stringify(this._createDynamicLayers(a)), "[{}]" === c.dynamicLayers && (c.dynamicLayers = "[]"));
            a._params.bandIds && (c.bandIds = a._params.bandIds);
            a._params.renderingRule && (c.renderingRule = a._params.renderingRule);
            return I({
                url: b,
                content: c,
                callbackParamName: "callback",
                load: function(b, c) {
                    d(a, b, c)
                },
                error: H.defaults.io.errorHandler
            })
        },
        _legendRequestTools: function(a) {
            var b =
                a.url.toLowerCase().indexOf("/rest/"),
                b = a.url.substring(0, b) + a.url.substring(b + 5, a.url.length),
                b = this._legendUrl + "?soapUrl\x3d" + window.escape(b);
            if (!v("ie") || 8 < v("ie")) b += "\x26returnbytes\x3dtrue";
            var c = s.hitch(this, "_processLegendResponse");
            return I({
                url: b,
                content: {
                    f: "json"
                },
                callbackParamName: "callback",
                load: function(b, f) {
                    c(a, b, f)
                },
                error: H.defaults.io.errorHandler
            })
        },
        _processLegendResponse: function(a, b) {
            b && b.layers ? (a.legendResponse = b, q.byId(this.id + "_" + a.id) && e.empty(q.byId(this.id + "_" + a.id)), e.create("span", {
                innerHTML: this._getServiceTitle(a),
                "class": "esriLegendServiceLabel"
            }, e.create("td", {
                align: this._align
            }, e.create("tr", {}, e.create("tbody", {}, e.create("table", {
                width: "95%"
            }, q.byId(this.id + "_" + a.id)))))), this._createLegendForLayer(a)) : console.log("Legend could not get generated for " + a.url + ": " + L.toJson(b))
        },
        _buildLegendItems: function(a, b, c) {
            var d = !1,
                f = q.byId(this.id + "_" + a.id),
                g = b.parentLayerId;
            if (b.subLayerIds) a = e.create("div", {
                id: this.id + "_" + a.id + "_" + b.id + "_group",
                style: {
                    display: "none"
                },
                "class": -1 ==
                    g ? 0 < c ? "esriLegendGroupLayer" : "" : this._legendAlign
            }, -1 == g ? f : q.byId(this.id + "_" + a.id + "_" + g + "_group")), e.create("td", {
                innerHTML: b.name,
                align: this._align
            }, e.create("tr", {}, e.create("tbody", {}, e.create("table", {
                width: "95%",
                "class": "esriLegendLayerLabel"
            }, a))));
            else {
                if (a.visibleLayers && -1 == ("," + a.visibleLayers + ",").indexOf("," + b.id + ",")) return d;
                c = e.create("div", {
                    id: this.id + "_" + a.id + "_" + b.id,
                    style: {
                        display: "none"
                    },
                    "class": -1 < g ? this._legendAlign : ""
                }, -1 == g ? f : q.byId(this.id + "_" + a.id + "_" + g + "_group"));
                e.create("td", {
                    innerHTML: b.name || "",
                    align: this._align
                }, e.create("tr", {}, e.create("tbody", {}, e.create("table", {
                    width: "95%",
                    "class": "esriLegendLayerLabel"
                }, c))));
                a.legendResponse ? d = d || this._buildLegendItems_Tools(a, b, c) : a.renderer && (d = d || this._buildLegendItems_Renderer(a, b, c))
            }
            return d
        },
        _buildLegendItems_Tools: function(a, b, c) {
            var d = b.parentLayerId,
                f = this.map.getScale(),
                g = !1,
                p = function(a, b) {
                    var c, d;
                    for (c = 0; c < a.length; c++)
                        if (b.dynamicLayerInfos)
                            for (d = 0; d < b.dynamicLayerInfos[d].length; d++) {
                                if (b.dynamicLayerInfos[d].mapLayerId ==
                                    a[c].layerId) return a[c]
                            } else if (b.id == a[c].layerId) return a[c];
                    return {}
                };
            if (!this._respectCurrentMapScale || this._respectCurrentMapScale && this._isLayerInScale(a, b, f)) {
                var l = !0;
                if ("esri.layers.ArcGISDynamicMapServiceLayer" === a.declaredClass || "esri.layers.ArcGISMapServiceLayer" === a.declaredClass) {
                    var k = this._getEffectiveScale(a, b);
                    if (k.minScale && k.minScale < f || k.maxScale && k.maxScale > f) l = !1
                }
                if (l) {
                    var f = p(a.legendResponse.layers, b),
                        h = f.legendType,
                        w = f.legend;
                    if (w) {
                        c = e.create("table", {
                            cellpadding: 0,
                            cellspacing: 0,
                            width: "95%",
                            "class": "esriLegendLayer"
                        }, c);
                        var r = e.create("tbody", {}, c);
                        (a._hoverLabel || a._hoverLabels) && this._createHoverAction(c, a, b);
                        m.forEach(w, function(c) {
                            if (!(10.1 <= a.version && !c.values && 1 < w.length && (a._hideDefaultSymbol || "\x3call other values\x3e" === c.label || !c.label && !("esri.layers.ArcGISImageServiceLayer" === a.declaredClass && 10.3 <= a.version))))
                                if (c.url && 0 === c.url.indexOf("http") || c.imageData && 0 < c.imageData.length) g = !0, this._buildRow_Tools(c, r, a, b.id, h)
                        }, this)
                    }
                }
            }
            g && (t.set(q.byId(this.id + "_" +
                a.id + "_" + b.id), "display", "block"), -1 < d && (t.set(q.byId(this.id + "_" + a.id + "_" + d + "_group"), "display", "block"), this._findParentGroup(a.id, a, d)));
            return g
        },
        _buildRow_Tools: function(a, b, c, d, f) {
            var g = e.create("tr", {}, b),
                p;
            this.alignRight ? (b = e.create("td", {
                align: this._isRightToLeft ? "left" : "right"
            }, g), p = e.create("td", {
                align: this._isRightToLeft ? "left" : "right",
                width: 35
            }, g)) : (p = e.create("td", {
                width: 35
            }, g), b = e.create("td", {}, g));
            g = a.url;
            (!v("ie") || 9 <= v("ie") || 9 > v("ie") && "esri.layers.ArcGISImageServiceLayer" ===
                c.declaredClass) && a.imageData && 0 < a.imageData.length ? g = "data:image/png;base64," + a.imageData : 0 !== a.url.indexOf("http") && (g = c.url + "/" + d + "/images/" + a.url, (d = c._getToken()) && (g += "?token\x3d" + d));
            d = e.create("img", {
                src: g,
                border: 0,
                style: "opacity:" + c.opacity
            }, p);
            a = e.create("td", {
                innerHTML: a.label,
                align: this._align
            }, e.create("tr", {}, e.create("tbody", {}, e.create("table", {
                width: "95%",
                dir: "ltr"
            }, b))));
            f && ("Stretched" === f && 10.3 <= c.version && "esri.layers.ArcGISImageServiceLayer" === c.declaredClass) && (a.style.verticalAlign =
                "top", a.style.lineHeight = "1", d.style.marginBottom = "-1px", d.style.display = "block", b.style.verticalAlign = "top");
            9 > v("ie") && (d.style.filter = "alpha(opacity\x3d" + 100 * c.opacity + ")")
        },
        _getVariable: function(a, b) {
            return a ? a[b] || m.filter(a.visualVariables, function(a) {
                return a.type === b
            })[0] : null
        },
        _buildLegendItems_Renderer: function(a, b, c) {
            var d = b.parentLayerId,
                f = this.map,
                g = f.getScale(),
                p = !1;
            if (!this._respectCurrentMapScale || this._isLayerInScale(a, b, g)) {
                var l, k, h = a.renderer,
                    w, r, u, n, z;
                if (h instanceof R && (h = (h =
                        "zoom" === h.rangeType ? h.getRendererInfoByZoom(f.getZoom()) : h.getRendererInfoByScale(g)) && h.renderer, !h)) return !1;
                var f = this._getVariable(h, "colorInfo"),
                    g = this._getVariable(h, "opacityInfo"),
                    v = this._getVariable(h, "sizeInfo");
                f ? (w = this._getMedianColor(h, f), f.field && (u = s.isFunction(f.field) ? null : a._getField(f.field, !0))) : g && (z = s.isFunction(g.field) ? null : a._getField(g.field, !0));
                v && v.field && (n = s.isFunction(v.field) ? null : a._getField(v.field, !0));
                if (h instanceof U) p = !0, this._showHeatRamp(a, b, h, c);
                else if (h instanceof S) p = !0, this._showDotDensityLegend(a, b, h, c);
                else if (h instanceof T) p = !0, k = e.create("table", {
                    cellpadding: 0,
                    cellspacing: 0,
                    width: "95%",
                    "class": "esriLegendLayer"
                }, c), l = e.create("tbody", {}, k), (a._hoverLabel || a._hoverLabels) && this._createHoverAction(k, a, b), h.latestObservationRenderer && h.latestObservationRenderer instanceof B && this._buildRow_Renderer(a, h.latestObservationRenderer.symbol, w, h.latestObservationRenderer.label || this.NLS_currentObservations, null, l), h.observationRenderer && h.observationRenderer instanceof
                B && this._buildRow_Renderer(a, h.observationRenderer.symbol, w, h.observationRenderer.label || this.NLS_previousObservations, null, l);
                else if (h instanceof J) {
                    if (h.infos && 0 < h.infos.length) {
                        p = !0;
                        k = e.create("table", {
                            cellpadding: 0,
                            cellspacing: 0,
                            width: "95%",
                            "class": "esriLegendLayer"
                        }, c);
                        l = e.create("tbody", {}, k);
                        (a._hoverLabel || a._hoverLabels) && this._createHoverAction(k, a, b);
                        var x = [];
                        m.forEach(h.infos, function(b) {
                            var c = null;
                            a._editable && a.types && (c = this._getTemplateFromTypes(a.types, b.value));
                            var d = b.label;
                            null ==
                                d && (d = b.value); - 1 === m.indexOf(x, d) && (x.push(d), this._buildRow_Renderer(a, b.symbol, w, d, c, l))
                        }, this)
                    }
                } else h instanceof E ? h.infos && 0 < h.infos.length && (p = !0, k = e.create("table", {
                    cellpadding: 0,
                    cellspacing: 0,
                    width: "95%",
                    "class": "esriLegendLayer"
                }, c), l = e.create("tbody", {}, k), (a._hoverLabel || a._hoverLabels) && this._createHoverAction(k, a, b), m.forEach(h.infos, function(b) {
                    var c = b.label;
                    null == c && (c = b.minValue + " - " + b.maxValue);
                    this._buildRow_Renderer(a, b.symbol, w, c, null, l)
                }, this)) : h instanceof B && (p = !0, k = e.create("table", {
                    cellpadding: 0,
                    cellspacing: 0,
                    width: "95%",
                    "class": "esriLegendLayer"
                }, c), l = e.create("tbody", {}, k), (a._hoverLabel || a._hoverLabels) && this._createHoverAction(k, a, b), r = null, a._editable && (a.templates && 0 < a.templates.length) && (r = a.templates[0]), k = (u || z) && n ? null : u || z || n, this._buildRow_Renderer(a, h.symbol, w, k ? k.alias || k.name : h.label, r, l), r = h.symbol && h.symbol.color, k && (u = z = n = null));
                p && (f && f.field ? (u && this._isSmartRenderer(h, u.name) && (u = null), this._showColorRamp(a, b, h, null, c, f, u)) : g && r && this._showColorRamp(a,
                    b, h, r, c, g, z), v && v.field && (n && this._isSmartRenderer(h, n.name) && (n = null), this._showSizeLegend(a, b, h, v, w, c, n)));
                !a._hideDefaultSymbol && h.defaultSymbol && (p = !0, k = e.create("table", {
                    cellpadding: 0,
                    cellspacing: 0,
                    width: "95%",
                    "class": "esriLegendLayer"
                }, c), l = e.create("tbody", {}, k), this._buildRow_Renderer(a, h.defaultSymbol, null, h.defaultLabel || "others", null, l))
            }
            p && (t.set(q.byId(this.id + "_" + a.id + "_" + b.id), "display", "block"), -1 < d && (t.set(q.byId(this.id + "_" + a.id + "_" + d + "_group"), "display", "block"), this._findParentGroup(a.id,
                d)));
            return p
        },
        _isSmartRenderer: function(a, b) {
            return a instanceof E && a.infos && 1 === a.infos.length && a.attributeField === b
        },
        _showColorRamp: function(a, b, c, d, f, g, p) {
            var l;
            l = e.create("table", {
                cellpadding: 0,
                cellspacing: 0,
                width: "95%",
                "class": "esriLegendLayer"
            }, f);
            f = e.create("tbody", {}, l);
            (a._hoverLabel || a._hoverLabels) && this._createHoverAction(l, a, b);
            p && this._addSubHeader(f, p.alias || p.name);
            b = this._getRampStops(c, g, d);
            b.length && this._drawColorRamp(f, b, a)
        },
        _getMedianColor: function(a, b) {
            var c, d;
            b.colors ? (c =
                b.minDataValue, d = b.maxDataValue) : b.stops && (c = b.stops[0].value, d = b.stops[b.stops.length - 1].value);
            return a.getColor(c + (d - c) / 2, {
                colorInfo: b
            })
        },
        _getRampStops: function(a, b, c) {
            var d, f, g, p, e = !1;
            b.colors || b.opacityValues ? (f = b.maxDataValue - b.minDataValue, d = m.map([0, 0.25, 0.5, 0.75, 1], function(a) {
                g = b.minDataValue + a * f;
                return Number(g.toFixed(6))
            }), this._checkPrecision(0, 4, d)) : b.stops && (d = m.map(b.stops, function(a) {
                return a.value
            }), (e = m.some(b.stops, function(a) {
                return !!a.label
            })) && (p = m.map(b.stops, function(a) {
                return a.label
            })));
            var k = d[0],
                h, n, r;
            f = d[d.length - 1] - k;
            return m.map(d, function(g, m) {
                c ? (h = new y(c.toRgba()), n = a.getOpacity(g, {
                    opacityInfo: b
                }), null != n && (h.a = n)) : h = a.getColor(g, {
                    colorInfo: b
                });
                r = "";
                0 === m ? r = "\u2264 " : m === d.length - 1 && (r = "\u2265 ");
                return {
                    value: g,
                    color: h,
                    offset: 1 - (g - k) / f,
                    label: e ? p[m] : r + F.format(g, {
                        places: 20,
                        round: -1
                    }).replace(this.reZerosFractional, "$1").replace(this.reZeros, "")
                }
            }, this).reverse()
        },
        _checkPrecision: function(a, b, c) {
            var d = a + (b - a) / 2,
                f = c[a],
                g = c[d],
                p = c[b],
                e = Math.floor(f),
                k = Math.floor(g),
                h = Math.floor(p);
            e === f && (h === p && k !== g && e !== k && h !== k) && (c[d] = k);
            a + 1 !== d && this._checkPrecision(a, d, c);
            d + 1 !== b && this._checkPrecision(d, b, c)
        },
        _drawColorRamp: function(a, b, c) {
            var d = e.create("tr", {}, a),
                f, g, p, l, k, h, n;
            this.alignRight ? (a = e.create("td", {
                align: this._isRightToLeft ? "left" : "right"
            }, d), f = e.create("td", {
                align: this._isRightToLeft ? "left" : "right",
                width: 34
            }, d)) : (f = e.create("td", {
                width: 34,
                align: "center"
            }, d), a = e.create("td", {}, d));
            g = e.create("div", {
                style: "position: relative; width:34px;"
            }, f);
            p = e.create("div", {
                    "class": "esriLegendColorRamp"
                },
                g);
            d = t.get(p, "width");
            f = t.get(p, "height");
            t.set(g, "height", f + "px");
            p = G.createSurface(p, d, f);
            9 > v("ie") && (k = p.getEventSource(), t.set(k, "position", "relative"), t.set(k.parentNode, "position", "relative"));
            try {
                h = p.createRect({
                    width: d,
                    height: f
                }), h.setFill({
                    type: "linear",
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: f,
                    colors: b
                }).setStroke(null), p.createRect({
                    width: d,
                    height: f
                }).setFill(new y([255, 255, 255, 1 - c.opacity])).setStroke(null), this._surfaceItems.push(p)
            } catch (r) {
                p.clear(), p.destroy()
            }
            l = e.create("div", {
                    "class": "esriLegendColorRampLabels"
                },
                a);
            m.forEach(b, function(a, c) {
                a.label && (n = "top:" + 100 * a.offset + "%;", e.create("div", {
                    "class": "esriLegendColorRampTick" + (c === b.length - 1 ? " esriLegendColorRampTickLast" : ""),
                    innerHTML: "\x26nbsp;",
                    style: n
                }, g), e.create("div", {
                    "class": "esriLegendColorRampLabel",
                    innerHTML: a.label,
                    style: n
                }, l))
            })
        },
        _showHeatRamp: function(a, b, c, d) {
            var f, g = c.field;
            f = e.create("table", {
                cellpadding: 0,
                cellspacing: 0,
                width: "95%",
                "class": "esriLegendLayer"
            }, d);
            d = e.create("tbody", {}, f);
            (a._hoverLabel || a._hoverLabels) && this._createHoverAction(f,
                a, b);
            (g = g && a.getField(g)) && this._addSubHeader(d, g.alias || g.name);
            b = this._getHeatmapStops(c);
            b.length && this._drawColorRamp(d, b, a)
        },
        _getHeatmapStops: function(a) {
            var b = a.colorStops;
            a = a.colors;
            var c, d, f, g;
            if (b && b[0])
                if (c = b.length - 1, a = b[0] && null != b[0].ratio) {
                    if ((a = b[c]) && 1 !== a.ratio) b = b.slice(0), b.push({
                        ratio: 1,
                        color: a.color
                    }), c++
                } else d = b[0].value, f = b[c].value - d, b = m.map(b, function(a) {
                    return {
                        color: a.color,
                        ratio: (a.value - d) / f
                    }
                });
            else a && a[0] && (c = a.length - 1, g = 1 / (a.length - 1), b = m.map(a, function(a, b) {
                return {
                    color: a,
                    ratio: b * g
                }
            }));
            b = m.map(b, function(a, b) {
                var d = "";
                0 === b ? d = "Low" : b === c && (d = "High");
                return {
                    color: a.color,
                    label: d,
                    offset: 1 - a.ratio
                }
            });
            return b.reverse()
        },
        _showDotDensityLegend: function(a, b, c, d) {
            var f = c.legendOptions,
                g, p, l, k, h, n, r, u = this.dotDensitySwatchSize,
                q = Math.round(u / 2);
            f && (p = f.backgroundColor, l = f.outline, k = f.valueUnit, h = f.dotCoverage);
            h = (h || this.dotCoverage) / 100;
            r = Math.round(u * u / Math.pow(c.dotSize, 2) * h);
            d = e.create("table", {
                cellpadding: 0,
                cellspacing: 0,
                width: "95%",
                "class": "esriLegendLayer"
            }, d);
            n = e.create("tbody", {}, d);
            (a._hoverLabel || a._hoverLabels) && this._createHoverAction(d, a, b);
            this._addSubHeader(n, D.substitute({
                value: c.dotValue,
                unit: k || ""
            }, this.NLS_dotValue));
            m.forEach(c.fields, function(b) {
                b = s.mixin({}, b);
                b.numPoints = r;
                g = new W(c._generateImageSrc(u, u, [b], {
                    x: 0,
                    y: 0
                }, {
                    x: u,
                    y: u
                }, p), l || c.outline, u, u);
                b = a._getField(b.name, !0) || b;
                this._buildRow_Renderer(a, g, null, b.alias || b.name, null, n, {
                    type: "path",
                    path: "M " + -q + "," + -q + " L " + q + "," + -q + " L " + q + "," + q + " L " + -q + "," + q + " L " + -q + "," + -q + " E"
                })
            }, this)
        },
        _showSizeLegend: function(a,
            b, c, d, f, g, p) {
            var l = d.legendOptions,
                l = l && l.customValues,
                k, h = d.minDataValue,
                n = d.maxDataValue,
                r = this._getSizeSymbol(c, f);
            "unknown" !== d.valueUnit || (!r || !l && (null == h || null == n)) || (f = e.create("table", {
                cellpadding: 0,
                cellspacing: 0,
                width: "95%",
                "class": "esriLegendLayer"
            }, g), k = e.create("tbody", {}, f), (a._hoverLabel || a._hoverLabels) && this._createHoverAction(f, a, b), p && this._addSubHeader(k, p.alias || p.name), b = l || this._getDataValues(h, n), m.forEach(b, function(b) {
                r = C.fromJson(r.toJson());
                this._applySize(r, c, d, b);
                b = F.format(b, {
                    places: 20,
                    round: -1
                }).replace(this.reZerosFractional, "$1").replace(this.reZeros, "");
                this._buildRow_Renderer(a, r, null, b, null, k)
            }, this))
        },
        _getSizeSymbol: function(a, b) {
            var c, d;
            if (a instanceof B) d = !0, c = a.symbol;
            else if (a instanceof J || a instanceof E) c = a.infos[0].symbol;
            if (c = -1 !== c.type.indexOf("fillsymbol") ? null : c) !d && "picturemarkersymbol" === c.type ? (c = new V, c.setStyle("square"), c.outline.setWidth(1)) : c = C.fromJson(c.toJson()), b ? c.setColor(new y(b.toRgba())) : d || c.setColor(new y([127, 127, 127]));
            return c
        },
        _applySize: function(a, b, c, d) {
            var f = a.type;
            c = {
                sizeInfo: c,
                shape: -1 !== f.indexOf("markersymbol") ? a.style : null
            };
            b = b.getSize(d, c);
            switch (f) {
                case "simplemarkersymbol":
                    a.setSize(b);
                    break;
                case "picturemarkersymbol":
                    a.setWidth(b);
                    a.setHeight(b);
                    break;
                case "simplelinesymbol":
                case "cartographiclinesymbol":
                    a.setWidth(b)
            }
        },
        _getDataValues: function(a, b) {
            var c = [a, b],
                d = Math.LN10,
                f = Math.log(a),
                g = Math.log(b),
                e, l, k, h, n;
            m.forEach([1, 2.5, 5], function(a) {
                h = Math.log(a);
                e = Math.ceil((f - h) / d);
                l = Math.floor((g - h) / d);
                if (!(Infinity ===
                        Math.abs(e) || Infinity === Math.abs(l)))
                    for (k = e; k < l + 1; k++) n = a * Math.pow(10, k), -1 === m.indexOf(c, n) && c.push(n)
            });
            c.sort(this._sorter);
            return c.reverse()
        },
        _sorter: function(a, b) {
            return a - b
        },
        _buildRow_Renderer: function(a, b, c, d, f, g, p) {
            var l = e.create("tr", {}, g),
                k;
            this.alignRight ? (g = e.create("td", {
                align: this._isRightToLeft ? "left" : "right"
            }, l), k = e.create("td", {
                align: this._isRightToLeft ? "left" : "right",
                width: 35
            }, l)) : (k = e.create("td", {
                width: 35,
                align: "center"
            }, l), g = e.create("td", {}, l));
            var h = l = 30;
            "simplemarkersymbol" ==
            b.type ? (l = Math.min(Math.max(l, b.size + 12), 125), h = Math.min(Math.max(h, b.size + 12), 125)) : "picturemarkersymbol" == b.type && (l = Math.min(Math.max(l, b.width), 125), h = Math.min(b.height || h, 125));
            k = e.create("div", {
                style: "width:" + l + "px;height:" + h + "px;"
            }, k);
            D.isDefined(d) && "number" === typeof d && (d = "" + d);
            e.create("td", {
                innerHTML: d || "",
                align: this._align
            }, e.create("tr", {}, e.create("tbody", {}, e.create("table", {
                width: "95%"
            }, g))));
            a = this._drawSymbol(k, b, c, l, h, f, a, p);
            this._surfaceItems.push(a)
        },
        _addSubHeader: function(a,
            b) {
            var c = e.create("tr", {}, a),
                c = e.create("td", {
                    align: this._align,
                    colspan: 2
                }, c);
            e.create("td", {
                innerHTML: b || "",
                align: this._align
            }, e.create("tr", {}, e.create("tbody", {}, e.create("table", {
                width: "95%"
            }, c))))
        },
        _drawSymbol: function(a, b, c, d, f, g, e, l) {
            b = C.fromJson(b.toJson());
            var k = e.opacity;
            c && b.setColor(new y(c.toRgba()));
            if ("simplelinesymbol" === b.type || "cartographiclinesymbol" === b.type || "textsymbol" === b.type) {
                if (!b.color) return;
                c = b.color.toRgba();
                c[3] *= k;
                b.color.setColor(c)
            } else if ("simplemarkersymbol" ===
                b.type || "simplefillsymbol" === b.type) {
                if (!b.color) return;
                c = b.color.toRgba();
                c[3] *= k;
                b.color.setColor(c);
                b.outline && b.outline.color && (c = b.outline.color.toRgba(), c[3] *= k, b.outline.color.setColor(c))
            } else "picturemarkersymbol" === b.type && (a.style.opacity = k, a.style.filter = "alpha(opacity\x3d(" + 100 * k + "))");
            a = G.createSurface(a, d, f);
            9 > v("ie") && (c = a.getEventSource(), t.set(c, "position", "relative"), t.set(c.parentNode, "position", "relative"));
            g = this._getDrawingToolShape(b, g) || C.getShapeDescriptors(b);
            var h;
            try {
                h =
                    a.createShape(l || g.defaultShape).setFill(g.fill).setStroke(g.stroke)
            } catch (n) {
                a.clear();
                a.destroy();
                return
            }
            var m = h.getBoundingBox();
            l = m.width;
            g = m.height;
            var k = -(m.x + l / 2),
                q = -(m.y + g / 2);
            c = a.getDimensions();
            k = {
                dx: k + c.width / 2,
                dy: q + c.height / 2
            };
            if ("simplemarkersymbol" === b.type && "path" === b.style) d = e._getScaleMatrix(m, b.size), h.applyTransform(P.scaleAt(d.xx, d.yy, {
                x: c.width / 2,
                y: c.height / 2
            }));
            else if (l > d || g > f) e = l / d > g / f, d = ((e ? d : f) - 5) / (e ? l : g), s.mixin(k, {
                xx: d,
                yy: d
            });
            h.applyTransform(k);
            return a
        },
        _getDrawingToolShape: function(a,
            b) {
            var c;
            switch (b ? b.drawingTool || null : null) {
                case "esriFeatureEditToolArrow":
                    c = {
                        type: "path",
                        path: "M 10,1 L 3,8 L 3,5 L -15,5 L -15,-2 L 3,-2 L 3,-5 L 10,1 E"
                    };
                    break;
                case "esriFeatureEditToolTriangle":
                    c = {
                        type: "path",
                        path: "M -10,14 L 2,-10 L 14,14 L -10,14 E"
                    };
                    break;
                case "esriFeatureEditToolRectangle":
                    c = {
                        type: "path",
                        path: "M -10,-10 L 10,-10 L 10,10 L -10,10 L -10,-10 E"
                    };
                    break;
                case "esriFeatureEditToolCircle":
                    c = {
                        type: "circle",
                        cx: 0,
                        cy: 0,
                        r: 10
                    };
                    break;
                case "esriFeatureEditToolEllipse":
                    c = {
                        type: "ellipse",
                        cx: 0,
                        cy: 0,
                        rx: 10,
                        ry: 5
                    };
                    break;
                default:
                    return null
            }
            return {
                defaultShape: c,
                fill: a.getFill(),
                stroke: a.getStroke()
            }
        },
        _repaintItems: function() {
            m.forEach(this._surfaceItems, function(a) {
                this._repaint(a)
            }, this)
        },
        _repaint: function(a) {
            if (a) {
                a.getStroke && a.setStroke && a.setStroke(a.getStroke());
                try {
                    a.getFill && a.setFill && a.setFill(a.getFill())
                } catch (b) {}
                a.children && s.isArray(a.children) && m.forEach(a.children, this._repaint, this)
            }
        },
        _createHoverAction: function(a, b, c) {
            var d = b._hoverLabel || b._hoverLabels[c.id];
            d && (b.mouseMoveHandler =
                b.mouseMoveHandler || {}, b.mouseMoveHandler[c.id] = n.connect(a, "onmousemove", s.hitch(this, function(a, b) {
                    this.mouseX = b.clientX;
                    this.mouseY = b.clientY;
                    this.hoverLabelShowing && (this.hoverLabelShowing = !1, t.set(q.byId(this.id + "_hoverLabel"), "display", "none"));
                    setTimeout(s.hitch(this, function(a, b, c) {
                        if (a == this.mouseX && b == this.mouseY && !this.hoverLabelShowing)
                            if (this.hoverLabelShowing = !0, q.byId(this.id + "_hoverLabel")) {
                                var d = q.byId(this.id + "_hoverLabel");
                                d.innerHTML = "\x3cspan\x3e" + c + "\x3c/span\x3e";
                                t.set(d, "top",
                                    b + "px");
                                t.set(d, "left", a + 15 + "px");
                                t.set(d, "display", "")
                            } else e.create("div", {
                                innerHTML: "\x3cspan\x3e" + c + "\x3c/span\x3e",
                                id: this.id + "_hoverLabel",
                                "class": "esriLegendHoverLabel",
                                style: {
                                    top: b + "px",
                                    left: a + 15 + "px"
                                }
                            }, document.body)
                    }, b.clientX, b.clientY, a), 500)
                }, d)), b.mouseOutHandler = b.mouseOutHandler || {}, b.mouseOutHandler[c.id] = n.connect(a, "onmouseout", s.hitch(this, function(a) {
                    this.mouseY = this.mouseX = -1;
                    this.hoverLabelShowing && (this.hoverLabelShowing = !1, t.set(q.byId(this.id + "_hoverLabel"), "display", "none"))
                })))
        },
        _removeHoverHandlers: function() {
            var a;
            m.forEach(this.layers, function(b) {
                if (b.mouseMoveHandler)
                    for (a in b.mouseMoveHandler) n.disconnect(b.mouseMoveHandler[a]);
                if (b.mouseOutHandler)
                    for (a in b.mouseOutHandler) n.disconnect(b.mouseOutHandler[a])
            })
        },
        _createDynamicLayers: function(a) {
            var b = [],
                c;
            m.forEach(a.dynamicLayerInfos || a.layerInfos, function(d) {
                c = {
                    id: d.id
                };
                c.source = d.source && d.source.toJson();
                var f;
                a.layerDefinitions && a.layerDefinitions[d.id] && (f = a.layerDefinitions[d.id]);
                f && (c.definitionExpression =
                    f);
                var g;
                a.layerDrawingOptions && a.layerDrawingOptions[d.id] && (g = a.layerDrawingOptions[d.id]);
                g && (c.drawingInfo = g.toJson());
                c.minScale = d.minScale || 0;
                c.maxScale = d.maxScale || 0;
                b.push(c)
            });
            return b
        },
        _getTemplateFromTypes: function(a, b) {
            var c;
            for (c = 0; c < a.length; c++)
                if (a[c].id == b && a[c].templates && 0 < a[c].templates.length) return a[c].templates[0];
            return null
        },
        _findParentGroup: function(a, b, c) {
            var d, f = b.dynamicLayerInfos || b.layerInfos;
            for (d = 0; d < f.length; d++)
                if (c == f[d].id) {
                    -1 < f[d].parentLayerId && (t.set(q.byId(this.id +
                        "_" + a + "_" + f[d].parentLayerId + "_group"), "display", "block"), this._findParentGroup(a, b, f[d].parentLayerId));
                    break
                }
        },
        _addSubLayersToHide: function(a) {
            function b(c, d) {
                var f = a.layer.dynamicLayerInfos || a.layer.layerInfos,
                    g, e;
                for (g = 0; g < f.length; g++)
                    if (f[g].id === c && f[g].subLayerIds)
                        for (e = 0; e < f[g].subLayerIds.length; e++) {
                            var l = f[g].subLayerIds[e]; - 1 === m.indexOf(d, l) && (d.push(l), b(l, d))
                        }
            }
            a.layer.layerInfos && m.forEach(a.layer._hideLayersInLegend, function(c) {
                b(c, a.layer._hideLayersInLegend)
            })
        },
        _isLayerInScale: function(a,
            b, c) {
            var d, f = !0;
            if (a.legendResponse && a.legendResponse.layers)
                for (d = 0; d < a.legendResponse.layers.length; d++) {
                    var g = a.legendResponse.layers[d];
                    if (b.id == g.layerId) {
                        var e, l;
                        !a.minScale && 0 !== a.minScale || !a.maxScale && 0 !== a.maxScale ? (0 == g.minScale && a.tileInfo && (e = a.tileInfo.lods[0].scale), 0 == g.maxScale && a.tileInfo && (l = a.tileInfo.lods[a.tileInfo.lods.length - 1].scale)) : (e = Math.min(a.minScale, g.minScale) || a.minScale || g.minScale, l = Math.max(a.maxScale, g.maxScale));
                        if (0 < e && e < c || l > c) f = !1;
                        break
                    }
                } else if (a.minScale ||
                    a.maxScale)
                    if (a.minScale && a.minScale < c || a.maxScale && a.maxScale > c) f = !1;
            return f
        },
        _getServiceTitle: function(a) {
            var b = a._titleForLegend;
            b || ((b = a.url) ? -1 < a.url.indexOf("/MapServer") ? (b = a.url.substring(0, a.url.indexOf("/MapServer")), b = b.substring(b.lastIndexOf("/") + 1, b.length)) : -1 < a.url.indexOf("/ImageServer") ? (b = a.url.substring(0, a.url.indexOf("/ImageServer")), b = b.substring(b.lastIndexOf("/") + 1, b.length)) : -1 < a.url.indexOf("/FeatureServer") && (b = a.url.substring(0, a.url.indexOf("/FeatureServer")), b = b.substring(b.lastIndexOf("/") +
                1, b.length)) : b = "", a.name && (b = 0 < b.length ? b + (" - " + a.name) : a.name));
            return Q.encode(b)
        },
        _getEffectiveScale: function(a, b) {
            var c = b.minScale,
                d = b.maxScale;
            if (D.isDefined(b.parentLayerId)) {
                var f = a.layerInfos,
                    g = b.parentLayerId,
                    e;
                for (e = f.length - 1; 0 <= e; e--)
                    if (f[e].id == g)
                        if (0 == c && 0 < f[e].minScale ? c = f[e].minScale : 0 < c && 0 == f[e].minScale || 0 < c && 0 < f[e].minScale && (c = Math.min(c, f[e].minScale)), d = Math.max(d || 0, f[e].maxScale || 0), -1 < f[e].parentLayerId) g = f[e].parentLayerId;
                        else break
            }
            return {
                minScale: c,
                maxScale: d
            }
        },
        _isSupportedLayerType: function(a) {
            return a &&
                ("esri.layers.ArcGISDynamicMapServiceLayer" === a.declaredClass || "esri.layers.ArcGISImageServiceLayer" === a.declaredClass && 10.2 <= a.version || "esri.layers.ArcGISTiledMapServiceLayer" === a.declaredClass || "esri.layers.FeatureLayer" === a.declaredClass || "esri.layers.StreamLayer" === a.declaredClass || "esri.layers.KMLLayer" === a.declaredClass || "esri.layers.GeoRSSLayer" === a.declaredClass || "esri.layers.WMSLayer" === a.declaredClass || "esri.layers.CSVLayer" === a.declaredClass) ? !0 : !1
        }
    });
    s.mixin(x, {
        ALIGN_LEFT: 0,
        ALIGN_RIGHT: 1
    });
    return x
});