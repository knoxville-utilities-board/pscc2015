require({cache:{
'url:esri/dijit/analysis/templates/ConnectOriginsToDestinations.html':"<div class=\"esriAnalysis\">\n    <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n      <div data-dojo-attach-point=\"_hotspotsToolContentTitle\" class=\"analysisTitle\">\n         <table class=\"esriFormTable\" >\n            <tr>\n              <td class=\"esriToolIconTd\"><div class=\"connectODIcon\"></div></td>\n              <td class=\"esriAlignLeading\">${i18n.connectOriginsToDestinations}</td>\n              <td>\n                 <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                  <div class=\"esriFloatLeading\">\n                    <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                  </div>\n                  <div class=\"esriFloatTrailing\">\n                    <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                  </div>              \n              </div>  \n              </td>\n            </tr>\n         </table>\n      </div>\n      <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n    </div>\n    <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n     <table class=\"esriFormTable\"  data-dojo-attach-point=\"_driveTimesTable\">\n       <tbody>\n        <tr>\n          <td colspan=\"3\" class=\"sectionHeader\" data-dojo-attach-point=\"_tripCalToolDescription\"></td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label data-dojo-attach-point=\"_labelOne\" class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n            <label data-dojo-attach-point=\"_labelOneText\" class=\"\">${i18n.labelOne}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"destinationsLayer\"></a>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n            <select class=\"longInput esriLeadingMargin1 esriLongLabel\"  style=\"height:90%;\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-event=\"onChange:_handleDestinationLayerChange\" data-dojo-attach-point=\"_destPointLyrSelect\">\n            </select>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n            <table style=\"width:100%\" data-dojo-attach-point=\"_routeIdRow\">\n              <tbody>\n                <tr>\n                  <td colspan=\"3\">\n                    <label class=\"esriLeadingMargin1\">${i18n.pairPoints}</label>\n                  </td>\n                </tr>\n                <tr>\n                  <td>\n                    <label class=\"esriLeadingMargin2\">${i18n.originTripId}</label>\n                  </td>\n                </tr>\n                <tr>\n                  <td>\n                    <select class=\"esriLeadingMargin2 mediumInput esriMediumLabel\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_originRouteIdSelect\" data-dojo-attach-event=\"onChange:_handleOriginRouteIdChange\">\n                      <!--<option value=\"-1\" selected=\"selected\">Select OrigId</option>-->\n                    </select>\n                  </td>\n                </tr>\n                <tr>\n                  <td>\n                    <label class=\"esriLeadingMargin2\">${i18n.destnTripId}</label>\n                  </td>\n                </tr>\n                <tr>\n                  <td>\n                    <select class=\"esriLeadingMargin2 mediumInput esriMediumLabel\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_destnRouteIdSelect\" data-dojo-attach-event=\"onChange:_handleDestnRouteIdChange\">\n                      <!--<option value=\"-1\" selected=\"selected\">Select DestID</option>-->\n                    </select>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n            <div class=\"esriFormWarning esriRoundedBox\" data-dojo-attach-point=\"_errorMessagePane\" style=\"display:none;\">\n              <!--<a href=\"#\" title=\"${i18n.close}\" class=\"esriFloatTrailing esriAnalysisCloseIcon\" title='${i18n.close}'  data-dojo-attach-event=\"onclick:_handleCloseMsg\">\n              </a>-->\n              <span data-dojo-attach-point=\"_bodyNode\"></span>\n            </div>             \n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label data-dojo-attach-point=\"_labelTwo\" class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n            <label data-dojo-attach-point=\"_measurelabel\" class=\"\">${i18n.measureLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"measurementType\"></a>\n          </td>\n        </tr>\n        <tr>\n          <td style=\"padding:0.25em;\" colspan=\"3\">\n            <div data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_measureMethodSelect\" class=\"esriLeadingMargin1 longInput esriLongLabel esriAnalysisDriveMode\">\n              <div data-dojo-value=\"StraightLine\">\n                <div class=\"esriFloatLeading bufferIcon esriStraightLineDistanceIcon\"></div>\n                <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.straightLineDistance}</div>\n              </div>\n              <div data-dojo-value=\"DrivingTime\">\n                <div class=\"esriFloatLeading bufferIcon esriDrivingTimeIcon\"></div>\n                <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.drivingTime}</div>\n              </div>\n              <div data-dojo-value=\"DrivingDistance\">\n                <div class=\"esriFloatLeading bufferIcon esriDrivingDistanceIcon\"></div>\n                <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.drivingDistance}</div>\n              </div>\n              <div data-dojo-value=\"TruckingTime\">\n                <div class=\"esriFloatLeading bufferIcon esriTruckingTimeIcon\"></div>\n                <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.truckingTime}</div>\n              </div>\n              <div data-dojo-value=\"TruckingDistance\">\n                <div class=\"esriFloatLeading bufferIcon esriTruckingDistanceIcon\"></div>\n                <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.truckingDistance}</div>\n              </div>\n              <div data-dojo-value=\"WalkingTime\">\n                <div class=\"esriFloatLeading bufferIcon esriWalkingTimeIcon\"></div>\n                <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.walkingTime}</div>\n              </div>\n              <div data-dojo-value=\"WalkingDistance\">\n                <div class=\"esriFloatLeading bufferIcon esriWalkingDistanceIcon\"></div>\n                <div class=\"esriLeadingMargin4\" style=\"margin-top:10px;\">${i18n.walkingDistance}</div>\n              </div>\n            </div>\n          </td>\n        </tr>\n        <tr data-dojo-attach-point=\"_useTrafficLabelRow\">\n          <td style=\"padding:0\" colspan=\"3\">\n            <div style=\"width;100%\" data-dojo-type=\"esri/dijit/analysis/TrafficTime\" data-dojo-attach-point=\"_trafficTimeWidget\"></div>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label data-dojo-attach-point=\"_labelThree\" class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.threeLabel}</label>\n            <label data-dojo-attach-point=\"_resultlabel\" class=\"\">${i18n.resultLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"outputLayer\"></a>\n          </td>\n        </tr>\n        <tr>\n          <td class=\"shortTextInput\" colspan=\"3\">\n            <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" class=\"esriLeadingMargin1 esriOutputText\" data-dojo-props=\"trim:true,required:true\" data-dojo-attach-point=\"_outputLayerInput\"  value=\"\">\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n             <div class=\"esriLeadingMargin1\" data-dojo-attach-point=\"_chooseFolderRow\">\n               <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n               <input class=\"longInput\" dojoAttachPoint=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\" style=\"width:60%;height:auto\"></input>\n             </div>              \n          </td>\n        </tr>      \n       </tbody>\n      </table>\n    </div>\n    <div data-dojo-attach-point=\"_aggregateToolContentButtons\" style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n      <div class=\"esriExtentCreditsCtr\">\n        <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\n       <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n         <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n           ${i18n.useMapExtent}\n       </label>\n      </div>\n      <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" style=\"margin-top:10px;\" class=\"esriLeadingMargin2 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n          ${i18n.runAnalysis}\n      </button>\n    </div>\n    <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n      <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n    </div>\n</div>\n"}});
//>>built
define("esri/dijit/analysis/ConnectOriginsToDestinations", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/json", "dojo/_base/fx", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dojo/fx/easing", "dojo/number", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "../../kernel", "../../lang", "./AnalysisBase", "./CreditEstimator", "./utils", "./TrafficTime", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/ConnectOriginsToDestinations.html"], function(s, t, c, g, n, f, p, C, D, h, d, q, E, F, u, r, G, v, w, x, y, z, H, I, J, K, L, M, N, O, P, Q, l, A, R, k, S, m, B) {
    return t([v, w, x, y, z, A], {
        declaredClass: "esri.dijit.analysis.ConnectOriginsToDestinations",
        templateString: B,
        basePath: s.toUrl("."),
        widgetsInTemplate: !0,
        originsLayer: null,
        destinationsLayer: null,
        measurementType: "DrivingTime",
        outputLayerName: null,
        showSelectFolder: !1,
        showChooseExtent: !0,
        showHelp: !0,
        showCredits: !0,
        distanceDefaultUnits: "Miles",
        returnFeatureCollection: !1,
        originsLayerRouteIDField: null,
        destinationsLayerRouteIDField: null,
        enableTravelModes: !0,
        i18n: null,
        toolName: "ConnectOriginsToDestinations",
        helpFileName: "ConnectOriginsToDestinations",
        resultParameter: ["routesLayer", "unassignedOriginsLayer", "unassignedDestinationsLayer"],
        constructor: function(a, b) {
            this._pbConnects = [];
            a.containerNode && (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments);
            g.forEach(this._pbConnects, n.disconnect);
            delete this._pbConnects
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            c.mixin(this.i18n, m.common);
            c.mixin(this.i18n,
                m.bufferTool);
            c.mixin(this.i18n, m.driveTimes);
            c.mixin(this.i18n, m.routeOriginDestinationPairsTool)
        },
        postCreate: function() {
            this.inherited(arguments);
            u.add(this._form.domNode, "esriSimpleForm");
            this._outputLayerInput.set("validator", c.hitch(this, this.validateServiceName));
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
            a = {};
            this._form.validate() && (a.originsLayer =
                f.toJson(k.constructAnalysisInputLyrObj(this.originsLayer)), a.destinationsLayer = f.toJson(k.constructAnalysisInputLyrObj(this.get("destinationsLayer"))), a.measurementType = this.get("measurementType"), "none" !== d.get(this._routeIdRow, "display") && (a.originsLayerRouteIDField = this.get("originsLayerRouteIDField"), a.destinationsLayerRouteIDField = this.get("destinationsLayerRouteIDField")), this._trafficTimeWidget.get("checked") && (a.timeOfDay = this._trafficTimeWidget.get("timeOfDay"), "UTC" === this._trafficTimeWidget.get("timeZoneForTimeOfDay") &&
                    (a.timeZoneForTimeOfDay = this._trafficTimeWidget.get("timeZoneForTimeOfDay"))), this.returnFeatureCollection || (a.OutputName = f.toJson({
                    serviceProperties: {
                        name: this._outputLayerInput.get("value")
                    }
                })), this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = f.toJson({
                    extent: this.map.extent._normalize(!0)
                })), this.getCreditsEstimate(this.toolName, a).then(c.hitch(this, function(a) {
                    this._usageForm.set("content", a);
                    this._usageDialog.show()
                })))
        },
        _handleSaveBtnClick: function(a) {
            a = {};
            var b = {},
                e;
            this._form.validate() &&
                (this._saveBtn.set("disabled", !0), a.originsLayer = f.toJson(k.constructAnalysisInputLyrObj(this.originsLayer)), a.destinationsLayer = f.toJson(k.constructAnalysisInputLyrObj(this.get("destinationsLayer"))), a.measurementType = this.get("measurementType"), "none" !== d.get(this._routeIdRow, "display") && (a.originsLayerRouteIDField = this.get("originsLayerRouteIDField"), a.destinationsLayerRouteIDField = this.get("destinationsLayerRouteIDField")), this._trafficTimeWidget.get("checked") && (a.timeOfDay = this._trafficTimeWidget.get("timeOfDay"),
                    "UTC" === this._trafficTimeWidget.get("timeZoneForTimeOfDay") && (a.timeZoneForTimeOfDay = this._trafficTimeWidget.get("timeZoneForTimeOfDay"))), this.returnFeatureCollection || (a.OutputName = f.toJson({
                    serviceProperties: {
                        name: this._outputLayerInput.get("value")
                    }
                })), this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = f.toJson({
                    extent: this.map.extent._normalize(!0)
                })), this.returnFeatureCollection && (e = {
                        outSR: this.map.spatialReference
                    }, this.showChooseExtent && (e.extent = this.map.extent._normalize(!0)),
                    a.context = f.toJson(e)), b.jobParams = a, b.itemParams = {
                    description: h.substitute(this.i18n.itemDescription, {
                        layername: this.originsLayer.name,
                        distance_field: a.Distances || a.Field,
                        units: a.Units
                    }),
                    tags: h.substitute(this.i18n.itemTags, {
                        layername: this.originsLayer.name,
                        destnlayername: this.destinationsLayer.name
                    }),
                    snippet: this.i18n.itemSnippet
                }, this.showSelectFolder && (b.itemParams.folder = this._webMapFolderSelect.item ? this.folderStore.getValue(this._webMapFolderSelect.item, "id") : ""), this.execute(b))
        },
        _save: function() {},
        _buildUI: function() {
            k.initHelpLinks(this.domNode, this.showHelp);
            q.set(this._tripCalToolDescription, "innerHTML", h.substitute(this.i18n.toolDefine, {
                layername: this.originsLayer.name
            }));
            d.set(this._chooseFolderRow, "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(c.hitch(this, function(a) {
                this.folderStore = a;
                this._webMapFolderSelect.set("store", a);
                this._webMapFolderSelect.set("value", this.portalUser.username)
            }));
            d.set(this._chooseExtentDiv, "display", !0 === this.showChooseExtent ? "block" : "none");
            this.get("enableTravelModes") || this._updateTravelModes(this.enableTravelModes);
            this.measurementType && (this._measureMethodSelect.set("value", this.measurementType), this._handleMeasurementTypeChange(this.measurementType));
            this.featureLayers && g.forEach(this.featureLayers, function(a, e) {
                this._destPointLyrSelect.addOption({
                    value: e + 1,
                    label: a.name
                });
                this.destinationsLayer && this.destinationsLayer === a && this._destPointLyrSelect.set("value", this.destinationsLayer)
            }, this);
            this.destinationsLayer || (this._destPointLyrSelect.set("value", 1), this.set("destinationsLayer", this.featureLayers[0]));
            this.originsLayer && this.originsLayer.graphics && 1 >= this.originsLayer.graphics.length || this.destinationsLayer && 1 >= this.destinationsLayer.graphics.length ? d.set(this._routeIdRow, "display", "none") : d.set(this._routeIdRow, "display", "table");
            if (this.originsLayer && this.originsLayer.graphics && 1 < this.originsLayer.graphics.length) {
                var a = this.originsLayer.fields;
                this._originRouteIdSelect.removeOption(this._originRouteIdSelect.getOptions());
                g.forEach(a, function(a, e) {
                    -1 !== g.indexOf(["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeString", "esriFieldTypeDate"], a.type) && this._originRouteIdSelect.addOption({
                        value: a.name,
                        label: l.isDefined(a.alias) && "" !== a.alias ? a.alias : a.name
                    })
                }, this);
                this.originsLayerRouteIDField && this._orginRouteIdSelect.set("value", this.originsLayerRouteIDField)
            }
            this._loadConnections()
        },
        _setAnalysisGpServerAttr: function(a) {
            a && (this.analysisGpServer = a, this.set("toolServiceUrl", this.analysisGpServer +
                "/" + this.toolName))
        },
        _setOriginsLayerAttr: function(a) {
            "esriGeometryPoint" === a.geometryType && (this.originsLayer = a)
        },
        _getOriginsLayerAttr: function() {
            return this.originsLayer
        },
        _setFeatureLayersAttr: function(a) {
            this.featureLayers = g.filter(a, function(a) {
                if (a !== this.originsLayer && "esriGeometryPoint" === a.geometryType) return !0
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
            return 0 === a.length || 0 === h.trim(a).length ? (this._outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : b ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceName), !1) : 98 < a.length ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceNameLength), !1) : !0
        },
        _setShowSelectFolderAttr: function(a) {
            this.showSelectFolder = a
        },
        _getShowSelectFolderAttr: function() {
            return this.showSelectFolder
        },
        _setMapAttr: function(a) {
            this.map = a
        },
        _getMapAttr: function() {
            return this.map
        },
        _setMeasurementTypeAttr: function(a) {
            this.measurementType = a
        },
        _getMeasurementTypeAttr: function() {
            return this.measurementType
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
            this.returnFeatureCollection = a
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
        _setDestinationsLayerAttr: function(a) {
            this.destinationsLayer = a
        },
        _getDestinationsLayerAttr: function() {
            this._destPointLyrSelect && (this.destinationsLayer = this.featureLayers[this._destPointLyrSelect.get("value") - 1]);
            return this.destinationsLayer
        },
        _setOriginsLayerRouteIDFieldAttr: function(a) {
            this.originsLayerRouteIDField =
                a
        },
        _getOriginsLayerRouteIDFieldAttr: function() {
            this._originRouteIdSelect && this._isRouteIdAvailable() && (this.originsLayerRouteIDField = this._originRouteIdSelect.get("value"));
            return this.originsLayerRouteIDField
        },
        _setDestinationsLayerRouteIDFieldAttr: function(a) {
            this.destinationsLayerRouteIDField = a
        },
        _getDestinationsLayerRouteIDFieldAttr: function() {
            this._destnRouteIdSelect && this._isRouteIdAvailable && (this.destinationsLayerRouteIDField = this._destnRouteIdSelect.get("value"));
            return this.destinationsLayerRouteIDField
        },
        _setOutputLayerNameAttr: function(a) {
            this.outputLayerName = a;
            this._outputLayerInput && this._outputLayerInput.set("value", this.outputLayerName)
        },
        _setEnableTravelModesAttr: function(a) {
            this._set("enableTravelModes", a)
        },
        _loadConnections: function() {
            this.on("start", c.hitch(this, "_onClose", !0));
            this._connect(this._closeBtn, "onclick", c.hitch(this, "_onClose", !1));
            n.connect(this._measureMethodSelect, "onChange", c.hitch(this, this._handleMeasurementTypeChange));
            this.watch("enableTravelModes", c.hitch(this, function(a,
                b, e) {
                this._updateTravelModes(e)
            }))
        },
        _connect: function(a, b, e) {
            this._pbConnects.push(n.connect(a, b, e))
        },
        _handleDestnRouteIdChange: function(a) {
            !this._autoSelRtId && l.isDefined(this._originRouteIdSelect.getOptions(a)) && (this._autoSelRtId = !0, this._originRouteIdSelect.set("value", a))
        },
        _handleOriginRouteIdChange: function(a) {
            !this._autoSelRtId && l.isDefined(this._destnRouteIdSelect.getOptions(a)) && (this._autoSelRtId = !0, this._destnRouteIdSelect.set("value", a))
        },
        _handleMeasurementTypeChange: function(a) {
            var b =
                "DrivingTime" === a;
            this.set("measurementType", a);
            d.set(this._useTrafficLabelRow, "display", b ? "" : "none");
            this._trafficTimeWidget.set("disabled", !b);
            this._trafficTimeWidget.set("reset", !b)
        },
        _handleDestinationLayerChange: function(a) {
            var b;
            this._autoSelRtId && (this._autoSelRtId = !1);
            this._destnRouteIdSelect.removeOption(this._destnRouteIdSelect.getOptions());
            this.originsLayer.graphics && 1 < this.originsLayer.graphics.length && 1 < this.featureLayers[a - 1].graphics.length ? this.featureLayers[a - 1].graphics && this.featureLayers[a -
                1].graphics.length !== this.originsLayer.graphics.length ? (this._showMessages(this.i18n.inValidNumberRecordsMsg), this.set("disableRunAnalysis", !0), d.set(this._routeIdRow, "display", "none")) : (this._handleCloseMsg(), d.set(this._routeIdRow, "display", "table"), this.set("disableRunAnalysis", !1), b = this.featureLayers[a - 1].fields, g.forEach(b, function(a, b) {
                -1 !== g.indexOf(["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeString", "esriFieldTypeDate"], a.type) && this._destnRouteIdSelect.addOption({
                    value: a.name,
                    label: l.isDefined(a.alias) && "" !== a.alias ? a.alias : a.name
                })
            }, this)) : (d.set(this._routeIdRow, "display", "none"), this.set("disableRunAnalysis", !1), this._handleCloseMsg());
            this._outputLayerInput.set("value", h.substitute(this.i18n.outputLayerName, {
                layername: this.originsLayer.name,
                destnlayername: this.featureLayers[a - 1].name
            }))
        },
        _isRouteIdAvailable: function() {
            var a = !1;
            this.originsLayer.graphics && 1 < this.originsLayer.graphics.length && 1 < this.featureLayers[this._destPointLyrSelect.get("value") - 1].graphics.length &&
                this.originsLayer.graphics && this.originsLayer.graphics.length === this.featureLayers[this._destPointLyrSelect.get("value") - 1].graphics.length && (a = !0);
            return a
        },
        _showMessages: function(a) {
            q.set(this._bodyNode, "innerHTML", a);
            p.fadeIn({
                node: this._errorMessagePane,
                easing: r.quadIn,
                onEnd: c.hitch(this, function() {
                    d.set(this._errorMessagePane, {
                        display: ""
                    })
                })
            }).play()
        },
        _handleCloseMsg: function(a) {
            a && a.preventDefault();
            p.fadeOut({
                node: this._errorMessagePane,
                easing: r.quadOut,
                onEnd: c.hitch(this, function() {
                    d.set(this._errorMessagePane, {
                        display: "none"
                    })
                })
            }).play()
        },
        _updateTravelModes: function(a) {
            var b = this._measureMethodSelect.getOptions();
            g.forEach(b, function(b) {
                "StraightLine" !== b.value && (b.disabled = !a)
            });
            this._measureMethodSelect.updateOption(b)
        }
    })
});