require({cache:{
'url:esri/dijit/HeatmapSlider/templates/HeatmapSlider.html':"<div class=\"${baseClass}\">\n  <div data-dojo-attach-point=\"_containerNode\">\n  <div data-dojo-attach-point=\"_titleNode\"></div>\n  <div data-dojo-attach-point=\"_sliderNode\"></div>\n  <div data-dojo-attach-point=\"_scaleNode\"></div>\n  </div>\n</div>"}});
//>>built
define("esri/dijit/HeatmapSlider", ["../kernel", "dijit/_OnDijitClickMixin", "dijit/_TemplatedMixin", "dijit/_WidgetBase", "../dijit/RendererSlider", "../Color", "dojo/_base/array", "dojo/_base/declare", "dojo/_base/lang", "dojo/dom-style", "dojo/Evented", "dojo/has", "dojo/on", "dojox/gfx", "dojo/text!./HeatmapSlider/templates/HeatmapSlider.html"], function(q, f, g, h, k, r, c, b, e, l, m, s, t, n, p) {
    return b("esri.dijit.HeatmapSlider", [h, f, g, m], {
        baseClass: "esriHeatmapSlider",
        templateString: p,
        domNode: null,
        containerNode: null,
        handles: null,
        _rampWidthDefault: 25,
        showLabels: null,
        hideLabels: null,
        _showLabelsDefault: !0,
        _showTicksDefault: !0,
        _fieldLabel: null,
        _rampNode: null,
        _sliderHeight: null,
        _colorRampSurface: null,
        _rect: null,
        _updateTimer: null,
        constructor: function(a, d) {
            b.safeMixin(this, a);
            this.inherited(arguments);
            d && (this.domNode = d, this.containerNode = this._containerNode, this.histogramWidth = a.histogramWidth || this._histogramWidthDefault, this.rampWidth = a.rampWidth || this._rampWidthDefault, this.handles = a.handles || [3, 15], this.showLabels = a.showLabels || this._showLabelsDefault, this.showTicks =
                a.showTicks || this._showTicksDefault, this.colorStops = a.colorStops, this.minSliderValue = this.colorStops[3].ratio || 0.1, this.maxSliderValue = this.colorStops[15].ratio || 1)
        },
        postCreate: function() {
            this.inherited(arguments);
            this._slider = new k({
                type: "heatmapSlider",
                values: [this.minSliderValue, this.maxSliderValue],
                minimum: this.minSliderValue,
                maximum: this.maxSliderValue,
                precision: 2,
                showLabels: this.showLabels,
                showTicks: this.showTicks
            }, this._sliderNode);
            this._slider.startup()
        },
        startup: function() {
            this.inherited(arguments);
            this._rampNode = this._slider._sliderAreaRight;
            this._sliderHeight = l.get(this._rampNode, "height") || 155;
            this._colorRampSurface = n.createSurface(this._rampNode, this.rampWidth, this._sliderHeight);
            this._rect = this._colorRampSurface.createRect(this._colorRampSurface.getDimensions()).setStroke("#888");
            this._draw();
            this._slider.on("slide", e.hitch(this, function(a) {
                this._updateColorStops(a.values[0], a.values[1]);
                this._draw()
            }));
            this._slider.on("change", e.hitch(this, function(a) {
                this.emit("change", this.colorStops)
            }))
        },
        _updateColorStops: function(a, d) {
            c.forEach(this.colorStops, function(c, b) {
                2 < b && (c.ratio = a + (d - a) * ((b - 3) / 12))
            })
        },
        _draw: function() {
            var a = this.colorStops.slice(0);
            c.forEach(a, function(a) {
                a.offset = 1 - a.ratio
            });
            a.reverse();
            this._rect.setFill({
                type: "linear",
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 200 / 0.99,
                colors: a
            })
        }
    })
});