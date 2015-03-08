require({cache:{
'url:esri/dijit/analysis/templates/EnrichLayer.html':"<div class=\"esriAnalysis\">\n    <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n      <div data-dojo-attach-point=\"_aggregateToolContentTitle\" class=\"analysisTitle\">\n        <table class=\"esriFormTable\" > \n          <tr>\n            <td class=\"esriToolIconTd\"><div class=\"geoenrichLayerIcon\"></div></td>\n            <td class=\"esriAlignLeading\">${i18n.enrichLayer}</td>\n            <td>\n              <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                  <div class=\"esriFloatLeading\">\n                    <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                  </div>\n                  <div class=\"esriFloatTrailing\">\n                    <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                  </div>              \n              </div>                \n            </td>\n          </tr>\n        </table>\n      </div>\n      <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n    </div>\n    <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n       <table class=\"esriFormTable\"  data-dojo-attach-point=\"_aggregateTable\"  style=\"border-collapse:collapse;border-spacing:5px;\" cellpadding=\"5px\" cellspacing=\"5px\"> \n         <tbody>\n          <tr>\n            <td  colspan=\"3\" class=\"sectionHeader\" data-dojo-attach-point=\"_aggregateToolDescription\" >${i18n.enrichDefine}</td>\n          </tr>      \n          <tr>\n            <td colspan=\"3\" style=\"padding-bottom:0;\">\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n              <!--<label class=\"\">${i18n.chooseDataCollectionLabel}</label>-->\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"DataCollection\"></a>\n            </td>\n          </tr>\n          <!--<tr>\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>-->          \n          <tr>\n            <td colspan=\"3\" style=\"padding-top:0;\">\n              <div style=\"width:95%;height:200px;border:1px #EFEEEF solid;\" data-dojo-attach-point=\"_analysisVariablesCtr\" class=\"ShoppingCart\">\n                <div data-dojo-attach-point=\"_selectedList\" style=\"overflow-y:auto;height:100%;\">\n                </div>\n                <div data-dojo-attach-point=\"_selectLabelDiv\" class=\"selectLabel\">${i18n.clickDataVar}</div>\n              </div>\n            </td>\n          </tr>\n          <tr>\n            <td >\n              <div data-dojo-type=\"dijit/form/Button\" class=\"esriTertiaryActionBtn\" data-dojo-attach-point=\"_addBtn\" data-dojo-attach-event=\"onClick:_handleShowDataDialogClick\">\n              ${i18n.selectDataVar}\n              </div>\n            </td>\n            <td colspan=\"2\">\n              <table class=\"esriFormTable\">\n                <tr>\n                  <td class=\"ShoppingCart_CounterTD\" style=\"padding-right:0\">\n                    <div class=\"ShoppingCart_CounterDivLeftBorder\"></div>\n                    <div data-dojo-attach-point=\"varCounter\" class=\"ShoppingCart_CounterDiv\">0</div>\n                    <div class=\"ShoppingCart_CounterDivRightBorder\"></div>\n                  </td>\n                  <td class=\"ShoppingCart_LabelTd\" style=\"white-space:nowrap;\">\n                      <div>${i18n.selectedVars}</div>\n                  </td>\n                </tr>\n              </table>\n            </td>\n          </tr>\n          <tr>\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>\n            \n          <tr>\n            <td colspan=\"2\">\n              <label data-dojo-attach-point=\"_labelOne\" class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n              <label data-dojo-attach-point=\"_measurelabel\" class=\"\">${i18n.defAreasLabel}</label>\n            </td>\n            <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"BufferOption\"></a>\n            </td>\n          </tr>\n          <tr>\n            <td style=\"padding:0.25em;\" colspan=\"3\">\n              <div data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_bufferTypeSelect\" class=\"esriLeadingMargin1 longInput esriLongLabel esriAnalysisDriveMode\">\n                <div data-dojo-value=\"StraightLine\">\n                  <div class=\"esriFloatLeading bufferIcon esriStraightLineDistanceIcon\" data-dojo-attach-point=\"_straightLineOptionIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\" data-dojo-attach-point=\"_straightLineOptionText\">${i18n.straightLineDistance}</div>\n                </div>\n                <div data-dojo-value=\"DrivingTime\">\n                  <div class=\"esriFloatLeading bufferIcon esriDrivingTimeIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.drivingTime}</div>\n                </div>\n                <div data-dojo-value=\"DrivingDistance\">\n                  <div class=\"esriFloatLeading bufferIcon esriDrivingDistanceIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.drivingDistance}</div>\n                </div>\n                <div data-dojo-value=\"TruckingTime\">\n                  <div class=\"esriFloatLeading bufferIcon esriTruckingTimeIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.truckingTime}</div>\n                </div>\n                <div data-dojo-value=\"TruckingDistance\">\n                  <div class=\"esriFloatLeading bufferIcon esriTruckingDistanceIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.truckingDistance}</div>\n                </div>\n                <div data-dojo-value=\"WalkingTime\">\n                  <div class=\"esriFloatLeading bufferIcon esriWalkingTimeIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.walkingTime}</div>\n                </div>\n                <div data-dojo-value=\"WalkingDistance\">\n                  <div class=\"esriFloatLeading bufferIcon esriWalkingDistanceIcon\"></div>\n                  <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.walkingDistance}</div>\n                </div>\n              </div>\n            </td>\n          </tr>\n          <tr>\n            <td style=\"padding-right:0;padding-bottom:0;width:20%;\">\n              <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" data-dojo-attach-event=\"onChange:_handleDistUnitsChange\" data-dojo-props=\"intermediateChanges:true,value:'1',required:true,missingMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_distanceInput\" class=\"esriLeadingMargin1\"  style=\"width:75%;\">\n            </td>\n            <td colspan=\"2\" style=\"padding-left:0.25em;padding-bottom:0;width:60%;\">\n              <select class=\"mediumInput esriAnalysisSelect\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-event=\"onChange:_handleDistUnitsChange\" data-dojo-attach-point=\"_distanceUnitsSelect\" style=\"width:80%;table-layout:fixed;\">\n                <option value=\"Seconds\">${i18n.seconds}</option>\n                <option value=\"Minutes\" selected=\"selected\">${i18n.minutes}</option>\n                <option value=\"Hours\">${i18n.hours}</option>\n              </select>\n            </td>\n          </tr>\n          <tr data-dojo-attach-point=\"_useTrafficRow\">\n            <td style=\"padding:0\" colspan=\"3\">\n              <div style=\"width:100%;\" data-dojo-type=\"esri/dijit/analysis/TrafficTime\" data-dojo-attach-point=\"_trafficTimeWidget\"></div>\n            </td>\n          </tr> \n          <tr>\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>\n          <tr>\n            <td colspan=\"2\">\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.threeLabel}</label>\n              <label class=\"longTextInput\">${i18n.outputLayerLabel}</label>\n            </td>\n            <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"OutputName\"></a> \n            </td>             \n          </tr>\n          <tr>\n            <td colspan=\"3\">\n              <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" class=\"esriLeadingMargin1 esriOutputText\"  data-dojo-props=\"trim:true,required:true\" data-dojo-attach-point=\"_outputLayerInput\" value=\"\"></input>\n            </td>                \n          </tr> \n          <tr>\n            <td colspan=\"3\">\n               <div class=\"esriLeadingMargin1\" data-dojo-attach-point=\"_chooseFolderRow\">\n                 <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n                 <input class=\"longInput esriFolderSelect\" dojoAttachPoint=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\"></input>\n               </div>              \n            </td>\n          </tr>                                      \n        </tbody>         \n       </table>\n     </div>\n    <div data-dojo-attach-point=\"_aggregateToolContentButtons\" style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n      <div class=\"esriExtentCreditsCtr\">\n        <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\n       <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n         <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n           ${i18n.useMapExtent}\n       </label>\n      </div>\n      <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" class=\"esriLeadingMargin4 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n          ${i18n.runAnalysis}\n      </button>\n    </div>\n    <div class=\"esriFormWarning esriRoundedBox\" data-dojo-attach-point=\"_errorMessagePane\" style=\"display:none;\">\n      <span data-dojo-attach-point=\"_bodyNode\"></span>\n    </div>\n    <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n      <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n    </div>    \n    <div data-dojo-type=\"dijit/Dialog\" title=\"\" data-dojo-attach-point=\"_dataDialog\" data-dojo-props=\"closable:false\">\n      <div data-dojo-type=\"esri/dijit/geoenrichment/DataBrowser\"  class=\"calcite esriAnalysisEnrichDataBrowser\" data-dojo-props=\"backButton:null\" data-dojo-attach-point=\"_databrowser\" style=\"width:60em;height:40em;\"></div>\n    </div>    \n</div>\n"}});
//>>built
define("esri/dijit/analysis/EnrichLayer", ["require", "dojo/aspect", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/json", "dojo/_base/fx", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dojo/fx/easing", "dojo/number", "dojo/on", "dojo/Evented", "dojo/store/Observable", "dojo/dom-geometry", "dojo/store/Memory", "dojo/window", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/FilteringSelect", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "dijit/Dialog", "dgrid/List", "../../kernel", "../../lang", "./AnalysisBase", "./CreditEstimator", "./utils", "./TrafficTime", "../geoenrichment/config", "../geoenrichment/DataBrowser", "../../tasks/geoenrichment/GeoenrichmentTask", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/EnrichLayer.html"], function(z, A, B, d, k, p, g, w, N, O, l, e, m, q, x, h, y, r, C, P, Q, R, S, D, E, F, G, H, I, T, U, V, W, X, Y, Z, $, aa, ba, ca, J, da, t, K, ea, u, fa, s, ga, L, v, M) {
    return B([E, F, G, H, I, K], {
        declaredClass: "esri.dijit.analysis.EnrichLayer",
        templateString: M,
        basePath: z.toUrl("."),
        widgetsInTemplate: !0,
        inputLayer: null,
        outputLayerName: null,
        distance: null,
        showSelectFolder: !1,
        showChooseExtent: !0,
        enableTravelModes: !0,
        showTrafficWidget: !1,
        _isBufferSelectionEnabled: !0,
        showHelp: !0,
        showCredits: !0,
        returnFeatureCollection: !1,
        analysisVariables: null,
        i18n: null,
        toolName: "EnrichLayer",
        helpFileName: "EnrichLayer",
        resultParameter: "enrichedLayer",
        constructor: function(a) {
            this._pbConnects = [];
            this._statsRows = [];
            this._isLineEnabled = !1;
            a.containerNode && (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments);
            k.forEach(this._pbConnects, p.disconnect);
            delete this._pbConnects;
            this._driveTimeClickHandle && (p.disconnect(this._driveTimeClickHandle), this._driveTimeClickHandle = null)
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            d.mixin(this.i18n,
                v.bufferTool);
            d.mixin(this.i18n, v.driveTimes);
            d.mixin(this.i18n, v.enrichLayerTool)
        },
        postCreate: function() {
            this.inherited(arguments);
            h.add(this._form.domNode, "esriSimpleForm");
            this._distanceInput.set("validator", d.hitch(this, this.validateDistance));
            this._outputLayerInput.set("validator", d.hitch(this, this.validateServiceName));
            this._buildUI();
            this.watch("analysisVariables", d.hitch(this, this._refreshGrid))
        },
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
            if (this._form.validate() && this.validateSelectedGrid()) {
                a = {};
                var c, b, n;
                c = this.get("analysisVariables");
                n = [];
                b = [];
                k.forEach(c, function(a) {
                    -1 !== a.indexOf(".*") ? b.push(a.split(".*")[0]) : n.push(a)
                });
                a.inputLayer = g.toJson(u.constructAnalysisInputLyrObj(this.inputLayer));
                if (this._isBufferSelectionEnabled || this._isLineEnabled) a.bufferType = this.get("bufferType"), a.distance = this.get("distance"), a.units = this._distanceUnitsSelect.get("value");
                this.get("country") &&
                    (a.country = this.get("country"));
                b && 0 < b.length && (a.dataCollections = g.toJson(b));
                n && 0 < n.length && (a.analysisVariables = g.toJson(n));
                this.get("showTrafficWidget") && this._trafficTimeWidget.get("checked") && (a.TimeOfDay = this._trafficTimeWidget.get("timeOfDay"));
                this.returnFeatureCollection || (a.OutputName = g.toJson({
                    serviceProperties: {
                        name: this._outputLayerInput.get("value")
                    }
                }));
                this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = g.toJson({
                    extent: this.map.extent._normalize(!0)
                }));
                this.getCreditsEstimate(this.toolName,
                    a).then(d.hitch(this, function(a) {
                    this._usageForm.set("content", a);
                    this._usageDialog.show()
                }))
            }
        },
        _handleSaveBtnClick: function() {
            if (this._form.validate() && this.validateSelectedGrid()) {
                var a = {},
                    c = {},
                    b, d, f;
                this._saveBtn.set("disabled", !0);
                b = this.get("analysisVariables");
                f = [];
                d = [];
                k.forEach(b, function(a) {
                    -1 !== a.indexOf(".*") ? d.push(a.split(".*")[0]) : f.push(a)
                });
                a.inputLayer = g.toJson(u.constructAnalysisInputLyrObj(this.inputLayer));
                if (this._isBufferSelectionEnabled || this._isLineEnabled) a.bufferType = this.get("bufferType"),
                    a.distance = this.get("distance"), a.units = this._distanceUnitsSelect.get("value");
                this.get("country") && (a.country = this.get("country"));
                d && 0 < d.length && (a.dataCollections = d);
                f && 0 < f.length && (a.analysisVariables = f);
                this.get("showTrafficWidget") && this._trafficTimeWidget.get("checked") && (a.TimeOfDay = this._trafficTimeWidget.get("timeOfDay"));
                this.returnFeatureCollection || (a.OutputName = g.toJson({
                    serviceProperties: {
                        name: this._outputLayerInput.get("value")
                    }
                }));
                this.showChooseExtent && this._useExtentCheck.get("checked") &&
                    (a.context = g.toJson({
                        extent: this.map.extent._normalize(!0)
                    }));
                this.returnFeatureCollection && (b = {
                    outSR: this.map.spatialReference
                }, this.showChooseExtent && (b.extent = this.map.extent._normalize(!0)), a.context = g.toJson(b));
                c.jobParams = a;
                this._saveBtn.set("disabled", !1);
                c.itemParams = {
                    description: l.substitute(this.i18n.itemDescription, {
                        inputLayerName: this.inputLayer.name
                    }),
                    tags: l.substitute(this.i18n.itemTags, {
                        inputLayerName: this.inputLayer.name
                    }),
                    snippet: this.i18n.itemSnippet
                };
                this.showSelectFolder && (c.itemParams.folder =
                    this._webMapFolderSelect.item ? this.folderStore.getValue(this._webMapFolderSelect.item, "id") : "");
                this.execute(c)
            }
        },
        _handleDistUnitsChange: function(a) {
            this.set("outputLayerName")
        },
        _handleDistanceTypeChange: function(a) {
            var c = -1 !== a.indexOf("Time"),
                b = "DrivingTime" === a;
            this.set("bufferType", a);
            this.get("showTrafficWidget") && (e.set(this._useTrafficRow, "display", b ? "" : "none"), this._trafficTimeWidget.set("disabled", !b), this._trafficTimeWidget.set("reset", !b));
            c ? (this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()),
                this._distanceUnitsSelect.addOption([{
                    value: "Seconds",
                    label: this.i18n.seconds
                }, {
                    value: "Minutes",
                    label: this.i18n.minutes,
                    selected: "selected"
                }, {
                    value: "Hours",
                    label: this.i18n.hours
                }])) : (this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()), this._distanceUnitsSelect.addOption([{
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
            }]));
            this.set("outputLayerName")
        },
        _save: function() {},
        _buildUI: function() {
            var a, c, b;
            this.signInPromise.then(d.hitch(this, u.initHelpLinks, this.domNode, this.showHelp, {
                analysisGpServer: this.analysisGpServer
            }));
            this._addBtn.set("disabled", !0);
            e.set(this._dataDialog.titleNode, "display", "none");
            e.set(this._dataDialog.titleBar, "display", "none");
            e.set(this._dataDialog.containerNode, "padding", "0");
            this.signInPromise.then(d.hitch(this, function(b) {
                a = this.portalUrl && -1 !== this.portalUrl.indexOf("dev") ? "dev" : this.portalUrl &&
                    -1 !== this.portalUrl.indexOf("qa") ? "qa" : "";
                s.portalUrl = this.portalUrl;
                s.server = location.protocol + "//geoenrich" + a + ".arcgis.com/arcgis/rest/services/World/GeoenrichmentServer";
                this._task = new L(s.server);
                this._task.token = s.token;
                (c = this._getPoint(this.inputLayer)) ? this._task.getCountries(c).then(d.hitch(this, function(a) {
                    a instanceof Array && (this.country ? this._databrowser.countryID = this.country : (this._databrowser.countryID = a[0], this.set("country", a[0])), this._addBtn.set("disabled", !1))
                }), d.hitch(this,
                    function(a) {
                        console.log(a);
                        this._addBtn.set("disabled", !1)
                    })): this._addBtn.set("disabled", !1)
            }));
            this.get("enableTravelModes") || this._updateTravelModes(this.enableTravelModes);
            this.inputLayer && (m.set(this._aggregateToolDescription, "innerHTML", l.substitute(this.i18n.enrichDefine, {
                    inputLayerName: this.inputLayer.name
                })), "esriGeometryPolygon" === this.inputLayer.geometryType && (this._isBufferSelectionEnabled = !1, this._updateTravelModes(!1, !0), h.add(this._distanceInput, "disabled"), this._distanceInput.set("disabled", !0), h.add(this._distanceUnitsSelect, "disabled"), this._distanceUnitsSelect.set("disabled", !0), b = this._bufferTypeSelect.getOptions("StraightLine"), b.label = b.label.replace("esriStraightLineDistanceIcon", "esriStraightLineDistanceDisabledIcon"), b.label = b.label.replace("esriLeadingMargin4", "esriLeadingMargin4 esriAnalysisTextDisabled"), b.disabled = !0, this._bufferTypeSelect.updateOption(b), h.add(this._bufferTypeSelect, "disabled"), this._bufferTypeSelect.set("disabled", !0)), "esriGeometryPolyline" === this.inputLayer.geometryType &&
                (this._updateTravelModes(!1), this._isLineEnabled = !0, this._isBufferSelectionEnabled = !1), this._outputLayerInput.set("value", l.substitute(this.i18n.outputLayerName, {
                    layername: this.inputLayer.name
                })));
            this._loadConnections();
            (this._isBufferSelectionEnabled || this._isLineEnabled) && this._handleDistanceTypeChange("StraightLine");
            e.set(this._useTrafficRow, "display", this.get("showTrafficWidget") ? "" : "none");
            this.outputLayerName && this._outputLayerInput.set("value", this.outputLayerName);
            e.set(this._chooseFolderRow,
                "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(d.hitch(this, function(a) {
                this.folderStore = a;
                this._webMapFolderSelect.set("store", a);
                this._webMapFolderSelect.set("value", this.portalUser.username)
            }));
            this.outputLayerName && this._outputLayerInput.set("value", this.outputLayerName);
            e.set(this._chooseExtentDiv, "display", !0 === this.showChooseExtent ? "block" : "none");
            this.list = new J({
                renderRow: d.hitch(this, this._renderVariableRow)
            }, this._selectedList)
        },
        startup: function() {
            this.list.startup();
            e.set(this._selectLabelDiv, "display", "block");
            e.set(this._selectedList, "display", "none")
        },
        _renderVariableRow: function(a) {
            var c = q.create("div", {
                    "class": "ShoppingCartRowOuter"
                }),
                b = q.create("div", {
                    "class": "ShoppingCartRow"
                }, c);
            q.create("div", {
                "class": "TrimWithEllipses ShoppingCartRowLabel",
                innerHTML: a.alias
            }, b);
            b = q.create("div", {
                "class": "ShoppingCartRowCloser"
            }, b);
            m.set(b, "idDesc", a.idDesc);
            C(b, "click", d.hitch(this, this._handledRemoveVarClick));
            return c
        },
        _handledRemoveVarClick: function(a) {
            this._databrowser.shoppingCart.onClick(a);
            this._databrowser._onOK()
        },
        validateSelectedGrid: function() {
            var a;
            (a = this.get("analysisVariables") && 0 !== this.get("analysisVariables").length) ? e.set(this._analysisVariablesCtr, "borderColor", "#EFEEEF"): (D.scrollIntoView(this._analysisVariablesCtr), e.set(this._analysisVariablesCtr, "borderColor", "#f94"));
            return a
        },
        validateDistance: function() {
            var a = this,
                c, b = [],
                e, f;
            this.set("distance");
            c = d.trim(this._distanceInput.get("value"));
            if (!c) return !1;
            f = r.parse(c);
            if (isNaN(f)) return b.push(0), !1;
            c = r.format(f, {
                locale: "root"
            });
            t.isDefined(c) ? t.isDefined(c) || (c = r.format(f, {
                locale: "en-us"
            })) : c = r.format(f, {
                locale: "en"
            });
            t.isDefined(c) && (e = d.trim(c).match(/\D/g));
            e && k.forEach(e, function(c) {
                "." === c || "," === c ? b.push(1) : "-" === c && "polygon" === a.inputType ? b.push(1) : b.push(0)
            });
            return -1 !== k.indexOf(b, 0) ? !1 : !0
        },
        _loadConnections: function() {
            this.on("start", d.hitch(this, "_onClose", !0));
            this._connect(this._closeBtn, "onclick", d.hitch(this, "_onClose", !1));
            this._isBufferSelectionEnabled && p.connect(this._bufferTypeSelect, "onChange", d.hitch(this,
                this._handleDistanceTypeChange));
            this._connect(this._databrowser, "onOK", d.hitch(this, this._handleDataBrowserOk));
            this._connect(this._databrowser, "onCancel", d.hitch(this, this._handleDataBrowserCancel));
            A.after(this._databrowser, "loadPage", d.hitch(this, this._setCalciteButtons));
            this.watch("enableTravelModes", d.hitch(this, function(a, c, b) {
                this._updateTravelModes(b)
            }))
        },
        _handleDataBrowserOk: function() {
            this.set("analysisVariables", this._databrowser.selection);
            this._dataDialog.hide()
        },
        _handleDataBrowserCancel: function() {
            this._dataDialog.hide()
        },
        _handleShowDataDialogClick: function(a) {
            this._dataDialog.show()
        },
        _setCalciteButtons: function() {
            x(".calcite .DataCollectionButton").forEach(function(a) {
                h.add(a, "btn secondary")
            });
            x(".calcite .Wizard_Button").forEach(function(a, c) {
                m.get(a, "innerHTML") === this._databrowser.okButton ? h.add(a, "btn secondary") : h.add(a, "btn transparent")
            }, this)
        },
        _refreshGrid: function(a, c, b) {
            a = [];
            for (var d in this._databrowser.shoppingCart.content) this._databrowser.shoppingCart.content.hasOwnProperty(d) && a.push(this._databrowser.shoppingCart.content[d]);
            e.set(this._selectLabelDiv, "display", 0 === a.length ? "block" : "none");
            e.set(this._selectedList, "display", 0 === a.length ? "none" : "block");
            m.set(this.varCounter, "innerHTML", a.length.toString());
            this.list.refresh();
            this.list.renderArray(a)
        },
        _showMessages: function(a) {
            m.set(this._bodyNode, "innerHTML", a);
            w.fadeIn({
                node: this._errorMessagePane,
                easing: y.quadIn,
                onEnd: d.hitch(this, function() {
                    e.set(this._errorMessagePane, {
                        display: ""
                    })
                })
            }).play()
        },
        _handleCloseMsg: function(a) {
            a && a.preventDefault();
            w.fadeOut({
                node: this._errorMessagePane,
                easing: y.quadOut,
                onEnd: d.hitch(this, function() {
                    e.set(this._errorMessagePane, {
                        display: "none"
                    })
                })
            }).play()
        },
        _setAnalysisGpServerAttr: function(a) {
            a && (this.analysisGpServer = a, this.set("toolServiceUrl", this.analysisGpServer + "/" + this.toolName))
        },
        _setInputLayerAttr: function(a) {
            this.inputLayer = a
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
            this.showChooseExtent =
                a
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
        _setAnalysisVariablesAttr: function(a) {
            this._set("analysisVariables", a)
        },
        _getAnalysisVariablesAttr: function() {
            return this.analysisVariables
        },
        _setShowHelpAttr: function(a) {
            this.showHelp = a
        },
        _getShowHelpAttr: function() {
            return this.showHelp
        },
        _setShowTrafficWidgetAttr: function(a) {
            this.showTrafficWidget = a
        },
        _getShowTrafficWidgetAttr: function() {
            return this.showTrafficWidget
        },
        _setBufferTypeAttr: function(a) {
            this.bufferType = a
        },
        _getBufferTypeAttr: function() {
            return this.bufferType
        },
        _setDistanceAttr: function(a) {
            a && (this.distance = a)
        },
        _setShowCreditsAttr: function(a) {
            this.showCredits = a
        },
        _getShowCreditsAttr: function() {
            return this.showCredits
        },
        _getDistanceAttr: function() {
            return this.distance = this._distanceInput.get("value")
        },
        _setCountryAttr: function(a) {
            this.country = a
        },
        _getCountryAttr: function() {
            this._databrowser && (this.country = this._databrowser.get("countryID"));
            return this.country
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
        validateServiceName: function(a) {
            var c = /(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(a);
            return 0 === a.length || 0 === l.trim(a).length ? (this._outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : c ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceName), !1) :
                98 < a.length ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceNameLength), !1) : !0
        },
        _connect: function(a, c, b) {
            this._pbConnects.push(p.connect(a, c, b))
        },
        _updateTravelModes: function(a) {
            var c = this._bufferTypeSelect.getOptions();
            k.forEach(c, function(b) {
                "StraightLine" !== b.value && (b.disabled = !a)
            });
            this._bufferTypeSelect.updateOption(c)
        },
        _getPoint: function(a) {
            return a.graphics && 0 < a.graphics.length ? a.graphics[0].geometry : a.initialExtent ? a.initialExtent.getCenter() : a.fullExtent ? a.fullExtent.getCenter() :
                null
        }
    })
});