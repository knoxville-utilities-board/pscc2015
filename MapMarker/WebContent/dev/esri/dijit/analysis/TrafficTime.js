require({cache:{
'url:esri/dijit/analysis/templates/TrafficTime.html':"<table style=\"width:100%\" class=\"esriFormTable\">\n  <tbody>\n    <tr>\n      <td class=\"shortTextInput\" colspan=\"3\" style=\"padding-bottom:0;\">\n        <div class=\"esriLeadingMargin1\">\n          <label>\n            <input type=\"checkbox\" data-dojo-attach-point=\"_useTrafficCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-attach-event=\"onChange:_handleUseTrafficCheckChange\" data-dojo-props=\"checked:false\" style=\"margin-bottom:0.25em;\">\n            </input>\n            <label class=\"esriLeadingMargin025\">${i18n.trafficLabel}</label>\n         </label>\n        </div>\n      </td>\n    </tr>\n    <tr>\n      <td colspan=\"3\">\n        <div class=\"esriLeadingMargin2\">\n          <label>\n            <input type=\"radio\" data-dojo-type=\"dijit/form/RadioButton\" name=\"trafficSelect\" data-dojo-attach-event=\"onChange:_handleLifeTrafficRadioChange\"  data-dojo-props=\"checked:true\" data-dojo-attach-point=\"_liveTrafficRadioBtn\"></input>\n            <label data-dojo-attach-point=\"_liveTraficLabel\">${i18n.liveTrafficLabel}</label>\n          </label>\n        </div>\n      </td>\n    </tr>\n    <tr>\n      <td colspan=\"3\">\n        <div class=\"esriLeadingMargin2 longInput\" value=\"0\" data-dojo-props=\"intermediateChanges:true,showButtons:false,minimum:0, maximum:12,discreteValues:49\" data-dojo-attach-point=\"_liveTimeSlider\" data-dojo-attach-event=\"onChange:_handleLiveTimeSliderChange\" type=\"range\" data-dojo-type=\"dijit/form/HorizontalSlider\">\n          <div data-dojo-type=\"dijit/form/HorizontalRule\"  style=\"width:86%\" data-dojo-props=\"container: 'topDecoration',count: 13,style: 'height: 0.55em;'\"></div>\n           <ol data-dojo-type=\"dijit/form/HorizontalRuleLabels\"  data-dojo-attach-point=\"_liveTimeRuleLabels\" data-dojo-props=\"container: 'bottomDecoration', count:5\" style=\"margin-top:5px;height: 1em;\">\n              <li>${i18n.nowLabel}</li>\n              <li>+3</li>\n              <li>+6</li>\n              <li>+9</li>\n              <li>+12 ${i18n.hoursSmall}</li>\n            </ol>  \n        </div>\n         <!-- create rules and labels below horizontal slider -->\n      </td>\n    </tr>    \n    <tr>\n      <td colspan=\"3\">\n        <div class=\"esriLeadingMargin2\">\n          <label>\n            <input type=\"radio\" data-dojo-type=\"dijit/form/RadioButton\" name=\"trafficSelect\" data-dojo-attach-point=\"_typicalTrafficRadioBtn\"></input>\n            <label data-dojo-attach-point=\"_typicalTraficLabel\">${i18n.typicalTraffCdtnLabel}</label>\n          </label>\n        </div>\n      </td>\n    </tr>\n    <tr data-dojo-attach-point=\"_driveTimeRow\">\n      <td colspan=\"3\" style=\"padding-top:0;padding-bottom:0\">\n        <select class=\"esriLeadingMargin2 mediumInput esriAnalysisSelect\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_trafficDay\" style=\"width:46%;table-layout:fixed;\">\n          <option value=\"1/1/1990\">${i18n.monday}</option>\n          <option value=\"1/2/1990\">${i18n.tuesday}</option>\n          <option value=\"1/3/1990\">${i18n.wednesday}</option>\n          <option value=\"1/4/1990\">${i18n.thursday}</option>\n          <option value=\"1/5/1990\">${i18n.friday}</option>\n          <option value=\"1/6/1990\">${i18n.saturday}</option>\n          <option value=\"1/7/1990\">${i18n.sunday}</option>\n        </select>\n        <input  type=\"text\" data-dojo-type=\"dijit/form/TimeTextBox\" data-dojo-props=\"value:'T12:00:00', required:true,intermediateChanges:true,constraints:{formatLength:'short',selector:'time'}\"  data-dojo-attach-point=\"_trafficTime\" style=\"height:24px;width:37%;margin-top:0;\">\n        </input>\n      </td>\n    </tr>\n    <tr>\n      <td colspan=\"3\" style=\"padding-top:0;\">\n        <a class=\"esriLeadingMargin3 esriSmallFont\" href=\"http://www.arcgis.com/home/item.html?id=b7a893e8e1e04311bd925ea25cb8d7c7\" target=\"_available\">${i18n.seeAvailability}</a>\n      </td>\n    </tr>\n  </tbody>\n</table>\n"}});
//>>built
define("esri/dijit/analysis/TrafficTime", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/connect", "dojo/_base/event", "dojo/_base/kernel", "dojo/dom-attr", "dojo/string", "dojo/dom-style", "dojo/dom-class", "dojo/has", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/form/CheckBox", "dijit/form/RadioButton", "dijit/form/TimeTextBox", "dijit/form/Select", "dijit/form/HorizontalSlider", "dijit/form/HorizontalRule", "dijit/form/HorizontalRuleLabels", "../../kernel", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/TrafficTime.html"], function(g, h, e, s, t, u, k, d, v, b, w, l, m, n, p, q, x, y, z, A, B, C, D, E, f, r) {
    return h([l, m, n, p, q], {
        declaredClass: "esri.dijit.analysis.TrafficTime",
        i18n: null,
        basePath: g.toUrl("."),
        templateString: r,
        widgetsInTemplate: !0,
        _liveOffset: 0,
        postMixInProperties: function() {
            this.i18n = {};
            e.mixin(this.i18n, f.common);
            e.mixin(this.i18n, f.driveTimes)
        },
        postCreate: function() {
            this.inherited(arguments);
            this._handleUseTrafficCheckChange(this._useTrafficCheck.get("value"))
        },
        _handleUseTrafficCheckChange: function(a) {
            this._typicalTrafficRadioBtn.set("disabled", !a);
            this._liveTrafficRadioBtn.set("disabled", !a);
            a ? this._handleLifeTrafficRadioChange(this._liveTrafficRadioBtn.get("value")) : (this._liveTimeSlider.set("disabled", !a), this._trafficTime.set("disabled", !a), this._trafficDay.set("disabled", !a));
            a ? (b.remove(this._liveTraficLabel, "esriAnalysisTextDisabled"), b.remove(this._typicalTraficLabel, "esriAnalysisTextDisabled"), b.remove(this._liveTimeRuleLabels, "esriAnalysisTextDisabled")) : (b.add(this._liveTraficLabel, "esriAnalysisTextDisabled"), b.add(this._typicalTraficLabel,
                "esriAnalysisTextDisabled"), b.add(this._liveTimeRuleLabels, "esriAnalysisTextDisabled"))
        },
        _handleLifeTrafficRadioChange: function(a) {
            this._liveTimeSlider.set("disabled", !a);
            this._trafficTime.set("disabled", a);
            this._trafficDay.set("disabled", a)
        },
        _setDisabledAttr: function(a) {
            this._useTrafficCheck.set("disabled", a)
        },
        _setResetAttr: function(a) {
            a && this._useTrafficCheck.set("checked", !1)
        },
        _getCheckedAttr: function() {
            return this._useTrafficCheck.get("checked")
        },
        _setCheckedAttr: function(a) {
            this._useTrafficCheck.set("checked",
                a)
        },
        _getTimeOfDayAttr: function() {
            var a;
            this._liveTrafficRadioBtn.get("value") ? a = (new Date).getTime() + 6E4 * this._liveOffset : (a = new Date(this._trafficDay.get("value")), a = a.getTime() - 6E4 * a.getTimezoneOffset() + this._trafficTime.get("value").getTime() - 6E4 * this._trafficTime.get("value").getTimezoneOffset());
            return a
        },
        _getTimeZoneForTimeOfDayAttr: function() {
            return this._liveTrafficRadioBtn.get("value") ? "UTC" : ""
        },
        _handleLiveTimeSliderChange: function(a) {
            var b, c;
            b = 60 * a;
            a = Math.floor(a);
            c = b - 60 * a;
            a = 0 === a && 0 ===
                c ? this.i18n.liveTrafficLabel : 0 === a ? d.substitute(this.i18n.liveTimeMinutesLabel, {
                    minute: c
                }) : 1 === a ? 0 === c ? this.i18n.liveSingularHourTimeLabel : d.substitute(this.i18n.liveSingularTimeLabel, {
                    minute: c
                }) : 0 === c ? d.substitute(this.i18n.liveTimeHoursLabel, {
                    hour: a,
                    minute: c
                }) : d.substitute(this.i18n.liveTimeLabel, {
                    hour: a,
                    minute: c
                });
            this._liveOffset = b;
            k.set(this._liveTraficLabel, "innerHTML", a)
        }
    })
});