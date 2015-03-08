require({cache:{
'url:esri/dijit/analysis/templates/InterpolatePoints.html':"<div class=\"esriAnalysis\">\n  <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n    <div data-dojo-attach-point=\"_hotspotsToolContentTitle\" class=\"analysisTitle\">\n         <table class=\"esriFormTable\" > \n            <tr>\n              <td class=\"esriToolIconTd\"><div class=\"createInterpolatedSurfaceIcon\"></div></td>\n              <td class=\"esriAlignLeading\">${i18n.interpolatePoints}</td>\n              <td>\n                <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                    <div class=\"esriFloatLeading\">\n                      <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                    </div>\n                    <div class=\"esriFloatTrailing\">\n                      <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                    </div>              \n                </div>  \n              </td>\n            </tr>\n         </table>\n    </div>\n    <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n  </div>\n  <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n     <table class=\"esriFormTable\"> \n       <tbody>\n        <tr>\n          <td  colspan=\"3\" class=\"sectionHeader\" data-dojo-attach-point=\"_interpolateToolDescription\" ></td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n            <label>${i18n.selectAttributesLabel}</label>\n            <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"field\"></a>\n            <select class=\"esriLeadingMargin1 longInput\"  style=\"margin-top:1.0em;width:68%;\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_fieldSelect\" data-dojo-attach-event=\"onChange:_handleFieldChange\"></select>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\" class=\"clear\"></td>\n        </tr>         \n         <tr>\n          <td colspan=\"2\">\n            <label data-dojo-attach-point=\"_labelTwo\" class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n            <label data-dojo-attach-point=\"_measurelabel\" class=\"\">${i18n.optimizeFor}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"interpolateOption\"></a>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n            <div class=\"esriLeadingMargin2\" data-dojo-props=\"value:5,intermediateChanges:false,showButtons:true,minimum:1,maximum:9,discreteValues:3,pageIncrement:1\" style=\"width:90%;\" data-dojo-attach-point=\"_optimizeSlider\" data-dojo-attach-event=\"onChange:_handleOptimizeSliderChange\" type=\"range\" data-dojo-type=\"dijit/form/HorizontalSlider\">\n              <div data-dojo-type=\"dijit/form/HorizontalRule\" data-dojo-props=\"container: 'topDecoration',count: 3,style: 'height: 0.5em;'\"></div>\n               <ol data-dojo-type=\"dijit/form/HorizontalRuleLabels\"  data-dojo-attach-point=\"_liveTimeRuleLabels\" data-dojo-props=\"container: 'bottomDecoration', count:3\" style=\"margin-top:5px;height: 1em;\">\n                  <li>${i18n.speed}</li>\n                  <li></li>\n                  <li>${i18n.accuracy}</li>\n                </ol>  \n            </div>\n             <!-- create rules and labels below horizontal slider -->\n          </td>\n        </tr>          \n         \n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriLeadingMargin1 esriSelectLabel\">\n              <div data-dojo-type=\"dijit/form/CheckBox\" data-dojo-attach-point=\"_outoutPredictionsErrCheck\"></div>\n              ${i18n.outputPredictionErrors}\n            </label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"outputPredictionError\"></a>\n          </td>\n         </tr> \n        <tr data-dojo-attach-point=\"_optionsRow\">\n          <td colspan=\"3\" class=\"optionsTd\">\n            <div class=\"optionsClose\" data-dojo-attach-point=\"_optionsDiv\">\n              <div class=\"dijitTreeExpando\" data-dojo-attach-event=\"onclick:_handleOptionsBtnClick\"><label class=\"esriLeadingMargin2 noWrapLabel\">${i18n.Options}</label></div>\n              <table class=\"esriFormTable optionsTable\">\n                <tbody>\n                  <tr>\n                    <td colspan=\"2\">\n                      <label class=\"esriLeadingMargin2\">${i18n.interpolateWithin}</label>\n                    </td>\n                    <td class=\"shortTextInput\">\n                      <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"boundingPolygonLayer\"></a>\n                    </td>                    \n                  </tr>\n                  <tr>\n                    <td colspan=\"2\" style=\"width:40%;\">\n                      <select class=\"esriLeadingMargin2 longInput esriLongLabel\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_boundingAreaSelect\" data-dojo-attach-event=\"onChange:_handleBoundingSelectChange\"></select>                      \n                    </td>\n                    <td style=\"width:9%;\">\n                      <div data-dojo-type=\"dijit/form/ToggleButton\" data-dojo-attach-point=\"_bndgPolyDrawBtn\" class=\"esriFloatLeading esriActionButton\" data-dojo-props=\"showLabel:false,iconClass:'toolbarIcon polygonIcon'\" data-dojo-attach-event=\"onChange:_handleBoundingBtnChange\"></div>\n                    </td> \n                  </tr>      \n                  \n                  <tr>\n                    <td colspan=\"2\">\n                      <label class=\"esriLeadingMargin2\">${i18n.classifyLabel}</label>\n                    </td>\n                    <td class=\"shortTextInput\">\n                      <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"classificationType\"></a>\n                    </td>\n                  </tr>\n                  <tr>\n                    <td colspan=\"3\" style=\"padding-bottom:0.25;\">\n                      <select class=\"esriLeadingMargin2 longInput\"  data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_classifySelect\" data-dojo-attach-event=\"onChange:_handleClassifySelectChange\" style=\"width:68%\">\n                        <option value=\"GeometricInterval\">${i18n.geometricInterval}</option>\n                        <option value=\"EqualArea\"> ${i18n.quantile}</option>\n                        <option value=\"EqualInterval\">${i18n.equalInterval}</option>\n                        <option value=\"Manual\">${i18n.manual}</option>\n                      </select>\n                    </td>\n                  </tr>\n                  <tr data-dojo-attach-point=\"_classifyOtherOptionLabelRow\"> \n                    <td colspan=\"2\" style=\"padding-top:0.25;padding-bottom:0.25;\">\n                      <label class=\"esriLeadingMargin2\">${i18n.classesCountLabel}</label>\n                    </td>\n                    <td class=\"shortTextInput\" style=\"padding-top:0;padding-bottom:0;\">\n                      <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"numClasses\"></a>\n                    </td>\n                  </tr>\n                  <tr data-dojo-attach-point=\"_classifyOtherOptionInputRow\">\n                     <td colspan=\"3\" style=\"padding-top:0.25;\">\n                       <input data-dojo-type=\"dijit/form/NumberSpinner\"  class= \"esriMediumlabel esriLeadingMargin2\"  data-dojo-attach-point=\"_numClassesInput\" data-dojo-props=\"value:${numClasses}, style: 'width:25%',smallDelta:1,constraints: {places:0}\"/>\n                     </td>\n                  </tr>\n                  <tr data-dojo-attach-point=\"_manualOptionLabelRow\" style=\"display:none;\">\n                    <td colspan=\"2\" style=\"padding-top:0.25;padding-bottom:0.25;\">\n                      <label class=\"esriLeadingMargin2\">${i18n.classBreakValues}</label>\n                    </td>\n                    <td class=\"shortTextInput\" style=\"padding-top:0;padding-bottom:0;\">\n                      <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"classBreaks\"></a>\n                    </td>\n                  </tr>\n                  <tr  data-dojo-attach-point=\"_manualOptionInputRow\" style=\"display:none;\">\n                    <td colspan=\"3\" style=\"padding-top:0.25;\">\n                      <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" data-dojo-props=\"intermediateChanges:true\" data-dojo-attach-point=\"_classBreaksInput\" class=\"esriLeadingMargin2\">\n                      <div>\n                        <label class=\"esriLeadingMargin2 esriSmallLabel\">${i18n.classBreaksHelp}</label>\n                      </div>\n                    </td>\n                  </tr>                  \n                  <tr>\n                    <td colspan=\"2\" style=\"width:40%;\">\n                      <label class=\"esriLeadingMargin2\">${i18n.predictLocLabel}</label>\n                    </td>\n                    <td class=\"shortTextInput\">\n                      <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"predictAtPointLayer\"></a>\n                    </td>                    \n                  </tr>\n                  <tr>\n                    <td colspan=\"2\">\n                        <select class=\"esriLeadingMargin2 longInput esriLongLabel\"  data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_predictPointSelect\" data-dojo-attach-event=\"onChange:_handlePredictPointSelectChange\"></select>\n                    </td>   \n                    <td>\n                      <div data-dojo-type=\"dijit/form/ToggleButton\"  data-dojo-attach-point=\"_predictPointDrawBtn\"  class=\"esriFloatLeading esriActionButton\" data-dojo-props=\"showLabel:false,iconClass:'toolbarIcon esriPointIcon'\" data-dojo-attach-event=\"onChange:_handlePredictPointChange\"></div>\n                    </td> \n                  </tr>                               \n                </tbody>\n              </table>\n            </div>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\" class=\"clear\"></td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.threeLabel}</label>\n            <label class=\"longTextInput\">${i18n.outputLayerLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"outputName\"></a> \n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n            <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" data-dojo-props=\"trim:true,required:true\" class=\"longTextInput esriLeadingMargin1\" data-dojo-attach-point=\"_outputLayerInput\"></input>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n             <div data-dojo-attach-point=\"_chooseFolderRow\" class=\"esriLeadingMargin1\">\n               <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n               <input class=\"longInput\" dojoAttachPoint=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\" style=\"width:55%;height:auto\"></input>\n             </div>              \n          </td>\n        </tr>\n      </tbody>\n     </table>\n   </div>\n  <div style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n    <div class=\"esriExtentCreditsCtr\">\n      <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\n     <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n       <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n         ${i18n.useMapExtent}\n     </label>\n    </div>\n    <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" class=\"esriLeadingMargin4 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n        ${i18n.runAnalysis}\n    </button>\n  </div>\n  <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n    <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n  </div>    \n</div>\n"}});
//>>built
define("esri/dijit/analysis/InterpolatePoints", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/Color", "dojo/_base/json", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dojo/number", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/NumberSpinner", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "dijit/Dialog", "../../kernel", "../../lang", "./AnalysisBase", "../../symbols/SimpleFillSymbol", "../../symbols/SimpleLineSymbol", "../../toolbars/draw", "../PopupTemplate", "../../layers/FeatureLayer", "../../graphic", "./utils", "./CreditEstimator", "../../symbols/PictureMarkerSymbol", "dijit/form/HorizontalSlider", "dijit/form/HorizontalRule", "dijit/form/HorizontalRuleLabels", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/InterpolatePoints.html"], function(x, y, g, h, m, z, k, J, K, p, d, A, L, M, f, n, B, C, D, E, F, N, O, P, Q, R, S, T, U, V, W, X, Y, q, G, s, t, r, Z, u, v, l, $, H, aa, ba, ca, w, I) {
    return y([B, C, D, E, F, G], {
        declaredClass: "esri.dijit.analysis.InterpolatePoints",
        templateString: I,
        basePath: x.toUrl("."),
        widgetsInTemplate: !0,
        inputLayer: null,
        field: null,
        interpolateOption: 1,
        classificationType: "GeometricalInterval",
        numClasses: 10,
        maxClasses: 32,
        minClasses: 3,
        boundingPolygonLayer: null,
        predictAtPointLayer: null,
        outputPredictionError: !1,
        outputLayerName: null,
        classBreaks: null,
        showSelectFolder: !1,
        showChooseExtent: !0,
        showHelp: !0,
        returnFeatureCollection: !1,
        showCredits: !0,
        i18n: null,
        map: null,
        toolName: "InterpolatePoints",
        helpFileName: "InterpolatePoints",
        resultParameter: "resultLayer",
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
            g.mixin(this.i18n, w.findHotSpotsTool);
            g.mixin(this.i18n,
                w.interpolatePointsTool);
            this.set("drawLayerName", this.i18n.blayerName);
            this.set("drawPointLayerName", this.i18n.pointlayerName)
        },
        postCreate: function() {
            this.inherited(arguments);
            f.add(this._form.domNode, "esriSimpleForm");
            this._outputLayerInput.set("validator", g.hitch(this, this.validateServiceName));
            this._classBreaksInput.set("validator", g.hitch(this, this.validateClassBreaks));
            this._buildUI()
        },
        startup: function() {},
        _onClose: function(a) {
            a && (this._featureLayer && (this.map.removeLayer(this._featureLayer),
                h.forEach(this.boundingPolygonLayers, function(a, c) {
                    a === this._featureLayer && (this._boundingAreaSelect.removeOption({
                        value: c + 1,
                        label: this._featureLayer.name
                    }), this.boundingPolygonLayers.splice(c, 1))
                }, this)), this._pointfeatureLayer && (this.map.removeLayer(this._pointfeatureLayer), h.forEach(this.predictAtPointLayers, function(a, c) {
                a === this._pointfeatureLayer && (this._predictPointSelect.removeOption({
                    value: c + 1,
                    label: this._pointfeatureLayer.name
                }), this.predictAtPointLayers.splice(c, 1))
            }, this)));
            this._handleBoundingBtnChange(!1);
            this._handlePredictPointChange(!1);
            this.emit("close", {
                save: !a
            })
        },
        clear: function() {
            this._featureLayer && (this.map.removeLayer(this._featureLayer), h.forEach(this.boundingPolygonLayers, function(a, b) {
                a === this._featureLayer && (this._boundingAreaSelect.removeOption({
                    value: b + 1,
                    label: this._featureLayer.name
                }), this.boundingPolygonLayers.splice(b, 1))
            }, this));
            this._pointfeatureLayer && (this.map.removeLayer(this._pointfeatureLayer), h.forEach(this.predictAtPointLayers, function(a, b) {
                a === this._pointfeatureLayer && (this._predictPointSelect.removeOption({
                    value: b +
                        1,
                    label: this._pointfeatureLayer.name
                }), this.predictAtPointLayers.splice(b, 1))
            }, this));
            this._handleBoundingBtnChange(!1);
            this._handlePredictPointChange(!1)
        },
        _handleShowCreditsClick: function(a) {
            a.preventDefault();
            a = {};
            this._form.validate() && (a.inputLayer = k.toJson(l.constructAnalysisInputLyrObj(this.get("inputLayer"))), a.field = this.get("field"), a.interpolateOption = this.get("interpolateOption"), a.classificationType = this.get("classificationType"), "Manual" !== this.classificationType ? a.numClasses = this.get("numClasses") :
                a.classBreaks = this.get("classBreaks"), this.get("boundingPolygonLayer") && (a.boundingPolygonLayer = k.toJson(l.constructAnalysisInputLyrObj(this.boundingPolygonLayer))), this.get("predictAtPointLayer") && (a.predictAtPointLayer = k.toJson(l.constructAnalysisInputLyrObj(this.predictAtPointLayer))), a.outputPredictionError = this.get("outputPredictionError"), this.returnFeatureCollection || (a.OutputName = k.toJson({
                    serviceProperties: {
                        name: this.get("outputLayerName")
                    }
                })), this.showChooseExtent && this._useExtentCheck.get("checked") &&
                (a.context = k.toJson({
                    extent: this.map.extent._normalize(!0)
                })), this.getCreditsEstimate(this.toolName, a).then(g.hitch(this, function(a) {
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
                a.inputLayer = k.toJson(l.constructAnalysisInputLyrObj(this.get("inputLayer")));
                a.field = this.get("field");
                a.interpolateOption = this.get("interpolateOption");
                a.classificationType = this.get("classificationType");
                "Manual" !== this.classificationType ? a.numClasses = this.get("numClasses") : a.classBreaks = this.get("classBreaks");
                this.get("boundingPolygonLayer") && (a.boundingPolygonLayer = k.toJson(l.constructAnalysisInputLyrObj(this.boundingPolygonLayer)));
                this.get("predictAtPointLayer") && (a.predictAtPointLayer = k.toJson(l.constructAnalysisInputLyrObj(this.predictAtPointLayer)));
                a.outputPredictionError = this.get("outputPredictionError");
                this.predictAtPointLayer && this.get("outputPredictionError") ? this.resultParameter = ["predictedPointLayer",
                    "resultLayer", "predictionError"
                ] : this.predictAtPointLayer && !this.get("outputPredictionError") ? this.resultParameter = ["predictedPointLayer", "resultLayer"] : !this.predictAtPointLayer && this.get("outputPredictionError") && (this.resultParameter = ["resultLayer", "predictionError"]);
                this.returnFeatureCollection || (a.OutputName = k.toJson({
                    serviceProperties: {
                        name: this.get("outputLayerName")
                    }
                }));
                this.showChooseExtent && !this.get("DisableExtent") && this._useExtentCheck.get("checked") && (a.context = k.toJson({
                    extent: this.map.extent._normalize(!0)
                }));
                this.returnFeatureCollection && (c = {
                    outSR: this.map.spatialReference
                }, this.showChooseExtent && (c.extent = this.map.extent._normalize(!0)), a.context = k.toJson(c));
                a.returnFeatureCollection = this.returnFeatureCollection;
                b.jobParams = a;
                b.itemParams = {
                    description: this.i18n.itemDescription,
                    tags: p.substitute(this.i18n.itemTags, {
                        layername: this.inputLayer.name,
                        fieldname: !a.field ? "" : a.field
                    }),
                    snippet: this.i18n.itemSnippet
                };
                this.showSelectFolder && (b.itemParams.folder = this._webMapFolderSelect.item ? this.folderStore.getValue(this._webMapFolderSelect.item,
                    "id") : "");
                this.execute(b)
            }
        },
        _save: function() {},
        _buildUI: function() {
            var a;
            this._loadConnections();
            this.signInPromise.then(g.hitch(this, l.initHelpLinks, this.domNode, this.showHelp, {
                analysisGpServer: this.analysisGpServer
            }));
            this.inputLayer && (A.set(this._interpolateToolDescription, "innerHTML", p.substitute(this.i18n.toolDefine, {
                layername: this.inputLayer.name
            })), this._outputLayerInput.set("value", p.substitute(this.i18n.outputLayerName, {
                layername: this.inputLayer.name
            })), this.set("fields", this.inputLayer));
            this.classificationType && this._classifySelect.set("value", this.classificationType);
            this.outputLayerName && this._outputLayerInput.set("value", this.outputLayerName);
            this.outputPredictionError && this._outoutPredictionsErrCheck.set("checked", this.outputPredictionError);
            if (this.boundingPolygonLayers) {
                this._boundingAreaSelect.addOption({
                    value: "-1",
                    label: this.i18n.defaultBoundingOption,
                    selected: !0
                });
                var b = !1;
                h.forEach(this.boundingPolygonLayers, function(a, e) {
                    "esriGeometryPolygon" === a.geometryType && (b = this.get("boundingPolygonLayer") &&
                        this.get("boundingPolygonLayer").name === a.name, this._boundingAreaSelect.addOption({
                            value: e + 1,
                            label: a.name,
                            selected: b
                        }))
                }, this)
            }
            this.predictAtPointLayers && (this._predictPointSelect.addOption({
                value: "-1",
                label: this.i18n.choosePointLayer,
                selected: !0
            }), h.forEach(this.predictAtPointLayers, function(a, b) {
                if ("esriGeometryPoint" === a.geometryType && a !== this.inputLayer) {
                    var g = this.get("predictAtPointLayer") && this.get("predictAtPointLayer").name === a.name;
                    this._predictPointSelect.addOption({
                        value: b + 1,
                        label: a.name,
                        selected: g
                    })
                }
            }, this));
            this.classBreaks && this._classBreaksInput.set("value", this.classBreaks.join().replace(/,/g, " "));
            this.maxClasses && (a = this._numClassesInput.get("constraints"), a.max = this.maxClasses, this._numClassesInput.set("constraints", a));
            this.minClasses && (a = this._numClassesInput.get("constraints"), a.min = this.minClasses, this._numClassesInput.set("constraints", a));
            d.set(this._chooseFolderRow, "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(g.hitch(this,
                function(a) {
                    this.folderStore = a;
                    this._webMapFolderSelect.set("store", a);
                    this._webMapFolderSelect.set("value", this.portalUser.username)
                }));
            d.set(this._chooseExtentDiv, "display", !0 === this.showChooseExtent ? "block" : "none");
            d.set(this._showCreditsLink, "display", !0 === this.showCredits ? "block" : "none")
        },
        _handleMethodChange: function(a) {
            "NN" === a ? (f.add(this._optionsDiv, "disabled"), f.contains(this._optionsDiv, "optionsOpen") && (f.remove(this._optionsDiv, "optionsOpen"), f.add(this._optionsDiv, "optionsClose"))) : (f.contains(this._optionsDiv,
                "disabled") && f.remove(this._optionsDiv, "disabled"), "KG" === a ? (d.set(this._barrierLabelRow, "display", "none"), d.set(this._barrierSelectRow, "display", "none"), d.set(this._speedLabelRow, "display", ""), d.set(this._speedSliderRow, "display", "")) : "LP" === a && (d.set(this._barrierLabelRow, "display", ""), d.set(this._barrierSelectRow, "display", ""), d.set(this._speedLabelRow, "display", "none"), d.set(this._speedSliderRow, "display", "none")))
        },
        _handleOptimizeSliderChange: function(a) {
            console.log(a, this._optimizeSlider.get("value"));
            this.set("interpolateOption", this._optimizeSlider.get("value"))
        },
        _handleFieldChange: function(a) {},
        _handleOptionsBtnClick: function() {
            f.contains(this._optionsDiv, "disabled") || (f.contains(this._optionsDiv, "optionsClose") ? (f.remove(this._optionsDiv, "optionsClose"), f.add(this._optionsDiv, "optionsOpen")) : f.contains(this._optionsDiv, "optionsOpen") && (f.remove(this._optionsDiv, "optionsOpen"), f.add(this._optionsDiv, "optionsClose")))
        },
        _handleBoundingSelectChange: function(a) {},
        _handleClick: function(a) {},
        _handlePredictPointSelectChange: function(a) {},
        _handleBoundingBtnChange: function(a) {
            a ? (this.emit("drawtool-activate", {}), this._featureLayer || this._createBoundingPolyFeatColl(), this._predictPointDrawBtn.set("checked", !1), this._toolbar.activate(r.POLYGON)) : (this._toolbar.deactivate(), this._predictPointDrawBtn.get("checked") || this.emit("drawtool-deactivate", {}))
        },
        _handlePredictPointChange: function(a) {
            a ? (this.emit("drawtool-activate", {}), this._pointfeatureLayer || this._createPointFeatColl(), this._pointtoolbar.activate(r.POINT), this._bndgPolyDrawBtn.set("checked", !1)) : (this._pointtoolbar.deactivate(), this._bndgPolyDrawBtn.get("checked") || this.emit("drawtool-deactivate", {}))
        },
        _handleClassifySelectChange: function(a) {
            d.set(this._classifyOtherOptionLabelRow, "display", "Manual" === a ? "none" : "block");
            d.set(this._classifyOtherOptionInputRow, "display", "Manual" === a ? "none" : "block");
            d.set(this._manualOptionInputRow, "display", "Manual" === a ? "block" : "none");
            d.set(this._manualOptionLabelRow, "display", "Manual" === a ? "block" : "none")
        },
        _loadConnections: function() {
            this.on("start",
                g.hitch(this, "_onClose", !1));
            this._connect(this._closeBtn, "onclick", g.hitch(this, "_onClose", !0))
        },
        _createBoundingPolyFeatColl: function() {
            var a = l.createPolygonFeatureCollection(this.drawLayerName);
            this._featureLayer = new u(a, {
                id: this.drawLayerName
            });
            this.map.addLayer(this._featureLayer);
            m.connect(this._featureLayer, "onClick", g.hitch(this, function(a) {
                this.map.infoWindow.setFeatures([a.graphic])
            }))
        },
        _addFeatures: function(a) {
            var b = [],
                c = {},
                e = new s(s.STYLE_NULL, new t(t.STYLE_SOLID, new z([0, 0, 0]), 4));
            a = new v(a,
                e);
            this.map.graphics.add(a);
            c.description = "blayer desc";
            c.title = "blayer";
            a.setAttributes(c);
            b.push(a);
            this._featureLayer.applyEdits(b, null, null);
            if (0 === this.boundingPolygonLayers.length || this.boundingPolygonLayers[this.boundingPolygonLayers.length - 1] !== this._featureLayer) b = this.boundingPolygonLayers.push(this._featureLayer), c = this._boundingAreaSelect.getOptions(), this._boundingAreaSelect.removeOption(c), c = h.map(c, function(a) {
                a.selected = !1;
                return a
            }), this._boundingAreaSelect.addOption({
                value: b,
                label: this._featureLayer.name,
                selected: !0
            }), this._boundingAreaSelect.addOption(c)
        },
        _createPointFeatColl: function() {
            var a = l.createPointFeatureCollection(this.drawPointLayerName);
            this._pointfeatureLayer = new u(a, {
                id: this.drawPointLayerName
            });
            this.map.addLayer(this._pointfeatureLayer);
            m.connect(this._pointfeatureLayer, "onClick", g.hitch(this, function(a) {
                this.map.infoWindow.setFeatures([a.graphic])
            }))
        },
        _addPointFeatures: function(a) {
            var b = [],
                c = {},
                e = (new H({
                    height: 24,
                    width: 24,
                    contentType: "image/png",
                    type: "esriPMS",
                    url: "http://static.arcgis.com/images/Symbols/Basic/GreenStickpin.png"
                })).setOffset(0,
                    12);
            a = new v(a, e);
            this.map.graphics.add(a);
            c.description = "blayer desc";
            c.title = "blayer";
            a.setAttributes(c);
            b.push(a);
            this._pointfeatureLayer.applyEdits(b, null, null);
            if (0 === this.predictAtPointLayers.length || this.predictAtPointLayers[this.predictAtPointLayers.length - 1] !== this._pointfeatureLayer) b = this.predictAtPointLayers.push(this._pointfeatureLayer), c = this._predictPointSelect.getOptions(), this._predictPointSelect.removeOption(c), c = h.map(c, function(a) {
                a.selected = !1;
                return a
            }), this._predictPointSelect.addOption({
                value: b,
                label: this._pointfeatureLayer.name,
                selected: !0
            }), this._predictPointSelect.addOption(c)
        },
        validateServiceName: function(a) {
            var b = /(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(a);
            return 0 === a.length || 0 === p.trim(a).length ? (this._outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : b ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceName), !1) : 98 < a.length ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceNameLength), !1) : !0
        },
        validateClassBreaks: function() {
            var a, b = [],
                c = [],
                e, d;
            a = g.trim(this._classBreaksInput.get("value")).split(" ");
            if ("Manual" !== this.get("classificationType")) return !0;
            if (!a && "Manual" === this.get("classificationType") || 2 > a.length || a.length > this.maxClasses) return !1;
            h.some(a, function(f, k) {
                f = n.parse(f);
                if (isNaN(f)) return b.push(0), !1;
                if (c[a[k]]) return c[a[k]] = !1, b.push(0), !1;
                c[a[k]] = !0;
                e = n.format(f, {
                    locale: "root"
                });
                q.isDefined(e) ? q.isDefined(e) || (e = n.format(f, {
                    locale: "en-us"
                })) : e = n.format(f, {
                    locale: "en"
                });
                q.isDefined(e) && (d = g.trim(e).match(/\D/g));
                d && 0 < d.length && d && h.forEach(d, function(a, c) {
                    "." === a || "," === a || "-" === a && 0 === c ? b.push(1) : b.push(0)
                })
            });
            return -1 !== h.indexOf(b, 0) ? !1 : !0
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
        _setFieldsAttr: function(a) {
            var b, c;
            h.forEach(a.fields, function(e, d) {
                e.name !== a.objectIdField && -1 !== h.indexOf(["esriFieldTypeSmallInteger",
                    "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeDouble"
                ], e.type) && (b = {
                    value: e.name,
                    label: q.isDefined(e.alias) && "" !== e.alias ? e.alias : e.name
                }, this.field && b.value === this.field && (b.selected = "selected", c = e.name), this._fieldSelect.addOption(b))
            }, this);
            c && this._fieldSelect.set("value", c)
        },
        _setFieldAttr: function(a) {
            this.field = a
        },
        _getFieldAttr: function() {
            this._fieldSelect && (this.field = this._fieldSelect.get("value"));
            return this.field
        },
        _setInterpolateOptionAttr: function(a) {
            this.interpolateOption =
                a
        },
        _getInterpolateOptionAttr: function() {
            this._optimizeSlider && (this.interpolateOption = Math.floor(this._optimizeSlider.get("value")));
            return this.interpolateOption
        },
        _setClassificationTypeAttr: function(a) {
            this.classificationType = a
        },
        _getClassificationTypeAttr: function() {
            this._classifySelect && (this.classificationType = this._classifySelect.get("value"));
            return this.classificationType
        },
        _getNumClassesAttr: function() {
            this._numClassesInput && (this.numClasses = this._numClassesInput.get("value"));
            return this.numClasses
        },
        _setNumClassesAttr: function(a) {
            this.numClasses = a
        },
        _setMaxClassesAttr: function(a) {
            this.maxClasses = a
        },
        _getMaxClassesAttr: function() {
            return this.maxClasses
        },
        _setMinClassesAttr: function(a) {
            this.minClasses = a
        },
        _getMinClassesAttr: function() {
            return this.minClasses
        },
        _getClassBreaksAttr: function() {
            if (this._classBreaksInput) {
                var a = g.trim(this._classBreaksInput.get("value")).split(" "),
                    b = [];
                h.forEach(a, function(a) {
                    b.push(n.parse(a))
                });
                this.classBreaks = b
            }
            return this.classBreaks
        },
        _setClassBreaksAttr: function(a) {
            a &&
                (this.classBreaks = a)
        },
        _getBoundingPolygonLayerAttr: function() {
            this._boundingAreaSelect && (this.boundingPolygonLayer = null, "-1" !== this._boundingAreaSelect.get("value") && (this.boundingPolygonLayer = this.boundingPolygonLayers[this._boundingAreaSelect.get("value") - 1]));
            return this.boundingPolygonLayer
        },
        _setBoundingPolygonLayerAttr: function(a) {
            this.boundingPolygonLayer = a
        },
        _setBoundingPolygonLayersAttr: function(a) {
            this.boundingPolygonLayers = a
        },
        _getPredictAtPointLayerAttr: function() {
            this._predictPointSelect &&
                (this.predictAtPointLayer = null, "-1" !== this._predictPointSelect.get("value") && (this.predictAtPointLayer = this.predictAtPointLayers[this._predictPointSelect.get("value") - 1]));
            return this.predictAtPointLayer
        },
        _setPredictAtPointLayerAttr: function(a) {
            this.predictAtPointLayer = a
        },
        _setPredictAtPointLayersAttr: function(a) {
            this.predictAtPointLayers = a
        },
        _getOutputPredictionErrorAttr: function() {
            this._outoutPredictionsErrCheck && (this.outputPredictionError = this._outoutPredictionsErrCheck.get("checked"));
            return this.outputPredictionError
        },
        _setOutputPredictionErrorAttr: function(a) {
            this.outputPredictionError = a
        },
        _getOutputLayerNameAttr: function() {
            this._outputLayerInput && (this.outputLayerName = this._outputLayerInput.get("value"));
            return this.outputLayerName
        },
        _setOutputLayerNameAttr: function(a) {
            this.outputLayerName = a
        },
        _setMapAttr: function(a) {
            this.map = a;
            this._toolbar = new r(this.map);
            m.connect(this._toolbar, "onDrawEnd", g.hitch(this, this._addFeatures));
            this._pointtoolbar = new r(this.map);
            m.connect(this._pointtoolbar, "onDrawEnd", g.hitch(this,
                this._addPointFeatures))
        },
        _getMapAttr: function() {
            return this.map
        },
        _setDrawLayerNameAttr: function(a) {
            this.drawLayerName = a
        },
        _getDrawLayerNameAttr: function() {
            return this._featureLayer.name
        },
        _setDrawPointLayerNameAttr: function(a) {
            this.drawPointLayerName = a
        },
        _getDrawPointLayerNameAttr: function() {
            return this._pointfeatureLayer.name
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
        _setShowHelpAttr: function(a) {
            this.showHelp = a
        },
        _getShowHelpAttr: function() {
            return this.showHelp
        },
        _getDrawLayerAttr: function() {
            var a = [];
            this._featureLayer && a.push(this._featureLayer);
            this._pointfeatureLayer && a.push(this._pointfeatureLayer);
            return a
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
        _connect: function(a, b, c) {
            this._pbConnects.push(m.connect(a, b, c))
        }
    })
});