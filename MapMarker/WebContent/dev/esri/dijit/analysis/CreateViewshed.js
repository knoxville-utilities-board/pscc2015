require({cache:{
'url:esri/dijit/analysis/templates/CreateViewshed.html':"<div class=\"esriAnalysis\">\n  <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n    <div data-dojo-attach-point=\"_hotspotsToolContentTitle\" class=\"analysisTitle\">\n         <table class=\"esriFormTable\" > \n            <tr>\n              <td class=\"esriToolIconTd\"><div class=\"createViewshedIcon\"></div></td>\n              <td class=\"esriAlignLeading\">${i18n.createViewshed}</td>\n              <td>\n                <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                    <div class=\"esriFloatLeading\">\n                      <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                    </div>\n                    <div class=\"esriFloatTrailing\">\n                      <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                    </div>              \n                </div>  \n              </td>\n            </tr>\n         </table>\n    </div>\n    <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n  </div>\n  <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n     <table class=\"esriFormTable\"> \n       <tbody>\n        <tr>\n          <td  colspan=\"3\" class=\"sectionHeader\" data-dojo-attach-point=\"_interpolateToolDescription\" ></td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n            <label class=\"longTextInput\">${i18n.viewshedOptionlabel}</label>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriLeadingMargin2\"  data-dojo-attach-point=\"_observerHeightLabel\"></label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"ObserverHeight\"></a>\n          </td>                    \n        </tr>                  \n        <tr>\n          <td colspan=\"3\" style=\"padding:0;\">\n            <table class=\"esriFormTable esriLeadingMargin2\" style=\"width:90%;\">\n              <tbody>\n                <tr>\n                <td  style=\"width:50%;padding-right:1em;\">\n            <input type=\"text\" data-dojo-type=\"dijit/form/NumberTextBox\" data-dojo-props=\"value:${observerHeight},intermediateChanges:true,invalidMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_obsrHeightInput\" style=\"width:100%;\">\n                </td>\n                <td colspan=\"2\">\n            <select class=\"longInput esriAnalysisSelect\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_obsrUnitsSelect\">\n            </select>\n                </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriLeadingMargin2\">${i18n.targetHghtLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"TargetHeight\"></a>\n          </td>                    \n        </tr>                  \n        <tr>\n          <td colspan=\"3\" style=\"padding:0;\">\n            <table class=\"esriFormTable esriLeadingMargin2\" style=\"width:90%;\">\n              <tbody>\n                <tr>\n                <td  style=\"width:50%;padding-right:1em;\">\n            <input type=\"text\" data-dojo-type=\"dijit/form/NumberTextBox\" data-dojo-props=\"value:${targetHeight},intermediateChanges:true,invalidMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_targetHgtInput\" style=\"width:100%;\">\n                </td>\n                <td colspan=\"2\">\n            <select class=\"longInput esriAnalysisSelect\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_targetUnitsSelect\">\n            </select>\n                </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriLeadingMargin2\">${i18n.maxDistanceLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"MaximumDistance\"></a>\n          </td>                    \n        </tr>                   \n        <tr>\n          <td colspan=\"3\" style=\"padding:0;\">\n            <table class=\"esriFormTable esriLeadingMargin2\" style=\"width:90%;\">\n              <tbody>\n                <tr>\n                <td  style=\"width:50%;padding-right:1em;\">\n            <input type=\"text\" data-dojo-type=\"dijit/form/NumberTextBox\" data-dojo-props=\"value:${maximumDistance},intermediateChanges:true,invalidMessage:'${i18n.maxdistanceInValidMsg}', constraints:{place: '0,0'}\" data-dojo-attach-point=\"_maximumDistanceInput\" style=\"width:100%;\" data-dojo-attach-event=\"onChange:_handleMaxDstChange\">\n                </td>\n                <td colspan=\"2\">\n            <select class=\"longInput esriAnalysisSelect\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_distanceUnitsSelect\" data-dojo-attach-event=\"onChange:_handleMaxDstUnitsChange\">\n            </select>\n                </td>\n               </tr>                  \n                </tbody>\n              </table>\n            </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\" class=\"clear\"></td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n            <label class=\"longTextInput\">${i18n.outputLayerLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"OutputLayer\"></a> \n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n            <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" data-dojo-props=\"trim:true,required:true\" class=\"longTextInput esriLeadingMargin1\" data-dojo-attach-point=\"_outputLayerInput\"></input>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n             <div data-dojo-attach-point=\"_chooseFolderRow\" class=\"esriLeadingMargin1\">\n               <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n               <input class=\"longInput\" dojoAttachPoint=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\" style=\"width:55%;height:auto\"></input>\n             </div>              \n          </td>\n        </tr>\n      </tbody>\n     </table>\n   </div>\n  <div style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n    <div class=\"esriExtentCreditsCtr\">\n      <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\n     <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n       <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n         ${i18n.useMapExtent}\n     </label>\n    </div>\n    <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" class=\"esriLeadingMargin4 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n        ${i18n.runAnalysis}\n    </button>\n  </div>\n  <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n    <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n  </div>    \n</div>\n"}});
//>>built
define("esri/dijit/analysis/CreateViewshed", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/Color", "dojo/_base/json", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dojo/number", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/NumberSpinner", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "dijit/Dialog", "../../kernel", "../../lang", "./AnalysisBase", "../../symbols/SimpleFillSymbol", "../../symbols/SimpleLineSymbol", "../../toolbars/draw", "../PopupTemplate", "../../layers/FeatureLayer", "../../graphic", "./utils", "./CreditEstimator", "../../symbols/PictureMarkerSymbol", "dijit/form/HorizontalSlider", "dijit/form/HorizontalRule", "dijit/form/HorizontalRuleLabels", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/CreateViewshed.html"], function(p, q, d, r, g, A, f, B, C, e, h, l, D, E, s, F, t, u, v, w, x, G, H, I, J, K, L, M, N, O, P, Q, R, S, y, T, U, m, V, W, X, k, Y, Z, $, aa, ba, n, z) {
    return q([t, u, v, w, x, y], {
        declaredClass: "esri.dijit.analysis.CreateViewshed",
        templateString: z,
        basePath: p.toUrl("."),
        widgetsInTemplate: !0,
        inputLayer: null,
        maximumDistance: 15,
        maxDistanceUnits: "Kilometers",
        targetHeight: 0,
        targetHeightUnits: "Meters",
        observerHeight: 1.75,
        observerHeightUnits: "Meters",
        outputLayerName: null,
        showSelectFolder: !1,
        showChooseExtent: !0,
        showHelp: !0,
        returnFeatureCollection: !1,
        showCredits: !0,
        i18n: null,
        map: null,
        toolName: "CreateViewshed",
        helpFileName: "CreateViewshed",
        resultParameter: "viewshedLayer",
        constructor: function(a, b) {
            this._pbConnects = [];
            a.containerNode && (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments);
            r.forEach(this._pbConnects, g.disconnect);
            delete this._pbConnects
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            d.mixin(this.i18n, n.findHotSpotsTool);
            d.mixin(this.i18n, n.createViewshedTool)
        },
        postCreate: function() {
            this.inherited(arguments);
            s.add(this._form.domNode, "esriSimpleForm");
            this._outputLayerInput.set("validator", d.hitch(this, this.validateServiceName));
            this._buildUI()
        },
        startup: function() {},
        _onClose: function(a) {
            this.emit("close", {
                save: !a
            })
        },
        clear: function() {},
        _handleShowCreditsClick: function(a) {
            a.preventDefault();
            a = {};
            this._form.validate() && (a.inputLayer = f.toJson(k.constructAnalysisInputLyrObj(this.get("inputLayer"))), this.get("maximumDistance") && (a.maximumDistance = this.get("maximumDistance"), a.maxDistanceUnits = this.get("maxDistanceUnits")),
                a.maximumDistance = this.get("maximumDistance"), a.maxDistanceUnits = this.get("maxDistanceUnits"), a.observerHeight = this.get("observerHeight"), a.observerHeightUnits = this.get("observerHeightUnits"), a.targetHeight = this.get("targetHeight"), a.targetHeightUnits = this.get("targetHeightUnits"), this.returnFeatureCollection || (a.OutputName = f.toJson({
                    serviceProperties: {
                        name: this.get("outputLayerName")
                    }
                })), this.returnFeatureCollection || (a.OutputName = f.toJson({
                    serviceProperties: {
                        name: this.get("outputLayerName")
                    }
                })),
                this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = f.toJson({
                    extent: this.map.extent._normalize(!0)
                })), this.getCreditsEstimate(this.toolName, a).then(d.hitch(this, function(a) {
                    this._usageForm.set("content", a);
                    this._usageDialog.show()
                })))
        },
        _handleSaveBtnClick: function(a) {
            if (this._form.validate()) {
                this._saveBtn.set("disabled", !0);
                a = {};
                var b = {},
                    c;
                a.inputLayer = f.toJson(k.constructAnalysisInputLyrObj(this.get("inputLayer")));
                a.maximumDistance = this.get("maximumDistance");
                a.maxDistanceUnits =
                    this.get("maxDistanceUnits");
                a.observerHeight = this.get("observerHeight");
                a.observerHeightUnits = this.get("observerHeightUnits");
                a.targetHeight = this.get("targetHeight");
                a.targetHeightUnits = this.get("targetHeightUnits");
                this.returnFeatureCollection || (a.OutputName = f.toJson({
                    serviceProperties: {
                        name: this.get("outputLayerName")
                    }
                }));
                this.showChooseExtent && !this.get("disableExtent") && this._useExtentCheck.get("checked") && (a.context = f.toJson({
                    extent: this.map.extent._normalize(!0)
                }));
                this.returnFeatureCollection &&
                    (c = {
                        outSR: this.map.spatialReference
                    }, this.showChooseExtent && (c.extent = this.map.extent._normalize(!0)), a.context = f.toJson(c));
                a.returnFeatureCollection = this.returnFeatureCollection;
                b.jobParams = a;
                b.itemParams = {
                    description: this.i18n.itemDescription,
                    tags: e.substitute(this.i18n.itemTags, {
                        layername: this.inputLayer.name,
                        fieldname: !a.field ? "" : a.field
                    }),
                    snippet: this.i18n.itemSnippet
                };
                this.showSelectFolder && (b.itemParams.folder = this._webMapFolderSelect.item ? this.folderStore.getValue(this._webMapFolderSelect.item,
                    "id") : "");
                console.log(b);
                this.execute(b)
            }
        },
        _save: function() {},
        _buildUI: function() {
            this._loadConnections();
            this.signInPromise.then(d.hitch(this, k.initHelpLinks, this.domNode, this.showHelp, {
                analysisGpServer: this.analysisGpServer
            }));
            this.inputLayer && (l.set(this._interpolateToolDescription, "innerHTML", e.substitute(this.i18n.toolDefine, {
                layername: this.inputLayer.name
            })), l.set(this._observerHeightLabel, "innerHTML", e.substitute(this.i18n.observerHghtLabel, {
                layername: this.inputLayer.name
            })), this._outputLayerInput.set("value",
                e.substitute(this.i18n.outputLayerName, {
                    layername: this.inputLayer.name
                })));
            this.outputLayerName && this._outputLayerInput.set("value", this.outputLayerName);
            h.set(this._chooseFolderRow, "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(d.hitch(this, function(a) {
                this.folderStore = a;
                this._webMapFolderSelect.set("store", a);
                this._webMapFolderSelect.set("value", this.portalUser.username)
            }));
            h.set(this._chooseExtentDiv, "display", !0 === this.showChooseExtent ? "block" :
                "none");
            h.set(this._showCreditsLink, "display", !0 === this.showCredits ? "block" : "none");
            this._distanceUnitsSelect.addOption([{
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
            }]);
            this.maxDistanceUnits && (this._distanceUnitsSelect.set("value", this.maxDistanceUnits), this._handleMaxDstUnitsChange(this.maxDistanceUnits));
            this.maximumDistance &&
                this._maximumDistanceInput.set("value", this.maximumDistance);
            this._obsrUnitsSelect.addOption([{
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
            }]);
            this.observerHeightUnits && this._obsrUnitsSelect.set("value", this.observerHeightUnits);
            this.observerHeight && this._obsrHeightInput.set("value", this.observerHeight);
            this._targetUnitsSelect.addOption([{
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
            }]);
            this.targetHeightUnits && this._targetUnitsSelect.set("value", this.targetHeightUnits);
            this.targetHeight && this._targetHgtInput.set("value", this.targetHeight)
        },
        _loadConnections: function() {
            this.on("start", d.hitch(this, "_onClose", !1));
            this._connect(this._closeBtn, "onclick", d.hitch(this, "_onClose", !0))
        },
        validateServiceName: function(a) {
            var b = /(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(a);
            return 0 === a.length || 0 === e.trim(a).length ? (this._outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : b ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceName), !1) : 98 < a.length ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceNameLength), !1) : !0
        },
        _handleMaxDstChange: function() {
            this._maximumDistanceInput.validate()
        },
        _handleMaxDstUnitsChange: function(a) {
            var b = "",
                c = {
                    places: "0,0"
                };
            "Miles" === a ? (c.max = 31, b = e.substitute(this.i18n.maxDistanceValidMsg, {
                units: a,
                limit: 31
            })) : "Kilometers" === a ? (c.max = 50, b = e.substitute(this.i18n.maxDistanceValidMsg, {
                units: a,
                limit: 50
            })) : "Yards" === a ? (c.max = 54680, b = e.substitute(this.i18n.maxDistanceValidMsg, {
                units: a,
                limit: 54680
            })) : "Feet" === a ? (c.max = 164041, b = e.substitute(this.i18n.maxDistanceValidMsg, {
                units: a,
                limit: 164041
            })) : "Meters" === a && (c.max = 5E4, b = e.substitute(this.i18n.maxDistanceValidMsg, {
                units: a,
                limit: 5E4
            }));
            this._maximumDistanceInput.set("constraints",
                c);
            this._maximumDistanceInput.set("rangeMessage", b)
        },
        _setAnalysisGpServerAttr: function(a) {
            a && (this.analysisGpServer = a, this.set("toolServiceUrl", this.analysisGpServer + "/" + this.toolName))
        },
        _setInputLayerAttr: function(a) {
            this.inputLayer = a
        },
        _getInputLayerAttr: function() {
            return this.inputLayer
        },
        _getOutputLayerNameAttr: function() {
            this._outputLayerInput && (this.outputLayerName = this._outputLayerInput.get("value"));
            return this.outputLayerName
        },
        _setOutputLayerNameAttr: function(a) {
            this.outputLayerName = a
        },
        _setMapAttr: function(a) {
            this.map =
                a;
            this._toolbar = new m(this.map);
            g.connect(this._toolbar, "onDrawEnd", d.hitch(this, this._addFeatures));
            this._pointtoolbar = new m(this.map);
            g.connect(this._pointtoolbar, "onDrawEnd", d.hitch(this, this._addPointFeatures))
        },
        _getMapAttr: function() {
            return this.map
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
        _setShowHelpAttr: function(a) {
            this.showHelp = a
        },
        _getShowHelpAttr: function() {
            return this.showHelp
        },
        _setReturnFeatureCollectionAttr: function(a) {
            this.returnFeatureCollection = a
        },
        _getReturnFeatureCollectionAttr: function() {
            return this.returnFeatureCollection
        },
        _setShowCreditsAttr: function(a) {
            this.showCredits = a
        },
        _getShowCreditsAttr: function() {
            return this.showCredits
        },
        _setDisableExtentAttr: function(a) {
            this._useExtentCheck.set("checked", !a);
            this._useExtentCheck.set("disabled", a)
        },
        _getDisableExtentAttr: function() {
            this._useExtentCheck.get("disabled")
        },
        _setMaxDistanceUnitsAttr: function(a) {
            this.maxDistanceUnits = a
        },
        _getMaxDistanceUnitsAttr: function() {
            this._distanceUnitsSelect && this._distanceUnitsSelect.get("value") && (this.maxDistanceUnits = this._distanceUnitsSelect.get("value"));
            return this.maxDistanceUnits
        },
        _setMaximumDistanceAttr: function(a) {
            this.maximumDistance = a
        },
        _getMaximumDistanceAttr: function() {
            this._maximumDistanceInput && this._maximumDistanceInput.get("value") &&
                (this.maximumDistance = this._maximumDistanceInput.get("value"));
            return this.maximumDistance
        },
        _setObserverHeightUnitsAttr: function(a) {
            this.observerHeightUnits = a
        },
        _getObserverHeightUnitsAttr: function() {
            this._obsrUnitsSelect && this._obsrUnitsSelect.get("value") && (this.observerHeightUnits = this._obsrUnitsSelect.get("value"));
            return this.observerHeightUnits
        },
        _setObserverHeightAttr: function(a) {
            this.observerHeight = a
        },
        _getObserverHeightAttr: function() {
            this._obsrHeightInput && this._obsrHeightInput.get("value") &&
                (this.observerHeight = this._obsrHeightInput.get("value"));
            return this.observerHeight
        },
        _setTargetHeightUnitsAttr: function(a) {
            this.targetHeightUnits = a
        },
        _getTargetHeightUnitsAttr: function() {
            this._targetUnitsSelect && this._targetUnitsSelect.get("value") && (this.targetHeightUnits = this._targetUnitsSelect.get("value"));
            return this.targetHeightUnits
        },
        _setTargetHeightAttr: function(a) {
            this.targetHeight = a
        },
        _getTargetHeightAttr: function() {
            this._targetHgtInput && this._targetHgtInput.get("value") && (this.targetHeight =
                this._targetHgtInput.get("value"));
            return this.targetHeight
        },
        _connect: function(a, b, c) {
            this._pbConnects.push(g.connect(a, b, c))
        }
    })
});