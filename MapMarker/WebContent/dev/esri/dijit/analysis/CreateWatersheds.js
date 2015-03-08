require({cache:{
'url:esri/dijit/analysis/templates/CreateWatersheds.html':"<div class=\"esriAnalysis\">\n  <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n    <div data-dojo-attach-point=\"_hotspotsToolContentTitle\" class=\"analysisTitle\">\n         <table class=\"esriFormTable\" > \n            <tr>\n              <td class=\"esriToolIconTd\"><div class=\"createWatershedIcon\"></div></td>\n              <td class=\"esriAlignLeading\">${i18n.createWatershed}</td>\n              <td>\n                <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                    <div class=\"esriFloatLeading\">\n                      <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                    </div>\n                    <div class=\"esriFloatTrailing\">\n                      <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                    </div>              \n                </div>  \n              </td>\n            </tr>\n         </table>\n    </div>\n    <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n  </div>\n  <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n     <table class=\"esriFormTable\"> \n       <tbody>\n        <tr>\n          <td  colspan=\"3\" class=\"sectionHeader\" data-dojo-attach-point=\"_interpolateToolDescription\" ></td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label data-dojo-attach-point=\"_labelTwo\" class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n            <label data-dojo-attach-point=\"_measurelabel\" class=\"\">${i18n.searchDistanceLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"SearchDistance\"></a>\n          </td>\n        </tr>\n        <tr>\n          <td>\n            <input type=\"text\" class=\"esriLeadingMargin1\" data-dojo-type=\"dijit/form/NumberTextBox\" data-dojo-props=\"intermediateChanges:true,required:false,invalidMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_searchDistanceInput\" style=\"width:90%;\">\n          </td>\n          <td colspan=\"2\" style=\"width:60%;\">\n            <select class=\"mediumInput esriMediumlabel esriAnalysisSelect esriLeadingMargin1\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_distanceUnitsSelect\" style=\"width:65%;table-layout:fixed;\">\n            </select>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\" class=\"clear\"></td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n            <label class=\"longTextInput\">${i18n.outputLayerLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"OutputLayer\"></a> \n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n            <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" data-dojo-props=\"trim:true,required:true\" class=\"longTextInput esriLeadingMargin1\" data-dojo-attach-point=\"_outputLayerInput\"></input>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n             <div data-dojo-attach-point=\"_chooseFolderRow\" class=\"esriLeadingMargin1\">\n               <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n               <input class=\"longInput\" dojoAttachPoint=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\" style=\"width:55%;height:auto\"></input>\n             </div>              \n          </td>\n        </tr>\n      </tbody>\n     </table>\n   </div>\n  <div style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n    <div class=\"esriExtentCreditsCtr\">\n      <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\n     <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n       <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n         ${i18n.useMapExtent}\n     </label>\n    </div>\n    <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" class=\"esriLeadingMargin4 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n        ${i18n.runAnalysis}\n    </button>\n  </div>\n  <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n    <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n  </div>    \n</div>\n"}});
//>>built
define("esri/dijit/analysis/CreateWatersheds", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/Color", "dojo/_base/json", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dojo/number", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/NumberSpinner", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "dijit/Dialog", "../../kernel", "../../lang", "./AnalysisBase", "../../symbols/SimpleFillSymbol", "../../symbols/SimpleLineSymbol", "../../toolbars/draw", "../PopupTemplate", "../../layers/FeatureLayer", "../../graphic", "./utils", "./CreditEstimator", "../../symbols/PictureMarkerSymbol", "dijit/form/HorizontalSlider", "dijit/form/HorizontalRule", "dijit/form/HorizontalRuleLabels", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/CreateWatersheds.html"], function(l, m, b, n, e, z, c, A, B, f, g, p, C, D, q, E, r, s, t, u, v, F, G, H, I, J, K, L, M, N, O, P, Q, R, w, S, T, k, U, V, W, h, X, Y, Z, $, aa, x, y) {
    return m([r, s, t, u, v, w], {
        declaredClass: "esri.dijit.analysis.CreateWatersheds",
        templateString: y,
        basePath: l.toUrl("."),
        widgetsInTemplate: !0,
        inputLayer: null,
        searchDistance: null,
        searchUnits: "Meters",
        outputLayerName: null,
        showSelectFolder: !1,
        showChooseExtent: !0,
        showHelp: !0,
        returnFeatureCollection: !1,
        showCredits: !0,
        i18n: null,
        map: null,
        toolName: "CreateWatersheds",
        helpFileName: "CreateWatersheds",
        resultParameter: ["watershedLayer",
            "snapPourPtsLayer"
        ],
        constructor: function(a, d) {
            this._pbConnects = [];
            a.containerNode && (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments);
            n.forEach(this._pbConnects, e.disconnect);
            delete this._pbConnects
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            b.mixin(this.i18n, x.createWatershedTool)
        },
        postCreate: function() {
            this.inherited(arguments);
            q.add(this._form.domNode, "esriSimpleForm");
            this._outputLayerInput.set("validator", b.hitch(this, this.validateServiceName));
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
            this._form.validate() && (a.inputLayer = c.toJson(h.constructAnalysisInputLyrObj(this.get("inputLayer"))), a.searchDistance = this.get("searchDistance"), a.searchUnits = this.get("searchUnits"), this.returnFeatureCollection || (a.OutputName = c.toJson({
                    serviceProperties: {
                        name: this.get("outputLayerName")
                    }
                })), this.showChooseExtent && this._useExtentCheck.get("checked") &&
                (a.context = c.toJson({
                    extent: this.map.extent._normalize(!0)
                })), this.getCreditsEstimate(this.toolName, a).then(b.hitch(this, function(a) {
                    this._usageForm.set("content", a);
                    this._usageDialog.show()
                })))
        },
        _handleSaveBtnClick: function(a) {
            if (this._form.validate()) {
                this._saveBtn.set("disabled", !0);
                a = {};
                var d = {},
                    b;
                a.inputLayer = c.toJson(h.constructAnalysisInputLyrObj(this.get("inputLayer")));
                a.searchDistance = this.get("searchDistance");
                a.searchUnits = this.get("searchUnits");
                this.returnFeatureCollection || (a.OutputName =
                    c.toJson({
                        serviceProperties: {
                            name: this.get("outputLayerName")
                        }
                    }));
                this.showChooseExtent && !this.get("disableExtent") && this._useExtentCheck.get("checked") && (a.context = c.toJson({
                    extent: this.map.extent._normalize(!0)
                }));
                this.returnFeatureCollection && (b = {
                    outSR: this.map.spatialReference
                }, this.showChooseExtent && (b.extent = this.map.extent._normalize(!0)), a.context = c.toJson(b));
                a.returnFeatureCollection = this.returnFeatureCollection;
                d.jobParams = a;
                d.itemParams = {
                    description: this.i18n.itemDescription,
                    tags: f.substitute(this.i18n.itemTags, {
                        layername: this.inputLayer.name,
                        fieldname: !a.field ? "" : a.field
                    }),
                    snippet: this.i18n.itemSnippet
                };
                this.showSelectFolder && (d.itemParams.folder = this._webMapFolderSelect.item ? this.folderStore.getValue(this._webMapFolderSelect.item, "id") : "");
                console.log(d);
                this.execute(d)
            }
        },
        _save: function() {},
        _buildUI: function() {
            this._loadConnections();
            this.signInPromise.then(b.hitch(this, h.initHelpLinks, this.domNode, this.showHelp, {
                analysisGpServer: this.analysisGpServer
            }));
            this.inputLayer && (p.set(this._interpolateToolDescription,
                "innerHTML", f.substitute(this.i18n.toolDefine, {
                    layername: this.inputLayer.name
                })), this._outputLayerInput.set("value", f.substitute(this.i18n.outputLayerName, {
                layername: this.inputLayer.name
            })));
            this.outputLayerName && this._outputLayerInput.set("value", this.outputLayerName);
            g.set(this._chooseFolderRow, "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(b.hitch(this, function(a) {
                this.folderStore = a;
                this._webMapFolderSelect.set("store", a);
                this._webMapFolderSelect.set("value",
                    this.portalUser.username)
            }));
            g.set(this._chooseExtentDiv, "display", !0 === this.showChooseExtent ? "block" : "none");
            g.set(this._showCreditsLink, "display", !0 === this.showCredits ? "block" : "none");
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
            this.searchUnits && this._distanceUnitsSelect.set("value", this.searchUnits);
            this.searchDistance && this._searchDistanceInput.set("value", this.searchDistance)
        },
        _loadConnections: function() {
            this.on("start", b.hitch(this, "_onClose", !1));
            this._connect(this._closeBtn, "onclick", b.hitch(this, "_onClose", !0))
        },
        validateServiceName: function(a) {
            var b = /(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(a);
            return 0 === a.length || 0 === f.trim(a).length ? (this._outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : b ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceName), !1) : 98 < a.length ?
                (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceNameLength), !1) : !0
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
            this.outputLayerName =
                a
        },
        _setMapAttr: function(a) {
            this.map = a;
            this._toolbar = new k(this.map);
            e.connect(this._toolbar, "onDrawEnd", b.hitch(this, this._addFeatures));
            this._pointtoolbar = new k(this.map);
            e.connect(this._pointtoolbar, "onDrawEnd", b.hitch(this, this._addPointFeatures))
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
        _setSearchUnitsAttr: function(a) {
            this.searchUnits = a
        },
        _getSearchUnitsAttr: function() {
            this._distanceUnitsSelect && this._distanceUnitsSelect.get("value") && (this.searchUnits = this._distanceUnitsSelect.get("value"));
            return this.searchUnits
        },
        _setSearchDistanceAttr: function(a) {
            this.searchDistance = a
        },
        _getSearchDistanceAttr: function() {
            this._searchDistanceInput && this._searchDistanceInput.get("value") &&
                (this.searchDistance = this._searchDistanceInput.get("value"));
            return this.searchDistance
        },
        _connect: function(a, b, c) {
            this._pbConnects.push(e.connect(a, b, c))
        }
    })
});