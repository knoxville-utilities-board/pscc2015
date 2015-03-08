require({cache:{
'url:esri/dijit/ColorInfoSlider/templates/ColorInfoSlider.html':"<div class=\"${baseClass}\">\n  <div data-dojo-attach-point=\"_containerNode\">\n  <div data-dojo-attach-point=\"_titleNode\"></div>\n  <div data-dojo-attach-point=\"_sliderNode\"></div>\n  <div data-dojo-attach-point=\"_scaleNode\"></div>\n  </div>\n</div>"}});
//>>built
define("esri/dijit/ColorInfoSlider", ["../kernel", "dijit/_OnDijitClickMixin", "dijit/_TemplatedMixin", "dijit/_WidgetBase", "dijit/Tooltip", "../dijit/RendererSlider", "../Color", "dojo/_base/array", "dojo/_base/declare", "dojo/_base/lang", "dojo/dom-style", "dojo/Evented", "dojo/has", "dojo/on", "dojo/number", "dojox/gfx", "dojo/text!./ColorInfoSlider/templates/ColorInfoSlider.html"], function(x, n, p, q, r, s, t, e, m, f, d, u, y, z, v, g, w) {
    return m("esri.dijit.ColorInfoSlider", [q, n, p, u], {
        baseClass: "esriColorInfoSlider",
        basePath: require.toUrl("esri/dijit/ColorInfoSlider/"),
        templateString: w,
        domNode: null,
        containerNode: null,
        colorInfo: null,
        minDataValue: null,
        maxDataValue: null,
        histogram: null,
        statistics: null,
        handles: null,
        primaryHandle: null,
        _histogramWidthDefault: 100,
        _rampWidthDefault: 25,
        showLabels: null,
        showTicks: null,
        _showLabelsDefault: !0,
        _showTicksDefault: !0,
        showHistogram: !0,
        _fieldLabel: null,
        _rampNode: null,
        _sliderHeight: null,
        _colorRampSurface: null,
        _histogramSurface: null,
        _rect: null,
        _barsGroup: null,
        _updateTimer: null,
        showTransparentBackground: !1,
        _transparentBackgroundNode: null,
        zoomOptions: {},
        constructor: function(a, c) {
            m.safeMixin(this, a);
            c && (this.domNode = c, this.containerNode = this._containerNode, this.histogram = a.histogram || !1, this.histogramWidth = a.histogramWidth || this._histogramWidthDefault, this.rampWidth = a.rampWidth || this._rampWidthDefault, this.handles = a.handles || [], this.primaryHandle = a.primaryHandle || null, this.showLabels = a.showLabels || this._showLabelsDefault, this.showTicks = a.showTicks || this._showTicksDefault, this.zoomOptions = a.zoomOptions || null, this.statistics = a.statistics || null, this.colorInfo =
                f.clone(a.colorInfo) || null, this._fieldLabel = this.colorInfo.field || null, this.statistics && this.statistics.min && this.statistics.max ? (this.minDataValue = a.minDataValue || this.statistics.min, this.maxDataValue = a.maxDataValue || this.statistics.max) : (this.minDataValue = a.minDataValue || 0, this.maxDataValue = a.maxDataValue || 100), this.showTransparentBackground = a.showTransparentBackground || !1, null !== this.zoomOptions && (this.toggleSliderBottom = this.zoomOptions.minSliderValue > this.minDataValue, this.toggleSliderTop = this.zoomOptions.maxSliderValue <
                    this.maxDataValue))
        },
        postCreate: function() {
            this._slider = new s({
                type: "colorInfoSlider",
                values: this._getHandleInfo(this.colorInfo.stops),
                minimum: this.zoomOptions ? this.zoomOptions.minSliderValue : this.minDataValue,
                maximum: this.zoomOptions ? this.zoomOptions.maxSliderValue : this.maxDataValue,
                minLabel: this.minDataValue,
                maxLabel: this.maxDataValue,
                precision: this._getPrecision(),
                showLabels: this.showLabels,
                showTicks: this.showTicks,
                handles: this.handles,
                primaryHandle: this.primaryHandle
            }, this._sliderNode);
            this._slider.startup()
        },
        startup: function() {
            this.inherited(arguments);
            this._rampNode = this._slider._sliderAreaRight;
            this._sliderHeight = d.get(this._rampNode, "height") || 155;
            this._createRampRect();
            this._slider.on("slide", f.hitch(this, function() {
                this._valuesAutoAdjust();
                this._draw()
            }));
            this._slider.on("change", f.hitch(this, function(a) {
                this.colorInfo.stops = a.values;
                this.emit("change", {
                    field: this._fieldLabel,
                    type: "colorInfo",
                    stops: this.colorInfo.stops
                })
            }));
            this._slider.on("handle-value-change", f.hitch(this, function(a) {
                this._valuesAutoAdjust();
                this._draw()
            }));
            this.statistics && this._generateStatistics();
            this.showHistogram && (this.histogram || this.zoomOptions && this.zoomOptions.histogram) && this._generateHistogram();
            this.watch("zoomOptions", this._updateTimeout);
            this.watch("colorInfo", this._updateTimeout);
            this.watch("handles", this._updateTimeout);
            this.watch("primaryHandle", this._updateTimeout);
            this.watch("histogram", this._showHistogram);
            this.watch("showHistogram", this._toggleHistogram);
            this.watch("showTransparentBackground", this._toggleTransparentBackground)
        },
        _clearRect: function() {
            console.log("_clearRect");
            this._colorRampSurface.destroy();
            this._histogramSurface.destroy()
        },
        _createRampRect: function() {
            this._colorRampSurface = g.createSurface(this._rampNode, this.rampWidth, this._sliderHeight);
            this._histogramSurface = g.createSurface(this._rampNode, this.histogramWidth, this._sliderHeight);
            d.set(this._histogramSurface.rawNode, "overflow", "visible");
            this._transparentBackgroundNode = this._generateTransparentBackground();
            this._rect = this._colorRampSurface.createRect(this._colorRampSurface.getDimensions());
            d.set(this._colorRampSurface.rawNode, "border", "1px solid #888");
            this._draw();
            null !== this.zoomOptions && (this.toggleSliderBottom && this.toggleSliderTop ? (this._colorRampSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke({
                color: "#fff",
                width: 3
            }).setTransform(g.matrix.translate(0, 5)), this._colorRampSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke({
                color: "#fff",
                width: 3
            }).setTransform(g.matrix.translate(0, 195))) : this.toggleSliderBottom ? this._colorRampSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke({
                color: "#fff",
                width: 3
            }).setTransform(g.matrix.translate(0, 190)) : this.toggleSliderTop && this._colorRampSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke({
                color: "#fff",
                width: 3
            }).setTransform(g.matrix.translate(0, 10)))
        },
        _showHistogram: function() {
            this.histogram || this.zoomOptions && this.zoomOptions.histogram ? this._generateHistogram() : this._barsGroup && (this._barsGroup.destroy(), this._barsGroup = null)
        },
        _toggleHistogram: function() {
            this.showHistogram ? d.set(this._histogramSurface.rawNode, "display", "inline-block") :
                d.set(this._histogramSurface.rawNode, "display", "none")
        },
        _updateTimeout: function() {
            var a = this;
            clearTimeout(this._updateTimer);
            this._updateTimer = setTimeout(function() {
                var c = a;
                a = null;
                clearTimeout(c._updateTimer);
                c._updateRendererSlider()
            }, 0)
        },
        _updateRendererSlider: function() {
            null !== this.zoomOptions ? (this.toggleSliderBottom = this.zoomOptions.minSliderValue > this.minDataValue, this.toggleSliderTop = this.zoomOptions.maxSliderValue < this.maxDataValue, this._slider.set("minimum", this.zoomOptions.minSliderValue),
                this._slider.set("maximum", this.zoomOptions.maxSliderValue)) : (this._slider.set("minimum", this.minDataValue), this._slider.set("maximum", this.maxDataValue));
            this._slider.set("values", this._getHandleInfo(this.colorInfo.stops));
            this._slider.set("handles", this.handles);
            this._slider.set("primaryHandle", this.primaryHandle);
            this._slider._reset();
            this._slider._generateMoveables();
            this._clearRect();
            this._createRampRect();
            this._generateHistogram();
            this.statistics && this._generateStatistics()
        },
        _getPrecision: function() {
            return 2 >
                Math.floor(Math.log(this.maxDataValue) / Math.log(10)) ? 2 - Math.floor(Math.log(this.maxDataValue) / Math.log(10)) : 0
        },
        _generateHistogram: function() {
            var a = this.zoomOptions ? this.zoomOptions.histogram : this.histogram,
                c;
            this._barsGroup = this._histogramSurface.createGroup();
            var b = e.map(a.bins, function(a) {
                return "object" === typeof a ? a.count : a
            });
            b.reverse();
            var h = this._histogramSurface.getDimensions().height / b.length;
            e.forEach(b, f.hitch(this, function(a, e) {
                c = 0 < a ? this.histogramWidth * (a / Math.max.apply(Math, b)) : 0;
                this._barsGroup.createRect({
                    width: c,
                    height: h
                }).setStroke("#c0c0c0").setFill("#aaa").setTransform(g.matrix.translate(0, h * e))
            }));
            d.set(this._histogramSurface.rawNode, {
                display: "inline-block",
                marginLeft: "4px",
                borderLeft: "1px solid #888"
            })
        },
        _generateStatistics: function() {
            var a = this.statistics,
                c = [{
                    value: a.avg,
                    label: "average"
                }],
                c = e.filter(c, function(b) {
                    return b.value >= a.min && b.value <= a.max
                });
            e.forEach(c, f.hitch(this, function(b) {
                b = this._sliderHeight * (a.max - b.value) / (a.max - a.min);
                this._avgHandleLine = this._histogramSurface.createLine({
                    x1: 0,
                    y1: b,
                    x2: 110,
                    y2: b
                }).setStroke("#c0c0c0");
                this._avgHandleImage = this._histogramSurface.createImage({
                    x: 112,
                    y: b - 8,
                    width: 12,
                    height: 14,
                    src: this.basePath + "images/xAvg.png"
                });
                this._avgHandleTooltip = new r({
                    connectId: [this._avgHandleImage.rawNode],
                    label: "Average \x3d " + v.format(a.avg, {
                        places: this._getPrecision()
                    })
                })
            }))
        },
        _generateTransparentBackground: function() {
            var a = this._colorRampSurface.createRect({
                width: this.rampWidth,
                height: this._sliderHeight
            }).setFill(this.showTransparentBackground ? this._getTransparentFill() :
                null);
            a.moveToBack();
            return a
        },
        _toggleTransparentBackground: function() {
            this.showTransparentBackground ? this._transparentBackgroundNode.setFill(this._getTransparentFill()) : this._transparentBackgroundNode.setFill(null)
        },
        _getTransparentFill: function() {
            return {
                type: "pattern",
                x: 0,
                y: 0,
                width: 16,
                height: 16,
                src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgaGVpZ2h0PSIxNiIgd2lkdGg9IjE2Ij48cGF0aCBkPSJNMCAwIEw4IDAgTDggOCBMMCA4IFoiIGZpbGw9IiNjY2MiIC8+PHBhdGggZD0iTTAgMCBMOCAwIEw4IDggTDAgOCBaIiBmaWxsPSIjZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDgpIiAvPjxwYXRoIGQ9Ik0wIDAgTDggMCBMOCA4IEwwIDggWiIgZmlsbD0iI2NjYyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOCw4KSIgLz48cGF0aCBkPSJNMCAwIEw4IDAgTDggOCBMMCA4IFoiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgsMCkiIC8+PC9zdmc+"
            }
        },
        _getHandleInfo: function(a) {
            return e.map(a, f.hitch(this, function(c, b) {
                var h = {
                    color: new t(a[b].color),
                    value: a[b].value
                }; - 1 === e.indexOf(this.handles, b) && b !== this.primaryHandle && (h.hidden = !0);
                b === this.primaryHandle && (h.primaryHandle = !0);
                return h
            }))
        },
        _valuesAutoAdjust: function() {
            var a = this._slider.values,
                c, b, h, f, g, d, k, l = [];
            e.forEach(a, function(a, b) {
                a.hidden || l.push(b)
            });
            for (d = 0; d < l.length - 1; d++) {
                c = l[d];
                b = l[d + 1];
                h = b - c;
                f = a[c].value;
                g = a[b].value;
                for (k = c + 1; k < b; k++) a[k].value = f * (b - k) / h + g * (k - c) / h
            }
        },
        _draw: function() {
            var a =
                this._slider.minimum,
                c = this._slider.maximum,
                b = this._slider.values.slice(0);
            e.forEach(b, function(b) {
                b.offset = (c - b.value) / (c - a)
            });
            b.reverse();
            null !== this.zoomOptions ? this.toggleSliderBottom && this.toggleSliderTop ? this._rect.setFill({
                type: "linear",
                x1: 0,
                y1: 10,
                x2: 0,
                y2: 190,
                colors: b
            }) : this.toggleSliderBottom ? this._rect.setFill({
                type: "linear",
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 180,
                colors: b
            }) : this.toggleSliderTop && this._rect.setFill({
                type: "linear",
                x1: 0,
                y1: 20,
                x2: 0,
                y2: 200,
                colors: b
            }) : this._rect.setFill({
                type: "linear",
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 200,
                colors: b
            })
        },
        destroy: function() {
            this.inherited(arguments);
            this._slider.destroy();
            this._avgHandleTooltip.destroy()
        }
    })
});