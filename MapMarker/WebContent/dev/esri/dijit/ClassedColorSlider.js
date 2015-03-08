require({cache:{
'url:esri/dijit/ClassedColorSlider/templates/ClassedColorSlider.html':"<div class=\"${baseClass}\">\n  <div data-dojo-attach-point=\"_containerNode\">\n  <div data-dojo-attach-point=\"_titleNode\"></div>\n  <div data-dojo-attach-point=\"_sliderNode\"></div>\n  <div data-dojo-attach-point=\"_scaleNode\"></div>\n  </div>\n</div>"}});
//>>built
define("esri/dijit/ClassedColorSlider", ["../kernel", "dijit/_OnDijitClickMixin", "dijit/_TemplatedMixin", "dijit/_WidgetBase", "dijit/Tooltip", "dojo/number", "../dijit/RendererSlider", "../Color", "dojo/_base/array", "dojo/_base/declare", "dojo/_base/lang", "dojo/dom-style", "dojo/Evented", "dojo/has", "dojo/on", "dojox/gfx", "dojo/text!./ClassedColorSlider/templates/ClassedColorSlider.html"], function(v, m, n, p, q, r, s, w, g, l, f, h, t, x, y, k, u) {
    return l("esri.dijit.ClassedColorSlider", [p, m, n, t], {
        baseClass: "esriClassedColorSlider",
        templateString: u,
        domNode: null,
        containerNode: null,
        breakInfos: null,
        histogram: null,
        showHistogram: !0,
        handles: null,
        _histogramWidthDefault: 100,
        _rampWidthDefault: 25,
        showLabels: null,
        hideLabels: null,
        _showLabelsDefault: !0,
        _showTicksDefault: !0,
        _fieldLabel: null,
        _rampNode: null,
        _sliderHeight: null,
        _colorRampSurface: null,
        _histogramSurface: null,
        _rect: null,
        _barsGroup: null,
        _updateTimer: null,
        constructor: function(a, b) {
            l.safeMixin(this, a);
            this.inherited(arguments);
            b && (this.domNode = b, this.containerNode = this._containerNode, this.histogram = a.histogram || !1, this.histogramWidth =
                a.histogramWidth || this._histogramWidthDefault, this.rampWidth = a.rampWidth || this._rampWidthDefault, this.handles = a.handles || [], this.showLabels = a.showLabels || this._showLabelsDefault, this.showTicks = a.showTicks || this._showTicksDefault, this.breakInfos = f.clone(a.breakInfos), this.minDataValue = this.breakInfos[0].minValue, this.maxDataValue = this.breakInfos[this.breakInfos.length - 1].maxValue)
        },
        postCreate: function() {
            this.inherited(arguments);
            this._slider = new s({
                type: "classedColorSlider",
                values: this._getHandleInfo(this.breakInfos),
                minimum: this.minDataValue,
                maximum: this.maxDataValue,
                precision: 2 > Math.floor(Math.log(this.maxDataValue) / Math.log(10)) ? 2 - Math.floor(Math.log(this.maxDataValue) / Math.log(10)) : 0,
                showLabels: this.showLabels,
                showTicks: this.showTicks
            }, this._sliderNode);
            this._slider.startup()
        },
        startup: function() {
            this.inherited(arguments);
            this._rampNode = this._slider._sliderAreaRight;
            this._sliderHeight = h.get(this._rampNode, "height") || 155;
            this._colorRampSurface = k.createSurface(this._rampNode, this.rampWidth, this._sliderHeight);
            this._histogramSurface = k.createSurface(this._rampNode, this.histogramWidth, this._sliderHeight);
            h.set(this._histogramSurface.rawNode, "overflow", "visible");
            this._rect = this._colorRampSurface.createRect(this._colorRampSurface.getDimensions()).setStroke("#888");
            this._draw();
            this._slider.on("slide", f.hitch(this, function(a) {
                this._updateBreakInfos(a.values);
                this._updateBreakInfoLabels();
                this._draw()
            }));
            this._slider.on("change", f.hitch(this, function(a) {
                this.emit("change", this.breakInfos)
            }));
            this._slider.on("handle-value-change",
                f.hitch(this, function(a) {
                    this._updateBreakInfos(a.values);
                    this._updateBreakInfoLabels();
                    this._draw()
                }));
            this.statistics && this._generateStatistics();
            this.histogram && this._generateHistogram();
            this.watch("breakInfos", this._updateTimeout);
            this.watch("handles", this._updateTimeout);
            this.watch("histogram", this._showHistogram);
            this.watch("showHistogram", this._toggleHistogram)
        },
        _updateTimeout: function() {
            var a = this;
            clearTimeout(this._updateTimer);
            this._updateTimer = setTimeout(function() {
                var b = a;
                a = null;
                clearTimeout(b._updateTimer);
                b._updateRendererSlider()
            }, 0)
        },
        _updateRendererSlider: function() {
            this._slider.set("values", this.breakInfos);
            this._slider.set("handles", this.handles);
            this._slider._reset();
            this._slider._generateMoveables();
            this._draw()
        },
        _generateStatistics: function() {
            var a = this.statistics,
                b = [{
                    value: a.avg,
                    label: "average"
                }],
                b = g.filter(b, function(b) {
                    return b.value >= a.min && b.value <= a.max
                });
            g.forEach(b, f.hitch(this, function(b) {
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
                this._avgHandleTooltip = new q({
                    connectId: [this._avgHandleImage.rawNode],
                    label: "Average \x3d  " + r.format(a.avg, {
                        places: this._getPrecision()
                    })
                })
            }))
        },
        _generateHistogram: function() {
            var a;
            this._barsGroup = this._histogramSurface.createGroup();
            var b = g.map(this.histogram.bins, function(a) {
                return "object" === typeof a ? a.count : a
            });
            b.reverse();
            var c =
                this._sliderHeight / b.length;
            g.forEach(b, f.hitch(this, function(e, d) {
                a = 0 < e ? this.histogramWidth * (e / Math.max.apply(Math, b)) : 0;
                this._barsGroup.createRect({
                    width: a,
                    height: c
                }).setStroke("#c0c0c0").setFill("#aaa").setTransform(k.matrix.translate(0, c * d))
            }))
        },
        _showHistogram: function() {
            this.histogram ? this._generateHistogram() : this._barsGroup && (this._barsGroup.destroy(), this._barsGroup = null)
        },
        _toggleHistogram: function() {
            this.showHistogram ? h.set(this._histogramSurface.rawNode, "display", "inline-block") : h.set(this._histogramSurface.rawNode,
                "display", "none")
        },
        _getHandleInfo: function(a) {
            var b = [],
                c;
            for (c = 0; c < a.length - 1; c++) b.push(a[c].maxValue);
            return b
        },
        _updateBreakInfos: function(a) {
            var b, c = this.breakInfos;
            for (b = 0; b < a.length; b++) c[b].maxValue = a[b], c[b + 1].minValue = a[b]
        },
        _updateBreakInfoLabels: function() {
            var a, b, c = this.breakInfos;
            for (a = 0; a < c.length; a++) b = c[a], b.label = b.minValue + " - " + b.maxValue
        },
        _draw: function() {
            var a = this.breakInfos,
                b = this.maxDataValue,
                c = this.minDataValue,
                e = [],
                d;
            for (d = 0; d < a.length; d++) e.push({
                offset: (b - a[d].minValue) /
                    (b - c),
                color: a[d].symbol.color
            }), e.push({
                offset: (b - a[d].maxValue) / (b - c),
                color: a[d].symbol.color
            });
            e.reverse();
            this._rect.setFill({
                type: "linear",
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 200,
                colors: e
            })
        }
    })
});