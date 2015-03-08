require({cache:{
'url:esri/dijit/analysis/templates/AggregatePoints.html':"<div class=\"esriAnalysis\">\n    <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n      <div data-dojo-attach-point=\"_aggregateToolContentTitle\" class=\"analysisTitle\">\n        <table class=\"esriFormTable\" > \n          <tr>\n            <td class=\"esriToolIconTd\"><div class=\"aggregateIcon\"></div></td>\n            <td class=\"esriAlignLeading\">${i18n.aggregatePoints}</td>\n            <td>\n              <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                  <div class=\"esriFloatLeading\">\n                    <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                  </div>\n                  <div class=\"esriFloatTrailing\">\n                    <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                  </div>              \n              </div>                \n            </td>\n          </tr>\n        </table>\n      </div>\n      <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n    </div>\n    <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n       <table class=\"esriFormTable\"  data-dojo-attach-point=\"_aggregateTable\"  style=\"border-collapse:collapse;border-spacing:5px;\" cellpadding=\"5px\" cellspacing=\"5px\"> \n         <tbody>\n          <tr>\n            <td  colspan=\"3\" class=\"sectionHeader\" data-dojo-attach-point=\"_aggregateToolDescription\" >${i18n.aggregateDefine}</td>\n          </tr>      \n          <tr>\n            <td colspan=\"3\">\n              <label class=\"esriFloatLeading  esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n              <label class=\"\">${i18n.chooseAreaLabel}</label>\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"PolygonLayer\"></a>\n              <select class=\"esriLeadingMargin1 longInput esriLongLabel\"  style=\"margin-top:1.0em;\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_layersSelect\" data-dojo-attach-event=\"onChange:_handleLayerChange\"></select>\n            </td>\n          </tr>\n          <tr>\n         <tr>\n           <td colspan=\"2\">\n             <label class=\"esriLeadingMargin2 esriSelectLabel\">\n               <div data-dojo-type=\"dijit/form/CheckBox\" data-dojo-attach-point=\"_keepPolygonsCheck\" data-dojo-props=\"checked:'true'\"></div>\n               ${i18n.keepPolygonLabel}\n             </label>\n           </td>\n           <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"KeepBoundaryNoPoints\"></a>\n           </td>\n          </tr>    \n          <tr>\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>\n          <tr>\n            <td colspan=\"2\">\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n              <label class=\"longTextInput\">${i18n.addStatsLabel}</label>\n            </td>\n            <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"SummaryFields\"></a> \n            </td>             \n          </tr>\n          <tr data-dojo-attach-point=\"_afterStatsRow\">\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr>\n\n          <tr>\n            <td colspan=\"2\">\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.threeLabel}</label>\n              <label class=\"longTextInput\"  data-dojo-attach-point=\"_groupByLabel\">${i18n.groupByLabel}</label>\n            </td>\n            <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"GroupByField\"></a> \n            </td>             \n          </tr>\n          <tr>\n            <td colspan=\"3\">\n              <select class=\"longInput esriLeadingMargin1\" data-dojo-type=\"dijit.form.Select\"  data-dojo-attach-point=\"_groupBySelect\" data-dojo-attach-event=\"onChange:_handleGroupBySelectChange\"></select>\n            </td>                \n          </tr>\n         <tr>\n           <td colspan=\"2\">\n             <label class=\"esriLeadingMargin2 esriSelectLabel\" data-dojo-attach-point=\"_minmajorityLabel\">\n               <div data-dojo-type=\"dijit/form/CheckBox\" data-dojo-attach-point=\"_minmajorityCheck\" data-dojo-props=\"checked:false\"></div>\n               ${i18n.addMinMajorityLable}\n             </label>\n           </td>\n           <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"MinorityMajority\"></a>\n           </td>\n          </tr>    \n         <tr>\n           <td colspan=\"2\">\n             <label class=\"esriLeadingMargin2 esriSelectLabel\" data-dojo-attach-point=\"_percentPointsLabel\">\n               <div data-dojo-type=\"dijit/form/CheckBox\" data-dojo-attach-point=\"_percentPointsCheck\" data-dojo-props=\"checked:false\"></div>\n               ${i18n.addPercentageLabel}\n             </label>\n           </td>\n           <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"PercentPoints\"></a>\n           </td>\n          </tr>    \n           \n          <tr>\n            <td colspan=\"3\" class=\"clear\"></td>\n          </tr> \n          <tr>\n            <td colspan=\"2\">\n              <label class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.fourLabel}</label>\n              <label class=\"longTextInput\">${i18n.outputLayerLabel}</label>\n            </td>\n            <td class=\"shortTextInput\">\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"OutputLayer\"></a> \n            </td>             \n          </tr>\n          <tr>\n            <td colspan=\"3\">\n              <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" class=\"esriLeadingMargin1 longInput\" data-dojo-props=\"trim:true,required:true\" data-dojo-attach-point=\"_outputLayerInput\" value=\"\"></input>\n            </td>                \n          </tr>\n          <tr>\n            <td colspan=\"3\">\n               <div class=\"esriLeadingMargin1\" data-dojo-attach-point=\"_chooseFolderRow\">\n                 <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n                 <input class=\"longInput esriFolderSelect\" data-dojo-attach-point=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\"></input>\n               </div>              \n            </td>\n          </tr>\n        </tbody>         \n       </table>\n     </div>\n    <div data-dojo-attach-point=\"_aggregateToolContentButtons\" style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n      <div class=\"esriExtentCreditsCtr\">\n        <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\n       <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n         <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n           ${i18n.useMapExtent}\n       </label>\n      </div>\n      <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" class=\"esriLeadingMargin4 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n          ${i18n.runAnalysis}\n      </button>\n    </div>\n    <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n      <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n    </div>    \n  </div>\n"}});
//>>built
define("esri/dijit/analysis/AggregatePoints", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/json", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "dijit/Dialog", "../../kernel", "../../lang", "./AnalysisBase", "./utils", "./CreditEstimator", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/AggregatePoints.html"], function(t, u, e, f, n, d, F, G, h, l, v, g, w, p, x, y, z, A, B, q, H, I, J, r, K, L, M, N, O, P, s, C, m, Q, D, E) {
    return u([x, y, z, A, B, C], {
        declaredClass: "esri.dijit.analysis.AggregatePoints",
        templateString: E,
        basePath: t.toUrl("."),
        widgetsInTemplate: !0,
        pointLayer: null,
        polygonLayers: null,
        summaryFields: null,
        outputLayerName: null,
        keepBoundariesWithNoPoints: !0,
        polygonLayer: null,
        groupByField: null,
        minorityMajority: !1,
        percentPoints: !1,
        showSelectFolder: !1,
        showChooseExtent: !0,
        showHelp: !0,
        showCredits: !0,
        returnFeatureCollection: !1,
        i18n: null,
        toolName: "AggregatePoints",
        helpFileName: "AggregatePoints",
        resultParameter: "AggregatedLayer",
        constructor: function(a) {
            this._pbConnects = [];
            a.containerNode && (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments);
            f.forEach(this._pbConnects, n.disconnect);
            delete this._pbConnects
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            e.mixin(this.i18n, D.aggregatePointsTool)
        },
        postCreate: function() {
            this.inherited(arguments);
            p.add(this._form.domNode, "esriSimpleForm");
            this._outputLayerInput.set("validator", e.hitch(this,
                this.validateServiceName));
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
            if (this._form.validate()) {
                this._saveBtn.set("disabled", !0);
                var a = {},
                    b = {},
                    c, k;
                c = this.polygonLayers[this._layersSelect.get("value")];
                a.PolygonLayer = d.toJson(m.constructAnalysisInputLyrObj(c));
                a.PointLayer = d.toJson(m.constructAnalysisInputLyrObj(this.pointLayer));
                a.SummaryFields = d.toJson(this.get("summaryFields"));
                this.returnFeatureCollection || (a.OutputName = d.toJson({
                    serviceProperties: {
                        name: this._outputLayerInput.get("value")
                    }
                }));
                a.KeepBoundariesWithNoPoints = this._keepPolygonsCheck.get("checked");
                "0" !== this._groupBySelect.get("value") && (a.GroupByField = this._groupBySelect.get("value"), this.resultParameter = ["aggregatedLayer", "groupSummary"], a.minorityMajority = this.get("minorityMajority"), a.percentPoints = this.get("percentPoints"));
                this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = d.toJson({
                    extent: this.map.extent._normalize(!0)
                }));
                this.returnFeatureCollection && (k = {
                    outSR: this.map.spatialReference
                }, this.showChooseExtent && (k.extent = this.map.extent._normalize(!0)), a.context = d.toJson(k));
                b.jobParams = a;
                b.itemParams = {
                    description: h.substitute(this.i18n.itemDescription, {
                        pointlayername: this.pointLayer.name,
                        polygonlayername: c.name
                    }),
                    tags: h.substitute(this.i18n.itemTags, {
                        pointlayername: this.pointLayer.name,
                        polygonlayername: c.name
                    }),
                    snippet: this.i18n.itemSnippet
                };
                this.showSelectFolder && (b.itemParams.folder = this._webMapFolderSelect.item ?
                    this.folderStore.getValue(this._webMapFolderSelect.item, "id") : "");
                this.execute(b)
            }
        },
        _handleLayerChange: function(a) {
            this.outputLayerName = h.substitute(this.i18n.outputLayerName, {
                pointlayername: this.pointLayer.name,
                polygonlayername: this.polygonLayers[a].name
            });
            this._outputLayerInput.set("value", this.outputLayerName)
        },
        _handleAttrSelectChange: function(a) {
            var b;
            "0" !== a && (a = this.get("statisticSelect"), "0" !== a.get("value") && !a.get("isnewRowAdded") && (b = a.get("removeTd"), l.set(b, "display", "block"), b = a.get("referenceWidget"),
                e.hitch(b, b._createStatsRow()), a.set("isnewRowAdded", !0)))
        },
        _handleStatsValueUpdate: function(a, b, c) {
            this.get("attributeSelect") && (a = this.get("attributeSelect"), "0" !== a.get("value") && "0" !== c && !this.get("isnewRowAdded") && (c = this.get("removeTd"), l.set(c, "display", "block"), c = this.get("referenceWidget"), e.hitch(c, c._createStatsRow()), this.set("isnewRowAdded", !0)))
        },
        _handleShowCreditsClick: function(a) {
            a.preventDefault();
            a = {};
            var b;
            this._form.validate() && (b = this.polygonLayers[this._layersSelect.get("value")],
                a.PolygonLayer = d.toJson(m.constructAnalysisInputLyrObj(b)), a.PointLayer = d.toJson(m.constructAnalysisInputLyrObj(this.pointLayer)), a.SummaryFields = d.toJson(this.get("summaryFields")), this.returnFeatureCollection || (a.OutputName = d.toJson({
                    serviceProperties: {
                        name: this._outputLayerInput.get("value")
                    }
                })), a.KeepBoundariesWithNoPoints = this._keepPolygonsCheck.get("checked"), "0" !== this._groupBySelect.get("value") && (a.GroupByField = this._groupBySelect.get("value")), this.showChooseExtent && this._useExtentCheck.get("checked") &&
                (a.Context = d.toJson({
                    extent: this.map.extent._normalize(!0)
                })), this.getCreditsEstimate(this.toolName, a).then(e.hitch(this, function(a) {
                    this._usageForm.set("content", a);
                    this._usageDialog.show()
                })))
        },
        _save: function() {},
        _buildUI: function() {
            this._loadConnections();
            m.initHelpLinks(this.domNode, this.showHelp);
            this.pointLayer && v.set(this._aggregateToolDescription, "innerHTML", h.substitute(this.i18n.aggregateDefine, {
                layername: this.pointLayer.name
            }));
            this.polygonLayers && f.forEach(this.polygonLayers, function(a,
                b) {
                "esriGeometryPolygon" === a.geometryType && (this._layersSelect.addOption({
                    value: b,
                    label: a.name
                }), 0 === b && !this.outputLayerName && (this.outputLayerName = h.substitute(this.i18n.outputLayerName, {
                    pointlayername: this.pointLayer.name,
                    polygonlayername: a.name
                })))
            }, this);
            this.outputLayerName && this._outputLayerInput.set("value", this.outputLayerName);
            this._keepPolygonsCheck.set("checked", this.keepBoundariesWithNoPoints);
            this.polygonLayer && this._layersSelect.set("value", this.polygonLayer);
            this._createStatsRow();
            f.forEach(this.summaryFields, function(a) {
                a = a.split(" ");
                this._currentAttrSelect.set("value", a[0]);
                e.hitch(this._currentAttrSelect, this._handleAttrSelectChange, a[0])();
                this._currentStatsSelect.set("value", a[1]);
                e.hitch(this._currentStatsSelect, this._handleStatsValueUpdat, "value", "", a[1])()
            }, this);
            l.set(this._chooseFolderRow, "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(e.hitch(this, function(a) {
                this.folderStore = a;
                this._webMapFolderSelect.set("store",
                    a);
                this._webMapFolderSelect.set("value", this.portalUser.username)
            }));
            l.set(this._chooseExtentDiv, "display", !0 === this.showChooseExtent ? "block" : "none");
            this.set("groupBySelect", this.groupByField);
            l.set(this._showCreditsLink, "display", !0 === this.showCredits ? "block" : "none");
            this.minorityMajority && this._minmajorityCheck.set("checked", this.minorityMajority);
            this.percentPoints && this._percentPointsCheck.set("checked", this.percentPoints)
        },
        _loadConnections: function() {
            this.on("start", e.hitch(this, "_onClose", !0));
            this._connect(this._closeBtn, "onclick", e.hitch(this, "_onClose", !1))
        },
        _createStatsRow: function() {
            var a, b, c, k, d;
            a = g.create("tr", null, this._afterStatsRow, "before");
            c = g.create("td", {
                style: {
                    width: "45%",
                    maxWidth: "100px"
                }
            }, a);
            b = g.create("td", {
                style: {
                    width: "55%",
                    maxWidth: "104px"
                }
            }, a);
            c = new r({
                maxHeight: 200,
                "class": "esriLeadingMargin1 mediumInput esriTrailingMargin025 attrSelect",
                style: {
                    tableLayout: "fixed",
                    overflowX: "hidden"
                }
            }, g.create("select", null, c));
            this.set("attributes", {
                selectWidget: c,
                pointLayer: this.pointLayer
            });
            b = new r({
                "class": "mediumInput statsSelect",
                style: {
                    tableLayout: "fixed",
                    overflowX: "hidden"
                }
            }, g.create("select", null, b));
            this.set("statistics", {
                selectWidget: b
            });
            c.set("statisticSelect", b);
            n.connect(c, "onChange", this._handleAttrSelectChange);
            d = g.create("td", {
                "class": "shortTextInput removeTd",
                style: {
                    display: "none",
                    maxWidth: "12px"
                }
            }, a);
            k = g.create("a", {
                title: this.i18n.removeAttrStats,
                "class": "closeIcon statsRemove",
                innerHTML: "\x3cimg src\x3d'" + this.basePath + "/images/close.gif' border\x3d'0''/\x3e"
            }, d);
            n.connect(k,
                "onclick", e.hitch(this, this._removeStatsRow, a));
            b.set("attributeSelect", c);
            b.set("removeTd", d);
            b.set("isnewRowAdded", !1);
            b.set("referenceWidget", this);
            b.watch("value", this._handleStatsValueUpdate);
            this._currentStatsSelect = b;
            this._currentAttrSelect = c;
            return !0
        },
        _removeStatsRow: function(a) {
            f.forEach(q.findWidgets(a), function(a) {
                a.destroyRecursive()
            });
            g.destroy(a)
        },
        _handleGroupBySelectChange: function(a) {
            a = "0" === a;
            p.toggle(this._minmajorityLabel, "esriAnalysisTextDisabled", a);
            p.toggle(this._percentPointsLabel,
                "esriAnalysisTextDisabled", a);
            this._percentPointsCheck.set("disabled", a);
            this._minmajorityCheck.set("disabled", a)
        },
        _setAnalysisGpServerAttr: function(a) {
            a && (this.analysisGpServer = a, this.set("toolServiceUrl", this.analysisGpServer + "/" + this.toolName))
        },
        _setPointLayerAttr: function(a) {
            if ("esriGeometryPoint" === a.geometryType || "esriGeometryMultipoint" === a.geometryType) this.pointLayer = a
        },
        _setPolygonLayersAttr: function(a) {
            this.polygonLayers = a
        },
        _setLayersAttr: function(a) {
            this.polygonLayers = [];
            f.forEach(a, function(a) {
                "esriGeometryPolygon" ===
                a.geometryType ? this.polygonLayers.push(a) : "esriGeometryPoint" === a.geometryType && (this.pointLayer = a)
            }, this)
        },
        _setAttributesAttr: function(a) {
            if (a.pointLayer) {
                var b, c;
                b = a.pointLayer;
                c = a.selectWidget;
                a = b.fields;
                c.addOption({
                    value: "0",
                    label: this.i18n.attribute
                });
                f.forEach(a, function(a) {
                    -1 !== f.indexOf(["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeDouble"], a.type) && a.name !== b.objectIdField && c.addOption({
                        value: a.name,
                        label: s.isDefined(a.alias) && "" !== a.alias ? a.alias : a.name
                    })
                }, this)
            }
        },
        _setStatisticsAttr: function(a) {
            a = a.selectWidget;
            a.addOption({
                value: "0",
                label: this.i18n.statistic
            });
            a.addOption({
                value: "SUM",
                label: this.i18n.sum
            });
            a.addOption({
                value: "MIN",
                label: this.i18n.minimum
            });
            a.addOption({
                value: "MAX",
                label: this.i18n.maximum
            });
            a.addOption({
                value: "MEAN",
                label: this.i18n.average
            });
            a.addOption({
                value: "STDDEV",
                label: this.i18n.standardDev
            })
        },
        _setSummaryFieldsAttr: function(a) {
            this.summaryFields = a
        },
        _getSummaryFieldsAttr: function() {
            var a = "",
                b = [],
                c, d;
            w(".statsSelect",
                this.domNode).forEach(function(e) {
                c = q.byNode(e);
                d = c.get("attributeSelect");
                "0" !== d.get("value") && "0" !== c.get("value") && (a += d.get("value") + " " + c.get("value") + ";", b.push(d.get("value") + " " + c.get("value")))
            });
            return b
        },
        _setGroupBySelectAttr: function(a) {
            if (this.pointLayer) {
                var b = this.pointLayer.fields;
                this._groupBySelect.addOption({
                    value: "0",
                    label: this.i18n.attribute
                });
                f.forEach(b, function(a) {
                    -1 !== f.indexOf(["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeString", "esriFieldTypeDate"],
                        a.type) && a.name !== this.pointLayer.objectIdField && this._groupBySelect.addOption({
                        value: a.name,
                        label: s.isDefined(a.alias) && "" !== a.alias ? a.alias : a.name
                    })
                }, this);
                a && this._groupBySelect.set("value", a);
                this._handleGroupBySelectChange(this._groupBySelect.get("value"))
            }
        },
        _setMinorityMajorityAttr: function(a) {
            this.minorityMajority = a
        },
        _getMinorityMajorityAttr: function(a) {
            this._minmajorityCheck && (this.minorityMajority = this._minmajorityCheck.get("checked"));
            return this.minorityMajority
        },
        _setPercentPointsAttr: function(a) {
            this.percentPoints =
                a
        },
        _getPercentPointsAttr: function(a) {
            this._percentPointsCheck && (this.percentPoints = this._percentPointsCheck.get("checked"));
            return this.percentPoints
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
        _setMapAttr: function(a) {
            this.map =
                a
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
            return 0 === a.length ||
                0 === h.trim(a).length ? (this._outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : b ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceName), !1) : 98 < a.length ? (this._outputLayerInput.set("invalidMessage", this.i18n.invalidServiceNameLength), !1) : !0
        },
        _connect: function(a, b, c) {
            this._pbConnects.push(n.connect(a, b, c))
        }
    })
});