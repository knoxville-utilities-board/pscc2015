require({cache:{
'url:esri/dijit/analysis/templates/CreateBuffers.html':"<div class=\"esriAnalysis\">\n    <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\n      <div data-dojo-attach-point=\"_bufferToolContentTitle\" class=\"analysisTitle\">\n         <table class=\"esriFormTable\" >\n            <tr>\n              <td class=\"esriToolIconTd\"><div class=\"buffersIcon\"></div></td>\n              <td class=\"esriAlignLeading\">${i18n.createBuffers}</td>\n              <td>\n                <div class=\"esriFloatTrailing\" style=\"padding:0;\">\n                    <div class=\"esriFloatLeading\">\n                      <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\n                    </div>\n                    <div class=\"esriFloatTrailing\">\n                      <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"esriAnalysisCloseIcon\"></a>\n                    </div>              \n                </div>  \n              </td>\n            </tr>\n         </table>\n      </div>\n      <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n    </div>\n    <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\n     <table class=\"esriFormTable\"  data-dojo-attach-point=\"_bufferTable\">\n       <tbody>\n        <tr>\n          <td colspan=\"2\" class=\"sectionHeader esriLeadingMargin1\" data-dojo-attach-point=\"_bufferToolDescription\" >\n            <div>${i18n.bufferDefine}</div>\n          </td>\n        </tr>\n        <tr>\n          <td class=\"longTextInput\" style=\"padding-top:5px;\">\n            <label data-dojo-attach-point=\"_labelOne\" class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.oneLabel}</label>\n            <label data-dojo-attach-point=\"_polylabel\" class=\"\">${i18n.sizeLabel}</label>\n          </td>\n          <td>\n            <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"BufferSize\"></a>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <table>\n              <tr>\n                <td>\n                  <div class=\"esriLeadingMargin4 bufferSelector selected\" data-dojo-attach-point=\"_Distance\" >\n                    <div class=\"bufferIcon bufferDistanceIcon\"></div>\n                    <div><label class=\"esriSelectLabel\">${i18n.distance}</label></div>\n                  </div>\n                </td>\n                <td>\n                  <div class=\"bufferSelector\" data-dojo-attach-point=\"_Attribute\">\n                    <div class=\"bufferIcon bufferAttributeIcon\"></div>\n                    <div><label class=\"esriSelectLabel\">${i18n.field}</label></div>\n                  </div>\n                </td>\n              </tr>\n            </table>\n          </td>\n        </tr>\n        <tr>\n         <td colspan=\"2\">\n         <table style=\"width:99%;\">\n          <tr>\n          <td style=\"width:45%;\">\n            <input type=\"text\" class=\"\" data-dojo-type=\"dijit/form/ValidationTextBox\" data-dojo-props=\"intermediateChanges:true,value:'1',required:true,missingMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_bufferDist\" style=\"width:95%;\"></input>\n            <select class=\"\" data-dojo-attach-point=\"_bufferDistAttribute\" data-dojo-type=\"dijit/form/Select\" style=\"display:none; width:95%;table-layout:fixed;\"></select>\n          </td>\n          <td style=\"width:55%;\"> \n            <!-- Default, Centimeters, DecimalDegrees, Feet, Inches, Kilometers, Meters, Miles, Millimeters, NauticalMiles, Points, Yards -->\n            <select class=\"mediumInput esriAnalysisSelect\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_bufferUnits\" style=\"width:105%;table-layout:fixed;\">\n              <option value=\"Miles\">${i18n.miles}</option>\n              <option value=\"Yards\">${i18n.yards}</option>\n              <option value=\"Feet\">${i18n.feet}</option>\n              <option type=\"separator\"></option>\n              <option value=\"Kilometers\">${i18n.kilometers}</option>\n              <option value=\"Meters\">${i18n.meters}</option>\n              <option value=\"NauticalMiles\">${i18n.nautMiles}</option>\n            </select>\n          </td>\n          </tr>\n          <tr>\n            <td class=\"shortTextInput\" colspan=\"2\" align=\"center\" data-dojo-attach-point=\"_sizeHelp\">\n              <label class=\"esriSmallLabel\">${i18n.sizeHelp}</label>\n            </td>\n          </tr>\n         </table>\n         </td>\n        </tr>\n\n        <tr data-dojo-attach-point=\"_optionsRow\">\n          <td colspan=\"2\" style=\"padding:5px 0px;\">\n            <div class=\"optionsClose\" style=\"width:99%\" data-dojo-attach-point=\"_optionsDiv\">\n              <div class=\"dijitTreeExpando\" data-dojo-attach-event=\"onclick:_handleOptionsBtnClick\"><label class=\"esriLeadingMargin2 noWrapLabel\">${i18n.optionsLabel}</label></div>\n              <a style=\"position:relative; top:-16px; left:1px; \"href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_bufferOptionsHelpLink\" esriHelpTopic=\"BufferOptionPoly\"></a>\n              <table class=\"esriFormTable optionsTable\">\n                <tbody>\n\n                <tr>\n                  <td colspan=\"2\" align=\"\">\n                    <div class=\"esriFloatLeading esriLeadingMargin2\">${i18n.typeLabel}</div>\n                  </td>\n                </tr> \n\n                <tr>\n                  <td>\n                    <table>\n                      <tr>\n                        <td>\n                          <div class=\"esriLeadingMargin4 bufferSelector selected\" data-dojo-attach-point=\"_Overlap\">\n                            <div class=\"bufferIcon bufferOverlapIcon\"></div>\n                            <div><label class=\"esriSelectLabel\">${i18n.overlap}</label></div>\n                          </div>\n                        </td>\n                        <td>\n                          <div class=\"bufferSelector\" data-dojo-attach-point=\"_Dissolve\">\n                            <div class=\"bufferIcon bufferDissolveIcon\"></div>\n                            <div><label class=\"esriSelectLabel\">${i18n.dissolve}</label></div>\n                          </div>\n                        </td>\n                      </tr>\n                    </table>\n                  </td>\n                </tr>\n\n                <tr>\n                  <td colspan=\"2\" align=\"\">\n                    <table data-dojo-attach-point=\"polygonTypes\" style=\"display:none;\">\n                      <tr>\n                        <td colspan=\"2\" align=\"\">\n                          <div class=\"esriFloatLeading esriLeadingMargin2\">${i18n.areaofInputPoly}</div>\n                        </td>\n                      </tr>\n                      <tr>\n                        <td>\n                          <table>\n                            <tr>\n                              <td>\n                                <div class=\"esriLeadingMargin4 bufferSelector selected\" data-dojo-attach-point=\"_Include\">\n                                  <div class=\"bufferIcon bufferIncludeIcon\"></div>\n                                  <div><label class=\"esriSelectLabel\">${i18n.include}</label></div>\n                                </div>\n                              </td>\n                              <td>\n                                <div class=\"bufferSelector\" data-dojo-attach-point=\"_Exclude\">\n                                  <div class=\"bufferIcon bufferExcludeIcon\"></div>\n                                  <div><label class=\"esriSelectLabel\">${i18n.exclude}</label></div>\n                                </div>\n                              </td>\n                            </tr>\n                          </table>\n                        </td>\n                      </tr>\n                    </table>\n                  </td>\n                </tr>\n\n\n\n                <tr>\n                  <td colspan=\"2\">\n                    <div>\n                    <table data-dojo-attach-point=\"sideTypes\" style=\"display:none;\">\n                      <tr>\n                        <td align=\"center\" colspan=\"3\">\n                          <div class=\"esriFloatLeading esriLeadingMargin2\">${i18n.sideType}</div>\n                        </td>\n                      </tr>\n                      <tr>\n                          <td>\n                            <div class=\"esriLeadingMargin4 bufferSelector selected\" data-dojo-attach-point=\"_Around\">\n                              <div class=\"bufferIcon bufferAroundIcon\"></div>\n                              <div><label class=\"esriSelectLabel\">${i18n.around}</label></div>\n                            </div>\n                          </td>\n                          <td>\n                            <div class=\"bufferSelector\" data-dojo-attach-point=\"_Left\" >\n                              <div class=\"bufferIcon bufferLeftIcon\"></div>\n                              <div><label class=\"esriSelectLabel\">${i18n.left}</label></div>\n                            </div>\n                          </td>\n                          <td>\n                            <div class=\"bufferSelector\" data-dojo-attach-point=\"_Right\">\n                              <div class=\"bufferIcon bufferRightIcon\"></div>\n                              <div><label class=\"esriSelectLabel\">${i18n.right}</label></div>\n                            </div>\n                          </td>\n                      </tr>\n                     </table>\n                    </div>\n                    <div>\n                     <table data-dojo-attach-point=\"endTypes\" style=\"display:none;\">\n                      <tr>\n                        <td align=\"center\" colspan=\"2\">\n                          <div class=\"esriFloatLeading esriLeadingMargin2\">${i18n.endType}</div>\n                        </td>\n                      </tr>\n                      <tr>\n                          <td>\n                            <div class=\"esriLeadingMargin4 bufferSelector selected\" data-dojo-attach-point=\"_Round\" >\n                              <div class=\"bufferIcon bufferRoundIcon\"></div>\n                              <div><label class=\"esriSelectLabel\">${i18n.round}</label></div>\n                            </div>\n                          </td>\n                          <td>\n                            <div class=\"bufferSelector\" data-dojo-attach-point=\"_Flat\">\n                              <div class=\"bufferIcon bufferFlatIcon\"></div>\n                              <div><label class=\"esriSelectLabel\">${i18n.flat}</label></div>\n                            </div>\n                          </td>\n                      </tr>\n                    </table>\n                    </div>\n                  </td>\n                </tr>\n\n                <tr>\n                  <td colspan=\"2\" align=\"center\">\n                    <table data-dojo-attach-point=\"ringTypes\" style=\"display:none;\">\n                      <tr>\n                        <td colspan=2 align=\"center\">\n                          <div class=\"esriFloatLeading esriLeadingMargin2\">${i18n.multipleDistance}</div>\n                        </td>\n                      </tr>\n                      <tr>\n                          <td>\n                            <div>\n                            <table>\n                            <tr>\n                            <td>\n                              <div class=\"esriLeadingMargin4 bufferSelector selected\" data-dojo-attach-point=\"_Rings\">\n                                <div class=\"bufferIcon bufferRingsIcon\"></div>\n                                <div><label class=\"esriSelectLabel\">${i18n.rings}</label></div>\n                              </div>\n                            </td>\n                            <td>\n                              <div class=\"bufferSelector\" data-dojo-attach-point=\"_Disks\">\n                                <div class=\"bufferIcon bufferDisksIcon\"></div>\n                                <div><label class=\"esriSelectLabel\">${i18n.disks}</label></div>\n                              </div>\n                            </td>\n                            </tr>\n                            </table>\n                            </div>\n                          </td>  \n                      </tr>\n                    </table>\n                  </td>\n                </tr>\n    \n\n\n                </tbody>\n              </table>\n            </div>\n          </td>\n        </tr>\n    \n        <tr>\n          <td  class=\"longTextInput\" style=\"padding:5px 0px;\">\n            <label data-dojo-attach-point=\"_labelOne\" class=\"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel\">${i18n.twoLabel}</label>\n            <label data-dojo-attach-point=\"_polylabel\" class=\"\">${i18n.resultLabel}</label>\n          </td>\n          <td>\n            <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"BufferLayer\"></a>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" class=\"longInput\" data-dojo-props=\"required:true,trim:true\" data-dojo-attach-point=\"outputLayerInput\"  value=\"\">\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"3\">\n             <div data-dojo-attach-point=\"_chooseFolderRow\">\n               <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\n               <input class=\"longInput\" dojoAttachPoint=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\" style=\"width:60%;height:auto\"></input>\n             </div>              \n          </td>\n        </tr>         \n       </tbody>\n      </table>\n\n    </div>\n    <div data-dojo-attach-point=\"_bufferToolContentButtons\" style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\n      <div class=\"esriExtentCreditsCtr\">\n        <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\n       <label data-dojo-attach-point=\"_chooseExtentDiv\" class=\"esriSelectLabel esriExtentLabel\">\n         <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\n           ${i18n.useMapExtent}\n       </label>\n      </div>\n      <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" class=\"esriLeadingMargin4 esriAnalysisSubmitButton\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\n          ${i18n.runAnalysis}\n      </button>\n    </div>\n    <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\n      <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\n    </div>    \n</div>\n"}});
//>>built
define("esri/dijit/analysis/CreateBuffers", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/json", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dojo/number", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "dijit/Dialog", "../../kernel", "../../lang", "./AnalysisBase", "./utils", "./CreditEstimator", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/CreateBuffers.html"], function(p, q, d, g, e, f, z, A, h, b, n, B, C, c, k, r, s, t, u, v, D, E, F, G, H, I, J, K, L, M, N, l, w, m, O, x, y) {
    return q([r, s, t, u, v, w], {
        declaredClass: "esri.dijit.analysis.CreateBuffers",
        templateString: y,
        basePath: p.toUrl("."),
        widgetsInTemplate: !0,
        inputLayer: null,
        inputType: null,
        outputLayerName: null,
        bufferDistance: null,
        units: null,
        showSelectFolder: !1,
        showChooseExtent: !0,
        showHelp: !0,
        showCredits: !0,
        returnFeatureCollection: !1,
        i18n: null,
        toolName: "CreateBuffers",
        helpFileName: "CreateBuffers",
        resultParameter: "BufferLayer",
        constructor: function(a,
            b) {
            this._pbConnects = [];
            a.containerNode && (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments);
            g.forEach(this._pbConnects, e.disconnect);
            delete this._pbConnects
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            d.mixin(this.i18n, x.bufferTool)
        },
        postCreate: function() {
            this.inherited(arguments);
            c.add(this._form, "esriSimpleForm");
            this.outputLayerInput.set("validator", d.hitch(this, this.validateServiceName));
            this._buildUI()
        },
        startup: function() {},
        _onClose: function(a) {
            a && (this._save(),
                this.emit("save", {
                    save: !0
                }));
            this.emit("close", {
                save: a
            })
        },
        _toUpperFirstLetter: function(a) {
            return a.slice(0, 1).toUpperCase() + a.slice(1)
        },
        _handleSaveBtnClick: function(a) {
            a = {};
            var b = {},
                c;
            if (this._form.validate()) {
                this._saveBtn.set("disabled", !0);
                a.InputLayer = f.toJson(m.constructAnalysisInputLyrObj(this.inputLayer));
                a.DissolveType = this._DissolveType && "dissolve" === this._DissolveType ? "Dissolve" : "None";
                "attribute" === this.bufferDistType ? a.Field = this._bufferDistAttribute.get("value") : a.Distances = this.bufferDistance;
                a.Units = this._bufferUnits.get("value");
                this.bufferDistance.length && (this._RingType || (this._RingType = "rings"), a.RingType = "rings" === this._RingType ? "Rings" : "Disks");
                if ("esriGeometryPolyline" === this.inputLayer.geometryType || "esriGeometryPolygon" === this.inputLayer.geometryType) a.SideType = "esriGeometryPolyline" === this.inputLayer.geometryType ? this._SideType && "left" === this._SideType ? "Left" : this._SideType && "right" === this._SideType ? "Right" : "Full" : this._SideType && "outside" === this._SideType ? "Outside" : "Full",
                    a.EndType = this._EndType && "flat" === this._EndType ? "Flat" : "Round";
                this.returnFeatureCollection || (a.OutputName = f.toJson({
                    serviceProperties: {
                        name: this.outputLayerInput.get("value")
                    }
                }));
                this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = f.toJson({
                    extent: this.map.extent._normalize(!0)
                }));
                this.returnFeatureCollection && (c = {
                    outSR: this.map.spatialReference
                }, this.showChooseExtent && (c.extent = this.map.extent._normalize(!0)), a.context = f.toJson(c));
                b.jobParams = a;
                b.itemParams = {
                    description: h.substitute(this.i18n.itemDescription, {
                        layername: this.inputLayer.name,
                        distance_field: a.Distances || a.Field,
                        units: a.Units
                    }),
                    tags: h.substitute(this.i18n.itemTags, {
                        layername: this.inputLayer.name
                    }),
                    snippet: this.i18n.itemSnippet
                };
                this.showSelectFolder && (b.itemParams.folder = this._webMapFolderSelect.item ? this.folderStore.getValue(this._webMapFolderSelect.item, "id") : "");
                this.execute(b)
            }
        },
        _handleLayerChange: function(a) {},
        _handleRadiusTypeChange: function(a) {
            this.bufferDistType = a;
            c.remove(this._Distance, "selected");
            c.remove(this._Attribute, "selected");
            var d = this._bufferDist.get("value").split(" ");
            "attribute" === a ? (b.set(this._bufferDistAttribute.domNode, "display", "block"), b.set(this._bufferDist.domNode, "display", "none"), b.set(this._sizeHelp, "visibility", "hidden"), b.set(this.ringTypes, "display", "none"), "polygon" === this.inputType ? (b.set(this.polygonTypes, "display", "block"), b.set(this.sideTypes, "display", "none"), b.set(this.endTypes, "display", "none")) : "line" === this.inputType && (b.set(this.sideTypes, "display", "block"), b.set(this.endTypes, "display", "block"),
                b.set(this.polygonTypes, "display", "none")), c.add(this._Attribute, "selected")) : "distance" === a && (b.set(this._bufferDistAttribute.domNode, "display", "none"), b.set(this._bufferDist.domNode, "display", "block"), b.set(this._sizeHelp, "visibility", "visible"), c.add(this._Distance, "selected"), 1 < d.length ? (b.set(this.ringTypes, "display", "block"), b.set(this.sideTypes, "display", "none"), b.set(this.endTypes, "display", "none"), b.set(this.polygonTypes, "display", "none")) : "polygon" === this.inputType ? (b.set(this.ringTypes,
                "display", "none"), b.set(this.sideTypes, "display", "none"), b.set(this.endTypes, "display", "none"), b.set(this.polygonTypes, "display", "block")) : "line" === this.inputType && (b.set(this.ringTypes, "display", "none"), b.set(this.sideTypes, "display", "block"), b.set(this.endTypes, "display", "block"), b.set(this.polygonTypes, "display", "none")))
        },
        _handleDissolveTypeChange: function(a) {
            this._DissolveType = a;
            c.remove(this._Overlap, "selected");
            c.remove(this._Dissolve, "selected");
            c.add("none" === a ? this._Overlap : this._Dissolve,
                "selected")
        },
        _handleRingTypeChange: function(a) {
            this._RingType = a;
            c.remove(this._Rings, "selected");
            c.remove(this._Disks, "selected");
            c.add("rings" === a ? this._Rings : this._Disks, "selected")
        },
        _handlePolygonTypeChange: function(a) {
            this._SideType = a;
            c.remove(this._Include, "selected");
            c.remove(this._Exclude, "selected");
            c.add("full" === a ? this._Include : this._Exclude, "selected")
        },
        _handleSideTypeChange: function(a, b) {
            this._SideType = b;
            c.remove(this._Around, "selected");
            c.remove(this._Left, "selected");
            c.remove(this._Right,
                "selected");
            c.add(a, "selected")
        },
        _handleEndTypeChange: function(a) {
            this._EndType = a;
            c.remove(this._Round, "selected");
            c.remove(this._Flat, "selected");
            c.add("round" === a ? this._Round : this._Flat, "selected")
        },
        _handleOptionsBtnClick: function() {
            c.contains(this._optionsDiv, "disabled") || (c.contains(this._optionsDiv, "optionsClose") ? (c.remove(this._optionsDiv, "optionsClose"), c.add(this._optionsDiv, "optionsOpen")) : c.contains(this._optionsDiv, "optionsOpen") && (c.remove(this._optionsDiv, "optionsOpen"), c.add(this._optionsDiv,
                "optionsClose")))
        },
        _handleDistanceChange: function() {
            var a = d.trim(this._bufferDist.get("value")).split(" "),
                c = [];
            1 < a.length ? (b.set(this.ringTypes, "display", "block"), b.set(this.sideTypes, "display", "none"), b.set(this.endTypes, "display", "none"), b.set(this.polygonTypes, "display", "none")) : ("line" === this.inputType ? (b.set(this.sideTypes, "display", "block"), b.set(this.endTypes, "display", "block")) : "polygon" === this.inputType && b.set(this.polygonTypes, "display", "block"), b.set(this.ringTypes, "display", "none"));
            g.forEach(a, function(a) {
                c.push(k.parse(a))
            });
            this.bufferDistance = c
        },
        _handleShowCreditsClick: function(a) {
            a.preventDefault();
            a = {};
            if (this._form.validate()) {
                a.InputLayer = f.toJson(m.constructAnalysisInputLyrObj(this.inputLayer));
                a.DissolveType = this._DissolveType && "dissolve" === this._DissolveType ? "Dissolve" : "None";
                "attribute" === this.bufferDistType ? a.Field = this._bufferDistAttribute.get("value") : a.Distances = f.toJson(this.bufferDistance);
                a.Units = this._bufferUnits.get("value");
                this.bufferDistance.length && (this._RingType ||
                    (this._RingType = "rings"), a.RingType = "rings" === this._RingType ? "Rings" : "Disks");
                if ("esriGeometryPolyline" === this.inputLayer.geometryType || "esriGeometryPolygon" === this.inputLayer.geometryType) a.SideType = "esriGeometryPolyline" === this.inputLayer.geometryType ? this._SideType && "left" === this._SideType ? "Left" : this._SideType && "right" === this._SideType ? "Right" : "Full" : this._SideType && "outside" === this._SideType ? "Outside" : "Full", a.EndType = this._EndType && "flat" === this._EndType ? "Flat" : "Round";
                this.returnFeatureCollection ||
                    (a.OutputName = f.toJson({
                        serviceProperties: {
                            name: this.outputLayerInput.get("value")
                        }
                    }));
                this.showChooseExtent && this._useExtentCheck.get("checked") && (a.context = f.toJson({
                    extent: this.map.extent._normalize(!0)
                }));
                console.log(a);
                this.getCreditsEstimate(this.toolName, a).then(d.hitch(this, function(a) {
                    this._usageForm.set("content", a);
                    this._usageDialog.show()
                }))
            }
        },
        _save: function() {},
        _buildUI: function() {
            this._loadConnections();
            m.initHelpLinks(this.domNode, this.showHelp);
            this.inputLayer && (n.set(this._bufferToolDescription,
                "innerHTML", h.substitute(this.i18n.bufferDefine, {
                    layername: this.inputLayer.name
                })), this.outputLayerInput.set("value", h.substitute(this.i18n.outputLayerName, {
                layername: this.inputLayer.name
            })), g.forEach(this.inputLayer.fields, function(a) {
                if ("esriFieldTypeDouble" === a.type || "esriFieldTypeInteger" === a.type || "esriFieldTypeSmallInteger" === a.type || "esriFieldTypeSingle" === a.type) this._bufferDistAttribute.addOption({
                    value: a.name,
                    label: l.isDefined(a.alias) && "" !== a.alias ? a.alias : a.name
                })
            }, this), n.set(this._bufferOptionsHelpLink,
                "esriHelpTopic", "polygon" === this.inputType ? "OptionPoly" : "line" === this.inputType ? "OptionLine" : "OptionPoint"));
            this._bufferDist.set("validator", d.hitch(this, this.validateDistance));
            this.bufferDistance ? this._bufferDist.set("value", this.bufferDistance.toString().replace(/,/g, " ")) : (this.bufferDistance = [], this.bufferDistance.push(this._bufferDist.get("value")));
            "line" === this.inputType ? (b.set(this.sideTypes, "display", "block"), b.set(this.endTypes, "display", "block")) : "polygon" === this.inputType && b.set(this.polygonTypes,
                "display", "block");
            this.outputLayerName && this.outputLayerInput.set("value", this.outputLayerName);
            this.units && this._bufferUnits.set("value", this.units);
            b.set(this._chooseFolderRow, "display", !0 === this.showSelectFolder ? "block" : "none");
            this.showSelectFolder && this.getFolderStore().then(d.hitch(this, function(a) {
                this.folderStore = a;
                this._webMapFolderSelect.set("store", a);
                this._webMapFolderSelect.set("value", this.portalUser.username)
            }));
            b.set(this._chooseExtentDiv, "display", !0 === this.showChooseExtent ? "block" :
                "none");
            b.set(this._showCreditsLink, "display", !0 === this.showCredits ? "block" : "none")
        },
        validateDistance: function() {
            var a = this,
                b, c = [],
                e, f;
            this._handleDistanceChange();
            b = d.trim(this._bufferDist.get("value")).split(" ");
            if (0 === b.length) return !1;
            g.forEach(b, function(b) {
                b = k.parse(b);
                if (isNaN(b)) return c.push(0), !1;
                e = k.format(b, {
                    locale: "root"
                });
                l.isDefined(e) ? l.isDefined(e) || (e = k.format(b, {
                    locale: "en-us"
                })) : e = k.format(b, {
                    locale: "en"
                });
                l.isDefined(e) && (f = d.trim(e).match(/\D/g));
                f && g.forEach(f, function(b) {
                    "." ===
                    b || "," === b ? c.push(1) : "-" === b && "polygon" === a.inputType ? c.push(1) : c.push(0)
                })
            });
            return -1 !== g.indexOf(c, 0) ? !1 : !0
        },
        _loadConnections: function() {
            this.on("start", d.hitch(this, "_onClose", !0));
            this._connect(this._closeBtn, "onclick", d.hitch(this, "_onClose", !1));
            e.connect(this._Distance, "onclick", d.hitch(this, "_handleRadiusTypeChange", "distance"));
            e.connect(this._Attribute, "onclick", d.hitch(this, "_handleRadiusTypeChange", "attribute"));
            e.connect(this._Overlap, "onclick", d.hitch(this, "_handleDissolveTypeChange",
                "none"));
            e.connect(this._Dissolve, "onclick", d.hitch(this, "_handleDissolveTypeChange", "dissolve"));
            e.connect(this._Include, "onclick", d.hitch(this, "_handlePolygonTypeChange", "full"));
            e.connect(this._Exclude, "onclick", d.hitch(this, "_handlePolygonTypeChange", "outside"));
            e.connect(this._Rings, "onclick", d.hitch(this, "_handleRingTypeChange", "rings"));
            e.connect(this._Disks, "onclick", d.hitch(this, "_handleRingTypeChange", "disks"));
            e.connect(this._Around, "onclick", d.hitch(this, "_handleSideTypeChange", this._Around,
                "full"));
            e.connect(this._Left, "onclick", d.hitch(this, "_handleSideTypeChange", this._Left, "left"));
            e.connect(this._Right, "onclick", d.hitch(this, "_handleSideTypeChange", this._Right, "right"));
            e.connect(this._Round, "onclick", d.hitch(this, "_handleEndTypeChange", "round"));
            e.connect(this._Flat, "onclick", d.hitch(this, "_handleEndTypeChange", "flat"))
        },
        _setAnalysisGpServerAttr: function(a) {
            a && (this.analysisGpServer = a, this.set("toolServiceUrl", this.analysisGpServer + "/" + this.toolName))
        },
        _setInputLayerAttr: function(a) {
            "esriGeometryPolygon" ===
            a.geometryType ? (this.inputLayer = a, this.inputType = "polygon") : "esriGeometryPolyline" === a.geometryType ? (this.inputLayer = a, this.inputType = "line") : "esriGeometryPoint" === a.geometryType && (this.inputLayer = a, this.inputType = "point")
        },
        _setLayerAttr: function(a) {
            "esriGeometryPolygon" === a.geometryType ? this.inputType = "polygon" : "esriGeometryPolyline" === a.geometryType ? this.inputType = "line" : "esriGeometryPoint" === a.geometryType && (this.inputType = "point");
            this.inputLayer = a
        },
        _setLayersAttr: function(a) {
            this._setLayerAttr(a)
        },
        _setDisableRunAnalysisAttr: function(a) {
            this._saveBtn.set("disabled", a)
        },
        validateServiceName: function(a) {
            var b = /(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(a);
            return 0 === a.length || 0 === h.trim(a).length ? (this.outputLayerInput.set("invalidMessage", this.i18n.requiredValue), !1) : b ? (this.outputLayerInput.set("invalidMessage", this.i18n.invalidServiceName), !1) : 98 < a.length ? (this.outputLayerInput.set("invalidMessage", this.i18n.invalidServiceNameLength), !1) : !0
        },
        _setShowSelectFolderAttr: function(a) {
            this.showSelectFolder =
                a
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
        _setShowHelpAttr: function(a) {
            this.showHelp = a
        },
        _getShowHelpAttr: function() {
            return this.showHelp
        },
        _setShowChooseExtentAttr: function(a) {
            this.showChooseExtent = a
        },
        _getShowChooseExtentAttr: function() {
            return this.showChooseExtent
        },
        _setShowCreditsAttr: function(a) {
            this.showCredits = a
        },
        _getShowCreditsAttr: function() {
            return this.showCredits
        },
        _setUnitsAttr: function(a) {
            this.units =
                a
        },
        _getUnitsAttr: function() {
            return this.units = this._bufferUnits.get("value")
        },
        _setReturnFeatureCollectionAttr: function(a) {
            this.returnFeatureCollection = a
        },
        _getReturnFeatureCollectionAttr: function() {
            return this.returnFeatureCollection
        },
        _connect: function(a, b, c) {
            this._pbConnects.push(e.connect(a, b, c))
        }
    })
});