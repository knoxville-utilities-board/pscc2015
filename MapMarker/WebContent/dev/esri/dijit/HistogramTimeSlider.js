require({cache:{
'url:dojox/form/resources/HorizontalRangeSlider.html':"<table class=\"dijit dijitReset dijitSlider dijitSliderH dojoxRangeSlider\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" dojoAttachEvent=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\" role=\"presentation\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td dojoAttachPoint=\"topDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationT dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderDecrementIconH\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"decrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderLeftBumper\" dojoAttachEvent=\"onmousedown:_onClkDecBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><div role=\"presentation\" class=\"dojoxRangeSliderBarContainer\" dojoAttachPoint=\"sliderBarContainer\"\n\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableH\"\n\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleH\" dojoAttachPoint=\"sliderHandle,focusNode\" tabIndex=\"${tabIndex}\" dojoAttachEvent=\"onmousedown:_onHandleClick\" role=\"slider\"></div\n\t\t\t\t></div\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderProgressBar dijitSliderProgressBarH\" dojoAttachEvent=\"onmousedown:_onBarClick\"></div\n\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableH\"\n\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleH\" dojoAttachPoint=\"sliderHandleMax\" tabIndex=\"${tabIndex}\" dojoAttachEvent=\"onmousedown:_onHandleClickMax\" role=\"slider\"></div\n\t\t\t\t></div\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderRemainingBar dijitSliderRemainingBarH\" dojoAttachEvent=\"onmousedown:_onRemainingBarClick\"></div\n\t\t\t></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderRightBumper\" dojoAttachEvent=\"onmousedown:_onClkIncBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderIncrementIconH\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"incrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td dojoAttachPoint=\"containerNode,bottomDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationB dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n></table>\n",
'url:esri/dijit/templates/HistogramTimeSlider.html':"<div id=\"histogram-timeslider\" class=\"histogram-timeslider esriTimeSlider\">\n <div id=\"histogram-timeslider-dijit\">\n   <div id=\"focusTip\"></div>\n   <div id=\"scale-bar-left\"></div>\n   <div id=\"scale-bar-right\"></div>\n   <div id=\"histogram-container\"></div>\n   <div id=\"histogram-slider\"></div>\n   <div id=\"histogram-controls\">\n     <div id=\"histogram-range\"></div>\n   </div>\n  </div>\n</div>"}});
//>>built
define("esri/dijit/HistogramTimeSlider", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/connect", "dojo/has", "dojo/dom", "dojo/_base/array", "dojo/dom-style", "dojox/gfx", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojox/form/RangeSlider", "dijit/form/HorizontalSlider", "../kernel", "../lang", "../TimeExtent", "dojo/text!dojox/form/resources/HorizontalRangeSlider.html", "dojo/text!./templates/HistogramTimeSlider.html"], function(q, A, n, B, m, r, s, p, t, u, v, w, C, l, x, y, z) {
    return q([t, u], {
        declaredClass: "esri.dijit.HistogramTimeSlider",
        widgetsInTemplate: !1,
        templateString: z,
        constructor: function(a, c) {
            var b = this;
            this.layers = a.layers;
            this.element = c;
            this.bins = [];
            this.fullTimeExtent = [];
            this._mode = a.mode || "show_partial";
            this._resolution = "esriTimeUnitsSeconds";
            this._timeInterval = a.timeInterval;
            this._numeric_res = 36E5;
            this._max_bins = 400;
            this._max_bin_height = this._prev_num_bins = 0;
            this._color = a.color || "rgb(5, 112, 176)";
            this.is_streaming = this._active = !1;
            this.load_count = 0;
            this._textColor = a.textColor || "rgb(82, 95, 109)";
            this.timeField = a.timeField;
            this.dateFormat = a.dateFormat || "DateString";
            this._dateTemplate = "${date: " + this.dateFormat + "}";
            this._wire();
            this._resolutions = {
                esriTimeUnitsSeconds: [0],
                esriTimeUnitsMinutes: [0],
                esriTimeUnitsHours: [0],
                esriTimeUnitsDays: [0],
                esriTimeUnitsMonths: [0],
                esriTimeUnitsYears: [0]
            };
            this._num_resolutions = {
                esriTimeUnitsSeconds: 1E3,
                esriTimeUnitsMinutes: 6E4,
                esriTimeUnitsHours: 36E5,
                esriTimeUnitsDays: 864E5,
                esriTimeUnitsMonths: 2592E6,
                esriTimeUnitsYears: 31536E6
            };
            r.forEach(this.layers, function(a, c) {
                if (a.url) var g = a.on("update-end", function() {
                    n.disconnect(g);
                    var c,
                        e;
                    b.fullTimeExtent = b.getFullTimeExtent();
                    if (a.graphics) {
                        b.updateLength = a.graphics.length;
                        c = 0;
                        for (e = a.graphics.length; c < e; c++) b._add(a.graphics[c].attributes[a.timeInfo.startTimeField])
                    }
                });
                else b._bindStreamingEvents(a)
            })
        },
        getFullTimeExtent: function() {
            var a = null,
                c = null,
                b, d;
            b = 0;
            for (d = this.layers.length; b < d; b++)
                if (this.layers[b].timeInfo.timeExtent.startTime) {
                    var e = this.layers[b].timeInfo.timeExtent.startTime.getTime(),
                        g = this.layers[b].timeInfo.timeExtent.endTime.getTime();
                    a ? a > e ? a = e : c < g && (c = g) : (a = e,
                        c = g)
                }
            return [a, c]
        },
        getCurrentTimeExtent: function() {},
        _wire: function() {
            var a = this;
            n.connect(window, "onmouseup, blur", function() {
                a._active && a.bins.length !== a._prev_num_bins && (a._active = !1, a._prev_num_bins = a.bins.length, a._drawHistogram(), a._updateSlider())
            });
            n.connect(window, "resize", function() {
                a._prev_num_bins = a.bins.length;
                a._drawHistogram();
                a._updateSlider()
            })
        },
        _bindStreamingEvents: function(a) {
            var c = this;
            a.on("graphic-draw", function(a) {
                c.is_streaming = !0;
                c._add(a.graphic.attributes[c.timeField])
            });
            a.on("graphic-remove", function(a) {
                c.is_streaming = !0;
                a = a.graphic.attributes[c.timeField];
                "show_partial" === c._mode && c._remove(a)
            })
        },
        _nextRes: function() {
            for (var a in this._resolutions)
                if (this._resolutions[a].length <= this._max_bins) return a
        },
        _updateAllResolutions: function(a, c) {
            var b = this._timeInterval || this._resolution,
                d = this._num_resolutions[b] / 1E3,
                e = Math.floor(a * d / 60),
                g = Math.floor(a * d / 3600),
                h = Math.floor(a * d / 86400),
                k = Math.floor(a * d / 2592E3),
                d = Math.floor(a * d / 31536E3);
            if ("esriTimeUnitsSeconds" === b) {
                var f =
                    a - this._resolutions.esriTimeUnitsSeconds.length;
                if (1 <= f)
                    for (b = 0; b < f; b++) this._resolutions.esriTimeUnitsSeconds.push(0);
                this._resolutions.esriTimeUnitsSeconds[a] || (this._resolutions.esriTimeUnitsSeconds[a] = 0);
                !c ? this._resolutions.esriTimeUnitsSeconds[a] ++ : this._resolutions.esriTimeUnitsSeconds[a] --
            }
            if ("esriTimeUnitsHours" !== this._timeInterval) {
                f = e - this._resolutions.esriTimeUnitsMinutes.length;
                if (1 <= f)
                    for (b = 0; b < f; b++) this._resolutions.esriTimeUnitsMinutes.push(0);
                this._resolutions.esriTimeUnitsMinutes[e] ||
                    (this._resolutions.esriTimeUnitsMinutes[e] = 0);
                !c ? this._resolutions.esriTimeUnitsMinutes[e] ++ : this._resolutions.esriTimeUnitsMinutes[e] --
            }
            f = g - this._resolutions.esriTimeUnitsHours.length;
            if (1 <= f)
                for (b = 0; b < f; b++) this._resolutions.esriTimeUnitsHours.push(0);
            this._resolutions.esriTimeUnitsHours[g] || (this._resolutions.esriTimeUnitsHours[g] = 0);
            !c ? this._resolutions.esriTimeUnitsHours[g] ++ : this._resolutions.esriTimeUnitsHours[g] --;
            f = h - this._resolutions.esriTimeUnitsDays.length;
            if (1 <= f)
                for (b = 0; b < f; b++) this._resolutions.esriTimeUnitsDays.push(0);
            this._resolutions.esriTimeUnitsDays[h] || (this._resolutions.esriTimeUnitsDays[h] = 0);
            !c ? this._resolutions.esriTimeUnitsDays[h] ++ : this._resolutions.esriTimeUnitsDays[h] --;
            f = k - this._resolutions.esriTimeUnitsMonths.length;
            if (1 <= f)
                for (b = 0; b < f; b++) this._resolutions.esriTimeUnitsMonths.push(0);
            this._resolutions.esriTimeUnitsMonths[k] || (this._resolutions.esriTimeUnitsMonths[k] = 0);
            !c ? this._resolutions.esriTimeUnitsMonths[k] ++ : this._resolutions.esriTimeUnitsMonths[k] --;
            f = d - this._resolutions.esriTimeUnitsYears.length;
            if (1 <= f)
                for (b = 0; b < f; b++) this._resolutions.esriTimeUnitsYears.push(0);
            this._resolutions.esriTimeUnitsYears[d] || (this._resolutions.esriTimeUnitsYears[d] = 0);
            !c ? this._resolutions.esriTimeUnitsYears[d] ++ : this._resolutions.esriTimeUnitsYears[d] --;
            !this._timeInterval && this._resolutions[this._resolution].length >= this._max_bins && (this._resolution = this._nextRes());
            b = 0;
            switch (this._resolution) {
                case "esriTimeUnitsSeconds":
                    b = a;
                    this._numeric_res = 1E3;
                    break;
                case "esriTimeUnitsMinutes":
                    b = e;
                    this._numeric_res = 6E4;
                    break;
                case "esriTimeUnitsHours":
                    b = g;
                    this._numeric_res = 36E5;
                    break;
                case "esriTimeUnitsDays":
                    b = h;
                    this._numeric_res = 864E5;
                    break;
                case "esriTimeUnitsMonths":
                    b = k;
                    this._numeric_res = 2592E6;
                    break;
                case "esriTimeUnitsYears":
                    b = d, this._numeric_res = 31536E6
            }
            this._setBins(b)
        },
        _setBins: function(a) {
            this.bins = this._resolutions[this._timeInterval || this._resolution];
            for (var c = 0, b = 0; 0 === this.bins[b];) c = b + 1, b += 1;
            if (this._active) c !== this.minVisibleIndex && (this.minVisibleIndex = c);
            else if (!this.is_steaming && this.updateLength === this.load_count) {
                if (this.bins.length !==
                    this._prev_num_bins || c !== this.minVisibleIndex) this.minVisibleIndex = c, this._prev_num_bins = this.bins.length, this._drawHistogram(), this._slider && this._updateSlider()
            } else this.is_streaming && (this.bins.length != this._prev_num_bins || c != this.minVisibleIndex) ? (this.minVisibleIndex = c, this._prev_num_bins = this.bins.length, this._drawHistogram(), this._slider && this._updateSlider()) : this.is_streaming && this._updateHeights(a)
        },
        _updateFullTimeExtent: function(a) {
            this.fullTimeExtent[0] || (this.fullTimeExtent[0] = a);
            this.fullTimeExtent[1] ||
                (this.fullTimeExtent[1] = a);
            a < this.fullTimeExtent[0] && (this.fullTimeExtent[0] = a);
            a > this.fullTimeExtent[1] && (this.fullTimeExtent[1] = a)
        },
        _getBin: function(a) {
            return Math.floor((a - this.fullTimeExtent[0]) / this._num_resolutions[this._timeInterval || this._resolution])
        },
        _add: function(a) {
            var c = this._timeInterval || this._resolution;
            this.is_steaming || this.load_count++;
            this._updateFullTimeExtent(a);
            a = this._getBin(a);
            var b = a - this._resolutions[c].length,
                d;
            if (1 <= b)
                for (d = 0; d < b; d++) this._resolutions[c].push(0);
            this._updateAllResolutions(a);
            this._slider || this._createSlider()
        },
        _remove: function(a) {
            a = this._getBin(a);
            this._resolutions.esriTimeUnitsSeconds[a] --;
            this._updateAllResolutions(a, !0);
            this._active || this._updateSlider()
        },
        _createSlider: function() {
            var a = this;
            this._slider = new(q([w, v], {
                templateString: y
            }))({
                name: "histogram-slider",
                values: [0, 100],
                minimum: 0,
                maximum: 100,
                showButtons: !1,
                intermediateChanges: !0,
                discreteValues: 2,
                style: "width:100%",
                onChange: function(c) {
                    var b = Math.floor(c[0]);
                    c = Math.floor(c[1]);
                    a._getUserExtents(b, c);
                    a._disableBins(b,
                        c)
                }
            }, "histogram-slider")
        },
        _updateSlider: function() {
            this._slider.discreteValues = this.histogram.length + 1;
            this._slider.maximum = this.histogram.length;
            this._slider._setValueAttr([0, this.histogram.length], !1, !1)
        },
        _getUserExtents: function(a, c) {
            var b = this._timeInterval || this._resolution,
                d = new x;
            d.startTime = new Date(this.fullTimeExtent[0] + (a + this.minVisibleIndex) * this._num_resolutions[b]);
            d.endTime = new Date(this.fullTimeExtent[0] + (c + this.minVisibleIndex) * this._num_resolutions[b]);
            this._updateDateRange(d);
            this.onTimeExtentChange(d)
        },
        _drawHistogram: function() {
            var a = this,
                c = [];
            this.histogramSurface ? this.histogramSurface.clear() : this.histogramSurface = p.createSurface("histogram-container", m.byId(this.element.id).offsetWidth, 100);
            var b = Math.max.apply(Math, this.bins),
                d = this.histogramSurface._parent.clientWidth / (this.bins.length - this.minVisibleIndex),
                e = d / 10,
                g = 0;
            this.histogram = [];
            var h, k;
            h = this.minVisibleIndex;
            for (k = this.bins.length; h < k; h++) {
                var f = 100 * (this.bins[h] / b),
                    f = this.histogramSurface.createRect({
                        x: g,
                        y: 100 - f,
                        width: d - e,
                        height: f
                    }).setFill(this._color);
                this.histogram.push(f);
                g += d;
                c.push(g);
                f.bin = this.bins[h];
                f.x = g - d;
                f.num = h;
                f.max = b;
                f.on("mouseover", function(b) {
                    a._showTipForBin(b.gfxTarget.bin, b.gfxTarget.num, b.gfxTarget.x)
                });
                f.on("mouseout", function() {
                    a._hideTipForBin()
                })
            }
            this._updateTimeTicks(c);
            this._updateScaleBar(b);
            this.onUpdate()
        },
        _updateHeights: function(a) {
            var c = Math.max.apply(Math, this.bins),
                b, d, e;
            if (c !== this._max_bin_height) {
                d = this.minVisibleIndex;
                for (e = this.histogram.length; d < e; d++) b = 100 *
                    (this.bins[d] / c), a = 100 - b, this.histogram[d].setShape({
                        y: a,
                        height: b
                    })
            } else b = 100 * (this.bins[a] / c), this.histogram[a - this.minVisibleIndex].setShape({
                y: 100 - b,
                height: b
            });
            this._updateScaleBar(c);
            this._max_bin_height = c
        },
        _updateTimeTicks: function(a) {
            var c = this._timeInterval || this._resolution,
                b = Math.floor(this.histogram.length / 3),
                d, e;
            for (e = 0; 2 > e; e++) this.histogramSurface.createLine({
                x1: a[b],
                y1: 0,
                x2: a[b],
                y2: this.histogramSurface._parent.clientHeight
            }).setStroke(this._textColor), d = new Date(this.fullTimeExtent[0] +
                (b + 1 - this.minVisibleIndex) * this._num_resolutions[c]), d = l.substitute({
                date: d.getTime()
            }, this._dateTemplate), this.histogramSurface.createText({
                x: a[b] + 2,
                y: 10,
                text: d
            }).setFont({
                size: "12px"
            }).setFill(this._textColor), b += b
        },
        _updateDateRange: function(a) {
            var c = l.substitute({
                date: (new Date(a.startTime)).getTime()
            }, this._dateTemplate);
            a = l.substitute({
                date: (new Date(a.endTime)).getTime()
            }, this._dateTemplate);
            m.byId("histogram-range").innerHTML = "Date Range: " + c + " - " + a
        },
        _disableBins: function(a, c) {
            var b = this;
            0 === a && c === this.histogram.length ? (this.histogram[0].setFill(this._color), this.histogram[this.histogram.length - 1].setFill(this._color)) : r.forEach(this.histogram, function(d, e) {
                e < a ? d.setFill("rgb(216,216,216)") : e >= c ? d.setFill("rgb(216,216,216)") : d.setFill(b._color)
            })
        },
        _updateScaleBar: function(a) {
            this.scaleLeft ? (this.scaleLeft.clear(), this.scaleRight.clear()) : (this.scaleRight = p.createSurface("scale-bar-right", 45, 110), this.scaleLeft = p.createSurface("scale-bar-left", 45, 110));
            var c, b;
            c = 99 < a ? 10 : 20;
            b = 99 < a /
                2 ? b = 10 : 20;
            this.scaleLeft.createLine({
                x1: 40,
                y1: 5,
                x2: 40,
                y2: 130
            }).setStroke("rgb(82, 95, 109)");
            this.scaleLeft.createLine({
                x1: 40,
                y1: 5,
                x2: 37,
                y2: 5
            }).setStroke("rgb(82, 95, 109)");
            this.scaleLeft.createLine({
                x1: 40,
                y1: 60,
                x2: 37,
                y2: 60
            }).setStroke("rgb(82, 95, 109)");
            this.scaleLeft.createText({
                x: c,
                y: 10,
                text: a
            }).setFont({
                size: "14px"
            }).setFill(this._textColor);
            this.scaleLeft.createText({
                x: b,
                y: 65,
                text: Math.floor(a / 2)
            }).setFont({
                size: "14px"
            }).setFill(this._textColor);
            this.scaleRight.createLine({
                x1: 0,
                y1: 5,
                x2: 0,
                y2: 130
            }).setStroke("rgb(82, 95, 109)");
            this.scaleRight.createLine({
                x1: 0,
                y1: 5,
                x2: 3,
                y2: 5
            }).setStroke("rgb(82, 95, 109)");
            this.scaleRight.createLine({
                x1: 0,
                y1: 60,
                x2: 3,
                y2: 60
            }).setStroke("rgb(82, 95, 109)");
            this.scaleRight.createText({
                x: 4,
                y: 10,
                text: a
            }).setFont({
                size: "14px"
            }).setFill(this._textColor);
            this.scaleRight.createText({
                x: 4,
                y: 65,
                text: Math.floor(a / 2)
            }).setFont({
                size: "14px"
            }).setFill(this._textColor)
        },
        _showTipForBin: function(a, c, b) {
            var d = this._timeInterval || this._resolution;
            if (!this._active) {
                var e = new Date(this.fullTimeExtent[0] + (c - this.minVisibleIndex) *
                        this._num_resolutions[d]),
                    e = l.substitute({
                        date: e.getTime()
                    }, this._dateTemplate);
                c = new Date(this.fullTimeExtent[0] + (c + 1 - this.minVisibleIndex) * this._num_resolutions[d]);
                c = l.substitute({
                    date: c.getTime()
                }, this._dateTemplate);
                m.byId("focusTip").innerHTML = "\x3cspan style\x3d'font-size:8pt'\x3e" + e + " to " + c + "\x3c/span\x3e \x3cbr /\x3e Count: " + a;
                s.set("focusTip", {
                    display: "block",
                    left: b + "px",
                    top: "-10px"
                })
            }
        },
        _hideTipForBin: function() {
            m.byId("focusTip").style.display = "none"
        },
        onTimeExtentChange: function() {},
        onUpdate: function() {}
    })
});