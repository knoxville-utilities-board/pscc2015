//>>built
define("esri/toolbars/_toolbar", ["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel", "../Evented"], function(g, k, l, m, h) {
    return g([h], {
        declaredClass: "esri.toolbars._Toolbar",
        constructor: function(c) {
            this.map = c
        },
        _cursors: {
            move: "pointer",
            "move-v": "pointer",
            "move-gv": "pointer",
            box0: "nw-resize",
            box1: "n-resize",
            box2: "ne-resize",
            box3: "e-resize",
            box4: "se-resize",
            box5: "s-resize",
            box6: "sw-resize",
            box7: "w-resize",
            box8: "pointer"
        },
        _deactivateMapTools: function(c, d, e, f) {
            var a = this.map;
            c && (this._mapNavState = {
                isDoubleClickZoom: a.isDoubleClickZoom,
                isClickRecenter: a.isClickRecenter,
                isPan: a.isPan,
                isRubberBandZoom: a.isRubberBandZoom,
                isKeyboardNavigation: a.isKeyboardNavigation,
                isScrollWheelZoom: a.isScrollWheelZoom
            }, a.disableDoubleClickZoom(), a.disableClickRecenter(), a.disablePan(), a.disableRubberBandZoom(), a.disableKeyboardNavigation());
            d && a.hideZoomSlider();
            e && a.hidePanArrows();
            f && a.graphics.disableMouseEvents()
        },
        _activateMapTools: function(c, d, e, f) {
            var a = this.map,
                b = this._mapNavState;
            c && b && (b.isDoubleClickZoom && a.enableDoubleClickZoom(), b.isClickRecenter &&
                a.enableClickRecenter(), b.isPan && a.enablePan(), b.isRubberBandZoom && a.enableRubberBandZoom(), b.isKeyboardNavigation && a.enableKeyboardNavigation(), b.isScrollWheelZoom && a.enableScrollWheelZoom());
            d && a.showZoomSlider();
            e && a.showPanArrows();
            f && a.graphics.enableMouseEvents()
        }
    })
});