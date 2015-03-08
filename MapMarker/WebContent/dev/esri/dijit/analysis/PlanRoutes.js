require({cache:{
'url:esri/dijit/analysis/templates/PlanRoutes.html':"<div class=\"esriAnalysis\">\n    <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n      <div data-dojo-attach-point=\"_hotspotsToolContentTitle\" class=\"analysisTitle\">\n         <table class=\"esriFormTable\" >\n            <tr>\n              <td class=\"esriToolIconTd\"><div class=\"planRoutesIcon\"></div></td>\n              <td class=\"esriAlignLeading\">${i18n.planRoutes}</td>\n              <td>\n                 <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                  <div class=\"esriFloatLeading\">\n                    <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                  </div>\n                  <div class=\"esriFloatTrailing\">\n                    <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                  </div>              \n              </div>  \n              </td>\n            </tr>\n         </table>\n      </div>\n      <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n    </div>\n    <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n     <table class=\"esriFormTable\"  data-dojo-attach-point=\"_driveTimesTable\">\n       <tbody>\n        <tr>\n          <td colspan=\"3\" class=\"sectionHeader\" data-dojo-attach-point=\"_toolDescription\"></td>\n        </tr>  \n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n            <label data-dojo-attach-point=\"_measurelabel\" class=\"\">${i18n.travelModeLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"travelMode\"></a>\n          </td>\n        </tr>         \n        <tr>\n          <td style=\"padding:0.25em;\" colspan=\"3\">\n            <div data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_travelModeSelect\" class=\"esriLeadingMargin1 longInput esriLongLabel esriAnalysisDriveMode\">\n              <div data-dojo-value=\"Driving\">\n                <div class=\"esriFloatLeading bufferIcon esriDrivingTimeIcon\"></div>\n                <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.drivingMode}</div>\n              </div>\n              <div data-dojo-value=\"Trucking\">\n                <div class=\"esriFloatLeading bufferIcon esriTruckingTimeIcon\"></div>\n                <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.truckingMode}</div>\n              </div>\n              <div data-dojo-value=\"Walking\">\n                <div class=\"esriFloatLeading bufferIcon esriWalkingTimeIcon\"></div>\n                <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.walkingMode}</div>\n              </div>\n            </div>\n          </td>          \n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n            <label data-dojo-attach-point=\"_measurelabel\" class=\"\">${i18n.startRoutesLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"startLayer\"></a>\n          </td>\n        </tr>\n        <tr>\n          <td></td>\n          <td style=\"width:95%\">\n            <select class=\"longInput esriLongLabel\"  style=\"width:100%;table-layout:fixed;\" data-dojo-props=\"required:true\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-event=\"onChange:_handleStartLayerChange\"  data-dojo-attach-point=\"_startLayerSelect\">\n              <!--<option>${i18n.selectStartLoc}</option>-->\n              <option value=\"DRAW\">${i18n.createStartLoc}</option>\n            </select>\n          </td>\n          <td style=\"width:3%\">\n            <div data-dojo-type=\"dijit/form/ToggleButton\" class=\"esriActionButton\" data-dojo-attach-point=\"_startPointDrawBtn\"  data-dojo-attach-event=\"onChange:_handleStartDrawBtnChange\" data-dojo-props=\"showLabel:false,iconClass:'toolbarIcon esriPointIcon',style:'width:16px;'\"></div>\n          </td> \n        </tr>\n        <tr data-dojo-attach-point=\"_startRouteIdRow\">\n          <td colspan=\"3\" style=\"padding-top: 0.25em;\">\n             <label class=\"esriLeadingMargin1\">${i18n.routeId}</label>\n             <select class=\"longTextInput esriLeadingMargin1\"  style=\"margin-top:0.25em;width:80%;table-layout:fixed;\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_startRouteIdSelect\">\n              <option selected=\"selected\">${i18n.selectRouteId}</option>\n            </select>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\" style=\"padding-bottom:0.25em;padding-top:0.25em;\">\n            <label class=\"esriLeadingMargin1\">${i18n.specifyStartTime}</label>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\" style=\"padding-top:0.25em;\">\n            <input class=\"esriLeadingMargin1 mediumInput esriAnalysisSelect\" value=\"now\" data-dojo-props=\"required:true\" data-dojo-type=\"dijit/form/DateTextBox\" data-dojo-attach-point=\"_startDay\" style=\"width:46%;table-layout:fixed;\">\n            </input>\n            <input  type=\"text\" data-dojo-type=\"dijit/form/TimeTextBox\" value=\"now\" data-dojo-props=\"required:true,intermediateChanges:true,constraints:{formatLength:'short',selector:'time'}\"  data-dojo-attach-point=\"_startTime\" style=\"width:37%;margin-top:0;\">\n            </input>\n          </td>\n        </tr>        \n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.threeLabel}</label>\n            <label data-dojo-attach-point=\"_measurelabel\" class=\"\">${i18n.endRoutesLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"endLayer\"></a>\n          </td>\n        </tr>\n        <tr>\n           <td colspan=\"3\" style=\"padding-bottom:0.25em;padding-top:0.25em;\">\n             <table style=\"width:100%\" class=\"esriLeadingMargin1\">\n               <tr>\n                 <td style=\"width:1%;\">\n                   <div class=\"esriLeadingMargin1\" id=\"${id}.returnStartCheck\" data-dojo-type=\"dijit/form/CheckBox\"  data-dojo-attach-event=\"onChange:_handleReturnStartCheckChange\"  data-dojo-attach-point=\"_returnStartCheck\"></div>\n                 </td>\n                 <td class=\"longTextInput\">\n                   <label for=\"${id}.returnStartCheck\" data-dojo-attach-point=\"_returnStartCheckLabel\">${i18n.returnToStart}</label>\n                 </td>\n               </tr>\n             </table>\n           </td>\n         </tr>\n        <tr>\n          <td style=\"padding-bottom:0.25em;padding-top:0.25em;\"></td>\n          <td style=\"width:95%;padding-bottom:0.25em;padding-top:0.25em;\">\n            <select class=\"longInput esriLongLabel\"  style=\"width:100%;table-layout:fixed;\" data-dojo-props=\"required:true\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-event=\"onChange:_handleEndLayerChange\" data-dojo-attach-point=\"_endLayerSelect\">\n              <!--<option>${i18n.selectEndLoc}</option>-->\n              <option value=\"DRAW\">${i18n.createEndLoc}</option>\n            </select>\n          </td>\n          <td style=\"width:3%;padding-bottom:0.25em;padding-top:0.25em;\">\n            <div data-dojo-type=\"dijit/form/ToggleButton\" class=\"esriActionButton\" data-dojo-attach-point=\"_endPointDrawBtn\" data-dojo-attach-event=\"onChange:_handleEndDrawBtnChange\" data-dojo-props=\"showLabel:false,iconClass:'toolbarIcon esriPointIcon',style:'width:16px;'\"></div>\n          </td> \n        </tr>\n        <tr data-dojo-attach-point=\"_endRouteIdRow\">\n          <td colspan=\"3\" style=\"padding-top: 0.25em;\">\n             <label class=\"esriLeadingMargin1\">${i18n.routeId}</label>\n             <select class=\"longTextInput esriLeadingMargin1\"  style=\"margin-top:0.25em;width:80%;table-layout:fixed;\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_endRouteIdSelect\">\n               <option selected=\"selected\">${i18n.selectRouteId}</option>\n            </select>\n          </td>\n        </tr>\n\n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.fourLabel}</label>\n             <label>${i18n.numRoutes}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"routeCount\"></a>\n          </td>\n        </tr>        \n        <tr>\n          <td colspan=\"3\" style=\"padding-bottom:0.25em;padding-top:0.25em;\">\n              <label class=\"esriLeadingMargin1\">\n              <input type=\"text\" class=\"\" style=\"width:30%\" data-dojo-type=\"dijit/form/NumberSpinner\" data-dojo-attach-event=\"onChange:_handleRoutesInputChange\" data-dojo-props=\"intermediateChanges:true,smallDelta:1, constraints:{min:1,max:1000,places:0},required:true,invalidMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_routesInput\"></input>\n              ${i18n.vehicles}</label>            \n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.fiveLabel}</label>\n            <label>${i18n.maxPtsRoute}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"maxStopsPerRoute\"></a>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\" style=\"padding-bottom:0.25em;padding-top:0.25em;\">\n              <label class=\"esriLeadingMargin1\">\n              <input type=\"text\" class=\"\" style=\"width:30%\" data-dojo-type=\"dijit/form/NumberSpinner\" data-dojo-props=\"intermediateChanges:true,smallDelta:1, constraints:{min:1,max:1000,places:0}, required:true,invalidMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_maxPtsRouteInput\"></input>\n              ${i18n.stops}</label>            \n          </td>\n        </tr>\n        <tr>\n          <td style=\"padding:0\" colspan=\"3\">\n            <div class=\"esriLeadingMargin15\">\n              <label class=\"esriSmallLabel\" data-dojo-attach-point=\"_numStopsLabel\"></label>\n            </div>\n          </td>\n        </tr>\n        <tr data-dojo-attach-point=\"_stopsByExtentRow\">\n          <td style=\"padding:0\" colspan=\"3\">\n            <div class=\"esriLeadingMargin15\">\n              <label class=\"esriSmallLabel\" data-dojo-attach-point=\"_numStopsExtentLabel\"></label>\n            </div>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"2\" class=\"longInput\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.sixLabel}</label>\n            <label data-dojo-attach-point=\"_measurelabel\" class=\"\">${i18n.timeSpentLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"serviceTimeAtStops\"></a>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\" style=\"padding-top:0;\">\n            <table style=\"width:100%\">\n              <tbody>\n                <tr>\n                  <td>\n                    <div class=\"esriLeadingMargin1 esriTrailingMargin025\">\n                      <input type=\"text\" class=\"\" style=\"width:55%\" data-dojo-type=\"dijit/form/NumberSpinner\" data-dojo-props=\"intermediateChanges:true,value:0, smallDelta:1, constraints:{min:0,max:1440,places:0}, required:true,invalidMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_servStopMinutesInput\"></input>\n                      ${i18n.minutesSmall}\n                    </div>\n                  </td>\n                  <td>\n                    <div class=\"esriLeadingMargin1 esriTrailingMargin025\">\n                      <input type=\"text\" class=\"\" style=\"width:55%\" data-dojo-type=\"dijit/form/NumberSpinner\" data-dojo-props=\"intermediateChanges:true,value:0, smallDelta:1, constraints:{min:0,max:59,places:0}, required:true,invalidMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_servStopsSecondsInput\"></input>\n                      ${i18n.secondsSmall}\n                    </div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.sevenLabel}</label>\n            <div class=\"esriLeadingMargin1\" id=\"${id}.limitCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-attach-event=\"onChange:_handleLimitMaxTimeCheckChange\"  data-dojo-attach-point=\"_limitMaxTimeCheck\"></div>\n            <label for=\"${id}.limitCheck\" data-dojo-attach-point=\"_limitMaxTimeLabel\">${i18n.limitMaxTime}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"maxTotalRouteTime\"></a>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\" style=\"padding-top:0;\">\n            <table style=\"width:100%\">\n              <tbody>\n                <tr>\n                  <td>\n                    <div class=\"esriLeadingMargin1 esriTrailingMargin025\">\n                      <input type=\"text\" class=\"\" style=\"width:55%\" data-dojo-type=\"dijit/form/NumberSpinner\" data-dojo-props=\"intermediateChanges:true,value:8, smallDelta:1, constraints:{min:0,max:1000,places:0}, required:true,invalidMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_hoursInput\"></input>\n                      ${i18n.hoursSmall}\n                    </div>\n                  </td>\n                  <td>\n                    <div class=\"esriLeadingMargin1 esriTrailingMargin025\">\n                      <input type=\"text\" class=\"\" style=\"width:55%\" data-dojo-type=\"dijit/form/NumberSpinner\" data-dojo-props=\"intermediateChanges:true,value:0, smallDelta:1, constraints:{min:0,max:59,places:0}, required:true,invalidMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_minutesInput\"></input>\n                      ${i18n.minutesSmall}\n                    </div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label data-dojo-attach-point=\"_labelThree\" class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.eightLabel}</label>\n            <label data-dojo-attach-point=\"_resultlabel\" class=\"\">${i18n.resultLabel}</label>\n          </td>\n          <td class=\"longTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"resultsLayer\"></a>\n          </td>\n        </tr>\n        <tr>\n          <td class=\"shortTextInput\" colspan=\"3\">\n            <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" class=\"esriLeadingMargin1 esriOutputText\" data-dojo-props=\"trim:true,required:true\" data-dojo-attach-event=\"_handleResultLyrInputChange\" data-dojo-attach-point=\"_outputLayerInput\"  value=\"\">\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n             <div class=\"esriLeadingMargin1\" data-dojo-attach-point=\"_chooseFolderRow\">\n               <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n               <input class=\"longInput\" dojoAttachPoint=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\" style=\"width:60%;height:auto\"></input>\n             </div>              \n          </td>\n        </tr>      \n       </tbody>\n      </table>\n    </div>\n    <div data-dojo-attach-point=\"_aggregateToolContentButtons\" style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n      <div class=\"esriExtentCreditsCtr\">\n        <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\n       <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n         <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-attach-event=\"onChange:_handleExtentCheckChange\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n           ${i18n.useMapExtent}\n       </label>\n      </div>\n      <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" class=\"esriLeadingMargin4 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n          ${i18n.runAnalysis}\n      </button>\n    </div>\n    <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n      <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n    </div>\n    <div class=\"esriFormWarning esriRoundedBox\" data-dojo-attach-point=\"_errorMessagePane\" style=\"display:none;\">\n      <a href=\"#\" title='${i18n.close}' data-dojo-attach-event=\"onclick:_handleCloseMsg\" class=\"esriFloatTrailing esriAnalysisInfoPaneCloseIcon\"></a>\n      </a>\n      <span data-dojo-attach-point=\"_bodyNode\"></span>\n    </div>\n</div>\n"}});
//>>built
define("esri/dijit/analysis/PlanRoutes", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/Color", "dojo/_base/connect", "dojo/_base/json", "dojo/_base/fx", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dojo/fx/easing", "dojo/number", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "dijit/form/NumberSpinner", "dijit/form/TimeTextBox", "dijit/form/DateTextBox", "../../kernel", "../../lang", "../../graphic", "./AnalysisBase", "./CreditEstimator", "./utils", "./TrafficTime", "../../toolbars/draw", "../PopupTemplate", "../../layers/FeatureLayer", "../../symbols/PictureMarkerSymbol", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/PlanRoutes.html"], function(r, x, c, h, H, m, e, s, I, J, k, d, p, K, L, t, u, M, y, z, A, B, C, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, l, v, D, $, f, aa, q, E, F, w, n, G) {
    return x([y, z, A, B, C, D], {
        declaredClass: "esri.dijit.analysis.PlanRoutes",
        templateString: G,
        basePath: r.toUrl("."),
        esriDijitPath: r.toUrl(".."),
        widgetsInTemplate: !0,
        stopsLayer: null,
        outputLayerName: null,
        showSelectFolder: !1,
        showChooseExtent: !0,
        showHelp: !0,
        showCredits: !0,
        distanceDefaultUnits: "Miles",
        returnFeatureCollection: !1,
        returnToStart: !0,
        limitMaxTimePerRoute: !0,
        routeCount: null,
        maxStopsPerRoute: null,
        startLayer: null,
        endLayer: null,
        i18n: null,
        toolName: "PlanRoutes",
        helpFileName: "PlanRoutes",
        resultParameter: ["routesLayer", "assignedStopsLayer", "unassignedStopsLayer"],
        getResultLyrInfos: !0,
        constructor: function(a, b) {
            this._pbConnects = [];
            a.containerNode && (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments);
            h.forEach(this._pbConnects, m.disconnect);
            delete this._pbConnects
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            c.mixin(this.i18n, n.common);
            c.mixin(this.i18n, n.bufferTool);
            c.mixin(this.i18n, n.driveTimes);
            c.mixin(this.i18n, n.planRoutesTool);
            c.mixin(this.i18n, n.toolbars)
        },
        postCreate: function() {
            this.inherited(arguments);
            t.add(this._form.domNode, "esriSimpleForm");
            this._outputLayerInput.set("validator", c.hitch(this, this.validateServiceName));
            this._buildUI()
        },
        startup: function() {},
        _onClose: function(a) {
            this._startDrawPointfLayer && this.map.removeLayer(this._startDrawPointfLayer);
            this._endDrawPointfLayer && this.map.removeLayer(this._endDrawPointfLayer);
            this._startToolbar.deactivate();
            this._endToolbar.deactivate();
            this.emit("close", {
                save: !a
            })
        },
        clear: function() {
            this._startDrawPointfLayer && this.map.removeLayer(this._startDrawPointfLayer);
            this._endDrawPointfLayer && this.map.removeLayer(this._endDrawPointfLayer);
            this._startToolbar.deactivate();
            this._endToolbar.deactivate()
        },
        _toUpperFirstLetter: function(a) {
            return a.slice(0, 1).toUpperCase() + a.slice(1)
        },
        _handleShowCreditsClick: function(a) {
            a.preventDefault();
            a = {};
            this.get("startLayer");
            this.get("returnToStart") || this.get("endLayer");
            this._form.validate() &&
                (a.stopsLayer = e.toJson(f.constructAnalysisInputLyrObj(this.stopsLayer)), a.routeStartTime = this.get("routeStartTime"), a.routeCount = this.get("routeCount"), this.get("startLayer") && (a.startLayer = e.toJson(f.constructAnalysisInputLyrObj(this.get("startLayer")))), "DRAW" !== this._startLayerSelect.get("value") && (a.startLayerRouteIDField = this.get("startLayerRouteIDField")), a.maxStopsPerRoute = this.get("maxStopsPerRoute"), a.maxRouteTime = this.get("maxRouteTime"), a.stopServiceTime = this.get("stopServiceTime"), a.returnToStart =
                    this.get("returnToStart"), a.travelMode = this._travelModeSelect.get("value"), this.get("endLayer") && (a.endLayer = e.toJson(f.constructAnalysisInputLyrObj(this.get("endLayer")))), "DRAW" !== this._endLayerSelect.get("value") && (a.endLayerRouteIDField = this.get("endLayerRouteIDField")), this.returnFeatureCollection || (a.OutputName = e.toJson({
                        serviceProperties: {
                            name: this.get("outputLayerName")
                        }
                    })), this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = e.toJson({
                        extent: this.map.extent._normalize(!0)
                    })),
                    console.log(a), this.getCreditsEstimate(this.toolName, a).then(c.hitch(this, function(a) {
                        this._usageForm.set("content", a);
                        this._usageDialog.show()
                    })))
        },
        _handleSaveBtnClick: function(a) {
            a = {};
            var b = {},
                g, c;
            g = this.get("startLayer");
            c = this.get("returnToStart") || this.get("endLayer");
            !this._form.validate() || !l.isDefined(g) || !l.isDefined(c) ? (!l.isDefined(g) || !l.isDefined(c)) && this._showMessages(this.i18n.startEndPtsValidMsg) : (this._saveBtn.set("disabled", !0), a.stopsLayer = e.toJson(f.constructAnalysisInputLyrObj(this.stopsLayer)),
                a.routeStartTime = this.get("routeStartTime"), a.routeCount = this.get("routeCount"), this.get("startLayer") && (a.startLayer = e.toJson(f.constructAnalysisInputLyrObj(this.get("startLayer")))), "DRAW" !== this._startLayerSelect.get("value") && (a.startLayerRouteIDField = this.get("startLayerRouteIDField")), a.maxStopsPerRoute = this.get("maxStopsPerRoute"), a.maxRouteTime = this.get("maxRouteTime"), a.stopServiceTime = this.get("stopServiceTime"), a.returnToStart = this.get("returnToStart"), a.travelMode = this._travelModeSelect.get("value"),
                this.get("endLayer") && (a.endLayer = e.toJson(f.constructAnalysisInputLyrObj(this.get("endLayer")))), "DRAW" !== this._endLayerSelect.get("value") && (a.endLayerRouteIDField = this.get("endLayerRouteIDField")), this.returnFeatureCollection || (a.OutputName = e.toJson({
                    serviceProperties: {
                        name: this.get("outputLayerName")
                    }
                })), this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = e.toJson({
                    extent: this.map.extent._normalize(!0)
                })), this.returnFeatureCollection && (g = {
                        outSR: this.map.spatialReference
                    }, this.showChooseExtent &&
                    (g.extent = this.map.extent._normalize(!0)), a.context = e.toJson(g)), console.log(a), b.jobParams = a, b.itemParams = {
                    description: k.substitute(this.i18n.itemDescription, {
                        layername: this.stopsLayer.name,
                        distance_field: a.Distances || a.Field,
                        units: a.Units
                    }),
                    tags: k.substitute(this.i18n.itemTags, {
                        layername: this.stopsLayer.name
                    }),
                    snippet: this.i18n.itemSnippet
                }, this.showSelectFolder && (b.itemParams.folder = this._webMapFolderSelect.item ? this.folderStore.getValue(this._webMapFolderSelect.item, "id") : ""), this.execute(b))
        },
        _handleResultLyrInputChange: function(a) {
            this.set("outputLayerName", a)
        },
        _save: function() {},
        _buildUI: function() {
            f.initHelpLinks(this.domNode, this.showHelp);
            f.getLayerFeatureCount(this.stopsLayer, {}).then(c.hitch(this, function(a) {
                console.log(a);
                this._stopsLayerCount = a;
                p.set(this._numStopsLabel, "innerHTML", k.substitute(this.i18n.stopsLabel, {
                    numStops: a
                }))
            }), function(a) {
                console.log(a)
            });
            this._outputLayerInput.set("value", k.substitute(this.i18n.outputLayerName, {
                layername: this.stopsLayer.name
            }));
            this._updateStops();
            this._handleExtentCheckChange(this.showChooseExtent);
            p.set(this._toolDescription, "innerHTML", k.substitute(this.i18n.toolDefine, {
                layername: this.stopsLayer.name
            }));
            d.set(this._chooseFolderRow, "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(c.hitch(this, function(a) {
                this.folderStore = a;
                this._webMapFolderSelect.set("store", a);
                this._webMapFolderSelect.set("value", this.portalUser.username)
            }));
            d.set(this._chooseExtentDiv, "display", !0 === this.showChooseExtent ?
                "block" : "none");
            this.outputLayerName && this._outputLayerInput.set("value", this.outputLayerName);
            this.featureLayers && h.forEach(this.featureLayers, function(a, b) {
                this._startLayerSelect.addOption({
                    value: b + 1,
                    label: a.name
                });
                this._endLayerSelect.addOption({
                    value: b + 1,
                    label: a.name
                })
            }, this);
            this.returnToStart && this._returnStartCheck.set("value", this.returnToStart);
            this.startLayer ? (this._startLayerSelect.set("value", this.startLayer), d.set(this._startRouteIdRow, "display", "")) : (this._startLayerSelect.set("value",
                "DRAW"), d.set(this._startRouteIdRow, "display", "none"));
            this.endLayer ? (this._endLayerSelect.set("value", this.endLayer), d.set(this._endRouteIdRow, "display", "")) : (this._endLayerSelect.set("value", "DRAW"), d.set(this._endRouteIdRow, "display", "none"));
            this._limitMaxTimeCheck.set("value", this.limitMaxTimePerRoute);
            this._handleLimitMaxTimeCheckChange(this.limitMaxTimePerRoute);
            this.routeCount && this._routesInput.set("value", this.routeCount);
            this.maxStopsPerRoute && this._maxPtsRouteInput.set("value", this.maxStopsPerRoute);
            this._loadConnections()
        },
        _addMinutes: function(a, b) {
            return new Date(a.getTime() + 6E4 * b)
        },
        _loadConnections: function() {
            this.on("start", c.hitch(this, "_onClose", !1));
            this._connect(this._closeBtn, "onclick", c.hitch(this, "_onClose", !0))
        },
        _setAnalysisGpServerAttr: function(a) {
            a && (this.analysisGpServer = a, this.set("toolServiceUrl", this.analysisGpServer + "/" + this.toolName))
        },
        _setStopsLayerAttr: function(a) {
            "esriGeometryPoint" === a.geometryType && (this.stopsLayer = a)
        },
        _getStopsLayerAttr: function() {
            return this.stopsLayer
        },
        _setFeatureLayersAttr: function(a) {
            this.featureLayers = h.filter(a, function(a) {
                if (a !== this.stopsLayer && "esriGeometryPoint" === a.geometryType) return !0
            }, this)
        },
        _getFeatureLayersAttr: function(a) {
            return this.featureLayers
        },
        _setDisableRunAnalysisAttr: function(a) {
            this._saveBtn.set("disabled", a)
        },
        validateServiceName: function(a) {
            var b = /(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(a);
            return 0 === a.length || 0 === k.trim(a).length ? (this._outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : b ? (this._outputLayerInput.set("invalidMessage",
                this.i18n.invalidServiceName), !1) : 98 < a.length ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceNameLength), !1) : !0
        },
        _setShowSelectFolderAttr: function(a) {
            this.showSelectFolder = a
        },
        _getShowSelectFolderAttr: function() {
            return this.showSelectFolder
        },
        _setMapAttr: function(a) {
            this.map = a;
            this._startToolbar = new q(this.map);
            this._endToolbar = new q(this.map);
            m.connect(this._startToolbar, "onDrawEnd", c.hitch(this, this._addStartFeatures));
            m.connect(this._endToolbar, "onDrawEnd", c.hitch(this, this._addEndFeatures));
            this.map.on("extent-change", c.hitch(this, this._updateStops))
        },
        _getMapAttr: function() {
            return this.map
        },
        _setDistanceDefaultUnitsAttr: function(a) {
            this.distanceDefaultUnits = a
        },
        _getDistanceDefaultUnitsAttr: function() {
            return this.distanceDefaultUnits
        },
        _setShowCreditsAttr: function(a) {
            this.showCredits = a
        },
        _getShowCreditsAttr: function() {
            return this.showCredits
        },
        _setShowChooseExtentAttr: function(a) {
            this.showChooseExtent = a
        },
        _getShowChooseExtentAttr: function() {
            return this.showChooseExtent
        },
        _setReturnFeatureCollectionAttr: function(a) {
            this.returnFeatureCollection =
                a
        },
        _getReturnFeatureCollectionAttr: function() {
            return this.returnFeatureCollection
        },
        _setShowHelpAttr: function(a) {
            this.showHelp = a
        },
        _getShowHelpAttr: function() {
            return this.showHelp
        },
        _setOutputLayerNameAttr: function(a) {
            a && (this.outputLayerName = a, this._outputLayerInput.set("value", a));
            this._outputLayerInput.set("value", this.outputLayerName)
        },
        _setReturnToStartAttr: function(a) {
            this.returnToStart = a
        },
        _getReturnToStartAttr: function() {
            this._returnStartCheck && (this.returnToStart = this._returnStartCheck.get("checked"));
            return this.returnToStart
        },
        _setStartLayerAttr: function(a) {
            this.startLayer = a
        },
        _getStartLayerAttr: function() {
            this._startLayerSelect && ("DRAW" === this._startLayerSelect.get("value") ? this._startDrawPointfLayer && 0 < this._startDrawPointfLayer.graphics.length ? this.startLayer = this._startDrawPointfLayer : this._startLayerSelect.validate() : this._startLayerSelect.get("value") && (this.startLayer = this.featureLayers[this._startLayerSelect.get("value") - 1]));
            return this.startLayer
        },
        _setEndLayerAttr: function(a) {
            this.endLayer =
                a
        },
        _getEndLayerAttr: function() {
            this.get("returnToStart") ? this.endLayer = null : !this.get("returnToStart") && this._endLayerSelect && ("DRAW" === this._endLayerSelect.get("value") ? this._endDrawPointfLayer && 0 < this._endDrawPointfLayer.graphics.length ? this.endLayer = this._endDrawPointfLayer : this._endLayerSelect.validate() : this._endLayerSelect.get("value") && (this.endLayer = this.featureLayers[this._endLayerSelect.get("value") - 1]));
            return this.endLayer
        },
        _setLimitMaxTimePerRouteAttr: function(a) {
            this.limitMaxTimePerRoute =
                a
        },
        _getLimitMaxTimePerRouteAttr: function() {
            this._limitMaxTimeCheck && (this.limitMaxTimePerRoute = this._limitMaxTimeCheck.get("value"));
            return this.limitMaxTimePerRoute
        },
        _setRouteCountAttr: function(a) {
            this.routeCount = a
        },
        _getRouteCountAttr: function() {
            this._routesInput && (this.routeCount = this._routesInput.get("value"));
            return this.routeCount
        },
        _setMaxStopsPerRouteAttr: function(a) {
            this.maxStopsPerRoute = a
        },
        _getMaxStopsPerRouteAttr: function() {
            this._maxPtsRouteInput && (this.maxStopsPerRoute = this._maxPtsRouteInput.get("value"));
            return this.maxStopsPerRoute
        },
        _setStopServiceTimeAttr: function(a) {
            this.stopServiceTime = a
        },
        _getStopServiceTimeAttr: function() {
            this._servStopMinutesInput && (this.stopServiceTime = this._servStopMinutesInput.get("value") + this._servStopsSecondsInput.get("value") / 60);
            return this.stopServiceTime
        },
        _setMaxRouteTimeAttr: function(a) {
            this.maxRouteTime = a
        },
        _getMaxRouteTimeAttr: function() {
            this._limitMaxTimeCheck.get("checked") && (this.maxRouteTime = 60 * this._hoursInput.get("value") + this._minutesInput.get("value"));
            return this.maxRouteTime
        },
        _setRouteStartTimeAttr: function(a) {
            this.routeStartTime = a
        },
        _getRouteStartTimeAttr: function() {
            if (this._startDay) {
                var a, b;
                a = this._startDay.get("value");
                b = this._startTime.get("value");
                a = a.toDateString();
                b = b.toTimeString();
                b = -1 !== b.indexOf("GMT") ? a + " " + b.substring(0, b.indexOf("GMT") + 3) : a + " " + b.split(" ")[0] + " GMT";
                this.routeStartTime = (new Date(b)).getTime()
            }
            return this.routeStartTime
        },
        _setEndLayerRouteIDFieldAttr: function(a) {
            this.endLayerRouteIDField = a
        },
        _getEndLayerRouteIDFieldAttr: function() {
            this.get("returnToStart") ||
                (this.endLayerRouteIDField = this._endRouteIdSelect.get("value"));
            return this.endLayerRouteIDField
        },
        _setStartLayerRouteIDFieldAttr: function(a) {
            this.startLayerRouteIDField = a
        },
        _getStartLayerRouteIDFieldAttr: function() {
            this._startRouteIdSelect && (this.startLayerRouteIDField = this._startRouteIdSelect.get("value"));
            return this.startLayerRouteIDField
        },
        _getOutputLayerNameAttr: function() {
            this._outputLayerInput && (this.outputLayerName = this._outputLayerInput.get("value"));
            return this.outputLayerName
        },
        _setOutputLayerNameAttr: function(a) {
            this.outputLayerName =
                a
        },
        _connect: function(a, b, g) {
            this._pbConnects.push(m.connect(a, b, g))
        },
        _handleStartDrawBtnChange: function(a) {
            a ? (this.emit("drawtool-activate", {}), this._endPointDrawBtn.set("checked", !1), this.i18n.draw.addPoint = this.i18n.addPoint, this._startDrawPointfLayer ? this._startDrawPointfLayer.graphics.length && (this.i18n.draw.addPoint = this.i18n.movePoint) : this._startDrawPointfLayer = this._createPointFeatColl("startDrawPoint"), this._startToolbar.activate(q.POINT)) : (this._startToolbar.deactivate(), this._endPointDrawBtn.get("checked") ||
                this.emit("drawtool-deactivate", {}))
        },
        _handleEndDrawBtnChange: function(a) {
            a ? (this.emit("drawtool-activate", {}), this._startPointDrawBtn.set("checked", !1), this.i18n.draw.addPoint = this.i18n.addPoint, this._endDrawPointfLayer ? this._endDrawPointfLayer.graphics.length && (this.i18n.draw.addPoint = this.i18n.movePoint) : this._endDrawPointfLayer = this._createPointFeatColl("endDrawPoint"), this._endToolbar.activate(q.POINT)) : (this._endToolbar.deactivate(), this._startPointDrawBtn.get("checked") || this.emit("drawtool-deactivate", {}))
        },
        _handleStartLayerChange: function(a) {
            a && "DRAW" !== a && this.featureLayers[a - 1].graphics && 1 < this.featureLayers[a - 1].graphics.length ? (this.map.getLayer("startDrawPoint") && this.map.getLayer("startDrawPoint").hide(), d.set(this._startRouteIdRow, "display", ""), this._startPointDrawBtn.set("disabled", !0), this._startPointDrawBtn.set("checked", !1), a = this.featureLayers[a - 1].fields, this._startRouteIdSelect.removeOption(this._startRouteIdSelect.getOptions()), h.forEach(a, function(a, g) {
                -1 !== h.indexOf(["esriFieldTypeSmallInteger",
                    "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeString", "esriFieldTypeDate"
                ], a.type) && this._startRouteIdSelect.addOption({
                    value: a.name,
                    label: l.isDefined(a.alias) && "" !== a.alias ? a.alias : a.name
                })
            }, this)) : a && "DRAW" === a ? (this.map.getLayer("startDrawPoint") && this.map.getLayer("startDrawPoint").show(), this._startPointDrawBtn.set("disabled", !1), d.set(this._startRouteIdRow, "display", "none")) : (this._startPointDrawBtn.set("disabled", !0), d.set(this._startRouteIdRow, "display", "none"), this.map.getLayer("startDrawPoint") &&
                this.map.getLayer("startDrawPoint").hide());
            this._startLayerSelect.validate(!0)
        },
        _handleEndLayerChange: function(a) {
            var b;
            b = this.get("returnToStart");
            a && "DRAW" !== a && this.featureLayers[a - 1].graphics && 1 < this.featureLayers[a - 1].graphics.length ? (d.set(this._endRouteIdRow, "display", ""), this._endPointDrawBtn.set("disabled", !0), this._endPointDrawBtn.set("checked", !1), this.map.getLayer("endDrawPoint") && this.map.getLayer("endDrawPoint").hide(), a = this.featureLayers[a - 1].fields, this._endRouteIdSelect.removeOption(this._endRouteIdSelect.getOptions()),
                h.forEach(a, function(a, b) {
                    -1 !== h.indexOf(["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeString", "esriFieldTypeDate"], a.type) && this._endRouteIdSelect.addOption({
                        value: a.name,
                        label: l.isDefined(a.alias) && "" !== a.alias ? a.alias : a.name
                    })
                }, this)) : a && "DRAW" === a ? (this.map.getLayer("endDrawPoint") && this.map.getLayer("endDrawPoint").show(), this._endPointDrawBtn.set("disabled", b), d.set(this._endRouteIdRow, "display", "none")) : (this._endPointDrawBtn.set("disabled", !0), d.set(this._endRouteIdRow,
                "display", "none"), this.map.getLayer("endDrawPoint") && this.map.getLayer("endDrawPoint").hide());
            this._endLayerSelect.set("disabled", b);
            this._endRouteIdSelect.set("disabled", b);
            b && d.set(this._endRouteIdRow, "display", "none");
            this._endLayerSelect.validate(!0)
        },
        _handleRoutesInputChange: function(a) {},
        _handleReturnStartCheckChange: function(a) {
            this._handleEndLayerChange(this._endLayerSelect.get("value"))
        },
        _handleLimitMaxTimeCheckChange: function(a) {
            this._hoursInput.set("disabled", !a);
            this._minutesInput.set("disabled", !a)
        },
        _handleExtentCheckChange: function(a) {
            t.toggle(this._numStopsExtentLabel, "disabled", !a)
        },
        _createPointFeatColl: function(a) {
            var b;
            b = {
                layerDefinition: null,
                featureSet: {
                    features: [],
                    geometryType: "esriGeometryPoint"
                }
            };
            b.layerDefinition = {
                currentVersion: 10.11,
                copyrightText: "",
                defaultVisibility: !0,
                relationships: [],
                isDataVersioned: !1,
                supportsRollbackOnFailureParameter: !0,
                supportsStatistics: !0,
                supportsAdvancedQueries: !0,
                geometryType: "esriGeometryPoint",
                minScale: 0,
                maxScale: 0,
                objectIdField: "OBJECTID",
                templates: [],
                type: "Feature Layer",
                displayField: "TITLE",
                visibilityField: "VISIBLE",
                name: a,
                hasAttachments: !1,
                typeIdField: "TYPEID",
                capabilities: "Query",
                allowGeometryUpdates: !0,
                htmlPopupType: "",
                hasM: !1,
                hasZ: !1,
                globalIdField: "",
                supportedQueryFormats: "JSON",
                hasStaticData: !1,
                maxRecordCount: -1,
                indexes: [],
                types: [],
                fields: [{
                    alias: "OBJECTID",
                    name: "OBJECTID",
                    type: "esriFieldTypeOID",
                    editable: !1
                }, {
                    alias: "Title",
                    name: "TITLE",
                    length: 50,
                    type: "esriFieldTypeString",
                    editable: !0
                }, {
                    alias: "Visible",
                    name: "VISIBLE",
                    type: "esriFieldTypeInteger",
                    editable: !0
                }, {
                    alias: "Description",
                    name: "DESCRIPTION",
                    length: 1073741822,
                    type: "esriFieldTypeString",
                    editable: !0
                }, {
                    alias: "Type ID",
                    name: "TYPEID",
                    type: "esriFieldTypeInteger",
                    editable: !0
                }]
            };
            new E({
                title: "{title}",
                description: "{description}"
            });
            a = new F(b, {
                id: a
            });
            this.map.addLayer(a);
            m.connect(a, "onClick", c.hitch(this, function(a) {
                this.map.infoWindow.setFeatures([a.graphic])
            }));
            return a
        },
        _addStartFeatures: function(a) {
            var b = [],
                c, d, e = [];
            c = {};
            d = (new w({
                url: this.esriDijitPath + "/images/Directions/greenPoint.png",
                height: 21.75,
                width: 15.75,
                imageData: "iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4OTI1MkU2ODE0QzUxMUUyQURFMUNDNThGMTA3MjkzMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4OTI1MkU2OTE0QzUxMUUyQURFMUNDNThGMTA3MjkzMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg5MjUyRTY2MTRDNTExRTJBREUxQ0M1OEYxMDcyOTMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg5MjUyRTY3MTRDNTExRTJBREUxQ0M1OEYxMDcyOTMxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+iVNkdQAABJlJREFUeNp0VltvG0UUnpkdr72261CnCQWEIA9FqOKlqooARUKCtAUhoA+VoBVRhfgFXKSKJ97goRL8ARCIclGgL0VUkBBAoBaVoggEQQVSAhFS06SJje3Y3t25cc7srL3YjddHs3N85pvvfOfMyJRs83n8o+P7POI9yQibooTeBa68ISbSRv+hifpCGHX2s6dnfrrRWjroOPzB0T0+zZ0q8uDRSrniF/MB8X2fADhR8IRRRDphh7Q6rbgtOucU0Sdnj59Z2hb00PtHD+Zp/p2x6uitO4o7iLYP8DMafjVE2wXUboALm50W2ahtXO3q8MTX02fnh0Affu/IkSAXnL55dLzMPU6kURZMIZQhFtRk2VBKcpQTIQVZ21hrdUX4zDcnPv2kBzr59mP3BLnChfGx8YrHPKIAELSzMPhQk+ydzpOvIYwywjFeK7K+vt6IlZw8/+y5RZ4gm9eCUrGCmkUyBkCV0Sd5UlBtTLIhRWQE9ixwsVwe6dY3X4WwJ+j9bx7a7/v5i6O7qlxisFZJAvBF7Rjty56CWlmszilj6BNgXd+syTCO7uNK62nuezyUkWWASTPHDtOjbgOHkJTOsbXAyJhIC+rlODdROM211gcQKBJxoh+EKAs4AGqybHVfBvdICNIU/IDHYbcJiS6le4wwbW1B9UDXJcg9QBxtbglh1BlAJzjoUxIGQZFRwtAypgnjtH0spDG9MWVs34xrN5uBLnEoTKQUgDLgZ6hliLunBaIDhy4LYhyotptZlphGyLUhfyspxxj3AIpaVqikdgyzoGn7p0xNj71rNamweCscWC0qoQ8YRm3K2OgpeFoc+j9FSUYKB+4OgxIK4RcZUJ6RsUgqCrShxWzza9035aw/lzYGY5P4xFSMR5vMcFpm87opL4HjXsr76dLhC2xYhgx3I0BfoS7RCp+3K/e8vn+Ke2zWK+cYofQG9yMlw1eK1aAni9oSWil9eOmFhXkPnbXZ1eXqwVsirfQU9Vynm75lymLbxvpSP4yqI4iR5uWlFxdOI56Xbro5t3qhOrW7ZmL1EOFwp7k6pRXuWaZgBmuwJSIl1fNXXvrxjRTLy2ZTm1v9YeTBXedNbCYZZ1U4pdt+NGiomuKKEvKp5ZM/f5z9zctc1vju1b9cv5q/M/icBd4+KNztlnGWKfYjAMqm+K7zZ/PYP6d+X3TrafbmR8N71QcrOPMLd5RGdj838WFup393orNLWRki6vFv197661i40m6AKwYLneG79BzDPNhNYFWwnfguGyKgPl32bwseoTnKekVpS9n49vorWwv1JsSVwAJHCHcW2Agsk3rBBZXBihhcn11biTfDixpPik1bEZyj34EVXXzJrUccWwrbZo5+B6ztRpvO1kLjjO5qW3YccZ5JeTAecQxqqV0Q6hM5KVIrNL5a/77yQPUyLbK9qiMv49zFhW6MMnPE0dwxlQ48ckXDNHJOq0C2xByreHtxhPk1sK4DEI5dut7+QWCZCyj9MXKLWmD/gl1Xtfhd6F2CI86dv+XiIrdOpeeCDd0VyW7KGbLptn9p/mrgNsIxwzKN0QO3IvlPgAEA3AQhIZtaN54AAAAASUVORK5CYII\x3d",
                contentType: "image/png",
                type: "esriPMS"
            })).setOffset(0, 10.875);
            a = new v(a, d);
            this.map.graphics.add(a);
            c.description = "blayer desc";
            c.title = "blayer";
            a.setAttributes(c);
            b.push(a);
            0 < this._startDrawPointfLayer.graphics.length && (e = this._startDrawPointfLayer.graphics);
            this._startDrawPointfLayer.applyEdits(b, null, e)
        },
        _addEndFeatures: function(a) {
            var b = [],
                c, d, e = [];
            c = {};
            d = (new w({
                url: this.esriDijitPath + "/images/Directions/redPoint.png",
                height: 21.75,
                width: 15.75,
                imageData: "iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNEZDQTg5MTE0QzYxMUUyQURFMUNDNThGMTA3MjkzMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNEZDQTg5MjE0QzYxMUUyQURFMUNDNThGMTA3MjkzMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg5MjUyRTZBMTRDNTExRTJBREUxQ0M1OEYxMDcyOTMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI0RkNBODkwMTRDNjExRTJBREUxQ0M1OEYxMDcyOTMxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pmgrrgAABHNJREFUeNqEVU2IHEUUflVd3fO/P3FWRPAQ0EVWL2FZFBS8REgQXD0GDILg0Zsgbg7ezCFXb15iFCUigkJAzF5y0RgQPUyIRBFz2SxusszO7uxMd1e953vV1TM9m6gF31S96qqvvvdTNerH9RWQFtUSUCYCRWwkddAAJ8iYdVD6JIJa5tkaAKUK8bZCexWc/QYJflXO8jADcsRAz2XgwfYU4wI1Wqebnfmk1mhCnNSYWwFZB3meLo0Phy+M9gcbcLh/hde+x/i9SnCU9GWXNC8udLuPN9sdYBo+PQcYsxIivyDmLmk2oNNsJMNB4/X+/XvPKZu9yZ82H0b6mo7rn3aXum1jYqDDAyBEJitcgkDKA/+rlIZmLYaEBezu2K/taPQGT39bJX2WVPTJ4tx828coTZnQFQRCptSE2B9STjGxYgGLC4udnSy7BA5f5NmeQSZRcXy+02rOKbJAo5FXyDsKqFlSD/6O3CsZRxp0ZKDTas33x/c+JGtfFaWrURSdqvFHPBwWhJ5DsRDt1UzaRCmDM83BAZULcQR1HUFkzGlr7aoh587WtTaUjv3igrQgJNRTlWXzXkgCOTwcIpTD2Vs5nInNAdFZw1ldY42AWeozrLzLvI1JJRmeVFAmqlSLQYDYIEJYqfA4WhOlxyPLsdQhL56ECWWTJ62onBQAToiLsZzrIPJn4HHDdovyHFCrEMciOQV5KKcJM01DMFFMRTjYxiKJLYPWpSRKhcTHUQiwIC8KcjamvgKguAyEwUZvyzVFpLFRSH9Z65Zizr4vESjJS8KH+F+WFk1VinrHqpnvDpcU9XKHawZKlzkEhLNk1TqtHEAz5AC58zHuac7W5bHF4EVwwbtRAZePx4yNfq3fE/YKD5K6rLsRbubO3citmyTA9+j+A/gAZH+OeEP4pJAcB+PcAc/4U0u4CsIlmtqzEPX71gf1nPCVd3Azc7ixl/Fjwq5R6dpRhPAUISrC4RiDjFU62iifv0k2Np9/VMrzHa6kC3NG1yIF/9tYNAwsps7hu/ywfHTy+t8zVT3J85XVYy/FWn88H+snE/3vzOwZ7Fn6g6P29is/716r3De+rtMrI+Po87ujrZWW+Y7VnkgUPBGV5VlBxhJ3c/rhl73szFu9fm/6Tk7JVHisE0Y9IHmmbebPL8998VgSPW0qgi2Tbmfut/dvD87cPLB7IpoxDpCxjYJC/qeEBcYxxqKMdzJs1BT8udzQp+r8Dhd3naCfO/vl9viDq/ezAa9rMRpBkBydl9kvXa+HRW1GUxZf3Brd2UrxeuqKApdebJkPZM2wvhX2RxCedfK1Wsg/ZAxD791hRV8NnX80QXqxKy4fXe//2Ix/kopFEp80hKJE/bPt0U/rjyS32lqt7GV4S+ywbhz6tGILD5qg1AbyNCRN3IhDrBp9S98vIa1Iz/Y2YxQI8qCu3O//a3TlTSs/pmHTPqPP2LmbuUsST+nFDvP7YV0a9rmyVvWRmqZwmgsQNaNr/fwmP+MgfUVluQarhS/tHwEGAEyHOx7EoDsBAAAAAElFTkSuQmCC",
                contentType: "image/png",
                type: "esriPMS"
            })).setOffset(0, 10.875);
            a = new v(a, d);
            this.map.graphics.add(a);
            c.description = "blayer desc";
            c.title = "blayer";
            a.setAttributes(c);
            b.push(a);
            0 < this._endDrawPointfLayer.graphics.length && (e = this._endDrawPointfLayer.graphics);
            this._endDrawPointfLayer.applyEdits(b, null, e)
        },
        _updateStops: function() {
            var a = {},
                a = {
                    geometry: this.map.extent.getExtent()
                };
            f.getLayerFeatureCount(this.stopsLayer, a).then(c.hitch(this, function(a) {
                console.log(a);
                p.set(this._numStopsExtentLabel, "innerHTML",
                    k.substitute(this.i18n.stopsLabelByExtent, {
                        numStops: a
                    }))
            }), function(a) {
                console.log(a)
            })
        },
        _showMessages: function(a) {
            p.set(this._bodyNode, "innerHTML", a);
            s.fadeIn({
                node: this._errorMessagePane,
                easing: u.quadIn,
                onEnd: c.hitch(this, function() {
                    d.set(this._errorMessagePane, {
                        display: ""
                    })
                })
            }).play()
        },
        _handleCloseMsg: function(a) {
            a && a.preventDefault();
            s.fadeOut({
                node: this._errorMessagePane,
                easing: u.quadOut,
                onEnd: c.hitch(this, function() {
                    d.set(this._errorMessagePane, {
                        display: "none"
                    })
                })
            }).play()
        }
    })
});