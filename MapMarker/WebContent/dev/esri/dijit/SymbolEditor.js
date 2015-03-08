require({cache:{
'url:esri/dijit/templates/SymbolEditor.html':"<div class=\"esriSymbolEditor\">\n</div>"}});
//>>built
define("esri/dijit/SymbolEditor", ["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel", "dojo/_base/array", "dojo/_base/Color", "dojo/dom-construct", "dojo/query", "dijit/_Widget", "dijit/_TemplatedMixin", "../domUtils", "./Form", "dojo/text!./templates/SymbolEditor.html", "dojo/i18n!../nls/jsapi"], function(f, g, q, r, s, h, k, t, l, m, e, n, p, d) {
    return f([l, m], {
        declaredClass: "esri.dijit.SymbolEditor",
        widgetsInTemplate: !0,
        templateString: p,
        symbolConfigLabel: d.widgets.textSymbolEditor.symbolConfiguration,
        alignmentLabel: d.widgets.textSymbolEditor.alignment,
        colorLabel: d.widgets.textSymbolEditor.color,
        constructor: function(c, a) {},
        destroy: function() {
            this.inherited(arguments);
            this.form.destroy();
            this.form = null
        },
        createForm: function(c) {
            if (c = c || this.graphic) {
                var a = c.symbol || c.getLayer().renderer && c.getLayer().renderer.getSymbol(c),
                    b = {};
                if (this.form && (!this._symbolType || this._symbolType === a.type)) b.color = a.color.toHex(), b.alignment = (a.verticalAlignment || "baseline") + "," + a.horizontalAlignment, this._symbolChangeHandler && this._symbolChangeHandler.remove(), this.form.setValues(b);
                else {
                    this.form && this.destroy();
                    this._symbolType = a.type;
                    b = k.create("div", null, this.domNode);
                    switch (a.type) {
                        case "textsymbol":
                            this.form = this._createTextEditorForm(a, b)
                    }
                    this.form.startup()
                }
                this._symbolChangeHandler = this.form.on("value-change", g.hitch(this, "_valueChangeCallback", c, a))
            }
        },
        hide: function() {
            e.hide(this.domNode)
        },
        show: function() {
            e.show(this.domNode)
        },
        _createTextEditorForm: function(c, a) {
            var b = (c.verticalAlignment || "baseline") + "," + c.horizontalAlignment,
                d = c.color.toHex();
            return new n({
                fields: [{
                    name: "alignment",
                    label: this.alignmentLabel,
                    type: "string",
                    value: b,
                    widget: "./FontAlignment"
                }, {
                    name: "color",
                    label: this.colorLabel,
                    type: "string",
                    value: d,
                    widget: "dijit/ColorPalette",
                    widgetParameters: {
                        palette: "7x10"
                    }
                }]
            }, a)
        },
        _valueChangeCallback: function(c, a, b) {
            if ("color" === b.fieldName) a.setColor(new h(b.value));
            else if ("alignment" === b.fieldName) {
                var d = b.value.split(",")[0];
                b = b.value.split(",")[1];
                a.setHorizontalAlignment(b);
                a.setVerticalAlignment(d)
            }
            c.setSymbol(a);
            this.emit("symbol-change", {
                symbol: a
            })
        }
    })
});