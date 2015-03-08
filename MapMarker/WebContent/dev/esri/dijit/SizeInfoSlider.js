require({cache:{
'url:esri/dijit/SizeInfoSlider/templates/SizeInfoSlider.html':"<div class=\"${baseClass}\">\n  <div data-dojo-attach-point=\"_containerNode\">\n    <div data-dojo-attach-point=\"_titleNode\"></div>\n    <div data-dojo-attach-point=\"_sliderNode\"></div>\n    <div data-dojo-attach-point=\"_scaleNode\"></div>\n  </div>\n</div>"}});
//>>built
define("esri/dijit/SizeInfoSlider", ["../kernel", "dijit/_OnDijitClickMixin", "dijit/_TemplatedMixin", "dijit/_WidgetBase", "../dijit/RendererSlider", "../Color", "dojo/_base/array", "dojo/_base/declare", "dojo/_base/lang", "dojo/dom-style", "dojo/Evented", "dojo/has", "dojo/on", "dojo/number", "dojo/dom-construct", "dojo/dom-class", "dojox/gfx", "dojo/text!./SizeInfoSlider/templates/SizeInfoSlider.html"], function(y, q, r, s, t, n, m, p, f, d, u, z, A, B, v, w, g, x) {
    return p("esri.dijit.SizeInfoSlider", [s, q, r, u], {
        baseClass: "esriSizeInfoSlider",
        basePath: require.toUrl("esri/dijit/SizeInfoSlider/"),
        templateString: x,
        domNode: null,
        containerNode: null,
        values: null,
        minDataValue: null,
        maxDataValue: null,
        minSize: null,
        maxSize: null,
        histogram: null,
        showHistogram: !0,
        _histogramWidthDefault: 100,
        _rampWidthDefault: 25,
        _symbolWidthDefault: 50,
        showLabels: null,
        showTicks: null,
        _showLabelsDefault: !0,
        _showTicksDefault: !0,
        _rampNode: null,
        _sliderHeight: null,
        _barsGroup: null,
        _updateTimer: null,
        showTransparentBackground: !1,
        _transparentBackgroundNode: null,
        constructor: function(a, b) {
            p.safeMixin(this, a);
            this.inherited(arguments);
            b && (this.domNode = b, this.containerNode = this._containerNode, this.symbol = a.symbol, this.statistics = a.statistics, this.histogram = a.histogram || !1, this.sizeInfo = a.sizeInfo, this.minSize = this.sizeInfo.minSize, this.maxSize = this.sizeInfo.maxSize, this.values = [this.sizeInfo.minDataValue, this.sizeInfo.maxDataValue], this.minDataValue = a.minDataValue || this.statistics.min, this.maxDataValue = a.maxDataValue || this.statistics.max, this.histogramWidth = a.histogramWidth || this._histogramWidthDefault, this.symbolWidth = a.symbolWidth ||
                this._symbolWidthDefault, this.rampWidth = a.rampWidth || this._rampWidthDefault, this.showLabels = a.showLabels || this._showLabelsDefault, this.showTicks = a.showTicks || this._showTicksDefault, this.showTransparentBackground = a.showTransparentBackground || !1)
        },
        postCreate: function() {
            this.inherited(arguments);
            this._slider = new t({
                type: "sizeInfoSlider",
                values: this.values,
                minimum: this.minDataValue,
                maximum: this.maxDataValue,
                precision: this._getPrecision(),
                showLabels: this.showLabels,
                showTicks: this.showTicks
            }, this._sliderNode);
            this._slider.startup()
        },
        startup: function() {
            this.inherited(arguments);
            this._rampNode = this._slider._sliderAreaRight;
            this._sliderHeight = d.get(this._rampNode, "height") || 155;
            this._proportionalSymbolSurface = g.createSurface(this._rampNode, this.rampWidth, this._sliderHeight);
            this._draw();
            this._attachSymbols();
            this._slider.on("slide", f.hitch(this, function(a) {
                this._draw(a.values)
            }));
            this._slider.on("change", f.hitch(this, function(a) {
                this.values = a.values;
                this.sizeInfo.minDataValue = a.values[0];
                this.sizeInfo.maxDataValue =
                    a.values[1];
                this.emit("change", f.clone(this.sizeInfo))
            }));
            this._slider.on("handle-value-change", f.hitch(this, function(a) {
                this.values = a.values;
                this.sizeInfo.minDataValue = a.values[0];
                this.sizeInfo.maxDataValue = a.values[1];
                this._updateRendererSlider()
            }));
            this.watch("symbol", this._updateTimeout);
            this.watch("values", this._updateTimeout);
            this.watch("sizeInfo", this._updateTimeout);
            this.watch("minDataValue", this._updateTimeout);
            this.watch("maxDataValue", this._updateTimeout);
            this.watch("minSize", this._updateTimeout);
            this.watch("maxSize", this._updateTimeout);
            this._histogramSurface = g.createSurface(this._rampNode, this.histogramWidth, this._sliderHeight);
            d.set(this._histogramSurface.rawNode, "overflow", "visible");
            this.histogram && this._generateHistogram();
            this.watch("histogram", this._showHistogram);
            this.watch("showHistogram", this._toggleHistogram)
        },
        _showHistogram: function() {
            this.histogram ? this._generateHistogram() : this._barsGroup && (this._barsGroup.destroy(), this._barsGroup = null)
        },
        _toggleHistogram: function() {
            this.showHistogram ?
                d.set(this._histogramSurface.rawNode, "display", "inline-block") : d.set(this._histogramSurface.rawNode, "display", "none")
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
            this.values = [this.sizeInfo.minDataValue, this.sizeInfo.maxDataValue];
            this._slider.set("values", this.values);
            this._slider._reset();
            this._slider._generateMoveables();
            this._draw();
            this._attachSymbols()
        },
        _getPrecision: function() {
            return 2 > Math.floor(Math.log(this.maxDataValue) / Math.log(10)) ? 2 - Math.floor(Math.log(this.maxDataValue) / Math.log(10)) : 0
        },
        _generateHistogram: function() {
            var a;
            this._barsGroup = this._histogramSurface.createGroup();
            var b = m.map(this.histogram.bins, function(a) {
                return "object" === typeof a ? a.count : a
            });
            b.reverse();
            var c = this._sliderHeight / b.length;
            m.forEach(b, f.hitch(this, function(e, d) {
                a = 0 < e ? this.histogramWidth * (e / Math.max.apply(Math, b)) : 0;
                this._barsGroup.createRect({
                    width: a,
                    height: c
                }).setStroke("#c0c0c0").setFill("#aaa").setTransform(g.matrix.translate(0, c * d))
            }))
        },
        _attachSymbols: function() {
            this._attachSymbol(this._slider.moveables[0], this.minSize, "min");
            this._attachSymbol(this._slider.moveables[1], this.maxSize, "max")
        },
        _attachSymbol: function(a, b) {
            a._symbol || (a._symbol = v.create("div", {
                style: "position: absolute; left: 10px;"
            }, a));
            var c = d.get(a._handler, "height"),
                e = a._symbol,
                k = this.symbol;
            switch (k.type) {
                case "simplelinesymbol":
                    this._generateLineSymbol(a, b, c);
                    break;
                default:
                    this._generateCircleSymbol(e,
                        k, b, c)
            }
            return e
        },
        _generateLineSymbol: function(a, b, c) {
            var e = a.getElementsByClassName("handlerTick")[0];
            w.add(e, "handlerTickSize");
            a = a._symbol;
            d.set(a, "top", c / 2 - b + "px");
            d.set(a, "height", 2 * b + "px");
            d.set(a, "width", b - 4 + "px");
            a.innerHTML = "";
            c = g.createSurface(a);
            c.rawNode.style.position = "absolute";
            c.rawNode.style.top = 1 === b ? "1px" : b / 2 + "px";
            c.rawNode.style.left = "3px";
            c.setDimensions("100", b);
            c.createRect({
                width: this.rampWidth,
                height: b
            }).setFill(new n([93, 173, 221, 0.8]));
            return c
        },
        _generateCircleSymbol: function(a,
            b, c, e) {
            c /= 2;
            b.getFill();
            d.set(a, "top", e / 2 - (c + 1) + "px");
            d.set(a, "height", 2 * (c + 1) + "px");
            d.set(a, "width", c + "px");
            a.innerHTML = "";
            a = g.createSurface(a);
            a.rawNode.style.position = "absolute";
            a.setDimensions(c + 1, 2 * (c + 1));
            a.createCircle({
                cx: 0,
                cy: c + 1,
                r: c
            }).setFill(new n([93, 173, 221, 0.8])).setStroke("#888");
            return a
        },
        _draw: function(a) {
            var b = this._slider,
                c = this._sliderHeight,
                e = a ? a[1] : b.values[1],
                k = 0.5 * this.minSize,
                f = 0.5 * this.maxSize;
            a = c - Math.round(((a ? a[0] : b.values[0]) - b.minimum) / (b.maximum - b.minimum) * c);
            b = c - Math.round((e -
                b.minimum) / (b.maximum - b.minimum) * c);
            "simplelinesymbol" !== this.symbol.type && (this._proportionalSymbolSurface.clear(), this._proportionalSymbolSurface.createPath().moveTo(f, 0).lineTo(f, b).lineTo(k, a).lineTo(k, c).lineTo(0, c).lineTo(0, 0).closePath().setFill("#ddd"), d.set(this._proportionalSymbolSurface.rawNode, "overflow", "visible"))
        },
        _valuesAutoAdjust: function() {
            var a = this._slider.values,
                b, c, e, d, f, g, h, l = [];
            m.forEach(a, function(a, b) {
                a.hidden || l.push(b)
            });
            for (g = 0; g < l.length - 1; g++) {
                b = l[g];
                c = l[g + 1];
                e = c - b;
                d = a[b].value;
                f = a[c].value;
                for (h = b + 1; h < c; h++) a[h].value = d * (c - h) / e + f * (h - b) / e
            }
        },
        destroy: function() {
            this.inherited(arguments);
            this._slider.destroy()
        }
    })
});