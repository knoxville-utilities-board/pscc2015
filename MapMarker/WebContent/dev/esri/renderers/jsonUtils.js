//>>built
define("esri/renderers/jsonUtils", ["dojo/_base/array", "dojo/_base/lang", "dojo/has", "dojox/gfx/_base", "../kernel", "../Color", "../symbols/jsonUtils", "./SimpleRenderer", "./UniqueValueRenderer", "./ClassBreaksRenderer", "./DotDensityRenderer", "./ScaleDependentRenderer", "./TimeClassBreaksAger", "./TimeRampAger", "./TemporalRenderer", "./HeatmapRenderer"], function(g, k, w, m, x, f, l, n, p, q, r, s, e, t, u, v) {
    return {
        fromJson: function(a) {
            var b;
            switch (a.type || "") {
                case "simple":
                    b = new n(a);
                    break;
                case "uniqueValue":
                    b = new p(a);
                    break;
                case "classBreaks":
                    b = new q(a);
                    break;
                case "scaleDependent":
                    b =
                        this._scaleDependentFromJson(a);
                    break;
                case "dotDensity":
                    b = this._dotDensityFromJson(a);
                    break;
                case "temporal":
                    b = this._temporalFromJson(a);
                    break;
                case "heatmap":
                    b = this._heatmapFromJson(a)
            }
            return b
        },
        _scaleDependentFromJson: function(a) {
            var b = {},
                c = a.minScale;
            b.rendererInfos = g.map(a.rendererInfos, function(a) {
                var b = a.maxScale;
                a = {
                    minScale: c,
                    maxScale: b,
                    renderer: a.renderer && this.fromJson(a.renderer)
                };
                c = b;
                return a
            }, this);
            return new s(b)
        },
        _dotDensityFromJson: function(a) {
            a.backgroundColor && k.isArray(a.backgroundColor) &&
                (a.backgroundColor = f.toDojoColor(a.backgroundColor));
            0 < a.dotSize && (a.dotSize = m.pt2px(a.dotSize));
            a.fields && g.forEach(a.fields, function(a) {
                a && k.isArray(a.color) && (a.color = f.toDojoColor(a.color))
            });
            a.legendOptions && (a.legendOptions.backgroundColor && k.isArray(a.legendOptions.backgroundColor) && (a.legendOptions.backgroundColor = f.toDojoColor(a.legendOptions.backgroundColor)), a.legendOptions.outline && (a.legendOptions.outline = l.fromJson(a.legendOptions.outline)));
            a.outline && (a.outline = l.fromJson(a.outline));
            return new r(a)
        },
        _temporalFromJson: function(a) {
            var b, c, d;
            a = a || {};
            b = this.fromJson(a.observationRenderer);
            c = a.latestObservationRenderer ? this.fromJson(a.latestObservationRenderer) : null;
            d = a.trackRenderer ? this.fromJson(a.trackRenderer) : null;
            a = this._agerFromJson(a.observationAger);
            return new u(b, c, d, a)
        },
        _agerFromJson: function(a) {
            var b;
            a = a || {};
            a.colorRange || a.sizeRange || a.alphaRange ? b = this._timeRampFromJson(a) : a.agerClassBreakInfos && (b = this._timeClassBreaksFromJson(a));
            return b
        },
        _timeRampFromJson: function(a) {
            var b,
                c, d;
            a.colorRange && 1 < a.colorRange.length && (b = [f.toDojoColor(a.colorRange[0]), f.toDojoColor(a.colorRange[1])]);
            a.sizeRange && 1 < a.sizeRange.length && (c = [a.sizeRange[0], a.sizeRange[1]]);
            a.alphaRange && 1 < a.alphaRange.length && (d = [a.alphaRange[0] / 255, a.alphaRange[1] / 255]);
            return new t(b, c, d)
        },
        _timeClassBreaksFromJson: function(a) {
            var b = a.agerClassBreakInfos,
                c, d, g = [],
                h;
            c = e.UNIT_DAYS;
            switch (a.timeUnits) {
                case "esriTimeUnitsSeconds":
                    c = e.UNIT_SECONDS;
                    break;
                case "esriTimeUnitsMilliseconds":
                    c = e.UNIT_MILLISECONDS;
                    break;
                case "esriTimeUnitsHours":
                    c = e.UNIT_HOURS;
                    break;
                case "esriTimeUnitsMinutes":
                    c = e.UNIT_MINUTES;
                    break;
                case "esriTimeUnitsMonths":
                    c = e.UNIT_MONTHS;
                    break;
                case "esriTimeUnitsWeeks":
                    c = e.UNIT_WEEKS;
                    break;
                case "esriTimeUnitsYears":
                    c = e.UNIT_YEARS
            }
            for (h = 0; h < b.length; h += 1) a = b[h], d = {
                minAge: 0,
                maxAge: a.oldestAge || Infinity
            }, a.color && (d.color = f.toDojoColor(a.color)), a.alpha && (d.alpha = a.alpha / 255), d.size = a.size, g[h] = d;
            return new e(g, c)
        },
        _heatmapFromJson: function(a) {
            var b = a.colorStops;
            b && b instanceof Array && g.forEach(b,
                function(a) {
                    a.color = f.toDojoColor(a.color)
                });
            return new v(a)
        }
    }
});