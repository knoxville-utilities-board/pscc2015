require({cache:{
'url:esri/dijit/analysis/templates/CreditEstimator.html':"<div class=\"esriAnalysis esriSimpleForm\">\n  <table class=\"esriFormTable\"  data-dojo-attach-point=\"_table\"  style=\"border-collapse:collapse;border-spacing:5px;\">\n     <!--<tr>\n      <td>\n        <label class=\"esriFloatLeading\">${i18n.analysisLayersLabel}</label>\n      </td>\n      <td>\n      </td>\n    </tr>-->\n     <tr>\n      <td>\n        <label class=\"esriFloatLeading\">${i18n.totalRecordsLabel}</label>\n      </td>\n      <td data-dojo-attach-point=\"_totalRecordsNode\">\n      </td>\n    </tr>\n     <!--<tr>\n      <td>\n        <label class=\"esriFloatLeading\">${i18n.creditsAvailLabel}</label>\n      </td>\n      <td>\n      </td>\n    </tr>-->\n     <tr>\n      <td>\n        <label class=\"esriFloatLeading\">${i18n.creditsReqLabel}</label>\n      </td>\n      <td data-dojo-attach-point=\"_creditsReqNode\">\n      </td>\n    </tr>\n  </table>\n  <div data-dojo-attach-point=\"_messageDiv\"></div>\n</div>\n"}});
//>>built
define("esri/dijit/analysis/CreditEstimator", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/connect", "dojo/_base/event", "dojo/_base/kernel", "dojo/has", "dojo/dom-construct", "dojo/dom-class", "dojo/dom-attr", "dojo/dom-style", "dojo/string", "dojo/number", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "../../kernel", "../../lang", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/CreditEstimator.html"], function(l, m, d, u, v, f, w, x, y, b, g, n, h, p, q, r, s, z, k, e, t) {
    return m([p, q, r, s], {
        declaredClass: "esri.dijit.analysis.CreditEstimator",
        i18n: null,
        basePath: l.toUrl("."),
        templateString: t,
        postMixInProperties: function() {
            this.inherited(arguments);
            this.i18n = {};
            d.mixin(this.i18n, e.common);
            d.mixin(this.i18n, e.analysisMsgCodes);
            d.mixin(this.i18n, e.creditEstimator)
        },
        postCreate: function() {
            this.inherited(arguments)
        },
        _setContentAttr: function(a) {
            var c = "";
            a.code && !a.messageCode && (a.messageCode = a.code);
            a.messageCode ? (c = k.isDefined(this.i18n[a.messageCode]) ? this.i18n[a.messageCode] : a.message, c = k.isDefined(a.params) ? n.substitute(c, a.params) : c, b.set(this._messageDiv,
                "display", "block"), b.set(this._messageDiv, "innerHTML", c), g.set(this._table, "display", "none")) : (g.set(this._table, "display", "table"), b.set(this._messageDiv, "display", "none"), b.set(this._messageDiv, "innerHTML", ""), b.set(this._totalRecordsNode, "innerHTML", h.format(a.totalRecords, {
                locale: f.locale
            })), b.set(this._creditsReqNode, "innerHTML", h.format(a.cost, {
                locale: f.locale
            })))
        }
    })
});