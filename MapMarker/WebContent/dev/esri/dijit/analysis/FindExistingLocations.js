require({cache:{
'url:esri/dijit/analysis/templates/FindExistingLocations.html':"<div class=\"esriAnalysis\">\n    <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n      <div data-dojo-attach-point=\"_aggregateToolContentTitle\" class=\"analysisTitle\">\n        <table class=\"esriFormTable\" > \n          <tr>\n            <td class=\"esriToolIconTd\"><div class=\"findLocationsIcon\"></div></td>\n            <td class=\"esriAlignLeading\">${i18n.findExistingLocations}</td>\n            <td>\n              <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                  <div class=\"esriFloatLeading\">\n                    <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                  </div>\n                  <div class=\"esriFloatTrailing\">\n                    <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                  </div>              \n              </div>                \n            </td>\n          </tr>\n        </table>\n      </div>\n      <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n    </div>\n    <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n       <table class=\"esriFormTable\"  data-dojo-attach-point=\"_aggregateTable\"  style=\"border-collapse:collapse;border-spacing:5px;\" cellpadding=\"5px\" cellspacing=\"5px\"> \n         <tbody>\n          <tr>\n            <td colspan=\"3\">\n              <label class=\"esriFloatLeading  esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n              <label data-dojo-attach-point=\"_findExpLabel\" class=\"\">${i18n.findExpLabel}</label>\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"Expression\"></a>\n            </td>\n          </tr>\n          <tr>\n            <td colspan=\"3\" style=\"padding:1px\">\n              <div data-dojo-attach-point=\"expressionGridCtr\" style=\"width:100%\">\n              </div>\n            </td>\n          </tr>\n          <tr>\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>\n           \n          <tr>\n            <td colspan=\"2\">\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n              <label class=\"longTextInput\">${i18n.outputLayerLabel}</label>\n            </td>\n            <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"OuputName\"></a> \n            </td>             \n          </tr>\n          <tr>\n            <td colspan=\"3\">\n              <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" class=\"esriLeadingMargin1 longInput\" data-dojo-props=\"trim:true,required:true\" data-dojo-attach-point=\"_outputLayerInput\" value=\"\"></input>\n            </td>                \n          </tr>\n          <tr>\n            <td colspan=\"3\">\n               <div class=\"esriLeadingMargin1\" data-dojo-attach-point=\"_chooseFolderRow\">\n                 <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n                 <input class=\"longInput esriFolderSelect\" data-dojo-attach-point=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\"></input>\n               </div>              \n            </td>\n          </tr>\n        </tbody>         \n       </table>\n     </div>\n    <div data-dojo-attach-point=\"_aggregateToolContentButtons\" style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n      <div class=\"esriExtentCreditsCtr\">\n        <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\" style=\"color:grey;cursor:default;\">${i18n.showCredits}</a>\n       <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n         <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n           ${i18n.useMapExtent}\n       </label>\n      </div>\n      <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" class=\"esriLeadingMargin4 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n          ${i18n.runAnalysis}\n      </button>\n    </div>\n    <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n      <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n    </div>    \n  </div>\n"}});
//>>built
define("esri/dijit/analysis/FindExistingLocations", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/json", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "dijit/Dialog", "../../kernel", "../../lang", "./AnalysisBase", "./utils", "./CreditEstimator", "./ExpressionGrid", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/FindExistingLocations.html"], function(n, p, f, h, l, e, A, B, g, b, q, C, D, r, s, t, u, v, w, E, F, G, H, I, J, K, L, M, N, O, P, x, k, Q, y, m, z) {
    return p([s, t, u, v, w, x], {
        declaredClass: "esri.dijit.analysis.FindExistingLocations",
        templateString: z,
        basePath: n.toUrl("."),
        widgetsInTemplate: !0,
        showSelectFolder: !1,
        showChooseExtent: !0,
        showHelp: !0,
        showCredits: !0,
        returnFeatureCollection: !1,
        i18n: null,
        toolName: "FindExistingLocations",
        helpFileName: "FindExistingLocations",
        resultParameter: "resultLayer",
        analysisLayer: null,
        inputLayers: [],
        constructor: function(a) {
            this._pbConnects = [];
            a.containerNode && (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments);
            h.forEach(this._pbConnects, l.disconnect);
            delete this._pbConnects
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            f.mixin(this.i18n, m.findExistingLocations);
            f.mixin(this.i18n, m.expressionGrid)
        },
        postCreate: function() {
            this.inherited(arguments);
            r.add(this._form.domNode, "esriSimpleForm");
            this._outputLayerInput.set("validator", f.hitch(this, this.validateServiceName));
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
        _handleSaveBtnClick: function() {
            if (this._form.validate() && this.expressionGrid.validate()) {
                this._saveBtn.set("disabled", !0);
                var a = {},
                    c = {},
                    d, b;
                b = this.expressionGrid.get("expressionMap");
                a.expressions = e.toJson(b.expressions);
                d = [];
                d = h.map(b.inputLayers, function(a) {
                    return e.toJson(k.constructAnalysisInputLyrObj(a))
                }, this);
                a.inputLayers = d;
                this.returnFeatureCollection || (a.OutputName = e.toJson({
                    serviceProperties: {
                        name: this._outputLayerInput.get("value")
                    }
                }));
                this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = e.toJson({
                    extent: this.map.extent._normalize(!0)
                }));
                this.returnFeatureCollection && (d = {
                    outSR: this.map.spatialReference
                }, this.showChooseExtent && (d.extent = this.map.extent._normalize(!0)), a.context = e.toJson(d));
                console.log(a);
                c.jobParams = a;
                a = g.substitute(this.i18n.itemDescription, {
                    analysisLayerName: this.analysisLayer.name
                });
                a += "\x3cdiv\x3e\x3ci\x3e\x3cu\x3e" + this.i18n.expression + "\x3c/u\x3e " + b.expressionString + "\x3c/i\x3e\x3c/div\x3e";
                c.itemParams = {
                    description: a,
                    tags: g.substitute(this.i18n.itemTags, {
                        analysisLayerName: this.analysisLayer.name
                    }),
                    snippet: this.i18n.itemSnippet
                };
                this.showSelectFolder && (c.itemParams.folder = this._webMapFolderSelect.item ? this.folderStore.getValue(this._webMapFolderSelect.item, "id") : "");
                console.log(c);
                this.execute(c)
            }
        },
        _handleShowCreditsClick: function(a) {
            a.preventDefault();
            a = {};
            var c, d;
            !this._form.validate() || !this.expressionGrid.validate() ? (b.set(this._showCreditsLink, "color", "grey"), b.set(this._showCreditsLink,
                "cursor", "default")) : (b.set(this._showCreditsLink, "color", ""), b.set(this._showCreditsLink, "cursor", ""), c = this.expressionGrid.get("expressionMap"), a.expressions = e.toJson(c.expressions), d = [], d = h.map(c.inputLayers, function(a) {
                    return k.constructAnalysisInputLyrObj(a)
                }, this), a.inputLayers = e.toJson(d), this.returnFeatureCollection || (a.OutputName = e.toJson({
                    serviceProperties: {
                        name: this._outputLayerInput.get("value")
                    }
                })), this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = e.toJson({
                    extent: this.map.extent._normalize(!0)
                })),
                this.returnFeatureCollection && (c = {
                    outSR: this.map.spatialReference
                }, this.showChooseExtent && (c.extent = this.map.extent._normalize(!0)), a.context = e.toJson(c)), console.log(a), this.getCreditsEstimate(this.toolName, a).then(f.hitch(this, function(a) {
                    this._usageForm.set("content", a);
                    this._usageDialog.show()
                })))
        },
        _save: function() {},
        _buildUI: function() {
            this._loadConnections();
            this.signInPromise.then(f.hitch(this, k.initHelpLinks, this.domNode, this.showHelp, {
                analysisGpServer: this.analysisGpServer
            }));
            this.outputLayerName ?
                this._outputLayerInput.set("value", this.outputLayerName) : this._outputLayerInput.set("value", g.substitute(this.i18n.outputLayerName, {
                    analysisLayerName: this.analysisLayer.name
                }));
            b.set(this._chooseFolderRow, "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(f.hitch(this, function(a) {
                this.folderStore = a;
                this._webMapFolderSelect.set("store", a);
                this._webMapFolderSelect.set("value", this.portalUser.username)
            }));
            b.set(this._chooseExtentDiv, "display", !0 ===
                this.showChooseExtent ? "block" : "none");
            b.set(this._showCreditsLink, "display", !0 === this.showCredits ? "block" : "none");
            q.set(this._findExpLabel, "innerHTML", g.substitute(this.i18n.findExpLabel, {
                analysisLayerName: this.analysisLayer.name
            }));
            this.expressionGrid = new y({
                analysisLayer: this.analysisLayer,
                inputLayers: this.inputLayers,
                allowAllInputOperands: !1,
                primaryActionButttonClass: this.get("primaryActionButttonClass")
            }, this.expressionGridCtr);
            this.expressionGrid.on("update-expressions", f.hitch(this, this._handleUpdateExpressions))
        },
        _handleUpdateExpressions: function(a) {
            1 < a.length ? (b.set(this._showCreditsLink, "color", ""), b.set(this._showCreditsLink, "cursor", "")) : (b.set(this._showCreditsLink, "color", "grey"), b.set(this._showCreditsLink, "cursor", "default"))
        },
        _loadConnections: function() {
            this.on("start", f.hitch(this, "_onClose", !0));
            this._connect(this._closeBtn, "onclick", f.hitch(this, "_onClose", !1))
        },
        _setAnalysisGpServerAttr: function(a) {
            a && (this.analysisGpServer = a, this.set("toolServiceUrl", this.analysisGpServer + "/" + this.toolName))
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
        _setInputLayersAttr: function(a) {
            console.log(this.inputLayers);
            this.inputLayers = a
        },
        _getInputLayersAttr: function() {
            return this.inputLayers
        },
        _setAnalysisLayerAttr: function(a) {
            console.log("analysis", a);
            this.analysisLayer = a
        },
        _getAnalysisLayerAttr: function() {
            return this.analysisLayer
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
        validateServiceName: function(a) {
            var b = /(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(a);
            return 0 === a.length || 0 === g.trim(a).length ? (this._outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : b ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceName), !1) : 98 < a.length ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceNameLength), !1) : !0
        },
        _setPrimaryActionButttonClassAttr: function(a) {
            this.primaryActionButttonClass = a
        },
        _getPrimaryActionButttonClassAttr: function() {
            return this.primaryActionButttonClass
        },
        _connect: function(a, b, d) {
            this._pbConnects.push(l.connect(a, b, d))
        }
    })
});