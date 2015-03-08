//>>built
define("esri/dijit/geoenrichment/DataBrowser/SearchTextBox", ["../../../declare", "dojo/_base/lang", "dojo/dom-construct", "dojo/dom-class", "dojo/on", "dojo/keys", "dijit/Tooltip", "dijit/form/TextBox"], function(f, d, g, b, e, h, c, k) {
    return f([k], {
        prompt: "",
        _trueValue: "",
        buildRendering: function() {
            this.inherited(arguments);
            b.add(this.domNode, "SearchTextBox");
            var a = g.create("div", {
                "class": "SearchTextBox_SearchBox"
            }, this.domNode);
            e(a, "click", d.hitch(this, this._onSearch));
            e(this, "keypress", d.hitch(this, this._stopEvent));
            this._onBlur(null)
        },
        showTooltip: function(a) {
            c.show(a,
                this.textbox, ["above", "below"])
        },
        _stopEvent: function(a) {
            a.charOrCode && 13 === a.charOrCode && (a.stopPropagation(), a.preventDefault())
        },
        _setPromptMessageAttr: function(a) {
            this.prompt = a;
            if (!this._trueValue || 0 === this._trueValue.length || !this.textbox.value || 0 === this.textbox.value.length) this._setDisplayedValueAttr(this.prompt), b.add(this.textbox, "SearchTextBox_PromptMode")
        },
        _onFocus: function(a) {
            (!this._trueValue || 0 === this._trueValue.length) && b.remove(this.textbox, "SearchTextBox_PromptMode");
            this._setDisplayedValueAttr(this._trueValue);
            this.inherited(arguments)
        },
        _onBlur: function(a) {
            c.hide(this.textbox);
            this._trueValue = this._getValueAttr();
            if (!this._trueValue || 0 === this._trueValue.length) this._setDisplayedValueAttr(this.prompt), b.add(this.textbox, "SearchTextBox_PromptMode");
            this.inherited(arguments)
        },
        _onInput: function(a) {
            c.hide(this.textbox);
            a.keyCode == h.ENTER && this._onSearch();
            this.inherited(arguments)
        },
        _onSearch: function() {
            this.onSearch()
        },
        onSearch: function() {}
    })
});