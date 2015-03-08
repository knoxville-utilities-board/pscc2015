//>>built
define("esri/dijit/ColorPicker/colorUtil", ["dojo/_base/lang", "esri/Color"], function(k, d) {
    var h = {
        equal: function(a, b) {
            return a && b && a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a
        },
        normalizeHex: function(a) {
            return "#" + k.trim(a).replace(/#/g, "").substr(0, 6)
        },
        normalizeColor: function(a) {
            return new d(a)
        },
        _validHexEntry: /^#([0-9A-F]{3}|[0-9A-F]{6})$/i,
        isValidHex: function(a) {
            return h._validHexEntry.test(a)
        },
        getContrastingColor: function(a) {
            return 127 <= 0.299 * a.r + 0.587 * a.g + 0.114 * a.b ? this.darker(a) : this.brighter(a, 3)
        },
        darker: function(a, b) {
            var c = Math.pow(0.7,
                b ? b : 1);
            return new d([Math.round(a.r * c), Math.round(a.g * c), Math.round(a.b * c), a.a])
        },
        brighter: function(a, b) {
            var c = Math.pow(0.7, b ? b : 1),
                e = a.r,
                f = a.g,
                g = a.b;
            30 > e && (e = 30);
            30 > f && (f = 30);
            30 > g && (g = 30);
            return new d([Math.min(255, Math.round(e / c)), Math.min(255, Math.round(f / c)), Math.min(255, Math.round(g / c)), a.a])
        }
    };
    return h
});