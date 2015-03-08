require({cache:{
'url:esri/dijit/analysis/templates/SummarizeNearby.html':"<div class=\"esriAnalysis\">\n    <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n      <div data-dojo-attach-point=\"_aggregateToolContentTitle\" class=\"analysisTitle\">\n        <table class=\"esriFormTable\" > \n          <tr>\n            <td class=\"esriToolIconTd\"><div class=\"sumNearbyIcon\"></div></td>\n            <td class=\"esriAlignLeading\">${i18n.summarizeNearby}</td>\n            <td>\n              <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                  <div class=\"esriFloatLeading\">\n                    <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                  </div>\n                  <div class=\"esriFloatTrailing\">\n                    <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                  </div>              \n              </div>               \n            </td>\n          </tr>\n        </table>\n      </div>\n      <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n    </div>\n    <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n       <table class=\"esriFormTable\"  data-dojo-attach-point=\"_aggregateTable\"  style=\"border-collapse:collapse;border-spacing:5px;\" cellpadding=\"5px\" cellspacing=\"5px\"> \n         <tbody>\n          <tr>\n            <td  colspan=\"3\" class=\"sectionHeader\" data-dojo-attach-point=\"_aggregateToolDescription\" >${i18n.summarizeDefine}</td>\n          </tr>      \n          <tr>\n            <td colspan=\"3\">\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n              <label class=\"\">${i18n.chooseSummarizeLabel}</label>\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"Summarize\"></a>\n              <select class=\"longInput esriLeadingMargin1 esriLongLabel\"  style=\"margin-top:1.0em;\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_layersSelect\" data-dojo-attach-event=\"onChange:_handleLayerChange\"></select>\n            </td>\n          </tr>\n          <tr>\n          <tr>\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>\n          <tr>\n            <td colspan=\"2\">\n              <label data-dojo-attach-point=\"_labelOne\" class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n              <label data-dojo-attach-point=\"_measurelabel\" class=\"\">${i18n.findNearLabel}</label>\n            </td>\n            <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"BufferOption\"></a>\n            </td>\n          </tr>\n          <tr>\n            <td style=\"padding:0.25em;\" colspan=\"3\">\n              <div data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_nearTypeSelect\" class=\"esriLeadingMargin1 longInput esriLongLabel esriAnalysisDriveMode\">\n                <div data-dojo-value=\"StraightLine\">\n                  <div class=\"esriFloatLeading bufferIcon esriStraightLineDistanceIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.straightLineDistance}</div>\n                </div>\n                <div data-dojo-value=\"DrivingTime\">\n                  <div class=\"esriFloatLeading bufferIcon esriDrivingTimeIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.drivingTime}</div>\n                </div>\n                <div data-dojo-value=\"DrivingDistance\">\n                  <div class=\"esriFloatLeading bufferIcon esriDrivingDistanceIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.drivingDistance}</div>\n                </div>\n                <div data-dojo-value=\"TruckingTime\">\n                  <div class=\"esriFloatLeading bufferIcon esriTruckingTimeIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.truckingTime}</div>\n                </div>\n                <div data-dojo-value=\"TruckingDistance\">\n                  <div class=\"esriFloatLeading bufferIcon esriTruckingDistanceIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.truckingDistance}</div>\n                </div>\n                <div data-dojo-value=\"WalkingTime\">\n                  <div class=\"esriFloatLeading bufferIcon esriWalkingTimeIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.walkingTime}</div>\n                </div>\n                <div data-dojo-value=\"WalkingDistance\">\n                  <div class=\"esriFloatLeading bufferIcon esriWalkingDistanceIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.walkingDistance}</div>\n                </div>\n              </div>\n            </td>            \n          </tr>           \n          <tr>\n            <td style=\"padding-right:0;padding-bottom:0;width:20%;\">\n              <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" data-dojo-attach-event=\"onChange:_handleDistValueChange\" data-dojo-props=\"intermediateChanges:true,value:'5',required:true,missingMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_breakValuesInput\" class=\"esriLeadingMargin1\"  style=\"width:75%;\">\n            </td>\n            <td colspan=\"2\" style=\"padding-left:0.25em;padding-bottom:0;width:60%;\">\n              <select class=\"mediumInput esriAnalysisSelect\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-event=\"onChange:_handleDistUnitsChange\" data-dojo-attach-point=\"_distanceUnitsSelect\" style=\"width:80%;table-layout:fixed;\">\n              </select>\n            </td>\n          </tr>\n          <tr>\n            <td style=\"padding:0\" colspan=\"3\">\n              <div class=\"esriLeadingMargin1\">\n                <label class=\"esriSmallLabel\">${i18n.measureHelp}</label>\n              </div>\n            </td>\n          </tr>\n          <tr data-dojo-attach-point=\"_useTrafficRow\">\n            <td style=\"padding:0\" colspan=\"3\">\n              <div style=\"width:100%;\" data-dojo-type=\"esri/dijit/analysis/TrafficTime\" data-dojo-attach-point=\"_trafficTimeWidget\"></div>\n            </td>\n          </tr>\n         <tr>\n           <td colspan=\"3\">\n              <label class=\"esriLeadingMargin1 esriSelectLabel\">\n               <div data-dojo-type=\"dijit/form/CheckBox\" data-dojo-attach-point=\"_returnBdrycCheck\" data-dojo-props=\"checked:true\"></div>\n               ${i18n.returnBdrycCheckLabel}\n              </label>             \n           </td>\n         </tr>           \n          <tr>\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>\n          <tr>\n            <td colspan=\"3\">\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.threeLabel}</label>\n              <label class=\"longTextInput\" data-dojo-attach-point=\"_addStatsLabel\"></label>\n              <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_addStatsHelpLink\" esriHelpTopic=\"AddStatisticsFrom\"></a>\n            </td>\n          </tr>\n         <tr>\n           <td colspan=\"3\">\n              <label class=\"esriLeadingMargin1 esriSelectLabel\">\n                <div class=\"esriLeadingMargin1\" data-dojo-type=\"dijit/form/CheckBox\"  data-dojo-attach-point=\"_sumMetricCheck\" data-dojo-props=\"checked:true, disabled:true\"></div>\n                <span data-dojo-attach-point=\"_sumMetricLabel\"></span>\n              </label>\n           </td>\n         </tr>\n         <tr>\n           <td colspan=\"3\" style=\"padding-top: 0\">\n              <select class=\"longInput esriLongLabel esriLeadingMargin1\" data-dojo-type=\"dijit.form.Select\"  data-dojo-props=\"style:{width:'65%', tableLayout: 'fixed', overflowX:'hidden'}\" data-dojo-attach-event=\"onChange:_handleShapeUnitsChange\" data-dojo-attach-point=\"_shapeUnitsSelect\"></select>\n           </td>\n         </tr>         \n         <!--<tr>\n           <td colspan=\"3\">\n              <label class=\"longTextInput\">\n                <div data-dojo-type=\"dijit/form/CheckBox\" data-dojo-attach-point=\"_addStatesCheck\" data-dojo-attach-event=\"onChange:_handleStatsCheckChange\" data-dojo-props=\"checked:'true'\"></div>\n                ${i18n.addStatsLabel}                \n              </label>\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"KeepBoundaryNoPoints\"></a>\n           </td>           \n          </tr>-->           \n          <tr data-dojo-attach-point=\"_afterStatsRow\">\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>\n          \n          <tr>\n            <td colspan=\"2\">\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.fourLabel}</label>\n              <label class=\"longTextInput\"  data-dojo-attach-point=\"_groupByLabel\">${i18n.groupByLabel}</label>\n            </td>\n            <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"GroupBy\"></a> \n            </td>             \n          </tr>\n          <tr>\n            <td colspan=\"3\">\n              <select class=\"esriLeadingMargin1 longInput\" data-dojo-type=\"dijit.form.Select\"  data-dojo-attach-point=\"_groupBySelect\" data-dojo-attach-event=\"onChange:_handleGroupBySelectChange\"></select>\n            </td>                \n          </tr>\n          <tr>\n           <td colspan=\"2\">\n             <label class=\"esriLeadingMargin2 esriSelectLabel\" data-dojo-attach-point=\"_minmajorityLabel\">\n               <div data-dojo-type=\"dijit/form/CheckBox\" data-dojo-attach-point=\"_minmajorityCheck\" data-dojo-props=\"checked:false\"></div>\n               ${i18n.addMinMajorityLable}\n             </label>\n           </td>\n           <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"MinorityMajority\"></a>\n           </td>\n          </tr>    \n         <tr>\n           <td colspan=\"2\">\n             <label class=\"esriLeadingMargin2 esriSelectLabel\" data-dojo-attach-point=\"_percentPointsLabel\">\n               <div data-dojo-type=\"dijit/form/CheckBox\" data-dojo-attach-point=\"_percentPointsCheck\" data-dojo-props=\"checked:false\"></div>\n               ${i18n.addPercentageLabel}\n             </label>\n           </td>\n           <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"PercentShape\"></a>\n           </td>\n          </tr>    \n          <tr>\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>\n          <tr>\n            <td colspan=\"2\">\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.fiveLabel}</label>\n              <label class=\"longTextInput\">${i18n.outputLayerLabel}</label>\n            </td>\n            <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"OutputName\"></a> \n            </td>             \n          </tr>\n          <tr>\n            <td colspan=\"3\">\n              <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" class=\"esriLeadingMargin1 esriOutputText\"  data-dojo-props=\"trim:true,required:true\" data-dojo-attach-point=\"_outputLayerInput\" value=\"\"></input>\n            </td>                \n          </tr> \n          <tr>\n            <td colspan=\"3\">\n               <div class=\"esriLeadingMargin1\" data-dojo-attach-point=\"_chooseFolderRow\">\n                 <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n                 <input class=\"longInput esriFolderSelect\" dojoAttachPoint=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\"></input>\n               </div>              \n            </td>\n          </tr>                                      \n        </tbody>         \n       </table>\n     </div>\n    <div data-dojo-attach-point=\"_aggregateToolContentButtons\" style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n      <div class=\"esriExtentCreditsCtr\">\n        <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\n       <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n         <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n           ${i18n.useMapExtent}\n       </label>\n      </div>\n      <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" class=\"esriLeadingMargin4 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n          ${i18n.runAnalysis}\n      </button>\n    </div>\n    <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n      <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n    </div>\n    <div class=\"esriFormWarning esriRoundedBox\" data-dojo-attach-point=\"_errorMessagePane\" style=\"display:none;\">\n      <a href=\"#\" title=\"${i18n.close}\" class=\"esriFloatTrailing closeIcon\" title='${i18n.close}' data-dojo-attach-event=\"onclick:_handleCloseMsg\">\n        <img src='images/close.gif' border='0'/> \n      </a>\n      <span data-dojo-attach-point=\"_bodyNode\"></span>\n    </div>        \n</div>\n"}});
//>>built
define("esri/dijit/analysis/SummarizeNearby", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/json", "dojo/_base/fx", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dojo/number", "dojo/fx/easing", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "../../kernel", "../../lang", "./AnalysisBase", "./CreditEstimator", "./utils", "./TrafficTime", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/SummarizeNearby.html"], function(y, z, e, g, n, h, u, I, J, k, l, d, m, A, s, p, v, B, C, D, E, F, w, K, L, M, x, N, O, P, Q, R, q, G, S, r, T, t, H) {
    return z([B, C, D, E, F, G], {
        declaredClass: "esri.dijit.analysis.SummarizeNearby",
        templateString: H,
        basePath: y.toUrl("."),
        widgetsInTemplate: !0,
        sumNearbyLayer: null,
        summaryLayers: null,
        summaryFields: null,
        nearType: null,
        outputLayerName: null,
        summarizeMetric: !0,
        summaryLayer: null,
        groupByField: null,
        minorityMajority: !1,
        percentPoints: !1,
        distances: null,
        units: null,
        shapeUnits: null,
        sumShape: !0,
        showSelectFolder: !1,
        showChooseExtent: !0,
        enableTravelModes: !0,
        showHelp: !0,
        showCredits: !0,
        returnFeatureCollection: !1,
        i18n: null,
        toolName: "SummarizeNearby",
        helpFileName: "SummarizeNearby",
        resultParameter: "resultLayer",
        constructor: function(a) {
            this._pbConnects = [];
            this._statsRows = [];
            a.containerNode && (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments);
            g.forEach(this._pbConnects, n.disconnect);
            delete this._pbConnects;
            this._driveTimeClickHandles && 0 < this._driveTimeClickHandles.length && (g.forEach(this._driveTimeClickHandles,
                n.disconnect), this._driveTimeClickHandles = null)
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            e.mixin(this.i18n, t.bufferTool);
            e.mixin(this.i18n, t.driveTimes);
            e.mixin(this.i18n, t.summarizeNearbyTool)
        },
        postCreate: function() {
            this.inherited(arguments);
            s.add(this._form.domNode, "esriSimpleForm");
            this._breakValuesInput.set("validator", e.hitch(this, this.validateDistance));
            this._outputLayerInput.set("validator", e.hitch(this, this.validateServiceName));
            this._buildUI()
        },
        startup: function() {},
        _onClose: function(a) {
            a &&
                (this._save(), this.emit("save", {
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
                b = this.summaryLayers[this._layersSelect.get("value")];
                a.summaryLayer = h.toJson(r.constructAnalysisInputLyrObj(b));
                a.nearType = this.get("nearType");
                a.sumNearbyLayer = h.toJson(r.constructAnalysisInputLyrObj(this.sumNearbyLayer));
                a.summaryFields = h.toJson(this.get("summaryFields"));
                a.distances = h.toJson(this.get("distances"));
                a.units = this._distanceUnitsSelect.get("value");
                this._trafficTimeWidget.get("checked") && (a.timeOfDay = this._trafficTimeWidget.get("timeOfDay"), "UTC" === this._trafficTimeWidget.get("timeZoneForTimeOfDay") && (a.timeZoneForTimeOfDay = this._trafficTimeWidget.get("timeZoneForTimeOfDay")));
                this.returnFeatureCollection || (a.OutputName = h.toJson({
                    serviceProperties: {
                        name: this._outputLayerInput.get("value")
                    }
                }));
                a.sumShape = this._sumMetricCheck.get("checked");
                if ("esriGeometryPoint" !== b.geometryType || "esriGeometryMultipoint" !== b.geometryType) a.shapeUnits = this.get("shapeUnits");
                "0" !== this._groupBySelect.get("value") && (a.groupByField = this._groupBySelect.get("value"));
                a.returnBoundaries = this.get("returnBoundaries");
                this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = h.toJson({
                    extent: this.map.extent._normalize(!0)
                }));
                this.getCreditsEstimate(this.toolName, a).then(e.hitch(this, function(a) {
                    this._usageForm.set("content", a);
                    this._usageDialog.show()
                }))
            }
        },
        _handleSaveBtnClick: function() {
            if (this._form.validate())
                if (!this._sumMetricCheck.get("checked") && 0 === this.get("summaryFields").length) this._showMessages(this.i18n.statsRequiredMsg);
                else {
                    this._saveBtn.set("disabled", !0);
                    var a = {},
                        b = {},
                        c, f;
                    c = this.summaryLayers[this._layersSelect.get("value")];
                    a.summaryLayer = h.toJson(r.constructAnalysisInputLyrObj(c));
                    a.nearType = this.get("nearType");
                    a.sumNearbyLayer = h.toJson(r.constructAnalysisInputLyrObj(this.sumNearbyLayer));
                    a.summaryFields = h.toJson(this.get("summaryFields"));
                    a.distances = this.get("distances");
                    a.units = this._distanceUnitsSelect.get("value");
                    this._trafficTimeWidget.get("checked") && (a.timeOfDay = this._trafficTimeWidget.get("timeOfDay"),
                        "UTC" === this._trafficTimeWidget.get("timeZoneForTimeOfDay") && (a.timeZoneForTimeOfDay = this._trafficTimeWidget.get("timeZoneForTimeOfDay")));
                    a.returnBoundaries = this.get("returnBoundaries");
                    this.returnFeatureCollection || (a.OutputName = h.toJson({
                        serviceProperties: {
                            name: this._outputLayerInput.get("value")
                        }
                    }));
                    a.sumShape = this._sumMetricCheck.get("checked");
                    if ("esriGeometryPoint" !== c.geometryType || "esriGeometryMultipoint" !== c.geometryType) a.shapeUnits = this.get("shapeUnits");
                    "0" !== this._groupBySelect.get("value") &&
                        (a.groupByField = this._groupBySelect.get("value"), this.resultParameter = ["resultLayer", "groupBySummary"], a.minorityMajority = this.get("minorityMajority"), a.percentPoints = this.get("percentPoints"));
                    this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = h.toJson({
                        extent: this.map.extent._normalize(!0)
                    }));
                    this.returnFeatureCollection && (f = {
                        outSR: this.map.spatialReference
                    }, this.showChooseExtent && (f.extent = this.map.extent._normalize(!0)), a.context = h.toJson(f));
                    b.jobParams = a;
                    this._saveBtn.set("disabled", !1);
                    b.itemParams = {
                        description: k.substitute(this.i18n.itemDescription, {
                            sumNearbyLayerName: this.sumNearbyLayer.name,
                            summaryLayerName: c.name
                        }),
                        tags: k.substitute(this.i18n.itemTags, {
                            sumNearbyLayerName: this.sumNearbyLayer.name,
                            summaryLayerName: c.name
                        }),
                        snippet: this.i18n.itemSnippet
                    };
                    this.showSelectFolder && (b.itemParams.folder = this._webMapFolderSelect.item ? this.folderStore.getValue(this._webMapFolderSelect.item, "id") : "");
                    this.execute(b)
                }
        },
        _initializeShapeUnits: function(a) {
            this._prevGeometryType && this._prevGeometryType ===
                a || (this._shapeUnitsSelect.removeOption(this._shapeUnitsSelect.getOptions()), l.set(this._shapeUnitsSelect.domNode, "display", "esriGeometryPoint" === a || "esriGeometryMultipoint" === a ? "none" : ""), "esriGeometryPolygon" === a ? (this._shapeUnitsSelect.addOption([{
                        value: "SquareMiles",
                        label: this.i18n.sqMiles
                    }, {
                        value: "SquareKilometers",
                        label: this.i18n.sqKm
                    }, {
                        value: "SquareMeters",
                        label: this.i18n.sqMeters
                    }, {
                        value: "Hectares",
                        label: this.i18n.hectares
                    }, {
                        value: "Acres",
                        label: this.i18n.acres
                    }]), "Kilometers" === this.units &&
                    !this.shapeUnits ? this.shapeUnits = "SquareKilometers" : "Kilometers" === this.get("shapeUnits") && this.set("shapeUnits", "SquareKilometers")) : "esriGeometryPolyline" === a && (this._shapeUnitsSelect.addOption([{
                        value: "Miles",
                        label: this.i18n.miles
                    }, {
                        value: "Feet",
                        label: this.i18n.feet
                    }, {
                        value: "Kilometers",
                        label: this.i18n.kilometers
                    }, {
                        value: "Meters",
                        label: this.i18n.meters
                    }, {
                        value: "Yards",
                        label: this.i18n.yards
                    }]), "Kilometers" === this.units && !this.shapeUnits ? this.shapeUnits = "Kilometers" : "SquareKilometers" === this.get("shapeUnits") &&
                    this.set("shapeUnits", "Kilometers")), this._shapeUnitsSelect.set("value", this.get("shapeUnits")), this._prevGeometryType = a)
        },
        _handleLayerChange: function(a) {
            a = this.summaryLayers[a];
            this.outputLayerName = k.substitute(this.i18n.outputLayerName, {
                summaryLayerName: a.name,
                sumNearbyLayerName: this.sumNearbyLayer.name
            });
            this._outputLayerInput.set("value", this.outputLayerName);
            d.set(this._addStatsLabel, "innerHTML", k.substitute(this.i18n.addStats, {
                summaryLayerName: a.name
            }));
            this._initializeShapeUnits(a.geometryType);
            "esriGeometryPolygon" === a.geometryType && (d.set(this._sumMetricLabel, "innerHTML", this.i18n.summarizeMetricPoly), d.set(this._addStatsHelpLink, "esriHelpTopic", "StatisticsPolygon"));
            if ("esriGeometryPoint" === a.geometryType || "esriGeometryMultipoint" === a.geometryType) d.set(this._sumMetricLabel, "innerHTML", this.i18n.summarizeMetricPoint), d.set(this._addStatsHelpLink, "esriHelpTopic", "StatisticsPoint");
            "esriGeometryPolyline" === a.geometryType && (d.set(this._sumMetricLabel, "innerHTML", this.i18n.summarizeMetricLine),
                d.set(this._addStatsHelpLink, "esriHelpTopic", "StatisticsLine"));
            this.set("groupBySelect", this.groupByField);
            this._removeStatsRows();
            this._createStatsRow()
        },
        _handleAttrSelectChange: function(a) {
            var b;
            "0" !== a && (a = this.get("statisticSelect"), "0" !== a.get("value") && !a.get("isnewRowAdded") && (b = a.get("removeTd"), l.set(b, "display", "block"), b = a.get("referenceWidget"), e.hitch(b, b._createStatsRow()), b._sumMetricCheck.set("disabled", !1), a.set("isnewRowAdded", !0)))
        },
        _handleStatsValueUpdate: function(a, b, c) {
            this.get("attributeSelect") &&
                (a = this.get("attributeSelect"), "0" !== a.get("value") && "0" !== c && !this.get("isnewRowAdded") && (c = this.get("removeTd"), l.set(c, "display", "block"), c = this.get("referenceWidget"), e.hitch(c, c._createStatsRow()), c._sumMetricCheck.set("disabled", !1), this.set("isnewRowAdded", !0)))
        },
        _handleDistValueChange: function(a) {
            this.set("outputLayerName")
        },
        _handleDistUnitsChange: function(a) {
            this.set("outputLayerName");
            this.set("units", a)
        },
        _handleShapeUnitsChange: function(a) {
            this.set("shapeUnits", a)
        },
        _handleDistanceTypeChange: function(a) {
            this.set("nearType",
                a);
            var b = -1 !== a.indexOf("Time");
            a = "DrivingTime" === a;
            l.set(this._useTrafficRow, "display", a ? "" : "none");
            this._trafficTimeWidget.set("disabled", !a);
            this._trafficTimeWidget.set("reset", !a);
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
                }]), this.set("units", this._distanceUnitsSelect.get("value"))) :
                (this.get("units") && this.set("units", this.get("units")), this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()), this._distanceUnitsSelect.addOption([{
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
                }]), this._distanceUnitsSelect.set("value", this.units));
            this.set("outputLayerName")
        },
        _handleGroupBySelectChange: function(a) {
            a =
                "0" === a;
            s.toggle(this._minmajorityLabel, "esriAnalysisTextDisabled", a);
            s.toggle(this._percentPointsLabel, "esriAnalysisTextDisabled", a);
            this._percentPointsCheck.set("disabled", a);
            this._minmajorityCheck.set("disabled", a)
        },
        _save: function() {},
        _buildUI: function() {
            var a;
            r.initHelpLinks(this.domNode, this.showHelp);
            this.distances ? this._breakValuesInput.set("value", this.distances.toString().replace(/,/g, " ")) : (this.distances = [], this.distances.push(this._breakValuesInput.get("value")));
            this.get("enableTravelModes") ||
                this._updateTravelModes(this.enableTravelModes);
            this.sumNearbyLayer && (d.set(this._aggregateToolDescription, "innerHTML", k.substitute(this.i18n.summarizeDefine, {
                sumNearbyLayerName: this.sumNearbyLayer.name
            })), "esriGeometryPoint" !== this.sumNearbyLayer.geometryType && (this.set("enableTravelModes", !1), this._updateTravelModes(!1)));
            this.units && this._distanceUnitsSelect.set("value", this.units);
            this.summaryLayers && g.forEach(this.summaryLayers, function(a, c) {
                a !== this.sumNearbyLayer && (this._layersSelect.addOption({
                    value: c,
                    label: a.name
                }), this.summaryLayer && this.summaryLayer === a && this._layersSelect.set("value", c))
            }, this);
            a = this.summaryLayers[this._layersSelect.get("value")];
            this.outputLayerName = k.substitute(this.i18n.outputLayerName, {
                summaryLayerName: a.name,
                sumNearbyLayerName: this.sumNearbyLayer.name
            });
            d.set(this._addStatsLabel, "innerHTML", k.substitute(this.i18n.addStats, {
                summaryLayerName: a.name
            }));
            this._initializeShapeUnits(a.geometryType);
            this.shapeUnits && this._shapeUnitsSelect.set("value", this.shapeUnits);
            "esriGeometryPolygon" ===
            a.geometryType && (d.set(this._sumMetricLabel, "innerHTML", this.i18n.summarizeMetricPoly), d.set(this._addStatsHelpLink, "esriHelpTopic", "StatisticsPolygon"));
            if ("esriGeometryPoint" === a.geometryType || "esriGeometryMultipoint" === a.geometryType) d.set(this._sumMetricLabel, "innerHTML", this.i18n.summarizeMetricPoint), d.set(this._addStatsHelpLink, "esriHelpTopic", "StatisticsPoint");
            "esriGeometryPolyline" === a.geometryType && (d.set(this._sumMetricLabel, "innerHTML", this.i18n.summarizeMetricLine), d.set(this._addStatsHelpLink,
                "esriHelpTopic", "StatisticsLine"));
            this.outputLayerName && this._outputLayerInput.set("value", this.outputLayerName);
            !this.sumShape && this.summaryFields && this._sumMetricCheck.set("checked", this.sumShape);
            this._createStatsRow();
            g.forEach(this.summaryFields, function(a) {
                a = a.split(" ");
                this._currentAttrSelect.set("value", a[0]);
                e.hitch(this._currentAttrSelect, this._handleAttrSelectChange, a[0])();
                this._currentStatsSelect.set("value", a[1]);
                e.hitch(this._currentStatsSelect, this._handleStatsValueUpdate, "value",
                    "", a[1])()
            }, this);
            l.set(this._chooseFolderRow, "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(e.hitch(this, function(a) {
                this.folderStore = a;
                this._webMapFolderSelect.set("store", a);
                this._webMapFolderSelect.set("value", this.portalUser.username)
            }));
            l.set(this._chooseExtentDiv, "display", !0 === this.showChooseExtent ? "block" : "none");
            this.set("groupBySelect", this.groupByField);
            this.minorityMajority && this._minmajorityCheck.set("checked", this.minorityMajority);
            this.percentPoints && this._percentPointsCheck.set("checked", this.percentPoints);
            this._handleDistanceTypeChange("StraightLine");
            this._loadConnections()
        },
        validateDistance: function() {
            var a = this,
                b, c = [],
                f, d;
            this.set("distances");
            b = e.trim(this._breakValuesInput.get("value")).split(" ");
            if (0 === b.length) return !1;
            g.forEach(b, function(b) {
                b = p.parse(b);
                if (isNaN(b)) return c.push(0), !1;
                f = p.format(b, {
                    locale: "root"
                });
                q.isDefined(f) ? q.isDefined(f) || (f = p.format(b, {
                    locale: "en-us"
                })) : f = p.format(b, {
                    locale: "en"
                });
                q.isDefined(f) &&
                    (d = e.trim(f).match(/\D/g));
                d && g.forEach(d, function(b) {
                    "." === b || "," === b ? c.push(1) : "-" === b && "polygon" === a.inputType ? c.push(1) : c.push(0)
                })
            });
            return -1 !== g.indexOf(c, 0) ? !1 : !0
        },
        _loadConnections: function() {
            this.on("start", e.hitch(this, "_onClose", !0));
            this._connect(this._closeBtn, "onclick", e.hitch(this, "_onClose", !1));
            this._driveTimeClickHandles = [];
            this._driveTimeClickHandles.push(n.connect(this._nearTypeSelect, "onChange", e.hitch(this, "_handleDistanceTypeChange")));
            this.watch("enableTravelModes", e.hitch(this,
                function(a, b, c) {
                    this._updateTravelModes(c)
                }))
        },
        _createStatsRow: function() {
            var a, b, c, f, d;
            f = this.summaryLayers[this._layersSelect.get("value")];
            a = m.create("tr", null, this._afterStatsRow, "before");
            c = m.create("td", {
                style: {
                    width: "45%",
                    maxWidth: "100px"
                }
            }, a);
            b = m.create("td", {
                style: {
                    width: "55%",
                    maxWidth: "104px"
                }
            }, a);
            c = new x({
                maxHeight: 200,
                "class": "esriLeadingMargin1 mediumInput esriTrailingMargin05 attrSelect",
                style: {
                    tableLayout: "fixed",
                    overflowX: "hidden"
                }
            }, m.create("select", null, c));
            this.set("attributes", {
                selectWidget: c,
                summaryLayer: f
            });
            b = new x({
                "class": "mediumInput statsSelect",
                style: {
                    tableLayout: "fixed",
                    overflowX: "hidden"
                }
            }, m.create("select", null, b));
            this.set("statistics", {
                selectWidget: b
            });
            c.set("statisticSelect", b);
            n.connect(c, "onChange", this._handleAttrSelectChange);
            d = m.create("td", {
                "class": "shortTextInput removeTd",
                style: {
                    display: "none",
                    maxWidth: "12px"
                }
            }, a);
            f = m.create("a", {
                    title: this.i18n.removeAttrStats,
                    "class": "closeIcon statsRemove",
                    innerHTML: "\x3cimg src\x3d'" + this.basePath + "/images/close.gif' border\x3d'0''/\x3e"
                },
                d);
            n.connect(f, "onclick", e.hitch(this, this._handleRemoveStatsBtnClick, a));
            this._statsRows.push(a);
            b.set("attributeSelect", c);
            b.set("removeTd", d);
            b.set("isnewRowAdded", !1);
            b.set("referenceWidget", this);
            b.watch("value", this._handleStatsValueUpdate);
            this._currentStatsSelect = b;
            this._currentAttrSelect = c;
            return !0
        },
        _handleRemoveStatsBtnClick: function(a) {
            this._removeStatsRow(a);
            0 === this.get("summaryFields").length && (this._sumMetricCheck.set("disabled", !0), this._sumMetricCheck.set("checked", !0))
        },
        _removeStatsRows: function() {
            g.forEach(this._statsRows,
                this._removeStatsRow, this);
            this._statsRows = []
        },
        _removeStatsRow: function(a) {
            g.forEach(w.findWidgets(a), function(a) {
                a.destroyRecursive()
            });
            m.destroy(a)
        },
        _setAnalysisGpServerAttr: function(a) {
            a && (this.analysisGpServer = a, this.set("toolServiceUrl", this.analysisGpServer + "/" + this.toolName))
        },
        _setSumNearbyLayerAttr: function(a) {
            this.sumNearbyLayer = a
        },
        _setSummaryLayersAttr: function(a) {
            this.summaryLayers = a
        },
        _setSummaryLayerAttr: function(a) {
            this.summaryLayer = a
        },
        _setLayersAttr: function(a) {
            this.summaryLayers = []
        },
        _setAttributesAttr: function(a) {
            if (a.summaryLayer) {
                var b, c;
                b = a.summaryLayer;
                c = a.selectWidget;
                a = b.fields;
                c.addOption({
                    value: "0",
                    label: this.i18n.attribute
                });
                g.forEach(a, function(a) {
                    -1 !== g.indexOf(["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeDouble"], a.type) && c.addOption({
                        value: a.name,
                        label: q.isDefined(a.alias) && "" !== a.alias ? a.alias : a.name
                    })
                }, this)
            }
        },
        _setStatisticsAttr: function(a) {
            a = a.selectWidget;
            a.addOption({
                value: "0",
                label: this.i18n.statistic
            });
            a.addOption({
                value: "SUM",
                label: this.i18n.sum
            });
            a.addOption({
                value: "MIN",
                label: this.i18n.minimum
            });
            a.addOption({
                value: "MAX",
                label: this.i18n.maximum
            });
            a.addOption({
                value: "MEAN",
                label: this.i18n.average
            });
            a.addOption({
                value: "STDDEV",
                label: this.i18n.standardDev
            })
        },
        _setSummaryFieldsAttr: function(a) {
            this.summaryFields = a
        },
        _getSummaryFieldsAttr: function() {
            var a = "",
                b = [];
            A(".statsSelect", this.domNode).forEach(function(c) {
                var f;
                c = w.byNode(c);
                f = c.get("attributeSelect");
                "0" !== f.get("value") && "0" !== c.get("value") && (a += f.get("value") + " " +
                    c.get("value") + ";", b.push(f.get("value") + " " + c.get("value")))
            });
            return b
        },
        _setGroupBySelectAttr: function(a) {
            var b = this.summaryLayers[this._layersSelect.get("value")],
                c = b.fields;
            0 < this._groupBySelect.getOptions().length && this._groupBySelect.removeOption(this._groupBySelect.getOptions());
            this._groupBySelect.addOption({
                value: "0",
                label: this.i18n.attribute
            });
            g.forEach(c, function(a, c) {
                -1 !== g.indexOf(["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeString", "esriFieldTypeDate"], a.type) &&
                    a.name !== b.objectIdField && this._groupBySelect.addOption({
                        value: a.name,
                        label: q.isDefined(a.alias) && "" !== a.alias ? a.alias : a.name
                    })
            }, this);
            a && this._groupBySelect.set("value", a);
            this._handleGroupBySelectChange(this._groupBySelect.get("value"))
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
        _setNearTypeAttr: function(a) {
            this.nearType = a
        },
        _getNearTypeAttr: function() {
            return this.nearType
        },
        _setDistancesAttr: function(a) {
            if (a) this.distances = a;
            else if (this._breakValuesInput && this._breakValuesInput.get("value")) {
                a = e.trim(this._breakValuesInput.get("value")).split(" ");
                var b = [];
                g.forEach(a, function(a) {
                    b.push(p.parse(a))
                });
                this.distances = b
            }
        },
        _getDistancesAttr: function() {
            return this.distances
        },
        _setUnitsAttr: function(a) {
            this.units = a
        },
        _getUnitsAttr: function() {
            return this.units
        },
        _setShapeUnitsAttr: function(a) {
            this.shapeUnits = a
        },
        _getShapeUnitsAttr: function() {
            return this.shapeUnits
        },
        _getSumShapeAttr: function() {
            return this._sumMetricCheck.get("checked")
        },
        _setSumShapeAttr: function(a) {
            this.sumShape = a
        },
        _setMinorityMajorityAttr: function(a) {
            this.minorityMajority = a
        },
        _getMinorityMajorityAttr: function(a) {
            this._minmajorityCheck &&
                (this.minorityMajority = this._minmajorityCheck.get("checked"));
            return this.minorityMajority
        },
        _setPercentPointsAttr: function(a) {
            this.percentPoints = a
        },
        _getPercentPointsAttr: function(a) {
            this._percentPointsCheck && (this.percentPoints = this._percentPointsCheck.get("checked"));
            return this.percentPoints
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
        _getReturnBoundariesAttr: function() {
            this._returnBdrycCheck && (this.returnBoundaries = this._returnBdrycCheck.get("checked"));
            return this.returnBoundaries
        },
        _setReturnBoundariesAttr: function(a) {
            this.returnBoundaries = a
        },
        validateServiceName: function(a) {
            var b = /(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(a);
            return 0 === a.length || 0 === k.trim(a).length ? (this._outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : b ? (this._outputLayerInput.set("invalidMessage",
                this.i18n.invalidServiceName), !1) : 98 < a.length ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceNameLength), !1) : !0
        },
        _connect: function(a, b, c) {
            this._pbConnects.push(n.connect(a, b, c))
        },
        _showMessages: function(a) {
            d.set(this._bodyNode, "innerHTML", a);
            u.fadeIn({
                node: this._errorMessagePane,
                easing: v.quadIn,
                onEnd: e.hitch(this, function() {
                    l.set(this._errorMessagePane, {
                        display: ""
                    })
                })
            }).play()
        },
        _handleCloseMsg: function(a) {
            a && a.preventDefault();
            u.fadeOut({
                node: this._errorMessagePane,
                easing: v.quadOut,
                onEnd: e.hitch(this, function() {
                    l.set(this._errorMessagePane, {
                        display: "none"
                    })
                })
            }).play()
        },
        _updateTravelModes: function(a) {
            var b = this._nearTypeSelect.getOptions();
            g.forEach(b, function(b) {
                "StraightLine" !== b.value && (b.disabled = !a)
            });
            this._nearTypeSelect.updateOption(b)
        }
    })
});