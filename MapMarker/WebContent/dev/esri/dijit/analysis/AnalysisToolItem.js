require({cache:{
'url:esri/dijit/analysis/templates/AnalysisToolItem.html':"<div class='toolContainer' data-dojo-attach-point=\"_toolCtr\" style=\"cursor:pointer;cursor:hand;\" data-dojo-attach-event=\"onclick:_handleToolIconClick\">\n  <div data-dojo-attach-point='_toolIcon'></div>\n  <div class='esriLeadingMargin5' style='margin-top:-42px;'>\n    <a  href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"toolDescription\" data-dojo-attach-point=\"_helpIconNode\"></a>\n  \t<label data-dojo-attach-point='_toolNameLabel' style=\"cursor:pointer;cursor:hand;\"></label>\n  </div>\n  <div class='esriLeadingMargin2' data-dojo-attach-point=\"optionsDiv\" style=\"margin-top:0.5em;font-size:0.85em;\"><label class=\"esriLeadingMargin5 comingSoonIcon\">${i18n.comingSoonLabel}</label></div>\t\n</div>\n"}});
//>>built
define("esri/dijit/analysis/AnalysisToolItem", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/connect", "dojo/_base/event", "dojo/has", "dojo/dom-class", "dojo/dom-attr", "dojo/dom-style", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "../../kernel", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/AnalysisToolItem.html"], function(f, g, d, r, h, s, b, k, c, l, m, n, p, t, e, q) {
    return g([l, m, n, p], {
        declaredClass: "esri.dijit.analysis.AnalysisToolItem",
        templateString: q,
        basePath: f.toUrl("."),
        widgetsInTemplate: !0,
        i18n: null,
        _helpIconNode: null,
        _toolIcon: null,
        _toolIconClass: null,
        _toolNameLabel: null,
        toolName: null,
        helpTopic: null,
        helpFileName: "Analysis",
        constructor: function(a, b) {
            a.toolIcon && (this._toolIconClass = a.toolIcon);
            a.name && (this.toolName = a.name, this.helpTopic = a.helpTopic)
        },
        postCreate: function() {
            this.inherited(arguments);
            this._toolNameLabel.innerHTML = this.toolName;
            b.add(this._toolIcon, this._toolIconClass);
            k.set(this._helpIconNode, "esriHelpTopic", this.helpTopic);
            this.set("showComingSoonLabel", !0)
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            this.i18n = {};
            d.mixin(this.i18n, e.common);
            d.mixin(this.i18n, e.analysisTools)
        },
        _handleToolNameClick: function() {
            this.onToolSelect(this)
        },
        _handleToolIconClick: function(a) {
            h.stop(a);
            this.onToolSelect(this)
        },
        _setShowComingSoonLabelAttr: function(a) {
            c.set(this.optionsDiv, "display", !0 === a ? "block" : "none");
            b.toggle(this._toolCtr, "esriToolContainerDisabled", a);
            b.toggle(this._toolNameLabel, "esriTransparentNode", a);
            b.toggle(this._toolIcon, "esriTransparentNode", a);
            c.set(this._toolNameLabel, "cursor", !0 === a ? "default" :
                "pointer");
            c.set(this._toolCtr, "cursor", !0 === a ? "default" : "pointer")
        },
        onToolSelect: function(a) {}
    })
});