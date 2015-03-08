require({cache:{
'url:esri/dijit/analysis/templates/DeriveNewLocations.html':"<div class=\"esriAnalysis\">\n    <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n      <div data-dojo-attach-point=\"_aggregateToolContentTitle\" class=\"analysisTitle\">\n        <table class=\"esriFormTable\" > \n          <tr>\n            <td class=\"esriToolIconTd\"><div class=\"findNewLocationsIcon\"></div></td>\n            <td class=\"esriAlignLeading\">${i18n.deriveNewLocations}</td>\n            <td>\n              <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                  <div class=\"esriFloatLeading\">\n                    <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                  </div>\n                  <div class=\"esriFloatTrailing\">\n                    <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                  </div>              \n              </div>                \n            </td>\n          </tr>\n        </table>\n      </div>\n      <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n    </div>\n    <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n       <table class=\"esriFormTable\"  data-dojo-attach-point=\"_aggregateTable\"  style=\"border-collapse:collapse;border-spacing:5px;\" cellpadding=\"5px\" cellspacing=\"5px\"> \n         <tbody>\n          <tr>\n            <td colspan=\"3\">\n              <label class=\"esriFloatLeading  esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n              <label class=\"\">${i18n.findExpLabel}</label>\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"Expression\"></a>\n            </td>\n          </tr>\n          <tr>\n            <td colspan=\"3\" style=\"padding:1px\">\n              <div data-dojo-attach-point=\"expressionGridCtr\" style=\"width:100%\">\n              </div>\n            </td>\n          </tr>\n          <tr>\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>\n           \n          <tr>\n            <td colspan=\"2\">\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n              <label class=\"longTextInput\">${i18n.outputLayerLabel}</label>\n            </td>\n            <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"OutputName\"></a> \n            </td>             \n          </tr>\n          <tr>\n            <td colspan=\"3\">\n              <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" class=\"esriLeadingMargin1 longInput\" data-dojo-props=\"trim:true,required:true\" data-dojo-attach-point=\"_outputLayerInput\" value=\"\"></input>\n            </td>                \n          </tr>\n          <tr>\n            <td colspan=\"3\">\n               <div class=\"esriLeadingMargin1\" data-dojo-attach-point=\"_chooseFolderRow\">\n                 <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n                 <input class=\"longInput esriFolderSelect\" data-dojo-attach-point=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\"></input>\n               </div>              \n            </td>\n          </tr>\n        </tbody>         \n       </table>\n     </div>\n    <div data-dojo-attach-point=\"_aggregateToolContentButtons\" style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n      <div class=\"esriExtentCreditsCtr\">\n        <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\n       <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n         <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n           ${i18n.useMapExtent}\n       </label>\n      </div>\n      <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" style=\"margin-top:10px;\" class=\"esriLeadingMargin2 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n          ${i18n.runAnalysis}\n      </button>\n    </div>\n    <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n      <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n    </div>    \n  </div>\n"}});
//>>built
define("esri/dijit/analysis/DeriveNewLocations", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/json", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "dijit/Dialog", "../../kernel", "../../lang", "./AnalysisBase", "./utils", "./CreditEstimator", "./ExpressionGrid", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/DeriveNewLocations.html"], function(n, p, b, g, k, e, z, A, l, f, B, C, D, q, r, s, t, u, v, E, F, G, H, I, J, K, L, M, N, O, P, w, h, Q, x, m, y) {
    return p([r, s, t, u, v, w], {
        declaredClass: "esri.dijit.analysis.DeriveNewLocations",
        templateString: y,
        basePath: n.toUrl("."),
        widgetsInTemplate: !0,
        showSelectFolder: !1,
        showChooseExtent: !0,
        showHelp: !0,
        showCredits: !0,
        returnFeatureCollection: !1,
        i18n: null,
        toolName: "DeriveNewLocations",
        helpFileName: "DeriveNewLocations",
        resultParameter: "resultLayer",
        analysisLayer: null,
        inputLayers: [],
        constructor: function(a) {
            this._pbConnects = [];
            a.containerNode &&
                (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments);
            g.forEach(this._pbConnects, k.disconnect);
            delete this._pbConnects
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            b.mixin(this.i18n, m.deriveNewLocations);
            b.mixin(this.i18n, m.expressionGrid)
        },
        postCreate: function() {
            this.inherited(arguments);
            q.add(this._form.domNode, "esriSimpleForm");
            this._outputLayerInput.set("validator", b.hitch(this, this.validateServiceName));
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
        _handleSaveBtnClick: function() {
            if (this._form.validate() && this.expressionGrid.validate()) {
                this._saveBtn.set("disabled", !0);
                var a = {},
                    d = {},
                    c, b;
                b = this.expressionGrid.get("expressionMap");
                a.expressions = e.toJson(b.expressions);
                c = [];
                c = g.map(b.inputLayers, function(a) {
                    return e.toJson(h.constructAnalysisInputLyrObj(a))
                }, this);
                a.inputLayers = c;
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
                console.log(a);
                d.jobParams = a;
                a = this.i18n.itemDescription;
                a += "\x3cdiv\x3e\x3ci\x3e\x3cu\x3e" + this.i18n.expression + "\x3c/u\x3e " + b.expressionString + "\x3c/i\x3e\x3c/div\x3e";
                d.itemParams = {
                    description: a,
                    tags: l.substitute(this.i18n.itemTags, {
                        analysisLayerName: this.analysisLayer.name
                    }),
                    snippet: this.i18n.itemSnippet
                };
                this.showSelectFolder && (d.itemParams.folder = this._webMapFolderSelect.item ? this.folderStore.getValue(this._webMapFolderSelect.item, "id") : "");
                console.log(d);
                this.execute(d)
            }
        },
        _handleShowCreditsClick: function(a) {
            a.preventDefault();
            a = {};
            var d, c;
            !this._form.validate() || !this.expressionGrid.validate() ? (f.set(this._showCreditsLink, "color", "grey"), f.set(this._showCreditsLink, "cursor", "default")) : (f.set(this._showCreditsLink, "color",
                ""), f.set(this._showCreditsLink, "cursor", ""), d = this.expressionGrid.get("expressionMap"), a.expressions = e.toJson(d.expressions), c = [], c = g.map(d.inputLayers, function(a) {
                return h.constructAnalysisInputLyrObj(a)
            }, this), a.inputLayers = e.toJson(c), this.showChooseExtent && this._useExtentCheck.get("checked") && (a.Context = e.toJson({
                extent: this.map.extent._normalize(!0)
            })), this.getCreditsEstimate(this.toolName, a).then(b.hitch(this, function(a) {
                this._usageForm.set("content", a);
                this._usageDialog.show()
            })))
        },
        _save: function() {},
        _buildUI: function() {
            this._loadConnections();
            this.signInPromise.then(b.hitch(this, h.initHelpLinks, this.domNode, this.showHelp, {
                analysisGpServer: this.analysisGpServer
            }));
            this.outputLayerName ? this._outputLayerInput.set("value", this.outputLayerName) : this._outputLayerInput.set("value", this.i18n.outputLayerName);
            f.set(this._chooseFolderRow, "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(b.hitch(this, function(a) {
                this.folderStore = a;
                this._webMapFolderSelect.set("store",
                    a);
                this._webMapFolderSelect.set("value", this.portalUser.username)
            }));
            f.set(this._chooseExtentDiv, "display", !0 === this.showChooseExtent ? "block" : "none");
            f.set(this._showCreditsLink, "display", !0 === this.showCredits ? "block" : "none");
            this.expressionGrid = new x({
                analysisLayer: this.analysisLayer,
                inputLayers: this.inputLayers,
                allowAllInputOperands: !0,
                primaryActionButttonClass: this.get("primaryActionButttonClass")
            }, this.expressionGridCtr)
        },
        _loadConnections: function() {
            this.on("start", b.hitch(this, "_onClose", !0));
            this._connect(this._closeBtn, "onclick", b.hitch(this, "_onClose", !1))
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
        _setReturnFeatureCollectionAttr: function(a) {
            this.returnFeatureCollection =
                a
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
            return 0 === a.length || 0 === l.trim(a).length ? (this._outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : b ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceName), !1) : 98 < a.length ? (this._outputLayerInput.set("invalidMessage",
                this.i18n.invalidServiceNameLength), !1) : !0
        },
        _setPrimaryActionButttonClassAttr: function(a) {
            this.primaryActionButttonClass = a
        },
        _getPrimaryActionButttonClassAttr: function() {
            return this.primaryActionButttonClass
        },
        _connect: function(a, b, c) {
            this._pbConnects.push(k.connect(a, b, c))
        }
    })
});