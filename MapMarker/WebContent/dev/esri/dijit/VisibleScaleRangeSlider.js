//>>built
define("esri/dijit/VisibleScaleRangeSlider", ["../kernel", "./VisibleScaleRangeSlider/ScaleMenu", "./VisibleScaleRangeSlider/ScalePreview", "./VisibleScaleRangeSlider/ScaleRanges", "dijit/_WidgetBase", "dijit/form/DropDownButton", "dijit/popup", "dijit/Tooltip", "dijit/TooltipDialog", "dojo/_base/array", "dojo/_base/declare", "dojo/_base/lang", "dojo/aspect", "dojo/debounce", "dojo/Deferred", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/dom-style", "dojo/has", "dojo/on", "dojo/string", "dojo/throttle", "dojo/when", "dojox/form/HorizontalRangeSlider", "dojo/i18n!../nls/jsapi"], function(H, m, w, n, x, p, k, q, r, y, z, d, s, A, B, t, h, l, u, I, v, C, D, E, F, G) {
    return z([x], {
        declaredClass: "esri.dijit.VisibleScaleRangeSlider",
        baseClass: "esriVisibleScaleRangeSlider",
        map: null,
        layer: null,
        region: "en-US",
        minScale: 0,
        maxScale: 0,
        suggestedMinScale: 0,
        suggestedMaxScale: 0,
        labels: G.visibleScaleRangeSlider,
        _slider: null,
        _currentScaleIndicator: null,
        _suggestedScaleRangeIndicator: null,
        _scalePreview: null,
        _maxScaleButton: null,
        _minScaleButton: null,
        _mapUpdateHandler: null,
        _suggestedScaleRange: null,
        _scaleRanges: null,
        _suggestedScaleRangeIndicatorClickHandler: null,
        _setSuggestedScaleRangeAttr: function(a) {
            this._suggestedScaleRange = a;
            this.suggestedMinScale = Math.min(a.minScale, this.get("minimum"));
            this.suggestedMaxScale = Math.max(a.maxScale, this.get("maximum"));
            this._updateSuggestedScaleRangeIndicator()
        },
        _updateSuggestedScaleRange: function(a) {
            this._getSuggestedScaleRange(a).then(d.hitch(this, function(a) {
                this.set("suggestedScaleRange", a)
            }))
        },
        _getSuggestedScaleRange: function(a) {
            return E(a.statisticsPlugin || a.addPlugin("esri/plugins/FeatureLayerStatistics"),
                function() {
                    return a.statisticsPlugin.getSuggestedScaleRange()
                })
        },
        _getSliderIndexRange: function(a) {
            a = Math.floor(a);
            return {
                min: a,
                max: a + 0.99999
            }
        },
        _setMapAttr: function(a) {
            this._set("map", a);
            this._mapUpdateHandler && this._mapUpdateHandler.remove();
            this._ensureMapIsReady().then(d.hitch(this, function() {
                var b;
                this._scaleRanges.set("scaleRangeBounds", {
                    minScale: a.getMinScale(),
                    maxScale: a.getMaxScale()
                });
                b = this._getSliderIndexRange(this._scaleRanges.length - 1);
                this._slider.set("maximum", b.max);
                this._slider._printSliderBar();
                this._updateCurrentScaleIndicator();
                b = a.on("zoom-end", d.hitch(this, function() {
                    this._updateCurrentScaleIndicator()
                }));
                this.own(b);
                this._mapUpdateHandler = b
            }))
        },
        _ensureMapIsReady: function() {
            return this._ensureLoadedResource(this.map)
        },
        _ensureLoadedResource: function(a) {
            var b = new B;
            if (a.loaded) b.resolve();
            else a.on("load", function() {
                b.resolve()
            });
            return b.promise
        },
        _updateCurrentScaleIndicator: function() {
            var a = this._slider.minimum,
                b = this._slider.maximum,
                c = Math.min(this.map.getScale(), this.get("minimum")),
                a = 100 * ((this._mapScaleToSlider(c) - a) / (b - a));
            u.set(this._currentScaleIndicator, {
                left: a + "%"
            })
        },
        _setLayerAttr: function(a) {
            this._set("layer", a);
            this._ensureMapIsReady().then(d.hitch(this, this._ensureLayerIsReady)).then(d.hitch(this, function() {
                this._updateSuggestedScaleRange(a);
                this._updateMinMaxScaleFromLayer(a)
            }))
        },
        _ensureLayerIsReady: function() {
            return this._ensureLoadedResource(this.layer)
        },
        _updateSuggestedScaleRangeIndicator: function() {
            var a = this._slider.minimum,
                b = this._slider.maximum,
                c = this.suggestedMaxScale,
                e = this._mapScaleToSlider(this.suggestedMinScale),
                c = this._mapScaleToSlider(c),
                e = (e - a) / (b - a);
            u.set(this._suggestedScaleRangeIndicator, {
                left: 100 * e + "%",
                width: 100 * ((c - a) / (b - a) - e) + "%"
            })
        },
        _updateMinMaxScaleFromLayer: function(a) {
            0 === a.minScale ? this.set("minScale", this._mapSliderToScale(this._slider.minimum), !1, !0) : this.set("minScale", a.minScale, !1, !0);
            0 === a.maxScale ? this.set("maxScale", this._mapSliderToScale(this._slider.maximum), !1) : this.set("maxScale", a.maxScale, !1, !0)
        },
        _mapSliderToScale: function(a) {
            var b =
                this._getSliderIndexRange(a),
                c = this._scaleRanges.findScaleRangeByIndex(a);
            return this._mapToRange(a, b.min, b.max, c.minScale, c.maxScale)
        },
        _mapToRange: function(a, b, c, e, d) {
            return e + (a - b) * (d - e) / (c - b)
        },
        _setRegionAttr: function(a) {
            this._set("region", a);
            this._scalePreview.set("source", n.getScalePreviewSource(a))
        },
        _getMinimumAttr: function() {
            return this._mapSliderToScale(this._slider.minimum)
        },
        _getMaximumAttr: function() {
            return this._mapSliderToScale(this._slider.maximum)
        },
        _getMaxScaleAttr: function() {
            return this.maxScale
        },
        _setMaxScaleAttr: function(a, b) {
            this._slider.set("value", this._mapScaleToSlider(a), void 0 !== b ? b : !0, !0)
        },
        _mapScaleToSlider: function(a) {
            var b = this._scaleRanges.scaleToRangeIndex(a),
                c = this._getSliderIndexRange(b),
                b = this._scaleRanges.findScaleRangeByIndex(b);
            return this._mapToRange(a, b.minScale, b.maxScale, c.min, c.max)
        },
        _getMinScaleAttr: function() {
            return this.minScale
        },
        _setMinScaleAttr: function(a, b) {
            this._slider.set("value", this._mapScaleToSlider(a), void 0 !== b ? b : !0)
        },
        constructor: function() {
            this._scaleRanges =
                new n
        },
        buildRendering: function() {
            this.inherited(arguments);
            this._initSlider();
            this._initScalePreview();
            this._initScaleIndicators();
            this._initScaleMenus()
        },
        _initSlider: function() {
            var a = new F({
                baseClass: "esriHorizontalSlider",
                showButtons: !1,
                intermediateChanges: !0
            });
            a.placeAt(this.domNode);
            a.startup();
            this._slider = a;
            this.own(a.on("change", d.hitch(this, function(a) {
                this.minScale = this._mapSliderToScale(a[0]);
                this.maxScale = this._mapSliderToScale(a[1]);
                this._toggleSuggestedScaleRangeSnap()
            })));
            this.own(a.on("change",
                A(d.hitch(this, function() {
                    this.emit("scale-range-change", this)
                }), 100)));
            this.own(a.on("change", D(d.hitch(this, function() {
                this._updateLabelMenus()
            }), 25)))
        },
        _updateLabelMenus: function() {
            var a = this._slider.get("value"),
                b = this._maxScaleButton;
            this._minScaleButton.set("label", this._scaleRanges.getScaleRangeLabel(a[0]));
            b.set("label", this._scaleRanges.getScaleRangeLabel(a[1]))
        },
        _toggleSuggestedScaleRangeSnap: function() {
            var a = this._suggestedScaleRangeIndicatorClickHandler,
                b = 0.0010 >= Math.abs(this.minScale -
                    this.suggestedMinScale) && 0.0010 >= Math.abs(this.maxScale - this.suggestedMaxScale),
                c = this.baseClass + "Snappable";
            b ? (a.pause(), t.remove(this._suggestedScaleRangeIndicator, c)) : (a.resume(), t.add(this._suggestedScaleRangeIndicator, c))
        },
        _initScalePreview: function() {
            var a = new w;
            a.startup();
            var b = d.hitch(this, this._updateScalePreview);
            k.moveOffScreen(a);
            y.forEach([this._slider._movable.handle, this._slider._movableMax.handle], function(c) {
                c.onmouseenter = function() {
                    b(c)
                };
                c.onmousemove = function() {
                    b(c)
                };
                c.onmouseleave =
                    function() {
                        k.close(a)
                    }
            });
            this.own(a);
            this._scalePreview = a
        },
        _updateScalePreview: function(a) {
            var b = this._scalePreview,
                c = this._slider.get("value"),
                d = a === this._slider.sliderHandle ? c[0] : c[1],
                g = l.position(a),
                f = l.position(b.domNode),
                c = l.position(this._slider.sliderBarContainer);
            b.set("backgroundPosition", this._scaleRanges.getScalePreviewSpriteBackgroundPosition(d));
            d = g.x - c.x;
            f = 0.5 * f.w;
            k.open({
                parent: this,
                popup: b,
                around: a,
                orient: [d < f ? "above" : d < c.w - f ? "above-centered" : "above-alt"]
            })
        },
        _initScaleIndicators: function() {
            var a,
                b;
            b = h.create("div", {
                className: this.baseClass + "ScaleIndicatorContainer " + this.baseClass + "CurrentScaleIndicatorContainer"
            }, this._slider.sliderBarContainer);
            var c = h.create("div", {
                className: this.baseClass + "ScaleIndicatorContainer " + this.baseClass + "SuggestedScaleIndicatorContainer"
            }, this.domNode, "first");
            this._currentScaleIndicator = b = h.create("div", {
                className: this.baseClass + "CurrentScaleIndicator " + this.baseClass + "ScaleIndicator"
            }, b);
            this._suggestedScaleRangeIndicator = h.create("div", {
                className: this.baseClass +
                    "SuggestedScaleIndicator " + this.baseClass + "ScaleIndicator"
            }, c);
            a = new q({
                connectId: b
            });
            this._suggestedScaleRangeIndicatorClickHandler = c = v.pausable(this._suggestedScaleRangeIndicator, "click", d.hitch(this, function() {
                this.set({
                    maxScale: this.suggestedMaxScale,
                    minScale: this.suggestedMinScale
                })
            }));
            var e = v(b, "mouseover", d.hitch(this, function() {
                var b = C.substitute(this.labels.currentScaleTooltip, {
                    scaleLabel: this._scaleRanges.getScaleRangeLabel(this._mapScaleToSlider(this.map.getScale()))
                });
                a.set("label", b)
            }));
            b = new q({
                connectId: this._suggestedScaleRangeIndicator,
                label: this.labels.suggestedVisibleRangeTooltip
            });
            this.own(e);
            this.own(c);
            this.own(a);
            this.own(b)
        },
        _initScaleMenus: function() {
            var a = new m,
                b = new m,
                c, e, g, f;
            c = new r({
                content: a,
                baseClass: "esriScaleMenuDialog"
            });
            this.own(a.on("scale-selected", d.hitch(this, function(a) {
                g.closeDropDown();
                this.set("minScale", a.scale)
            })));
            this.own(b.on("scale-selected", d.hitch(this, function(a) {
                f.closeDropDown();
                this.set("maxScale", a.scale)
            })));
            e = new r({
                content: b,
                baseClass: "esriScaleMenuDialog"
            });
            g = new p({
                baseClass: "esriScaleMenuButton esriMinScaleMenuButton",
                dropDown: c,
                dropDownPosition: ["below", "above"]
            });
            f = new p({
                baseClass: "esriScaleMenuButton esriMaxScaleMenuButton",
                dropDown: e,
                dropDownPosition: ["below", "above"]
            });
            this.own(s.after(g, "openDropDown", d.hitch(this, function() {
                a.set("currentScale", {
                    label: g.label,
                    scale: this.get("minScale"),
                    mapScale: this.map.getScale(),
                    ranges: this._scaleRanges
                })
            })));
            this.own(s.after(f, "openDropDown", d.hitch(this, function() {
                b.set("currentScale", {
                    label: f.label,
                    scale: this.get("maxScale"),
                    mapScale: this.map.getScale(),
                    ranges: this._scaleRanges
                })
            })));
            g.placeAt(this.domNode);
            f.placeAt(this.domNode);
            this._minScaleButton = g;
            this._maxScaleButton = f
        }
    })
});