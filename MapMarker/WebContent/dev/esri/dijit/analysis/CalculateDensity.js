require({cache:{
'url:esri/dijit/analysis/templates/CalculateDensity.html':"<div class=\"esriAnalysis\">\n  <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n    <div data-dojo-attach-point=\"_hotspotsToolContentTitle\" class=\"analysisTitle\">\n         <table class=\"esriFormTable\" > \n            <tr>\n              <td class=\"esriToolIconTd\"><div class=\"createDensitySurfaceIcon\"></div></td>\n              <td class=\"esriAlignLeading\">${i18n.calculateDensity}</td>\n              <td>\n                <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                    <div class=\"esriFloatLeading\">\n                      <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                    </div>\n                    <div class=\"esriFloatTrailing\">\n                      <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                    </div>              \n                </div>  \n              </td>\n            </tr>\n         </table>\n    </div>\n    <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n  </div>\n  <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n     <table class=\"esriFormTable\"> \n       <tbody>\n        <tr>\n          <td  colspan=\"3\" class=\"sectionHeader\" data-dojo-attach-point=\"_interpolateToolDescription\" ></td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n            <label>${i18n.selectAttributesLabel}</label>\n            <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"field\"></a>\n            <select class=\"esriLeadingMargin1 longInput\"  style=\"margin-top:1.0em;width:68%;\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_fieldSelect\" data-dojo-attach-event=\"onChange:_handleFieldChange\"></select>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\" class=\"clear\"></td>\n        </tr>         \n        <tr data-dojo-attach-point=\"_optionsRow\">\n          <td colspan=\"3\" class=\"optionsTd\">\n            <div class=\"optionsClose\" data-dojo-attach-point=\"_optionsDiv\">\n              <div class=\"dijitTreeExpando\" data-dojo-attach-event=\"onclick:_handleOptionsBtnClick\"><label class=\"esriLeadingMargin2 noWrapLabel\">${i18n.Options}</label></div>\n              <table class=\"esriFormTable optionsTable\">\n                <tbody>\n                 <tr>\n                    <td colspan=\"2\">\n                      <label class=\"esriLeadingMargin2\">${i18n.searchDistance}</label>\n                    </td>\n                    <td class=\"shortTextInput\">\n                      <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"radius\"></a>\n                    </td>                    \n                  </tr>                  \n                  <tr>\n                    <td colspan=\"3\" style=\"padding:0;\">\n                      <table class=\"esriFormTable esriLeadingMargin2\" style=\"width:90%;\">\n                        <tbody>\n                          <tr>\n                          <td  style=\"width:50%;padding-right:1em;\">\n                      <input type=\"text\" data-dojo-type=\"dijit/form/NumberTextBox\" data-dojo-attach-event=\"onChange:_handleDistValueChange\" data-dojo-props=\"intermediateChanges:true,placeHolder:'${i18n.searchDistance}'\" data-dojo-attach-point=\"_searchDistanceInput\" style=\"width:100%;\">\n                          </td>\n                          <td colspan=\"2\">\n                      <select class=\"longInput esriAnalysisSelect\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-event=\"onChange:_handleDistUnitsChange\" data-dojo-attach-point=\"_radiusUnitsSelect\">\n                      </select>\n                          </td>\n                          </tr>\n                        </tbody>\n                      </table>\n                    </td>\n                  </tr>\n                  \n                  <tr>\n                    <td colspan=\"2\">\n                      <label class=\"esriLeadingMargin2\">${i18n.interpolateWithin}</label>\n                    </td>\n                    <td class=\"shortTextInput\">\n                      <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"boundingPolygonLayer\"></a>\n                    </td>                    \n                  </tr>\n                  <tr>\n                    <td colspan=\"2\" style=\"width:40%;\">\n                      <select class=\"esriLeadingMargin2 longInput esriLongLabel\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_boundingAreaSelect\" data-dojo-attach-event=\"onChange:_handleBoundingSelectChange\"></select>                      \n                    </td>\n                    <td style=\"width:9%;\">\n                      <div data-dojo-type=\"dijit/form/ToggleButton\" data-dojo-attach-point=\"_bndgPolyDrawBtn\" class=\"esriFloatLeading esriActionButton\" data-dojo-props=\"showLabel:false,iconClass:'toolbarIcon polygonIcon'\" data-dojo-attach-event=\"onChange:_handleBoundingBtnChange\"></div>\n                    </td> \n                  </tr>      \n                  \n                  <tr>\n                    <td colspan=\"2\">\n                      <label class=\"esriLeadingMargin2\">${i18n.classifyLabel}</label>\n                    </td>\n                    <td class=\"shortTextInput\">\n                      <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"classificationType\"></a>\n                    </td>\n                  </tr>\n                  <tr>\n                    <td colspan=\"3\" style=\"padding-bottom:0.25;\">\n                      <select class=\"esriLeadingMargin2 longInput\"  data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_classifySelect\" data-dojo-attach-event=\"onChange:_handleClassifySelectChange\" style=\"width:68%\">\n                        <option value=\"EqualInterval\">${i18n.equalInterval}</option>\n                        <option value=\"EqualArea\"> ${i18n.quantile}</option>\n                        <option value=\"GeometricInterval\">${i18n.geometricInterval}</option>\n                        <option value=\"NaturalBreaks\">${i18n.naturalBreaks}</option>\n                        <option value=\"StandardDeviation\">${i18n.standardDeviation}</option>\n                      </select>\n                    </td>\n                  </tr>\n                  <tr data-dojo-attach-point=\"_classifyOtherOptionLabelRow\"> \n                    <td colspan=\"2\" style=\"padding-top:0.25;padding-bottom:0.25;\">\n                      <label class=\"esriLeadingMargin2\">${i18n.classesCountLabel}</label>\n                    </td>\n                    <td class=\"shortTextInput\" style=\"padding-top:0;padding-bottom:0;\">\n                      <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"numClasses\"></a>\n                    </td>\n                  </tr>\n                  <tr data-dojo-attach-point=\"_classifyOtherOptionInputRow\">\n                     <td colspan=\"3\" style=\"padding-top:0.25;\">\n                       <input data-dojo-type=\"dijit/form/NumberSpinner\"  class= \"esriMediumlabel esriLeadingMargin2\"  data-dojo-attach-point=\"_numClassesInput\" data-dojo-props=\"value:${numClasses}, style: 'width:25%',smallDelta:1,constraints: { min:3, max:32, places:0 }\"/>\n                     </td>\n                  </tr>\n                  <tr data-dojo-attach-point=\"_manualOptionLabelRow\" style=\"display:none;\">\n                    <td colspan=\"3\" style=\"padding-top:0.25;padding-bottom:0.25;\">\n                      <label class=\"esriLeadingMargin2\">${i18n.classBreakValues}</label>\n                    </td>\n                    <!--<td class=\"shortTextInput\" style=\"padding-top:0;padding-bottom:0;\">\n                      <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"MeasurementMethod\"></a>\n                    </td>-->\n                  </tr>\n                  <tr  data-dojo-attach-point=\"_manualOptionInputRow\" style=\"display:none;\">\n                    <td colspan=\"3\" style=\"padding-top:0.25;\">\n                      <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" data-dojo-props=\"intermediateChanges:true\" data-dojo-attach-point=\"_classBreaksInput\" class=\"esriLeadingMargin2\">\n                      <div>\n                        <label class=\"esriLeadingMargin2 esriSmallLabel\">${i18n.classBreaksHelp}</label>\n                      </div>\n                    </td>\n                  </tr>                  \n                  <tr>\n                    <td colspan=\"2\" style=\"width:40%;\">\n                      <label class=\"esriLeadingMargin2\">${i18n.outputAerealUnits}</label>\n                    </td>\n                    <td class=\"shortTextInput\">\n                      <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"areaUnits\"></a>\n                    </td>                    \n                  </tr>\n                  <tr>\n                    <td colspan=\"3\">\n                        <select class=\"esriLeadingMargin2 longInput esriLongLabel\"  data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_areaUnitsSelect\" data-dojo-attach-event=\"onChange:_handleArealUnitsSelectChange\" style=\"width:68%\"></select>\n                    </td>   \n                  </tr>                               \n                </tbody>\n              </table>\n            </div>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\" class=\"clear\"></td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n            <label class=\"longTextInput\">${i18n.outputLayerLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"outputName\"></a> \n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n            <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" data-dojo-props=\"trim:true,required:true\" class=\"longTextInput esriLeadingMargin1\" data-dojo-attach-point=\"_outputLayerInput\"></input>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n             <div data-dojo-attach-point=\"_chooseFolderRow\" class=\"esriLeadingMargin1\">\n               <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n               <input class=\"longInput\" dojoAttachPoint=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\" style=\"width:55%;height:auto\"></input>\n             </div>              \n          </td>\n        </tr>\n      </tbody>\n     </table>\n   </div>\n  <div style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n    <div class=\"esriExtentCreditsCtr\">\n      <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\n     <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n       <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n         ${i18n.useMapExtent}\n     </label>\n    </div>\n    <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" class=\"esriLeadingMargin4 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n        ${i18n.runAnalysis}\n    </button>\n  </div>\n  <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n    <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n  </div>    \n</div>\n"}});
//>>built
define("esri/dijit/analysis/CalculateDensity", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/Color", "dojo/_base/json", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dojo/number", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/NumberSpinner", "dijit/form/NumberTextBox", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "dijit/Dialog", "../../kernel", "../../lang", "./AnalysisBase", "../../symbols/SimpleFillSymbol", "../../symbols/SimpleLineSymbol", "../../toolbars/draw", "../PopupTemplate", "../../layers/FeatureLayer", "../../graphic", "./utils", "./CreditEstimator", "../../symbols/PictureMarkerSymbol", "dijit/form/HorizontalSlider", "dijit/form/HorizontalRule", "dijit/form/HorizontalRuleLabels", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/CalculateDensity.html"], function(u, v, f, g, m, w, h, H, I, n, d, x, J, K, e, l, y, z, A, B, C, L, M, N, O, P, Q, R, S, T, U, V, W, X, p, D, r, s, t, Y, E, F, k, Z, $, aa, ba, ca, q, G) {
    return v([y, z, A, B, C, D], {
        declaredClass: "esri.dijit.analysis.CalculateDensity",
        templateString: G,
        basePath: u.toUrl("."),
        widgetsInTemplate: !0,
        inputLayer: null,
        field: null,
        classificationType: "EqualInterval",
        numClasses: 10,
        boundingPolygonLayer: null,
        outputName: null,
        classBreaks: null,
        radius: null,
        radiusUnits: null,
        arealUnits: null,
        _NOVALUE_: "NOVALUE",
        showSelectFolder: !1,
        showChooseExtent: !0,
        showHelp: !0,
        returnFeatureCollection: !1,
        showCredits: !0,
        i18n: null,
        map: null,
        toolName: "CalculateDensity",
        helpFileName: "CalculateDensity",
        resultParameter: "resultLayer",
        constructor: function(a, b) {
            this._pbConnects = [];
            a.containerNode && (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments);
            g.forEach(this._pbConnects, m.disconnect);
            delete this._pbConnects
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            f.mixin(this.i18n, q.findHotSpotsTool);
            f.mixin(this.i18n, q.interpolatePointsTool);
            f.mixin(this.i18n,
                q.calculateDensityTool);
            this.set("drawLayerName", this.i18n.blayerName);
            this.set("drawPointLayerName", this.i18n.pointlayerName)
        },
        postCreate: function() {
            this.inherited(arguments);
            e.add(this._form.domNode, "esriSimpleForm");
            this._outputLayerInput.set("validator", f.hitch(this, this.validateServiceName));
            this._classBreaksInput.set("validator", f.hitch(this, this.validateClassBreaks));
            this._buildUI()
        },
        startup: function() {},
        _onClose: function(a) {
            a && this._featureLayer && (this.map.removeLayer(this._featureLayer),
                g.forEach(this.boundingPolygonLayers, function(a, c) {
                    a === this._featureLayer && (this._boundingAreaSelect.removeOption({
                        value: c + 1,
                        label: this._featureLayer.name
                    }), this.boundingPolygonLayers.splice(c, 1))
                }, this));
            this._handleBoundingBtnChange(!1);
            this.emit("close", {
                save: !a
            })
        },
        clear: function() {
            this._featureLayer && (this.map.removeLayer(this._featureLayer), g.forEach(this.boundingPolygonLayers, function(a, b) {
                a === this._featureLayer && (this._boundingAreaSelect.removeOption({
                        value: b + 1,
                        label: this._featureLayer.name
                    }),
                    this.boundingPolygonLayers.splice(b, 1))
            }, this));
            this._handleBoundingBtnChange(!1)
        },
        _handleShowCreditsClick: function(a) {
            a.preventDefault();
            a = {};
            this._form.validate() && (a.inputLayer = h.toJson(k.constructAnalysisInputLyrObj(this.get("inputLayer"))), this.get("field") && (a.field = this.get("field")), this.get("radius") && (a.radius = this.radius), this.radius && this.get("radiusUnits") && (a.radiusUnits = this.radiusUnits), this.get("areaUnits") && (a.areaUnits = this.areaUnits), this.get("classificationType") && (a.classificationType =
                this.get("classificationType")), "Manual" !== this.classificationType ? a.numClasses = this.get("numClasses") : a.classBreaks = this.get("classBreaks"), this.get("boundingPolygonLayer") && (a.boundingPolygonLayer = h.toJson(k.constructAnalysisInputLyrObj(this.boundingPolygonLayer))), this.returnFeatureCollection || (a.OutputName = h.toJson({
                serviceProperties: {
                    name: this.get("outputName")
                }
            })), this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = h.toJson({
                extent: this.map.extent._normalize(!0)
            })), this.getCreditsEstimate(this.toolName,
                a).then(f.hitch(this, function(a) {
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
                a.inputLayer = h.toJson(k.constructAnalysisInputLyrObj(this.get("inputLayer")));
                this.get("field") && (a.field = this.get("field"));
                this.get("radius") && (a.radius = this.radius);
                this.radius && this.get("radiusUnits") && (a.radiusUnits = this.radiusUnits);
                this.get("areaUnits") && (a.areaUnits = this.areaUnits);
                this.get("classificationType") &&
                    (a.classificationType = this.get("classificationType"));
                "Manual" !== this.classificationType ? a.numClasses = this.get("numClasses") : a.classBreaks = this.get("classBreaks");
                this.get("boundingPolygonLayer") && (a.boundingPolygonLayer = h.toJson(k.constructAnalysisInputLyrObj(this.boundingPolygonLayer)));
                this.returnFeatureCollection || (a.OutputName = h.toJson({
                    serviceProperties: {
                        name: this.get("outputName")
                    }
                }));
                this.showChooseExtent && !this.get("DisableExtent") && this._useExtentCheck.get("checked") && (a.context = h.toJson({
                    extent: this.map.extent._normalize(!0)
                }));
                this.returnFeatureCollection && (c = {
                    outSR: this.map.spatialReference
                }, this.showChooseExtent && (c.extent = this.map.extent._normalize(!0)), a.context = h.toJson(c));
                a.returnFeatureCollection = this.returnFeatureCollection;
                b.jobParams = a;
                b.itemParams = {
                    description: this.i18n.itemDescription,
                    tags: n.substitute(this.i18n.itemTags, {
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
            this._loadConnections();
            this._radiusUnitsSelect.addOption([{
                value: "Miles",
                label: this.i18n.miles
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
            this._areaUnitsSelect.addOption([{
                value: "SquareMiles",
                label: this.i18n.sqMiles
            }, {
                value: "SquareKilometers",
                label: this.i18n.sqKm
            }]);
            this.signInPromise.then(f.hitch(this, k.initHelpLinks, this.domNode,
                this.showHelp, {
                    analysisGpServer: this.analysisGpServer
                }));
            this.inputLayer && (x.set(this._interpolateToolDescription, "innerHTML", n.substitute(this.i18n.toolDefine, {
                layername: this.inputLayer.name
            })), this._outputLayerInput.set("value", n.substitute(this.i18n.outputLayerName, {
                layername: this.inputLayer.name
            })), this.set("fields", this.inputLayer));
            this.classificationType && this._classifySelect.set("value", this.classificationType);
            this.outputName && this._outputLayerInput.set("value", this.outputName);
            if (this.boundingPolygonLayers) {
                this._boundingAreaSelect.addOption({
                    value: "-1",
                    label: this.i18n.defaultBoundingOption,
                    selected: !0
                });
                var a = !1;
                g.forEach(this.boundingPolygonLayers, function(b, c) {
                    "esriGeometryPolygon" === b.geometryType && (a = this.get("boundingPolygonLayer") && this.get("boundingPolygonLayer").name === b.name, this._boundingAreaSelect.addOption({
                        value: c + 1,
                        label: b.name,
                        selected: a
                    }))
                }, this)
            }
            this.classBreaks && this._classBreaksInput.set("value", this.classBreaks.join().replace(/,/g, " "));
            this.radius && this._searchDistanceInput.set("value", this.radius);
            this.radiusUnits && this._radiusUnitsSelect.set("value",
                this.radiusUnits);
            this.areaUnits && this._areaUnitsSelect.set("value", this.areaUnits);
            d.set(this._chooseFolderRow, "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(f.hitch(this, function(a) {
                this.folderStore = a;
                this._webMapFolderSelect.set("store", a);
                this._webMapFolderSelect.set("value", this.portalUser.username)
            }));
            d.set(this._chooseExtentDiv, "display", !0 === this.showChooseExtent ? "block" : "none");
            d.set(this._showCreditsLink, "display", !0 === this.showCredits ?
                "block" : "none")
        },
        _handleMethodChange: function(a) {
            "NN" === a ? (e.add(this._optionsDiv, "disabled"), e.contains(this._optionsDiv, "optionsOpen") && (e.remove(this._optionsDiv, "optionsOpen"), e.add(this._optionsDiv, "optionsClose"))) : (e.contains(this._optionsDiv, "disabled") && e.remove(this._optionsDiv, "disabled"), "KG" === a ? (d.set(this._barrierLabelRow, "display", "none"), d.set(this._barrierSelectRow, "display", "none"), d.set(this._speedLabelRow, "display", ""), d.set(this._speedSliderRow, "display", "")) : "LP" === a && (d.set(this._barrierLabelRow,
                "display", ""), d.set(this._barrierSelectRow, "display", ""), d.set(this._speedLabelRow, "display", "none"), d.set(this._speedSliderRow, "display", "none")))
        },
        _handleOptimizeSliderChange: function(a) {
            console.log(a, this._optimizeSlider.get("value"));
            this.set("interpolateOption", this._optimizeSlider.get("value"))
        },
        _handleFieldChange: function(a) {},
        _handleOptionsBtnClick: function() {
            e.contains(this._optionsDiv, "disabled") || (e.contains(this._optionsDiv, "optionsClose") ? (e.remove(this._optionsDiv, "optionsClose"), e.add(this._optionsDiv,
                "optionsOpen")) : e.contains(this._optionsDiv, "optionsOpen") && (e.remove(this._optionsDiv, "optionsOpen"), e.add(this._optionsDiv, "optionsClose")))
        },
        _handleBoundingSelectChange: function(a) {},
        _handleArealUnitsSelectChange: function(a) {},
        _handleBoundingBtnChange: function(a) {
            a ? (this.emit("drawtool-activate", {}), this._featureLayer || this._createBoundingPolyFeatColl(), this._toolbar.activate(t.POLYGON)) : (this._toolbar.deactivate(), this.emit("drawtool-deactivate", {}))
        },
        _handleDistValueChange: function(a) {},
        _handleDistUnitsChange: function(a) {},
        _handleClassifySelectChange: function(a) {
            d.set(this._classifyOtherOptionLabelRow, "display", "Manual" === a ? "none" : "block");
            d.set(this._classifyOtherOptionInputRow, "display", "Manual" === a ? "none" : "block");
            d.set(this._manualOptionInputRow, "display", "Manual" === a ? "block" : "none");
            d.set(this._manualOptionLabelRow, "display", "Manual" === a ? "block" : "none")
        },
        _loadConnections: function() {
            this.on("start", f.hitch(this, "_onClose", !1));
            this._connect(this._closeBtn, "onclick", f.hitch(this, "_onClose", !0))
        },
        _createBoundingPolyFeatColl: function() {
            var a =
                k.createPolygonFeatureCollection(this.drawLayerName);
            this._featureLayer = new E(a, {
                id: this.drawLayerName
            });
            this.map.addLayer(this._featureLayer);
            m.connect(this._featureLayer, "onClick", f.hitch(this, function(a) {
                this.map.infoWindow.setFeatures([a.graphic])
            }))
        },
        _addFeatures: function(a) {
            var b = [],
                c = {},
                f = new r(r.STYLE_NULL, new s(s.STYLE_SOLID, new w([0, 0, 0]), 4));
            a = new F(a, f);
            this.map.graphics.add(a);
            c.description = "blayer desc";
            c.title = "blayer";
            a.setAttributes(c);
            b.push(a);
            this._featureLayer.applyEdits(b, null,
                null);
            if (0 === this.boundingPolygonLayers.length || this.boundingPolygonLayers[this.boundingPolygonLayers.length - 1] !== this._featureLayer) b = this.boundingPolygonLayers.push(this._featureLayer), c = this._boundingAreaSelect.getOptions(), this._boundingAreaSelect.removeOption(c), c = g.map(c, function(a) {
                a.selected = !1;
                return a
            }), this._boundingAreaSelect.addOption({
                value: b,
                label: this._featureLayer.name,
                selected: !0
            }), this._boundingAreaSelect.addOption(c)
        },
        validateServiceName: function(a) {
            var b = /(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(a);
            return 0 === a.length || 0 === n.trim(a).length ? (this._outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : b ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceName), !1) : 98 < a.length ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceNameLength), !1) : !0
        },
        validateClassBreaks: function() {
            var a, b = [],
                c = [],
                d, e;
            a = f.trim(this._classBreaksInput.get("value")).split(" ");
            if ("Manual" !== this.get("classificationType")) return !0;
            if (!a && "Manual" === this.get("classificationType") ||
                2 > a.length || 31 < a.length) return !1;
            g.some(a, function(g, h) {
                g = l.parse(g);
                if (isNaN(g)) return b.push(0), !1;
                if (c[a[h]]) return c[a[h]] = !1, b.push(0), !1;
                c[a[h]] = !0;
                d = l.format(g, {
                    locale: "root"
                });
                p.isDefined(d) ? p.isDefined(d) || (d = l.format(g, {
                    locale: "en-us"
                })) : d = l.format(g, {
                    locale: "en"
                });
                p.isDefined(d) && (e = f.trim(d).match(/\D/g));
                if (e && 0 < e.length) return b.push(0), !1
            });
            return -1 !== g.indexOf(b, 0) ? !1 : !0
        },
        _setAnalysisGpServerAttr: function(a) {
            a && (this.analysisGpServer = a, this.set("toolServiceUrl", this.analysisGpServer +
                "/" + this.toolName))
        },
        _setInputLayerAttr: function(a) {
            this.inputLayer = a
        },
        _getInputLayerAttr: function() {
            return this.inputLayer
        },
        _setFieldsAttr: function(a) {
            var b = a.fields,
                c, d;
            this._fieldSelect.addOption({
                value: this._NOVALUE_,
                label: this.i18n.chooseCountField
            });
            g.forEach(b, function(b, e) {
                b.name !== a.objectIdField && -1 !== g.indexOf(["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeDouble"], b.type) && (c = {
                        value: b.name,
                        label: p.isDefined(b.alias) && "" !== b.alias ? b.alias : b.name
                    },
                    this.field && c.value === this.field && (c.selected = "selected", d = b.name), this._fieldSelect.addOption(c))
            }, this);
            d && this._fieldSelect.set("value", d)
        },
        _setFieldAttr: function(a) {
            this.field = a
        },
        _getFieldAttr: function() {
            this._fieldSelect && (this.field = this._fieldSelect.get("value") !== this._NOVALUE_ ? this._fieldSelect.get("value") : null);
            return this.field
        },
        _setRadiusAttr: function(a) {
            this._set("radius", a)
        },
        _getRadiusAttr: function() {
            this._searchDistanceInput && this.set("radius", this._searchDistanceInput.get("value"));
            return this.radius
        },
        _setRadiusUnitsAttr: function(a) {
            this._set("radiusUnits", a)
        },
        _getRadiusUnitsAttr: function() {
            this._radiusUnitsSelect && this.set("radiusUnits", this._radiusUnitsSelect.get("value"));
            return this.radiusUnits
        },
        _setAreaUnitsAttr: function(a) {
            this._set("areaUnits", a)
        },
        _getAreaUnitsAttr: function() {
            this._areaUnitsSelect && this.set("areaUnits", this._areaUnitsSelect.get("value"));
            return this.areaUnits
        },
        _setClassificationTypeAttr: function(a) {
            this.classificationType = a
        },
        _getClassificationTypeAttr: function() {
            this._classifySelect &&
                (this.classificationType = this._classifySelect.get("value"));
            return this.classificationType
        },
        _getNumClassesAttr: function() {
            this._numClassesInput && (this.numClasses = this._numClassesInput.get("value"));
            return this.numClasses
        },
        _setNumClassesAttr: function(a) {
            this.numClasses = a
        },
        _getClassBreaksAttr: function() {
            if (this._classBreaksInput) {
                var a = f.trim(this._classBreaksInput.get("value")).split(" "),
                    b = [];
                g.forEach(a, function(a) {
                    b.push(l.parse(a))
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
        _getOutputNameAttr: function() {
            this._outputLayerInput && (this.outputName =
                this._outputLayerInput.get("value"));
            return this.outputName
        },
        _setOutputNameAttr: function(a) {
            this.outputName = a
        },
        _setMapAttr: function(a) {
            this.map = a;
            this._toolbar = new t(this.map);
            m.connect(this._toolbar, "onDrawEnd", f.hitch(this, this._addFeatures))
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
        _setDisableRunAnalysisAttr: function(a) {
            this._saveBtn.set("disabled", a)
        },
        _setShowSelectFolderAttr: function(a) {
            this.showSelectFolder =
                a
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