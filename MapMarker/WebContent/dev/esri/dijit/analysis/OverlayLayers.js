require({cache:{
'url:esri/dijit/analysis/templates/OverlayLayers.html':"<div class=\"esriAnalysis\">\n  <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n    <div data-dojo-attach-point=\"_overlaylayersToolContentTitle\" class=\"analysisTitle\">\n         <table class=\"esriFormTable\" > \n            <tr>\n              <td class=\"esriToolIconTd\"><div class=\"overlayLayersIcon\"></div></td>\n              <td class=\"esriAlignLeading\">${i18n.overlayLayers}</td>\n              <td>\n              <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                  <div class=\"esriFloatLeading\">\n                    <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                  </div>\n                  <div class=\"esriFloatTrailing\">\n                    <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                  </div>              \n              </div>  \n              </td>\n            </tr>\n         </table>\n    </div>\n    <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n  </div>\n  <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n     <table class=\"esriFormTable\"  data-dojo-attach-point=\"_overlaylayersTable\"> \n       <tbody>\n        <tr>\n          <td  colspan=\"3\" class=\"sectionHeader\" data-dojo-attach-point=\"_overlaylayersToolDescription\"></td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label data-dojo-attach-point=\"_labelOne\" class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n            <label data-dojo-attach-point=\"_polylabel\" class=\"\">${i18n.chooseOverlayLayer}</label>\n            <select class=\"esriLeadingMargin1  longInput esriAnalysisSelect esriLongLabel\"  style=\"width:125%;margin-top:10px;table-layout:fixed;\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_overlayFeaturesSelect\" data-dojo-attach-event=\"onChange:_handleLayerChange\"></select>\n          </td>\n          <td class=\"shortTextInput\" width=\"1%\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"OverlayLayer\"></a> \n          </td> \n        </tr>\n        <tr>\n          <td width=\"99%\" colspan=\"2\" style=\"white-space:nowrap;\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n            <label class=\"longTextInput\">${i18n.chooseOverlayMethod}</label>\n          </td>\n          <td>\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"OverlayType\"></a> \n          </td>          \n        </tr>  \n        <tr>\n          <td style=\"width:33%\" align='center'>\n            <div class=\"esriContainerSelector\" data-dojo-props=\"groupName:'overlayType',checked:true\" data-dojo-type=\"esri/dijit/analysis/AnalysisToggleButton\" data-dojo-attach-point=\"_intersectBtnCtr\" style=\"width:100%\" data-dojo-attach-event=\"onClick:_handleIntersectBtnCtrClick\" >\n              <div data-dojo-type=\"esri/dijit/analysis/GroupToggleButton\" class=\"\" data-dojo-attach-event=\"onClick:_handleIntersectBtnClick\" data-dojo-attach-point=\"_intersectBtn\" data-dojo-props=\"groupName:'overlayType',showLabel:false,iconClass:'intersectLayersIcon',checked:true, style:'width:36px;height:36px;',label:'intersect'\"></div>\n              <div><label>${i18n.intersect}</label></div>\n            </div>\n          </td>\n          <td style=\"width:33%\" align='center'>  \n            <div class=\"esriContainerSelector\" data-dojo-props=\"groupName:'overlayType'\"  data-dojo-type=\"esri/dijit/analysis/AnalysisToggleButton\" data-dojo-attach-point=\"_unionBtnCtr\" style=\"width:100%\" data-dojo-attach-event=\"onClick:_handleUnionBtnCtrClick\">          \n            <div data-dojo-type=\"esri/dijit/analysis/GroupToggleButton\" class=\"\" data-dojo-attach-event=\"onClick:_handleUnionBtnClick\" data-dojo-attach-point=\"_unionBtn\" data-dojo-props=\"groupName:'overlayType',showLabel:false,iconClass:'unionLayersIcon' ,   style:'width:36px;height:36px;',label:'union'\"></div>\n              <div><label>${i18n.union}</label></div>\n            </div>\n          </td>\n          <td style=\"width:33%\" align='center'>\n            <div class=\"esriContainerSelector\" data-dojo-props=\"groupName:'overlayType'\"  data-dojo-type=\"esri/dijit/analysis/AnalysisToggleButton\" style=\"width:100%\" data-dojo-attach-point=\"_eraseBtnCtr\" data-dojo-attach-event=\"onClick:_handleEraseBtnCtrClick\">\n              <div  data-dojo-type=\"esri/dijit/analysis/GroupToggleButton\" class=\"\" data-dojo-attach-event=\"onClick:_handleEraseBtnClick\" data-dojo-attach-point=\"_eraseBtn\" data-dojo-props=\"groupName:'overlayType',showLabel:false,iconClass:'eraseLayersIcon',   style:'width:36px;height:36px;',label:'erase'\"></div>\n              <div><label>${i18n.erase}</label></div>\n            </div>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n            <table data-dojo-attach-point=\"_outputTypeTable\">\n              <tbody>\n                <td>\n                  <label data-dojo-attach-point=\"_outputTypeLabel\">${i18n.outputLabel}</label>\n                </td>\n                <td colspan=\"2\">\n                  <select class=\"esriLeadingMargin1 mediumInput esriAnalysisSelect\"  style=\"table-layout:fixed;width:150px;\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_outputTypeSelect\">\n                    <option value=\"Point\"> ${i18n.points}</option>\n                    <option value=\"Line\">${i18n.lines}</option>\n                    <option value=\"Input\">${i18n.areas}</option>\n                  </select>\n                </td>\n                </td>\n              </tbody>\n            </table>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.threeLabel}</label>\n            <label class=\"longTextInput\">${i18n.outputLayerLabel}</label>\n          </td>\n          <td class=\"shortTextInput\">\n            <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"OutputLayer\"></a> \n          </td>             \n        </tr>\n        <tr>\n          <td colspan=\"3\">\n            <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" data-dojo-props=\"trim:true,required:true\" class=\"esriOutputText esriLeadingMargin1\" data-dojo-attach-point=\"_outputLayerInput\"></input>\n          </td>                \n        </tr>\n        <tr>\n          <td colspan=\"3\">\n             <div class=\"esriLeadingMargin1\" data-dojo-attach-point=\"_chooseFolderRow\">\n               <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n               <input class=\"longInput\" dojoAttachPoint=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\" style=\"width:60%;height:auto\"></input>\n             </div>              \n          </td>\n        </tr>         \n      </tbody>         \n     </table>\n   </div>\n  <div data-dojo-attach-point=\"_overlaylayersToolContentButtons\" style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n      <div class=\"esriExtentCreditsCtr\">\n        <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\n       <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n         <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n           ${i18n.useMapExtent}\n       </label>\n      </div>     \n    <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" class=\"esriLeadingMargin4 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n        ${i18n.runAnalysis}\n    </button>\n  </div>\n  <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n    <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n  </div>    \n  <div class=\"esriFormWarning esriRoundedBox\" data-dojo-attach-point=\"_errorMessagePane\" style=\"display:none;\">\n    <a href=\"#\" title=\"${i18n.close}\" class=\"esriFloatTrailing esriAnalysisCloseIcon\" title='${i18n.close}' data-dojo-attach-event=\"onclick:_handleCloseMsg\">\n    </a>\n    <span data-dojo-attach-point=\"_bodyNode\"></span>\n  </div>\n</div>\n"}});
//>>built
define("esri/dijit/analysis/OverlayLayers", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/json", "dojo/_base/fx", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dojo/fx/easing", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "../../kernel", "./AnalysisBase", "./CreditEstimator", "./AnalysisToggleButton", "./GroupToggleButton", "./utils", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/OverlayLayers.html"], function(r, s, c, l, m, d, n, B, C, g, f, p, D, E, h, q, t, u, v, w, x, F, G, H, I, J, K, L, M, N, O, y, P, Q, R, k, z, A) {
    return s([t, u, v, w, x, y], {
        declaredClass: "esri.dijit.analysis.OverlayLayers",
        templateString: A,
        basePath: r.toUrl("."),
        widgetsInTemplate: !0,
        inputLayer: null,
        overlayLayer: null,
        overlayType: "intersect",
        tolerance: 0,
        snapToInput: !1,
        returnFeatureCollection: !1,
        outputLayerName: null,
        outputType: "Input",
        showSelectFolder: !1,
        showChooseExtent: !0,
        showHelp: !0,
        showCredits: !0,
        i18n: null,
        toolName: "OverlayLayers",
        helpFileName: "OverlayLayers",
        resultParameter: "Outputlayer",
        constructor: function(a, b) {
            this._pbConnects = [];
            a.containerNode && (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments);
            l.forEach(this._pbConnects, m.disconnect);
            delete this._pbConnects
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            c.mixin(this.i18n, z.overlayLayersTool)
        },
        postCreate: function() {
            this.inherited(arguments);
            h.add(this._form.domNode, "esriSimpleForm");
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
        _handleSaveBtnClick: function(a) {
            if (this._form.validate()) {
                this._saveBtn.set("disabled", !0);
                a = {};
                var b = {},
                    e;
                a.InputLayer = d.toJson(k.constructAnalysisInputLyrObj(this.inputLayer));
                "0" !== this._overlayFeaturesSelect.get("value") && (e = this.overlayLayer[this._overlayFeaturesSelect.get("value") - 1], a.OverlayLayer = d.toJson(k.constructAnalysisInputLyrObj(e)));
                a.OverlayType = this.get("overlayType");
                this.returnFeatureCollection || (a.OutputName = d.toJson({
                    serviceProperties: {
                        name: this._outputLayerInput.get("value")
                    }
                }));
                a.Tolerance = this.tolerance;
                a.SnapToInput = this.snapToInput;
                "intersect" === this.get("OverlayType") && (a.outputType = this._outputTypeSelect.get("value"));
                this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = d.toJson({
                    extent: this.map.extent._normalize(!0)
                }));
                this.returnFeatureCollection && (e = {
                        outSR: this.map.spatialReference
                    }, this.showChooseExtent && (e.extent = this.map.extent._normalize(!0)),
                    a.context = d.toJson(e));
                console.log(a);
                b.jobParams = a;
                b.itemParams = {
                    description: this.i18n.itemDescription,
                    tags: g.substitute(this.i18n.itemTags, {
                        layername: this.inputLayer.name
                    }),
                    snippet: this.i18n.itemSnippet
                };
                this.showSelectFolder && (b.itemParams.folder = this._webMapFolderSelect.item ? this.folderStore.getValue(this._webMapFolderSelect.item, "id") : "");
                this.execute(b)
            }
        },
        _handleShowCreditsClick: function(a) {
            a.preventDefault();
            a = {};
            if (this._form.validate()) {
                a.InputLayer = d.toJson(k.constructAnalysisInputLyrObj(this.inputLayer));
                if ("0" !== this._overlayFeaturesSelect.get("value")) {
                    var b = this.overlayLayer[this._overlayFeaturesSelect.get("value") - 1];
                    a.OverlayLayer = d.toJson(k.constructAnalysisInputLyrObj(b))
                }
                a.OverlayType = this.get("overlayType");
                this.returnFeatureCollection || (a.OutputName = d.toJson({
                    serviceProperties: {
                        name: this._outputLayerInput.get("value")
                    }
                }));
                a.Tolerance = this.tolerance;
                a.SnapToInput = this.snapToInput;
                "intersect" === this.get("OverlayType") && (a.outputType = this._outputTypeSelect.get("value"));
                this.showChooseExtent &&
                    this._useExtentCheck.get("checked") && (a.Context = d.toJson({
                        extent: this.map.extent._normalize(!0)
                    }));
                this.getCreditsEstimate(this.toolName, a).then(c.hitch(this, function(a) {
                    this._usageForm.set("content", a);
                    this._usageDialog.show()
                }))
            }
        },
        _save: function() {},
        _sortbyGeometryType: function(a, b) {
            if ("esriGeometryPolygon" === a.geometryType) return -1;
            if ("esriGeometryPolygon" === b.geometryType) return 1;
            if ("esriGeometryPolyline" === a.geometryType) return -1;
            if ("esriGeometryPolyline" === b.geometryType) return 1;
            if ("esriGeometryPoint" ===
                a.geometryType) return -1;
            if ("esriGeometryPoint" === b.geometryType) return 1
        },
        _buildUI: function() {
            this._loadConnections();
            k.initHelpLinks(this.domNode, this.showHelp);
            this.inputLayer && p.set(this._overlaylayersToolDescription, "innerHTML", g.substitute(this.i18n.overlayDefine, {
                layername: this.inputLayer.name
            }));
            this.overlayLayer && (this.overlayLayer = l.filter(this.overlayLayer, function(a) {
                if (this.inputLayer !== a && ("esriGeometryPolygon" === a.geometryType || "esriGeometryPoint" === a.geometryType || "esriGeometryPolyline" ===
                        a.geometryType)) return !0
            }, this), this.overlayLayer.sort(c.hitch(this, this._sortbyGeometryType)), this._selectedIndex = 1, l.forEach(this.overlayLayer, function(a, b) {
                this._overlayFeaturesSelect.addOption({
                    value: b + 1,
                    label: a.name
                })
            }, this), this._handleLayerChange(1));
            this.overlayType && ("intersect" === this.overlayType ? (this._intersectBtn.set("checked", !0), this._handleIntersectBtnClick()) : "union" === this.overlayType ? (this._unionBtn.set("checked", !0), this._handleUnionBtnClick()) : "erase" === this.overlayType && (this._eraseBtn.set("checked", !0), this._handleEraseBtnClick()));
            this.outputLayerName && this._outputLayerInput.set("value", this.outputLayerName);
            this.outputType && this._outputTypeSelect.set("value", this.outputType);
            f.set(this._chooseFolderRow, "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(c.hitch(this, function(a) {
                this.folderStore = a;
                this._webMapFolderSelect.set("store", a);
                this._webMapFolderSelect.set("value", this.portalUser.username)
            }));
            f.set(this._chooseExtentDiv, "display", !0 === this.showChooseExtent ? "block" : "none");
            f.set(this._showCreditsLink, "display", !0 === this.showCredits ? "block" : "none")
        },
        _loadConnections: function() {
            this.on("start", c.hitch(this, "_onClose", !0));
            this._connect(this._closeBtn, "onclick", c.hitch(this, "_onClose", !1))
        },
        _handleLayerChange: function(a) {
            var b, e, c;
            a = this.overlayLayer[a - 1];
            b = !1;
            c = this.get("overlayType");
            e = "esriGeometryPolygon" !== this.inputLayer.geometryType || "esriGeometryPolygon" !== a.geometryType;
            a && (this._unionBtn.set("disabled", e), this._unionBtn.set("iconClass",
                    e ? "unionLayersDisabledIcon" : "unionLayersIcon"), "esriGeometryPolygon" === this.inputLayer.geometryType ? b = "esriGeometryPolygon" === this.inputLayer.geometryType && "esriGeometryPolygon" !== a.geometryType : "esriGeometryPolyline" === this.inputLayer.geometryType ? b = "esriGeometryPolyline" === this.inputLayer.geometryType && "esriGeometryPoint" === a.geometryType : "esriGeometryPolyline" === this.inputLayer.geometryType && (b = !0), this._eraseBtn.set("disabled", b), this._eraseBtn.set("iconClass", b ? "eraseLayersDisabledIcon" : "eraseLayersIcon"),
                "union" === c && ("esriGeometryPolygon" !== this.inputLayer.geometryType || "esriGeometryPolygon" !== a.geometryType) ? (this._showMessages(this.i18n.overlayLayerPolyMsg), this._intersectBtn.set("checked", !0), this._handleIntersectBtnCtrClick()) : "erase" === c && "esriGeometryPolyline" === this.inputLayer.geometryType && "esriGeometryPoint" === a.geometryType ? (this._showMessages(this.i18n.notSupportedEraseOverlayMsg), this._intersectBtn.set("checked", !0), this._handleIntersectBtnCtrClick()) : "erase" === c && "esriGeometryPolygon" ===
                this.inputLayer.geometryType && "esriGeometryPolygon" !== a.geometryType ? (this._showMessages(this.i18n.notSupportedEraseOverlayMsg), this._intersectBtn.set("checked", !0), this._handleIntersectBtnCtrClick()) : "intersect" === c ? this._handleIntersectBtnCtrClick() : "union" === c ? this._handleUnionBtnCtrClick() : "erase" === c && this._handleEraseBtnClick())
        },
        _showMessages: function(a) {
            p.set(this._bodyNode, "innerHTML", a);
            n.fadeIn({
                node: this._errorMessagePane,
                easing: q.quadIn,
                onEnd: c.hitch(this, function() {
                    f.set(this._errorMessagePane, {
                        display: ""
                    })
                })
            }).play();
            window.setTimeout(c.hitch(this, this._handleCloseMsg), 3E3)
        },
        _handleCloseMsg: function(a) {
            a && a.preventDefault();
            n.fadeOut({
                node: this._errorMessagePane,
                easing: q.quadOut,
                onEnd: c.hitch(this, function() {
                    f.set(this._errorMessagePane, {
                        display: "none"
                    })
                })
            }).play()
        },
        _updateOutputType: function() {
            var a, b;
            "0" !== this._overlayFeaturesSelect.get("value") && (a = this.overlayLayer[this._overlayFeaturesSelect.get("value") - 1]);
            b = "esriGeometryPoint" === this.inputLayer.geometryType || "esriGeometryMultipoint" ===
                this.inputLayer.geometryType || "esriGeometryPoint" === a.geometryType || "esriGeometryMultipoint" === a.geometryType;
            f.set(this._outputTypeTable, "display", "table");
            this._outputTypeSelect.removeOption(this._outputTypeSelect.getOptions());
            this._outputTypeSelect.set("disabled", b);
            b ? h.add(this._outputTypeLabel, "esriAnalysisTextDisabled") : h.remove(this._outputTypeLabel, "esriAnalysisTextDisabled");
            b ? this._outputTypeSelect.addOption({
                    value: "Input",
                    label: this.i18n.points
                }) : "esriGeometryPolyline" === this.inputLayer.geometryType &&
                "esriGeometryPolyline" === a.geometryType ? this._outputTypeSelect.addOption([{
                    value: "Point",
                    label: this.i18n.points,
                    selected: !0
                }, {
                    value: "Input",
                    label: this.i18n.lines
                }]) : "esriGeometryPolygon" === this.inputLayer.geometryType && "esriGeometryPolygon" === a.geometryType ? this._outputTypeSelect.addOption([{
                    value: "Point",
                    label: this.i18n.points
                }, {
                    value: "Line",
                    label: this.i18n.lines
                }, {
                    value: "Input",
                    label: this.i18n.areas,
                    selected: !0
                }]) : "esriGeometryPolyline" === this.inputLayer.geometryType && "esriGeometryPolygon" === a.geometryType ?
                this._outputTypeSelect.addOption([{
                    value: "Point",
                    label: this.i18n.points,
                    selected: !0
                }, {
                    value: "Input",
                    label: this.i18n.lines
                }]) : "esriGeometryPolygon" === this.inputLayer.geometryType && "esriGeometryPolyline" === a.geometryType && this._outputTypeSelect.addOption([{
                    value: "Point",
                    label: this.i18n.points,
                    selected: !0
                }, {
                    value: "Input",
                    label: this.i18n.lines
                }])
        },
        _handleUnionBtnCtrClick: function() {
            this._unionBtnCtr.set("checked", !0);
            this._unionBtn.set("checked", !0);
            f.set(this._outputTypeTable, "display", "none");
            this._outputTypeSelect.set("disabled", !0);
            h.add(this._outputTypeLabel, "esriAnalysisTextDisabled");
            this._handleUnionBtnClick()
        },
        _handleIntersectBtnCtrClick: function() {
            this._intersectBtnCtr.set("checked", !0);
            this._intersectBtn.set("checked", !0);
            this._overlayFeaturesSelect.get("value");
            this._handleIntersectBtnClick();
            this._updateOutputType()
        },
        _handleEraseBtnCtrClick: function() {
            this._eraseBtnCtr.set("checked", !0);
            this._eraseBtn.set("checked", !0);
            f.set(this._outputTypeTable, "display", "none");
            this._outputTypeSelect.set("disabled", !0);
            h.add(this._outputTypeLabel,
                "esriAnalysisTextDisabled");
            this._handleEraseBtnClick()
        },
        _handleUnionBtnClick: function(a) {
            a = this.overlayLayer[this._overlayFeaturesSelect.get("value") - 1].name;
            this._outputLayerInput.set("value", g.substitute(this.i18n.unionOutputLyrName, {
                layername: this.inputLayer.name,
                overlayname: a
            }));
            this._unionBtn.focus();
            this.set("OverlayType", "union")
        },
        _handleEraseBtnClick: function(a) {
            a = this.overlayLayer[this._overlayFeaturesSelect.get("value") - 1].name;
            this._eraseBtn.focus();
            this._outputLayerInput.set("value",
                g.substitute(this.i18n.eraseOutputLyrName, {
                    layername: this.inputLayer.name,
                    overlayname: a
                }));
            this.set("OverlayType", "erase")
        },
        _handleIntersectBtnClick: function(a) {
            a = this.overlayLayer[this._overlayFeaturesSelect.get("value") - 1].name;
            this._intersectBtn.focus();
            this._outputLayerInput.set("value", g.substitute(this.i18n.intersectOutputLyrName, {
                layername: this.inputLayer.name,
                overlayname: a
            }));
            this.set("OverlayType", "intersect")
        },
        _setAnalysisGpServerAttr: function(a) {
            a && (this.analysisGpServer = a, this.set("toolServiceUrl",
                this.analysisGpServer + "/" + this.toolName))
        },
        _setInputLayerAttr: function(a) {
            this.inputLayer = a
        },
        _setOverlayLayerAttr: function(a) {
            this.overlayLayer = a
        },
        _setOverlayTypeAttr: function(a) {
            this.overlayType = a
        },
        _getOverlayTypeAttr: function() {
            return this.overlayType
        },
        _setDisableRunAnalysisAttr: function(a) {
            this._saveBtn.set("disabled", a)
        },
        _setMapAttr: function(a) {
            this.map = a
        },
        _getMapAttr: function() {
            return this.map
        },
        _setOutputTypeAttr: function(a) {
            this.outputType = a
        },
        _getOutputTypeAttr: function() {
            return this.outputType
        },
        _setShowChooseExtentAttr: function(a) {
            this.showChooseExtent = a
        },
        _getShowChooseExtentAttr: function() {
            return this.showChooseExtent
        },
        validateServiceName: function(a) {
            var b = /(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(a);
            return 0 === a.length || 0 === g.trim(a).length ? (this._outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : b ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceName), !1) : 98 < a.length ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceNameLength), !1) : !0
        },
        _setReturnFeatureCollectionAttr: function(a) {
            this.returnFeatureCollection = a
        },
        _getReturnFeatureCollectionAttr: function() {
            return this.returnFeatureCollection
        },
        _setShowSelectFolderAttr: function(a) {
            this.showSelectFolder = a
        },
        _getShowSelectFolderAttr: function() {
            return this.showSelectFolder
        },
        _setShowHelpAttr: function(a) {
            this.showHelp = a
        },
        _getShowHelpAttr: function() {
            return this.showHelp
        },
        _setShowCreditsAttr: function(a) {
            this.showCredits = a
        },
        _getShowCreditsAttr: function() {
            return this.showCredits
        },
        _connect: function(a,
            b, c) {
            this._pbConnects.push(m.connect(a, b, c))
        }
    })
});