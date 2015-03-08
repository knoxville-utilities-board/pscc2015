//>>built
define("esri/dijit/editing/tools/Selection", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/Color", "dojo/has", "../../../symbols/SimpleMarkerSymbol", "../../../symbols/SimpleLineSymbol", "../../../symbols/SimpleFillSymbol", "./Edit", "./SelectionTools", "./DropDownToolBase", "../../../kernel"], function(m, e, f, g, d, q, h, c, k, n, l, p, r) {
    return m([p], {
        declaredClass: "esri.dijit.editing.tools.Selection",
        _enabled: !0,
        activate: function() {
            this.inherited(arguments);
            this._sConnect = g.connect(this._toolbar, "onDrawEnd", this, "_onDrawEnd")
        },
        deactivate: function() {
            this.inherited(arguments);
            g.disconnect(this._sConnect);
            delete this._sConnect
        },
        _initializeTool: function() {
            this._createSymbols();
            this._initializeLayers();
            this._toolTypes = ["select", "selectadd", "selectremove"]
        },
        _onDrawEnd: function(a) {
            this.inherited(arguments);
            this._settings.editor._hideAttributeInspector();
            var b = this._settings.layers;
            this._selectMethod = this._activeTool._selectMethod;
            this._settings.editor._selectionHelper.selectFeaturesByGeometry(b, a, this._selectMethod, e.hitch(this,
                "onFinished"))
        },
        _createSymbols: function() {
            this._pointSelectionSymbol = new h(h.STYLE_CIRCLE, 10, new c(c.STYLE_SOLID, new d([0, 0, 0]), 1), new d([255, 0, 0, 0.5]));
            this._polylineSelectionSymbol = new c(c.STYLE_SOLID, new d([0, 200, 255]), 2);
            this._polygonSelectionSymbol = new k(k.STYLE_SOLID, new c(c.STYLE_SOLID, new d([0, 0, 0]), 1), new d([0, 200, 255, 0.5]))
        },
        _initializeLayers: function() {
            f.forEach(this._settings.layers, this._setSelectionSymbol, this)
        },
        _setSelectionSymbol: function(a) {
            var b = null;
            switch (a.geometryType) {
                case "esriGeometryPoint":
                    b =
                        this._pointSelectionSymbol;
                    break;
                case "esriGeometryPolyline":
                    b = this._polylineSelectionSymbol;
                    break;
                case "esriGeometryPolygon":
                    b = this._polygonSelectionSymbol
            }
            a.setSelectionSymbol(a._selectionSymbol || b)
        },
        _createTools: function() {
            f.forEach(this._toolTypes, this._createTool, this);
            this.inherited(arguments)
        },
        _createTool: function(a) {
            var b = e.mixin(l[a], {
                settings: this._settings,
                onClick: e.hitch(this, "onItemClicked", l[a].id)
            });
            this._tools[a.toUpperCase()] = new n(b)
        }
    })
});