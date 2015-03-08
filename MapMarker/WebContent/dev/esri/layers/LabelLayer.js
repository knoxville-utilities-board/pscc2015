//>>built
define("esri/layers/LabelLayer", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/number", "dojo/_base/array", "dojo/_base/connect", "dojo/has", "dojox/gfx/_base", "../kernel", "../lang", "../graphic", "../PopupInfo", "./labelLayerUtils/DynamicLabelClass", "./labelLayerUtils/StaticLabelClass", "../symbols/TextSymbol", "../symbols/ShieldLabelSymbol", "../geometry/Extent", "../geometry/Point", "../geometry/webMercatorUtils", "./GraphicsLayer", "./LabelClass", "../renderers/SimpleRenderer"], function(I, x, m, y, t, n, J, u, K, v, z, A, B, C, p, r, D, E, w, F, s, G) {
    function H(a) {
        return "sizeInfo" ===
            a.type
    }
    return x(F, {
        declaredClass: "esri.layers.LabelLayer",
        constructor: function(a) {
            this.id = "labels";
            this.featureLayers = [];
            this._featureLayerInfos = [];
            this._preparedLabels = [];
            this._engineType = "STATIC";
            this._mapEventHandlers = [];
            a && (a.id && (this.id = a.id), a.mode && (this._engineType = "DYNAMIC" === a.mode.toUpperCase() ? "DYNAMIC" : "STATIC"))
        },
        _setMap: function(a) {
            var d = this.inherited(arguments);
            this._map && this._mapEventHandlers.push(this._map.on("extent-change", m.hitch(this, "refresh")));
            this.refresh();
            return d
        },
        _unsetMap: function() {
            var a;
            for (a = 0; a < this._mapEventHandlers.length; a++) n.disconnect(this._mapEventHandlers[a]);
            this.refresh();
            this.inherited(arguments)
        },
        setAlgorithmType: function(a) {
            this._engineType = a && "DYNAMIC" === a.toUpperCase() ? "DYNAMIC" : "STATIC";
            this.refresh()
        },
        addFeatureLayer: function(a, d, c, b) {
            if (!this.getFeatureLayer(a.layerId)) {
                var g = [];
                g.push(a.on("update-end", m.hitch(this, "refresh")));
                g.push(a.on("suspend", m.hitch(this, "refresh")));
                g.push(a.on("resume", m.hitch(this, "refresh")));
                g.push(a.on("edits-complete",
                    m.hitch(this, "refresh")));
                g.push(a.on("labeling-info-change", m.hitch(this, "refresh")));
                g.push(a.on("time-extent-change", m.hitch(this, "refresh")));
                g.push(a.on("show-labels-change", m.hitch(this, "refresh")));
                this._featureLayerInfos.push({
                    FeatureLayer: a,
                    LabelExpressionInfo: c,
                    LabelingOptions: b,
                    LabelRenderer: d,
                    EventHandlers: g
                });
                this.featureLayers.push(a);
                this.refresh()
            }
        },
        getFeatureLayer: function(a) {
            var d, c;
            for (d = 0; d < this.featureLayers.length; d++)
                if (c = this.featureLayers[d], void 0 !== c && c.id == a) return c;
            return null
        },
        removeFeatureLayer: function(a) {
            var d;
            a = this.getFeatureLayer(a);
            if (void 0 !== a && (d = t.indexOf(this.featureLayers, a), -1 < d)) {
                this.featureLayers.splice(d, 1);
                for (a = 0; a < this._featureLayerInfos[d].EventHandlers.length; a++) n.disconnect(this._featureLayerInfos[d].EventHandlers[a]);
                this._featureLayerInfos.splice(d, 1);
                this.refresh()
            }
        },
        removeAllFeatureLayers: function() {
            var a;
            for (a = 0; a < this.featureLayers.length; a++) {
                for (var d = 0; d < this._featureLayerInfos[a].EventHandlers.length; d++) n.disconnect(this._featureLayerInfos[a].EventHandlers[d]);
                this.featureLayers = [];
                this._featureLayerInfos = []
            }
            this.refresh()
        },
        getFeatureLayers: function() {
            return this.featureLayers
        },
        getFeatureLayerInfo: function(a) {
            var d, c;
            for (d = 0; d < this.featureLayers.length; d++)
                if (c = this.featureLayers[d], void 0 !== c && c.id == a) return this._featureLayerInfos[d];
            return null
        },
        refresh: function(a) {
            var d, c, b, g, f, h = [],
                e = "DYNAMIC" === this._engineType ? new B : new C;
            if (this._map) {
                e.setMap(this._map, this);
                this._preparedLabels = [];
                for (a = 0; a < this.featureLayers.length; a++)
                    if (c = this.featureLayers[a],
                        c.visible && c.showLabels && c.visibleAtMapScale && !c._suspended)
                        if (d = this._featureLayerInfos[a], d.LabelRenderer) {
                            if (h = c.labelingInfo)
                                if (f = h[0]) g = this._getLabelExpression(f), this._convertOptions(f);
                            b = d.LabelRenderer;
                            d.LabelExpressionInfo && (g = d.LabelExpressionInfo);
                            f = this._convertOptions(null);
                            d.LabelingOptions && (void 0 !== d.LabelingOptions.lineLabelPlacement && (f.lineLabelPlacement = d.LabelingOptions.lineLabelPlacement), void 0 !== d.LabelingOptions.lineLabelPosition && (f.lineLabelPosition = d.LabelingOptions.lineLabelPosition),
                                void 0 !== d.LabelingOptions.labelRotation && (f.labelRotation = d.LabelingOptions.labelRotation), void 0 !== d.LabelingOptions.howManyLabels && (f.howManyLabels = d.LabelingOptions.howManyLabels));
                            b instanceof s && (g = this._getLabelExpression(b), b = new G(b.symbol), f = this._convertOptions(b));
                            this._addLabels(c, b, g, f)
                        } else if (h = c.labelingInfo)
                    for (d = h.length - 1; 0 <= d; d--)
                        if (f = h[d]) b = new s(f instanceof s ? f.toJson() : f), g = this._getLabelExpression(f), f = this._convertOptions(f), this._addLabels(c, b, g, f);
                g = e._process(this._preparedLabels);
                this.clear();
                this.drawLabels(this._map, g)
            }
        },
        drawLabels: function(a, d) {
            this._scale = (a.extent.xmax - a.extent.xmin) / a.width;
            var c;
            for (c = 0; c < d.length; c++) {
                var b = d[c],
                    g = b.x,
                    f = b.y,
                    h = b.text,
                    e = b.angle,
                    k = b.layer.labelSymbol;
                "polyline" == b.layer.geometry.type && b.layer.options.labelRotation ? k.setAngle(e * (180 / Math.PI)) : k.setAngle(0);
                k.setText(h);
                b = g;
                k instanceof p && (g = k.getHeight(), e = Math.sin(e), b -= 0.25 * g * this._scale * e, f -= 0.33 * g * this._scale);
                e = new z(new E(b, f, a.extent.spatialReference));
                e.setSymbol(k);
                this.add(e)
            }
        },
        _addLabels: function(a, d, c, b) {
            var g, f, h, e;
            if (this._isWithinScaleRange(d.minScale, d.maxScale) && c && "" !== c) {
                var k = this._map,
                    l = !a.url && !k.spatialReference.equals(a.spatialReference);
                for (g = 0; g < a.graphics.length; g++)
                    if (f = a.graphics[g], !1 !== f.visible) {
                        h = f.geometry;
                        if (l) {
                            if (!w.canProject(h, k)) continue;
                            h = w.project(h, k)
                        }
                        h && (this._isWhere(d.where, f.attributes) && this._isWithinScreenArea(h)) && (e = this._buildLabelText(c, f.attributes, a.fields, b), this._addLabel(e, d, a.renderer, f, b, h, k))
                    }
            }
        },
        _isWithinScreenArea: function(a) {
            a =
                "point" === a.type ? new D(a.x, a.y, a.x, a.y, a.spatialReference) : a.getExtent();
            a = this._intersects(this._map, a);
            return null === a || 0 === a.length ? !1 : !0
        },
        _isWithinScaleRange: function(a, d) {
            var c = this._map.getScale();
            return 0 < a && c >= a || 0 < d && c <= d ? !1 : !0
        },
        _isWhere: function(a, d) {
            try {
                if (!a) return !0;
                if (a) {
                    var c = a.split(" ");
                    if (3 === c.length) return this._sqlEquation(d[c[0].substr(1, c[0].length - 2)], c[1], c[2]);
                    if (7 === c.length) {
                        var b = this._sqlEquation(d[c[0].substr(1, c[0].length - 2)], c[1], c[2]),
                            g = c[3],
                            f = this._sqlEquation(d[c[4].substr(1,
                                c[4].length - 2)], c[5], c[6]);
                        switch (g) {
                            case "AND":
                                return b && f;
                            case "OR":
                                return b || f
                        }
                    }
                }
                return !1
            } catch (h) {
                console.log("Error.: can't parse \x3d " + a)
            }
        },
        _sqlEquation: function(a, d, c) {
            switch (d) {
                case "\x3d":
                    return a == c ? !0 : !1;
                case "\x3c\x3e":
                    return a != c ? !0 : !1;
                case "\x3e":
                    return a > c ? !0 : !1;
                case "\x3e\x3d":
                    return a >= c ? !0 : !1;
                case "\x3c":
                    return a < c ? !0 : !1;
                case "\x3c\x3d":
                    return a <= c ? !0 : !1
            }
            return !1
        },
        _getSizeInfo: function(a) {
            return a ? a.sizeInfo || t.filter(a.visualVariables, H)[0] : null
        },
        _addLabel: function(a, d, c, b, g, f,
            h) {
            var e, k, l, q;
            if (a && "" !== m.trim(a) && d) {
                e = d.getSymbol(b);
                e instanceof p ? (e = new p(e.toJson()), e.setVerticalAlignment("baseline"), e.setHorizontalAlignment("center")) : e = e instanceof r ? new r(e.toJson()) : new p;
                e.setText(a);
                d.symbol = e;
                if (l = this._getProportionalSize(d.sizeInfo, b.attributes)) e instanceof p ? e.setSize(l) : e instanceof r && (e.setWidth(l), e.setHeight(l));
                q = l = 0;
                if (c) {
                    k = c.getSymbol(b);
                    var n = this._getSizeInfo(c);
                    if (n) q = l = c.getSize(b, {
                        sizeInfo: n,
                        resolution: h.getResolutionInMeters()
                    });
                    else if (k)
                        if ("simplemarkersymbol" ==
                            k.type) q = l = k.size;
                        else if ("picturemarkersymbol" == k.type) l = k.width, q = k.height;
                    else if ("simplelinesymbol" == k.type || "cartographiclinesymbol" == k.type) l = k.width
                }
                c = {};
                c.graphic = b;
                c.options = g;
                c.geometry = f;
                c.labelRenderer = d;
                c.labelSymbol = e;
                c.labelWidth = e.getWidth() / 2;
                c.labelHeight = e.getHeight() / 2;
                c.symbolWidth = u.normalizedLength(l) / 2;
                c.symbolHeight = u.normalizedLength(q) / 2;
                c.text = a;
                c.angle = e.angle;
                this._preparedLabels.push(c)
            }
        },
        _buildLabelText: function(a, d, c, b) {
            return a.replace(/{[^}]*}/g, function(a) {
                var f,
                    h = a;
                for (f = 0; f < c.length; f++)
                    if ("{" + c[f].name + "}" == a) {
                        var h = d[c[f].name],
                            e = c[f].domain;
                        if (e && m.isObject(e)) {
                            if ("codedValue" == e.type)
                                for (a = 0; a < e.codedValues.length; a++) e.codedValues[a].code == h && (h = e.codedValues[a].name);
                            else "range" == e.type && (e.minValue <= h && h <= e.maxValue) && (h = e.name);
                            break
                        }
                        e = c[f].type;
                        if ("esriFieldTypeDate" == e)(e = "DateFormat" + A.prototype._dateFormats[b && b.dateFormat || "shortDate"]) && (h = v.substitute({
                            myKey: h
                        }, "${myKey:" + e + "}"));
                        else if ("esriFieldTypeInteger" == e || "esriFieldTypeSmallInteger" ==
                            e || "esriFieldTypeLong" == e || "esriFieldTypeDouble" == e) b && (b.numberFormat && b.numberFormat.digitSeparator && b.numberFormat.places) && (h = y.format(h, {
                            places: b.numberFormat.places
                        }))
                    }
                return h
            })
        },
        _getLabelExpression: function(a) {
            return a.labelExpressionInfo ? a.labelExpressionInfo.value : this._validSyntax(a.labelExpression) ? this._convertLabelExpression(a.labelExpression) : ""
        },
        _validSyntax: function(a) {
            return /^(\s*\[[^\]]+\]\s*)+$/i.test(a)
        },
        _convertLabelExpression: function(a) {
            return a.replace(RegExp("\\[", "g"), "{").replace(RegExp("\\]",
                "g"), "}")
        },
        _getProportionalSize: function(a, d) {
            if (!a) return null;
            var c = v.substitute(d, "${" + a.field + "}", {
                first: !0
            });
            return !a.minSize || !a.maxSize || !a.minDataValue || !a.maxDataValue || !c || 0 >= a.maxDataValue - a.minDataValue ? null : (a.maxSize - a.minSize) / (a.maxDataValue - a.minDataValue) * (c - a.minDataValue) + a.minSize
        },
        _convertOptions: function(a) {
            var d = "shortDate",
                c = null,
                b = "",
                g = !0;
            a && (void 0 !== a.format && (d = a.format.dateFormat, c = {
                places: a.format.places,
                digitSeparator: a.format.digitSeparator
            }), b = a.labelPlacement);
            if ("always-horizontal" ==
                b || "esriServerPolygonPlacementAlwaysHorizontal" == b) g = !1;
            return {
                dateFormat: d,
                numberFormat: c,
                pointPriorities: "above-center" == b || "esriServerPointLabelPlacementAboveCenter" == b ? "AboveCenter" : "above-left" == b || "esriServerPointLabelPlacementAboveLeft" == b ? "AboveLeft" : "above-right" == b || "esriServerPointLabelPlacementAboveRight" == b ? "AboveRight" : "below-center" == b || "esriServerPointLabelPlacementBelowCenter" == b ? "BelowCenter" : "below-left" == b || "esriServerPointLabelPlacementBelowLeft" == b ? "BelowLeft" : "below-right" ==
                    b || "esriServerPointLabelPlacementBelowRight" == b ? "BelowRight" : "center-center" == b || "esriServerPointLabelPlacementCenterCenter" == b ? "CenterCenter" : "center-left" == b || "esriServerPointLabelPlacementCenterLeft" == b ? "CenterLeft" : "center-right" == b || "esriServerPointLabelPlacementCenterRight" == b ? "CenterRight" : "AboveRight",
                lineLabelPlacement: "above-start" == b || "below-start" == b || "center-start" == b ? "PlaceAtStart" : "above-end" == b || "below-end" == b || "center-end" == b ? "PlaceAtEnd" : "PlaceAtCenter",
                lineLabelPosition: "above-after" ==
                    b || "esriServerLinePlacementAboveAfter" == b || "above-along" == b || "esriServerLinePlacementAboveAlong" == b || "above-before" == b || "esriServerLinePlacementAboveBefore" == b || "above-start" == b || "esriServerLinePlacementAboveStart" == b || "above-end" == b || "esriServerLinePlacementAboveEnd" == b ? "Above" : "below-after" == b || "esriServerLinePlacementBelowAfter" == b || "below-along" == b || "esriServerLinePlacementBelowAlong" == b || "below-before" == b || "esriServerLinePlacementBelowBefore" == b || "below-start" == b || "esriServerLinePlacementBelowStart" ==
                    b || "below-end" == b || "esriServerLinePlacementBelowEnd" == b ? "Below" : "center-after" == b || "esriServerLinePlacementCenterAfter" == b || "center-along" == b || "esriServerLinePlacementCenterAlong" == b || "center-before" == b || "esriServerLinePlacementCenterBefore" == b || "center-start" == b || "esriServerLinePlacementCenterStart" == b || "center-end" == b || "esriServerLinePlacementCenterEnd" == b ? "OnLine" : "Above",
                labelRotation: g,
                howManyLabels: "OneLabel"
            }
        }
    })
});