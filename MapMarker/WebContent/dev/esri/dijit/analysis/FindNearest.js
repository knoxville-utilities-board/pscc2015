require({cache:{
'url:esri/dijit/analysis/templates/FindNearest.html':"<div class=\"esriAnalysis\">\n    <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n      <div data-dojo-attach-point=\"_aggregateToolContentTitle\" class=\"analysisTitle\">\n        <table class=\"esriFormTable\" > \n          <tr>\n            <td class=\"esriToolIconTd\"><div class=\"findClosestFacilityIcon\"></div></td>\n            <td class=\"esriAlignLeading\">${i18n.findNearest}</td>\n            <td>\n              <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                <div class=\"esriFloatLeading\">\n                  <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                </div>\n                <div class=\"esriFloatTrailing\">\n                  <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                </div>              \n              </div>                 \n            </td>\n          </tr>\n        </table>\n      </div>\n      <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n    </div>\n    <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n       <table class=\"esriFormTable\"  data-dojo-attach-point=\"_aggregateTable\"  style=\"border-collapse:collapse;border-spacing:5px;\" cellpadding=\"5px\" cellspacing=\"5px\"> \n         <tbody>\n          <tr>\n            <td  colspan=\"3\" class=\"sectionHeader\" data-dojo-attach-point=\"_aggregateToolDescription\" >${i18n.summarizeDefine}</td>\n          </tr>      \n          <tr>\n            <td colspan=\"3\">\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n              <label class=\"\">${i18n.findLocationsIn}</label>\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"NearbyLocationsLayer\"></a>\n              <select class=\"longInput esriLeadingMargin1 esriLongLabel\"  style=\"margin-top:1.0em;\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_layersSelect\" data-dojo-attach-event=\"onChange:_handleLayerChange\"></select>\n            </td>\n          </tr>\n          <tr>\n          <tr>\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>\n            \n          <tr>\n            <td colspan=\"2\">\n              <label data-dojo-attach-point=\"_labelTwo\" class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n              <label data-dojo-attach-point=\"_measurelabel\" class=\"\">${i18n.measureLabel}</label>\n            </td>\n            <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"MeasurementMethod\"></a>\n            </td>\n          </tr>\n          <tr>\n            <td style=\"padding:0.25em;\" colspan=\"3\">\n              <div data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_measureMethodSelect\" class=\"esriLeadingMargin1 longInput esriLongLabel esriAnalysisDriveMode\">\n                <div data-dojo-value=\"StraightLine\">\n                  <div class=\"esriFloatLeading bufferIcon esriStraightLineDistanceIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.straightLineDistance}</div>\n                </div>\n                <div data-dojo-value=\"DrivingTime\">\n                  <div class=\"esriFloatLeading bufferIcon esriDrivingTimeIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.drivingTime}</div>\n                </div>\n                <div data-dojo-value=\"DrivingDistance\">\n                  <div class=\"esriFloatLeading bufferIcon esriDrivingDistanceIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.drivingDistance}</div>\n                </div>\n                <div data-dojo-value=\"TruckingTime\">\n                  <div class=\"esriFloatLeading bufferIcon esriTruckingTimeIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.truckingTime}</div>\n                </div>\n                <div data-dojo-value=\"TruckingDistance\">\n                  <div class=\"esriFloatLeading bufferIcon esriTruckingDistanceIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.truckingDistance}</div>\n                </div>\n                <div data-dojo-value=\"WalkingTime\">\n                  <div class=\"esriFloatLeading bufferIcon esriWalkingTimeIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.walkingTime}</div>\n                </div>\n                <div data-dojo-value=\"WalkingDistance\">\n                  <div class=\"esriFloatLeading bufferIcon esriWalkingDistanceIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.walkingDistance}</div>\n                </div>\n              </div>\n            </td>            \n          </tr>\n          <tr>\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>\n          <tr data-dojo-attach-point=\"_useTrafficRow\">\n            <td colspan=\"3\" style=\"padding:0;\">\n              <div style=\"width:100%;\" class=\"esriFloatLeading esriTrailingMargin3\" data-dojo-type=\"esri/dijit/analysis/TrafficTime\" data-dojo-attach-point=\"_trafficTimeWidget\"></div>\n            </td>\n          </tr>          \n          <tr>\n            <td colspan=\"3\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_addStatsHelpLink\" esriHelpTopic=\"Cutoffs\"></a>\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.threeLabel}</label>\n              <label class=\"longTextInput\" data-dojo-attach-point=\"_forLocationLabel\"></label>\n            </td>\n          </tr>\n         <tr>\n           <td colspan=\"3\" class=\"esriLeadingMargin1\" style=\"padding-bottom:0;\">\n            <table style=\"width:100%\">\n              <tr>\n                <td style=\"width:1%;\">\n                  <div class=\"esriLeadingMargin1\" id=\"${id}.findNearestCheck\" data-dojo-type=\"dijit/form/CheckBox\"  data-dojo-attach-point=\"_findNearestCheck\" data-dojo-attach-event=\"onChange:_handleFindNearestCheckChange\" data-dojo-props=\"checked:'true'\"></div>\n                </td>\n                <td class=\"longTextInput\">\n                  <label for=\"${id}.findNearestCheck\" data-dojo-attach-point=\"_findNearestLabel\">${i18n.findNearestLabel}</label>\n                </td>\n              </tr>\n            </table>  \n           </td>\n         </tr>\n         <tr>\n           <td colspan=\"3\" style=\"padding-bottom:0.25;padding-top:0.25;\">\n             <input data-dojo-type=\"dijit/form/NumberSpinner\"  class= \"esriMediumlabel esriLeadingMargin2\"  data-dojo-attach-point=\"_maxCountInput\" data-dojo-props=\"style: 'width:25%',smallDelta:1,constraints: { min:1, max:100, places:0 }\"/>\n           </td>\n         </tr>\n         <tr>\n           <td colspan=\"3\" style=\"padding-bottom:0.25;padding-top:0.25;\">\n             <table style=\"width:100%\">\n               <tr>\n                 <td style=\"width:1%;\">\n                   <div class=\"esriLeadingMargin1\" id=\"${id}.limitSearchRangeCheck\" data-dojo-type=\"dijit/form/CheckBox\"  data-dojo-attach-point=\"_limitSearchRangeCheck\" data-dojo-attach-event=\"onChange:_handleLimitSearchCheckChange\" data-dojo-props=\"checked:'true'\"></div>\n                 </td>\n                 <td class=\"longTextInput\">\n                   <label for=\"${id}.limitSearchRangeCheck\" data-dojo-attach-point=\"_limitSearchRangeLabel\">${i18n.limitSearchRangeCheck}</label>\n                 </td>\n               </tr>\n             </table>\n           </td>\n         </tr>\n         <tr data-dojo-attach-point=\"_distanceLimitRow\">\n            <td style=\"padding-right:0;padding-top:0;width:30%;\">\n              <input type=\"text\" class=\"esriLeadingMargin2\" data-dojo-type=\"dijit/form/NumberTextBox\" data-dojo-attach-event=\"onChange:_handleDistValueChange\" data-dojo-props=\"value:100,intermediateChanges:true,required:true,invalidMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_searchCutoffInput\" class=\"esriLeadingMargin1\"  style=\"width:60%;\">\n            </td>\n            <td colspan=\"2\" style=\"padding-left:0.25em;padding-top:0;width:60%;\">\n              <select class=\"mediumInput esriMediumlabel esriAnalysisSelect esriLeadingMargin1\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-event=\"onChange:_handleDistUnitsChange\" data-dojo-attach-point=\"_distanceUnitsSelect\" style=\"width:65%;table-layout:fixed;\">\n              </select>\n            </td>\n          </tr>\n          <tr data-dojo-attach-point=\"_timeLimitRow\" style=\"display:none;\">\n            <td style=\"padding-top:0;width:24%;\">\n              <label class=\"esriLeadingMargin2 esriTrailingMargin025\">\n                <input type=\"text\" class=\"\" style=\"width:40%\" data-dojo-type=\"dijit/form/NumberTextBox\" data-dojo-attach-event=\"onChange:_handleTimeUnitsChange\" data-dojo-props=\"intermediateChanges:true,value:'1',required:true,invalidMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_hoursInput\"></input>\n                ${i18n.hoursSmall}</label>\n            </td>\n            <td style=\"padding-top:0;width:24%;\">\n              <label class=\"esriLeadingMargin1 esriTrailingMargin025\">\n                <input type=\"text\" class=\"\" style=\"width:40%\" data-dojo-type=\"dijit/form/NumberTextBox\" data-dojo-attach-event=\"onChange:_handleTimeUnitsChange\" data-dojo-props=\"intermediateChanges:true,value:'0',required:true,invalidMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_minutesInput\"></input>\n                ${i18n.minutesSmall}</label>\n            </td>\n            <td style=\"padding-top:0;width:24%;\">\n              <label class=\"esriTrailingMargin025\">\n                <input type=\"text\" class=\"\" style=\"width:40%\" data-dojo-type=\"dijit/form/NumberTextBox\" data-dojo-attach-event=\"onChange:_handleTimeUnitsChange\" data-dojo-props=\"intermediateChanges:true,value:'0',required:true,invalidMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_secondsInput\"></input>\n                ${i18n.secondsSmall}</label>\n            </td>                        \n          </tr>\n                  \n          <!--<tr data-dojo-attach-point=\"_useTrafficLabelRow\">\n            <td colspan=\"2\" style=\"padding-bottom: 0\">\n              <label class=\"esriFloatLeading esriTrailingMargin025\">${i18n.fourLabel}</label>\n              <label class=\"longTextInput\"></label>\n            </td>\n            <td class=\"shortTextInput\" style=\"padding-bottom: 0\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"UseTypicalTraffic\"></a> \n            </td>             \n          </tr>          \n          <tr data-dojo-attach-point=\"_useTrafficRow\">\n            <td colspan=\"3\" style=\"padding:0;\">\n              <div style=\"width:100%;\" class=\"esriFloatLeading esriTrailingMargin3\" data-dojo-type=\"esri/dijit/analysis/TrafficTime\" data-dojo-attach-point=\"_trafficTimeWidget\"></div>\n            </td>\n          </tr>-->\n          <tr>\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>\n          <tr>\n            <td colspan=\"2\">\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\" data-dojo-attach-point=\"_outputNumberLabel\">${i18n.fourLabel}</label>\n              <label class=\"longTextInput\">${i18n.outputLayerLabel}</label>\n            </td>\n            <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"OutputNearestLocationsLayer\"></a> \n            </td>             \n          </tr>\n          <tr>\n            <td colspan=\"3\">\n              <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" class=\"esriLeadingMargin1 esriOutputText\"  data-dojo-props=\"trim:true,required:true\" data-dojo-attach-point=\"_outputLayerInput\" value=\"\"></input>\n            </td>                \n          </tr> \n          <!--<tr>\n            <td colspan=\"3\">\n              <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" class=\"esriLeadingMargin1 esriOutputText\"  data-dojo-props=\"required:true\" data-dojo-attach-point=\"_outputLayerInput2\" value=\"\"></input>\n            </td>                \n          </tr>-->           \n          <tr>\n            <td colspan=\"3\">\n               <div class=\"esriLeadingMargin1\" data-dojo-attach-point=\"_chooseFolderRow\">\n                 <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n                 <input class=\"longInput esriFolderSelect\" dojoAttachPoint=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\"></input>\n               </div>              \n            </td>\n          </tr>                                      \n        </tbody>         \n       </table>\n     </div>\n    <div data-dojo-attach-point=\"_aggregateToolContentButtons\" style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n      <div class=\"esriExtentCreditsCtr\">\n        <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\n       <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n         <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n           ${i18n.useMapExtent}\n       </label>\n      </div>\n      <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" class=\"esriLeadingMargin4 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n          ${i18n.runAnalysis}\n      </button>\n    </div>\n    <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n      <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n    </div>    \n</div>\n"}});
//>>built
define("esri/dijit/analysis/FindNearest", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/json", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dojo/number", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "dijit/form/NumberSpinner", "dijit/form/NumberTextBox", "../../kernel", "./AnalysisBase", "./CreditEstimator", "./utils", "./TrafficTime", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/FindNearest.html"], function(p, q, c, k, l, e, z, A, f, g, n, B, C, r, D, s, t, u, v, w, E, F, G, H, I, J, K, L, M, N, O, P, x, Q, h, R, m, y) {
    return q([s, t, u, v, w, x], {
        declaredClass: "esri.dijit.analysis.FindNearest",
        templateString: y,
        basePath: p.toUrl("."),
        widgetsInTemplate: !0,
        analysisLayer: null,
        nearLayers: null,
        summaryFields: null,
        outputLayerName: null,
        nearLayer: null,
        searchCutoff: 100,
        searchCutoffUnits: "Miles",
        measurementType: "StraightLine",
        maxCount: 1,
        returnFeatureCollection: !1,
        showSelectFolder: !1,
        showChooseExtent: !0,
        showCredits: !0,
        enableTravelModes: !0,
        showHelp: !0,
        i18n: null,
        toolName: "FindNearest",
        helpFileName: "FindNearest",
        resultParameter: ["nearestLayer", "connectingLinesLayer"],
        _timeObj: null,
        constructor: function(a) {
            this._pbConnects = [];
            this._statsRows = [];
            this._timeObj = {
                hours: 1,
                minutes: 0,
                seconds: 0
            };
            a.containerNode && (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments);
            k.forEach(this._pbConnects, l.disconnect);
            delete this._pbConnects;
            this._driveTimeClickHandles && 0 < this._driveTimeClickHandles.length && (k.forEach(this._driveTimeClickHandles,
                l.disconnect), this._driveTimeClickHandles = null)
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            c.mixin(this.i18n, m.bufferTool);
            c.mixin(this.i18n, m.driveTimes);
            c.mixin(this.i18n, m.FindNearestTool)
        },
        postCreate: function() {
            this.inherited(arguments);
            r.add(this._form.domNode, "esriSimpleForm");
            this._outputLayerInput.set("validator", c.hitch(this, this.validateServiceName, this._outputLayerInput));
            this._hoursInput.set("validator", c.hitch(this, this.validateTime, "hours"));
            this._minutesInput.set("validator",
                c.hitch(this, this.validateTime, "minutes"));
            this._secondsInput.set("validator", c.hitch(this, this.validateTime, "seconds"));
            this._buildUI()
        },
        startup: function() {},
        _onClose: function(a) {
            a && (this._save(), this.emit("save", {
                save: !0
            }));
            this.emit("close", {
                save: a
            })
        },
        _handleShowCreditsClick: function(a) {
            a.preventDefault();
            if (this._form.validate()) {
                a = {};
                var b;
                b = this.nearLayers[this._layersSelect.get("value")];
                a.nearLayer = e.toJson(h.constructAnalysisInputLyrObj(b));
                a.measurementType = this.get("measurementType");
                a.analysisLayer =
                    e.toJson(h.constructAnalysisInputLyrObj(this.analysisLayer));
                !0 === this._searchCutoffInput.get("value") ? (a.searchCutoff = this.get("searchCutoff"), -1 !== this.get("measurementType").indexOf("Time") ? a.searchCutoffUnits = "Minutes" : a.searchCutoffUnits = this.get("searchCutoffUnits")) : a.searchCutoff = null;
                !0 === this._limitSearchRangeCheck.get("value") ? a.maxCount = this.get("maxCount") : a.maxCount = null;
                this._trafficTimeWidget.get("checked") && (a.timeOfDay = this._trafficTimeWidget.get("timeOfDay"), "UTC" === this._trafficTimeWidget.get("timeZoneForTimeOfDay") &&
                    (a.timeZoneForTimeOfDay = this._trafficTimeWidget.get("timeZoneForTimeOfDay")));
                this.returnFeatureCollection || (a.OutputName = e.toJson({
                    serviceProperties: {
                        name: this._outputLayerInput.get("value")
                    }
                }));
                this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = e.toJson({
                    extent: this.map.extent._normalize(!0)
                }));
                this.getCreditsEstimate(this.toolName, a).then(c.hitch(this, function(a) {
                    this._usageForm.set("content", a);
                    this._usageDialog.show()
                }))
            }
        },
        _handleSaveBtnClick: function() {
            if (this._form.validate()) {
                this._saveBtn.set("disabled", !0);
                var a = {},
                    b = {},
                    d, c;
                d = this.nearLayers[this._layersSelect.get("value")];
                a.nearLayer = e.toJson(h.constructAnalysisInputLyrObj(d));
                a.measurementType = this.get("measurementType");
                a.analysisLayer = e.toJson(h.constructAnalysisInputLyrObj(this.analysisLayer));
                this._limitSearchRangeCheck.get("checked") ? (a.searchCutoff = this.get("searchCutoff"), -1 === this.get("measurementType").indexOf("Time") && (a.searchCutoffUnits = this.get("searchCutoffUnits"))) : a.searchCutoff = null;
                this._findNearestCheck.get("checked") ? a.maxCount =
                    this.get("maxCount") : a.maxCount = null;
                this._trafficTimeWidget.get("checked") && (a.timeOfDay = this._trafficTimeWidget.get("timeOfDay"), "UTC" === this._trafficTimeWidget.get("timeZoneForTimeOfDay") && (a.timeZoneForTimeOfDay = this._trafficTimeWidget.get("timeZoneForTimeOfDay")));
                this.returnFeatureCollection || (a.OutputName = e.toJson({
                    serviceProperties: {
                        name: this._outputLayerInput.get("value")
                    }
                }));
                this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = e.toJson({
                    extent: this.map.extent._normalize(!0)
                }));
                this.returnFeatureCollection && (c = {
                    outSR: this.map.spatialReference
                }, this.showChooseExtent && (c.extent = this.map.extent._normalize(!0)), a.context = e.toJson(c));
                b.jobParams = a;
                this._saveBtn.set("disabled", !1);
                b.itemParams = {
                    description: f.substitute(this.i18n.itemDescription, {
                        sumNearbyLayerName: this.analysisLayer.name,
                        summaryLayerName: d.name
                    }),
                    tags: f.substitute(this.i18n.itemTags, {
                        sumNearbyLayerName: this.analysisLayer.name,
                        summaryLayerName: d.name
                    }),
                    snippet: this.i18n.itemSnippet
                };
                this.showSelectFolder && (b.itemParams.folder =
                    this._webMapFolderSelect.item ? this.folderStore.getValue(this._webMapFolderSelect.item, "id") : "");
                console.log(b);
                this.execute(b)
            }
        },
        _handleLayerChange: function(a) {
            this.outputLayerName = f.substitute(this.i18n.outputLayerName, {
                layer: this.nearLayers[a].name,
                sumNearbyLayerName: this.analysisLayer.name
            });
            this._outputLayerInput.set("value", this.outputLayerName)
        },
        _handleLimitSearchCheckChange: function(a) {
            -1 !== this.get("measurementType").indexOf("Time") ? (this._hoursInput.set("disabled", !a), this._minutesInput.set("disabled", !a), this._secondsInput.set("disabled", !a)) : (this._distanceUnitsSelect.set("disabled", !a), this._searchCutoffInput.set("disabled", !a))
        },
        _handleFindNearestCheckChange: function(a) {
            this._maxCountInput.set("disabled", !a)
        },
        _handleTimeUnitsChange: function(a) {},
        _handleDistValueChange: function(a) {
            this.set("outputLayerName")
        },
        _handleDistUnitsChange: function(a) {
            this.set("outputLayerName");
            console.log("setting", a);
            this.set("searchCutoffUnits", a)
        },
        _handleDistanceTypeChange: function(a) {
            var b = -1 !== a.indexOf("Time"),
                d = "DrivingTime" === a;
            this.set("measurementType", a);
            g.set(this._useTrafficRow, "display", d ? "" : "none");
            g.set(this._distanceLimitRow, "display", d ? "none" : "");
            g.set(this._timeLimitRow, "display", d ? "" : "none");
            this._trafficTimeWidget.set("disabled", "DrivingTime" !== a);
            this._trafficTimeWidget.set("reset", "DrivingTime" !== a);
            b ? (this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()), this._distanceUnitsSelect.addOption([{
                value: "Seconds",
                label: this.i18n.seconds
            }, {
                value: "Minutes",
                label: this.i18n.minutes,
                selected: "selected"
            }, {
                value: "Hours",
                label: this.i18n.hours
            }])) : (this.get("searchCutoffUnits") && this.set("searchCutoffUnits", this.get("searchCutoffUnits")), this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()), this._distanceUnitsSelect.addOption([{
                    value: "Miles",
                    label: this.i18n.miles
                }, {
                    value: "Yards",
                    label: this.i18n.yards
                }, {
                    value: "Feet",
                    label: this.i18n.feet
                }, {
                    type: "separator"
                }, {
                    value: "Kilometers",
                    label: this.i18n.kilometers
                }, {
                    value: "Meters",
                    label: this.i18n.meters
                }]), "StraightLine" ===
                a && this._distanceUnitsSelect.addOption([{
                    type: "separator"
                }, {
                    value: "NauticalMiles",
                    label: this.i18n.nautMiles
                }]), this._distanceUnitsSelect.set("value", this.searchCutoffUnits));
            this.set("outputLayerName")
        },
        _save: function() {},
        _buildUI: function() {
            h.initHelpLinks(this.domNode, this.showHelp);
            this.get("enableTravelModes") || this._updateTravelModes(this.enableTravelModes);
            this.analysisLayer && (n.set(this._aggregateToolDescription, "innerHTML", f.substitute(this.i18n.summarizeDefine, {
                    sumNearbyLayerName: this.analysisLayer.name
                })),
                n.set(this._forLocationLabel, "innerHTML", f.substitute(this.i18n.forEachLocationLabel, {
                    sumNearbyLayerName: this.analysisLayer.name
                })), "esriGeometryPoint" !== this.analysisLayer.geometryType && (this.set("enableTravelModes", !1), this._updateTravelModes(!1)));
            this.nearLayers && k.forEach(this.nearLayers, function(a, b) {
                a !== this.analysisLayer && (this._layersSelect.addOption({
                    value: b,
                    label: a.name
                }), this.outputLayerName || (this.outputLayerName = f.substitute(this.i18n.outputLayerName, {
                        layer: a.name,
                        sumNearbyLayerName: this.analysisLayer.name
                    }),
                    this.outputLinesLayerName = f.substitute(this.i18n.outputConnectingLayerName, {
                        layer: a.name,
                        sumNearbyLayerName: this.analysisLayer.name
                    })))
            }, this);
            this.outputLayerName && this._outputLayerInput.set("value", this.outputLayerName);
            this.nearLayer && this._layersSelect.set();
            g.set(this._chooseFolderRow, "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(c.hitch(this, function(a) {
                this.folderStore = a;
                this._webMapFolderSelect.set("store", a);
                this._webMapFolderSelect.set("value",
                    this.portalUser.username)
            }));
            g.set(this._chooseExtentDiv, "display", !0 === this.showChooseExtent ? "block" : "none");
            this.measurementType && -1 === this.measurementType.indexOf("Time") ? (this.searchCutoffUnits && this._distanceUnitsSelect.set("value", this.searchCutoffUnits), this.searchCutoff && this._searchCutoffInput.set("value", this.searchCutoff)) : this.measurementType && -1 !== this.measurementType.indexOf("Time") && this._timeObj !== this.searchCutoff && (this._hoursInput.set("value", parseInt(this.searchCutoff.hours, 10)),
                this._minutesInput.set("value", parseInt(this.searchCutoff.minutes, 10)), this._secondsInput.set("value", parseInt(this.searchCutoff.seconds, 10)), this._timeObj.hours = parseInt(this.searchCutoff.hours, 10), this._timeObj.minutes = parseInt(this.searchCutoff.minutes, 10), this._timeObj.seconds = parseInt(this.searchCutoff.seconds, 10));
            this._handleDistanceTypeChange(this.measurementType);
            this.maxCount && this._maxCountInput.set("value", this.maxCount);
            this._loadConnections()
        },
        _loadConnections: function() {
            this.on("start",
                c.hitch(this, "_onClose", !0));
            this._connect(this._closeBtn, "onclick", c.hitch(this, "_onClose", !1));
            this._connect(this._measureMethodSelect, "onChange", c.hitch(this, "_handleDistanceTypeChange"));
            this.watch("enableTravelModes", c.hitch(this, function(a, b, d) {
                this._updateTravelModes(d)
            }))
        },
        _setAnalysisGpServerAttr: function(a) {
            a && (this.analysisGpServer = a, this.set("toolServiceUrl", this.analysisGpServer + "/" + this.toolName))
        },
        _setAnalysisLayerAttr: function(a) {
            this.analysisLayer = a
        },
        _getAnalysisLayerAttr: function(a) {
            return this.analysisLayer
        },
        _setNearLayersAttr: function(a) {
            this.nearLayers = a
        },
        _setLayersAttr: function(a) {
            this.nearLayers = []
        },
        _setDisableRunAnalysisAttr: function(a) {
            this._saveBtn.set("disabled", a)
        },
        _setShowSelectFolderAttr: function(a) {
            this.showSelectFolder = a
        },
        _getShowSelectFolderAttr: function() {
            return this.showSelectFolder
        },
        _setShowChooseExtentAttr: function(a) {
            this.showChooseExtent = a
        },
        _getShowChooseExtentAttr: function() {
            return this.showChooseExtent
        },
        _setMapAttr: function(a) {
            this.map = a
        },
        _getMapAttr: function() {
            return this.map
        },
        _setShowHelpAttr: function(a) {
            this.showHelp = a
        },
        _getShowHelpAttr: function() {
            return this.showHelp
        },
        _setSearchCutoffUnitsAttr: function(a) {
            this.searchCutoffUnits = a
        },
        _getSearchCutoffUnitsAttr: function() {
            return this.searchCutoffUnits
        },
        _setMeasurementTypeAttr: function(a) {
            this.measurementType = a
        },
        _getMeasurementTypeAttr: function() {
            return this.measurementType
        },
        _getSearchCutoffAttr: function() {
            this.measurementType && "DrivingTime" === this.measurementType ? this._timeObj && (this.searchCutoff = 60 * this._timeObj.hours + this._timeObj.minutes +
                this._timeObj.seconds / 60) : this.searchCutoff = this._searchCutoffInput.get("value");
            return this.searchCutoff
        },
        _setSearchCutoffAttr: function(a) {
            a && (this.searchCutoff = a)
        },
        _getMaxCountAttr: function() {
            return this.maxCount = this._maxCountInput.get("value")
        },
        _setMaxCountAttr: function(a) {
            this.maxCount = a
        },
        _setShowCreditsAttr: function(a) {
            this.showCredits = a
        },
        _getShowCreditsAttr: function() {
            return this.showCredits
        },
        _setReturnFeatureCollectionAttr: function(a) {
            this.returnFeatureCollection = a
        },
        _getReturnFeatureCollectionAttr: function() {
            return this.returnFeatureCollection
        },
        _setEnableTravelModesAttr: function(a) {
            this._set("enableTravelModes", a)
        },
        validateServiceName: function(a, b) {
            var d = /(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(b);
            return 0 === b.length || 0 === f.trim(b).length ? (this._outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : d ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceName), !1) : 98 < b.length ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceNameLength), !1) : !0
        },
        validateTime: function(a, b) {
            var d = !0,
                c;
            c = parseInt(b, 10);
            "hours" === a ? this._timeObj.hours = c : "minutes" === a ? this._timeObj.minutes = c : "seconds" === a && (this._timeObj.seconds = c);
            0 === this._timeObj.hours && (0 === this._timeObj.minutes && 0 === this._timeObj.seconds) && (d = !1);
            return d
        },
        _connect: function(a, b, c) {
            this._pbConnects.push(l.connect(a, b, c))
        },
        _updateTravelModes: function(a) {
            var b = this._measureMethodSelect.getOptions();
            k.forEach(b, function(b) {
                "StraightLine" !== b.value && (b.disabled = !a)
            });
            this._measureMethodSelect.updateOption(b)
        }
    })
});