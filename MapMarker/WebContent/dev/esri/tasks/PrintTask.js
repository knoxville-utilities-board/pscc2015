//>>built
define("esri/tasks/PrintTask", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/json", "dojo/_base/Deferred", "dojo/has", "../kernel", "../lang", "../layerUtils", "../deferredUtils", "../Color", "./Task", "../geometry/Polygon", "../renderers/SimpleRenderer", "../geometry/scaleUtils", "./Geoprocessor", "./PrintTemplate", "dojo/dom-construct", "dojox/gfx/_base", "dojox/gfx/canvas", "dojox/json/query", "require", "require"], function(x, h, m, t, y, z, K, u, v, A, B, C, D, E, F, G, H, I, r, w, J) {
    return x(C, {
        declaredClass: "esri.tasks.PrintTask",
        constructor: function(b, f) {
            this.url =
                b;
            this.printGp = new G(this.url);
            this._handler = h.hitch(this, this._handler);
            f && f.async && (this.async = f.async);
            this._colorEvaluator = J("$..color")
        },
        _handler: function(b, f, a, d, c) {
            try {
                var k;
                this.async ? "esriJobSucceeded" === b.jobStatus && this.printGp.getResultData(b.jobId, "Output_File", h.hitch(this, function(b) {
                    k = b.value;
                    this._successHandler([k], "onComplete", a, c)
                })) : (k = b[0].value, this._successHandler([k], "onComplete", a, c))
            } catch (g) {
                this._errorHandler(g, d, c)
            }
        },
        execute: function(b, f, a) {
            var d = this._handler,
                c = this._errorHandler,
                k = b.template || new H,
                g = k.exportOptions,
                n;
            g && (n = {
                outputSize: [g.width, g.height],
                dpi: g.dpi
            });
            this._outScale = k.outScale;
            this._preserveScale = !1 !== k.preserveScale;
            var g = k.layoutOptions,
                e, p = [];
            if (g) {
                this.legendAll = !1;
                g.legendLayers ? m.forEach(g.legendLayers, function(a) {
                    var b = {};
                    b.id = a.layerId;
                    a.subLayerIds && (b.subLayerIds = a.subLayerIds);
                    p.push(b)
                }) : this.legendAll = !0;
                var l, q;
                if ("Miles" === g.scalebarUnit || "Kilometers" === g.scalebarUnit) l = "esriKilometers", q = "esriMiles";
                else if ("Meters" === g.scalebarUnit || "Feet" ===
                    g.scalebarUnit) l = "esriMeters", q = "esriFeet";
                e = {
                    esriMiles: "mi",
                    esriKilometers: "km",
                    esriFeet: "ft",
                    esriMeters: "m"
                };
                e = {
                    titleText: g.titleText,
                    authorText: g.authorText,
                    copyrightText: g.copyrightText,
                    customTextElements: g.customTextElements,
                    scaleBarOptions: {
                        metricUnit: l,
                        metricLabel: e[l],
                        nonMetricUnit: q,
                        nonMetricLabel: e[q]
                    },
                    legendOptions: {
                        operationalLayers: p
                    }
                }
            }
            l = this._getPrintDefinition(b.map);
            b.outSpatialReference && (l.mapOptions.spatialReference = b.outSpatialReference.toJson());
            b.template && u.isDefined(b.template.showAttribution) &&
                (l.mapOptions.showAttribution = b.template.showAttribution);
            h.mixin(l, {
                exportOptions: n,
                layoutOptions: e
            });
            this.allLayerslegend && h.mixin(l.layoutOptions, {
                legendOptions: {
                    operationalLayers: this.allLayerslegend
                }
            });
            k = {
                Web_Map_as_JSON: t.toJson(u.fixJson(l)),
                Format: k.format,
                Layout_Template: k.layout
            };
            b.extraParameters && (k = h.mixin(k, b.extraParameters));
            var s = new y(A._dfdCanceller);
            b = function(b, c) {
                d(b, c, f, a, s)
            };
            n = function(b) {
                c(b, a, s)
            };
            s._pendingDfd = this.async ? this.printGp.submitJob(k, b, null, n) : this.printGp.execute(k,
                b, n);
            return s
        },
        onComplete: function() {},
        _createMultipointLayer: function() {
            return {
                layerDefinition: {
                    name: "multipointLayer",
                    geometryType: "esriGeometryMultipoint",
                    drawingInfo: {
                        renderer: null
                    }
                },
                featureSet: {
                    geometryType: "esriGeometryMultipoint",
                    features: []
                }
            }
        },
        _createPolygonLayer: function() {
            return {
                layerDefinition: {
                    name: "polygonLayer",
                    geometryType: "esriGeometryPolygon",
                    drawingInfo: {
                        renderer: null
                    }
                },
                featureSet: {
                    geometryType: "esriGeometryPolygon",
                    features: []
                }
            }
        },
        _createPointLayer: function() {
            return {
                layerDefinition: {
                    name: "pointLayer",
                    geometryType: "esriGeometryPoint",
                    drawingInfo: {
                        renderer: null
                    }
                },
                featureSet: {
                    geometryType: "esriGeometryPoint",
                    features: []
                }
            }
        },
        _createPolylineLayer: function() {
            return {
                layerDefinition: {
                    name: "polylineLayer",
                    geometryType: "esriGeometryPolyline",
                    drawingInfo: {
                        renderer: null
                    }
                },
                featureSet: {
                    geometryType: "esriGeometryPolyline",
                    features: []
                }
            }
        },
        _convertSvgSymbol: function(b) {
            if (!(8 >= z("ie")) && b.path) {
                this._canvasHolder || (this._canvasHolder = I.create("div"), this._canSurface = w.createSurface(this._canvasHolder, 200, 200));
                var f = this._canSurface.createObject(w.Path, b.path).setFill(b.color).setStroke(b.outline);
                "pendingRender" in this._canSurface && this._canSurface._render(!0);
                var a = this._canSurface.rawNode.getContext("2d"),
                    d = Math.ceil(f.getBoundingBox().width + f.getBoundingBox().x),
                    c = Math.ceil(f.getBoundingBox().height + f.getBoundingBox().y),
                    k = a.getImageData(f.getBoundingBox().x, f.getBoundingBox().y, d, c);
                a.canvas.width = d;
                a.canvas.height = c;
                a.putImageData(k, 0, 0);
                a = a.canvas.toDataURL("image/png");
                return {
                    type: "esriPMS",
                    imageData: a.substr(22,
                        a.length),
                    angle: -b.angle,
                    contentType: "image/png",
                    height: b.size ? b.size : c - f.getBoundingBox().y,
                    width: b.size ? b.size : d - f.getBoundingBox().x,
                    xoffset: b.xoffset,
                    yoffset: b.yoffset
                }
            }
        },
        _convertSvgRenderer: function(b) {
            "simple" === b.type && b.symbol && b.symbol.path ? b.symbol = this._convertSvgSymbol(b.symbol) : "uniqueValue" === b.type ? (b.defaultSymbol && b.defaultSymbol.path && (b.defaultSymbol = this._convertSvgSymbol(b.defaultSymbol)), b.uniqueValueInfos && m.forEach(b.uniqueValueInfos, function(b) {
                    b.symbol.path && (b.symbol = this._convertSvgSymbol(b.symbol))
                },
                this)) : "classBreaks" === b.type && (b.defaultSymbol && b.defaultSymbol.path && (b.defaultSymbol = this._convertSvgSymbol(b.defaultSymbol)), b.classBreakInfos && m.forEach(b.classBreakInfos, function(b) {
                b.symbol.path && (b.symbol = this._convertSvgSymbol(b.symbol))
            }, this))
        },
        _createFeatureCollection: function(b, f, a) {
            var d = this._createPolygonLayer(),
                c = this._createPolylineLayer(),
                k = this._createPointLayer(),
                g = this._createMultipointLayer(),
                n = this._createPointLayer();
            n.layerDefinition.name = "textLayer";
            delete n.layerDefinition.drawingInfo;
            "esri.layers.FeatureLayer" === b.declaredClass && (d.layerDefinition.name = c.layerDefinition.name = k.layerDefinition.name = g.layerDefinition.name = b.name || b.id);
            b.renderer && !h.isFunction(b.renderer.attributeField) ? (d.layerDefinition.drawingInfo.renderer = b.renderer.toJson(), c.layerDefinition.drawingInfo.renderer = b.renderer.toJson(), k.layerDefinition.drawingInfo.renderer = b.renderer.toJson(), g.layerDefinition.drawingInfo.renderer = b.renderer.toJson()) : (delete d.layerDefinition.drawingInfo, delete c.layerDefinition.drawingInfo,
                delete k.layerDefinition.drawingInfo, delete g.layerDefinition.drawingInfo);
            var e = b.fields;
            !e && (b.renderer && !h.isFunction(b.renderer.attributeField)) && ("esri.renderer.ClassBreaksRenderer" === b.renderer.declaredClass ? (e = [{
                name: b.renderer.attributeField,
                type: "esriFieldTypeDouble"
            }], b.renderer.normalizationField && e.push({
                name: b.renderer.normalizationField,
                type: "esriFieldTypeDouble"
            })) : "esri.renderer.UniqueValueRenderer" === b.renderer.declaredClass && (e = [{
                    name: b.renderer.attributeField,
                    type: "esriFieldTypeString"
                }],
                b.renderer.attributeField2 && e.push({
                    name: b.renderer.attributeField2,
                    type: "esriFieldTypeString"
                }), b.renderer.attributeField3 && e.push({
                    name: b.renderer.attributeField3,
                    type: "esriFieldTypeString"
                })));
            e && (d.layerDefinition.fields = e, c.layerDefinition.fields = e, k.layerDefinition.fields = e, g.layerDefinition.fields = e);
            var p;
            for (p = 0; p < b.graphics.length; p++) {
                var l = b.graphics[p];
                if (!1 !== l.visible && l.geometry && (e = l.toJson(), !e.symbol || !(e.symbol.outline && "esriCLS" === e.symbol.outline.type))) {
                    e.symbol && (e.symbol.outline &&
                        e.symbol.outline.color && e.symbol.outline.color[3]) && (e.symbol.outline.color[3] = 255);
                    if (b.renderer && !e.symbol && (h.isFunction(b.renderer.attributeField) || this._hasVisualVariables(b.renderer) || "esri.renderer.DotDensityRenderer" === b.renderer.declaredClass || a)) {
                        a = a || b.renderer;
                        var q = a.getSymbol(l);
                        if (!q) continue;
                        e.symbol = q.toJson();
                        this._hasVisualVariables(a) && this._applyVisualVariables(e.symbol, {
                            renderer: a,
                            graphic: l,
                            symbol: q,
                            mapResolution: f && f.getResolutionInMeters()
                        })
                    }
                    e.symbol && (e.symbol.path ? e.symbol =
                        this._convertSvgSymbol(e.symbol) : e.symbol.text && delete e.attributes);
                    switch (l.geometry.type) {
                        case "polygon":
                            d.featureSet.features.push(e);
                            break;
                        case "polyline":
                            c.featureSet.features.push(e);
                            break;
                        case "point":
                            e.symbol && e.symbol.text ? n.featureSet.features.push(e) : k.featureSet.features.push(e);
                            break;
                        case "multipoint":
                            g.featureSet.features.push(e);
                            break;
                        case "extent":
                            e.geometry = D.fromExtent(l.geometry).toJson(), d.featureSet.features.push(e)
                    }
                }
            }
            f = [];
            0 < d.featureSet.features.length && f.push(d);
            0 < c.featureSet.features.length &&
                f.push(c);
            0 < g.featureSet.features.length && f.push(g);
            0 < k.featureSet.features.length && f.push(k);
            0 < n.featureSet.features.length && f.push(n);
            m.forEach(f, function(a) {
                a.layerDefinition.drawingInfo && a.layerDefinition.drawingInfo.renderer && this._convertSvgRenderer(a.layerDefinition.drawingInfo.renderer)
            }, this);
            return {
                id: b.id,
                opacity: b.opacity,
                minScale: b.minScale || 0,
                maxScale: b.maxScale || 0,
                featureCollection: {
                    layers: f
                }
            }
        },
        _getPrintDefinition: function(b) {
            var f = {
                    operationalLayers: this._createOperationalLayers(b)
                },
                a = b.extent,
                d = b.spatialReference;
            b.spatialReference._isWrappable() && (a = a._normalize(!0), d = a.spatialReference);
            a = {
                mapOptions: {
                    showAttribution: b.showAttribution,
                    extent: a.toJson(),
                    spatialReference: d.toJson()
                }
            };
            this._preserveScale && h.mixin(a.mapOptions, {
                scale: this._outScale || F.getScale(b)
            });
            b.timeExtent && h.mixin(a.mapOptions, {
                time: [b.timeExtent.startTime.getTime(), b.timeExtent.endTime.getTime()]
            });
            b = {};
            h.mixin(b, a, f);
            return b
        },
        _createOperationalLayers: function(b) {
            var f, a, d, c, k = [],
                g = [];
            this.allLayerslegend =
                this.legendAll ? [] : null;
            for (f = 0; f < b.layerIds.length; f++)
                if (a = b.getLayer(b.layerIds[f]), a.loaded && a.visible && -1 === m.indexOf(k, a.id)) switch (d = a.declaredClass, c = {
                    id: a.id,
                    title: a.id,
                    opacity: a.opacity,
                    minScale: a.minScale || 0,
                    maxScale: a.maxScale || 0
                }, c = h.mixin(c, this._getUrlAndToken(a)), d) {
                    case "esri.layers.ArcGISDynamicMapServiceLayer":
                        var n = [];
                        d = !!a._params.layers;
                        if (a._params.dynamicLayers) d = t.fromJson(a._params.dynamicLayers), m.forEach(d, function(a) {
                            n.push({
                                id: a.id,
                                name: a.name,
                                layerDefinition: a
                            });
                            delete a.id;
                            delete a.name;
                            delete a.maxScale;
                            delete a.minScale
                        });
                        else if (a.supportsDynamicLayers) {
                            if (d || a.layerDefinitions || a.layerTimeOptions) {
                                var e = a.createDynamicLayerInfosFromLayerInfos(),
                                    p = null;
                                d && (p = a.visibleLayers);
                                var p = v._getVisibleLayers(e, p),
                                    l = v._getLayersForScale(this._outScale || b.getScale(), e);
                                m.forEach(e, function(b) {
                                    if (!b.subLayerIds) {
                                        var c = b.id; - 1 < m.indexOf(p, c) && -1 < m.indexOf(l, c) && (b = {
                                                source: b.source.toJson()
                                            }, a.layerDefinitions && a.layerDefinitions[c] && (b.definitionExpression = a.layerDefinitions[c]),
                                            a.layerTimeOptions && a.layerTimeOptions[c] && (b.layerTimeOptions = a.layerTimeOptions[c].toJson()), n.push({
                                                id: c,
                                                layerDefinition: b
                                            }))
                                    }
                                });
                                0 === n.length && (c.visibleLayers = [-1])
                            }
                        } else m.forEach(a.layerInfos, function(b) {
                            var c = {
                                id: b.id,
                                layerDefinition: {}
                            };
                            a.layerDefinitions && a.layerDefinitions[b.id] && (c.layerDefinition.definitionExpression = a.layerDefinitions[b.id]);
                            a.layerTimeOptions && a.layerTimeOptions[b.id] && (c.layerDefinition.layerTimeOptions = a.layerTimeOptions[b.id].toJson());
                            (c.layerDefinition.definitionExpression ||
                                c.layerDefinition.layerTimeOptions) && n.push(c)
                        }), d && (c.visibleLayers = a.visibleLayers);
                        n.length && (c.layers = n);
                        g.push(c);
                        this.allLayerslegend && this.allLayerslegend.push({
                            id: a.id,
                            subLayerIds: a.visibleLayers
                        });
                        break;
                    case "esri.layers.ArcGISImageServiceLayer":
                        c = h.mixin(c, {
                            url: a.url,
                            bandIds: a.bandIds,
                            compressionQuality: a.compressionQuality,
                            format: a.format,
                            interpolation: a.interpolation
                        });
                        a.mosaicRule && h.mixin(c, {
                            mosaicRule: a.mosaicRule.toJson()
                        });
                        a.renderingRule && h.mixin(c, {
                            renderingRule: a.renderingRule.toJson()
                        });
                        g.push(c);
                        this.allLayerslegend && this.allLayerslegend.push({
                            id: a.id
                        });
                        break;
                    case "esri.layers.WMSLayer":
                        c = h.mixin(c, {
                            url: a.url,
                            title: a.title,
                            type: "wms",
                            version: a.version,
                            transparentBackground: a.imageTransparency,
                            visibleLayers: a.visibleLayers
                        });
                        g.push(c);
                        this.allLayerslegend && this.allLayerslegend.push({
                            id: a.id,
                            subLayerIds: a.visibleLayers
                        });
                        break;
                    case "esri.virtualearth.VETiledLayer":
                        d = a.mapStyle;
                        "aerialWithLabels" === d && (d = "Hybrid");
                        c = h.mixin(c, {
                            visibility: a.visible,
                            type: "BingMaps" + d,
                            culture: a.culture,
                            key: a.bingMapsKey
                        });
                        g.push(c);
                        break;
                    case "esri.layers.OpenStreetMapLayer":
                        c = h.mixin(c, {
                            type: "OpenStreetMap",
                            url: a.tileServers[0]
                        });
                        g.push(c);
                        break;
                    case "esri.layers.WMTSLayer":
                        c = h.mixin(c, {
                            url: a.url,
                            type: "wmts",
                            layer: a._identifier,
                            style: a._style,
                            format: a.format,
                            tileMatrixSet: a._tileMatrixSetId
                        });
                        g.push(c);
                        break;
                    case "esri.layers.MapImageLayer":
                        d = a.getImages();
                        m.forEach(d, function(b, d) {
                            b.href && (c = {
                                id: a.id + "_image" + d,
                                type: "image",
                                title: a.id,
                                minScale: a.minScale || 0,
                                maxScale: a.maxScale || 0,
                                opacity: a.opacity,
                                extent: b.extent.toJson(),
                                url: b.href
                            }, g.push(c))
                        });
                        break;
                    case "esri.layers.WebTiledLayer":
                        d = a.url.replace(/\$\{/g, "{");
                        c = h.mixin(c, {
                            type: "WebTiledLayer",
                            urlTemplate: d,
                            credits: a.copyright
                        });
                        a.subDomains && 0 < a.subDomains.length && (c.subDomains = a.subDomains);
                        g.push(c);
                        break;
                    default:
                        if (a.getTileUrl || a.getImageUrl) c = h.mixin(c, {
                            url: a.url
                        }), g.push(c)
                }
                for (f = 0; f < b.graphicsLayerIds.length; f++)
                    if (a = b.getLayer(b.graphicsLayerIds[f]), a.loaded && a.visible && -1 === m.indexOf(k, a.id)) switch (d = a.declaredClass, d) {
                        case "esri.layers.FeatureLayer":
                        case "esri.layers.LabelLayer":
                        case "esri.layers.CSVLayer":
                            d =
                                null;
                            a.url && a.renderer && ("esri.renderer.ScaleDependentRenderer" === a.renderer.declaredClass ? "scale" === a.renderer.rangeType ? d = a.renderer.getRendererInfoByScale(b.getScale()) && a.renderer.getRendererInfoByScale(b.getScale()).renderer : "zoom" === a.renderer.rangeType && (d = a.renderer.getRendererInfoByZoom(b.getZoom()) && a.renderer.getRendererInfoByZoom(b.getZoom()).renderer) : d = a.renderer);
                            if (d && ("esri.renderer.SimpleRenderer" === d.declaredClass || "esri.renderer.TemporalRenderer" === d.declaredClass || h.isString(d.attributeField) &&
                                    a._getField(d.attributeField, !0)) && !this._hasVisualVariables(d) && "esri.renderer.DotDensityRenderer" !== d.declaredClass && "esri.layers.CSVLayer" !== a.declaredClass)
                                if (c = {
                                        id: a.id,
                                        title: a.id,
                                        opacity: a.opacity,
                                        minScale: a.minScale || 0,
                                        maxScale: a.maxScale || 0,
                                        layerDefinition: {
                                            drawingInfo: {
                                                renderer: d.toJson()
                                            }
                                        }
                                    }, c = h.mixin(c, this._getUrlAndToken(a)), "esri.renderer.TemporalRenderer" === d.declaredClass && (e = c.layerDefinition.drawingInfo, e.latestObservationRenderer = e.renderer.latestObservationRenderer, e.trackLinesRenderer =
                                        e.renderer.trackRenderer, e.observationAger = e.renderer.observationAger, e.renderer = e.renderer.observationRenderer, a._trackIdField && (c.layerDefinition.timeInfo = {
                                            trackIdField: a._trackIdField
                                        })), this._convertSvgRenderer(c.layerDefinition.drawingInfo.renderer), 1 > a.opacity || "esri.renderer.TemporalRenderer" === d.declaredClass || this._updateLayerOpacity(c))
                                    if (a._params.source && (d = a._params.source.toJson(), h.mixin(c.layerDefinition, {
                                            source: d
                                        })), a.getDefinitionExpression() && h.mixin(c.layerDefinition, {
                                            definitionExpression: a.getDefinitionExpression()
                                        }),
                                        2 !== a.mode) 0 < a.getSelectedFeatures().length && (d = m.map(a.getSelectedFeatures(), function(b) {
                                        return b.attributes[a.objectIdField]
                                    }), 0 < d.length && a.getSelectionSymbol() && h.mixin(c, {
                                        selectionObjectIds: d,
                                        selectionSymbol: a.getSelectionSymbol().toJson()
                                    }));
                                    else {
                                        d = m.map(a.getSelectedFeatures(), function(b) {
                                            return b.attributes[a.objectIdField]
                                        });
                                        if (0 === d.length || !a._params.drawMode) break;
                                        h.mixin(c.layerDefinition, {
                                            objectIds: d
                                        });
                                        d = null;
                                        a.getSelectionSymbol() && (d = new E(a.getSelectionSymbol()));
                                        h.mixin(c.layerDefinition.drawingInfo, {
                                            renderer: d && d.toJson()
                                        })
                                    } else c = this._createFeatureCollection(a);
                            else c = d && (this._hasVisualVariables(d) || "esri.renderer.DotDensityRenderer" === d.declaredClass) ? this._createFeatureCollection(a, b, d) : this._createFeatureCollection(a);
                            g.push(c);
                            this.allLayerslegend && this.allLayerslegend.push({
                                id: a.id
                            });
                            break;
                        case "esri.layers.GraphicsLayer":
                            c = this._createFeatureCollection(a), g.push(c), this.allLayerslegend && this.allLayerslegend.push({
                                id: a.id
                            })
                    }
                    b.graphics && 0 < b.graphics.graphics.length && (c = this._createFeatureCollection(b.graphics),
                g.push(c));
            b._labels && (c = this._createFeatureCollection(b._labels), g.push(c));
            return g
        },
        _getUrlAndToken: function(b) {
            return {
                token: b._getToken(),
                url: b._url ? b._url.path : null
            }
        },
        _updateLayerOpacity: function(b) {
            var f = this._colorEvaluator(b),
                f = m.filter(f, function(a) {
                    return h.isArray(a) && 4 === a.length
                }),
                a = !0;
            if (f.length) {
                var d = f[0][3],
                    c;
                for (c = 1; c < f.length; c++)
                    if (d !== f[c][3]) {
                        a = !1;
                        break
                    }
                if (a) {
                    b.opacity = d / 255;
                    for (c = 0; c < f.length; c++) f[c][3] = 255
                }
            }
            return a
        },
        _hasVisualVariables: function(b) {
            return this._getVariable(b,
                "sizeInfo") || this._getVariable(b, "colorInfo") || this._getVariable(b, "opacityInfo")
        },
        _getVariable: function(b, f) {
            return b ? b[f] || m.filter(b.visualVariables, function(a) {
                return a.type === f
            })[0] : null
        },
        _applyVisualVariables: function(b, f) {
            var a = f.renderer,
                d = f.graphic,
                c = f.symbol,
                k = f.mapResolution,
                g = c.type;
            if (!("textsymbol" === g || "shieldlabelsymbol" === g)) {
                var h = this._getVariable(a, "sizeInfo"),
                    e = this._getVariable(a, "colorInfo"),
                    m = this._getVariable(a, "opacityInfo");
                h && (c = a.getSize(d, {
                    sizeInfo: h,
                    shape: "simplemarkersymbol" ===
                        g ? c.style : null,
                    resolution: k
                }), null != c && ("simplemarkersymbol" === g ? b.size = r.px2pt(c) : "picturemarkersymbol" === g ? (b.width = r.px2pt(c), b.height = r.px2pt(c)) : "simplelinesymbol" === g ? b.width = r.px2pt(c) : b.outline && (b.outline.width = r.px2pt(c))));
                if (e && (e = a.getColor(d, {
                        colorInfo: e
                    })) && ("simplemarkersymbol" === g || "simplelinesymbol" === g || "simplefillsymbol" === g)) b.color = B.toJsonColor(e);
                m && (a = a.getOpacity(d, {
                    opacityInfo: m
                }), null != a && b.color && (b.color[3] = Math.round(255 * a)))
            }
        }
    })
});