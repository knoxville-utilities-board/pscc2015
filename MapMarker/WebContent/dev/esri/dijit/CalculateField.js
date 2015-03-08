require({cache:{
'url:esri/dijit/templates/CalculateField.html':"<div class=\"esriCalcField\" style=\"width:100%;height:100%\">\n  <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"width:99%;margin-top:0.5em; margin-bottom: 0.5em;\">\n    <div data-dojo-attach-point=\"_header\" class=\"esriCalcTitleLabel\">\n       <div class=\"esriAlignLeading\">${i18n.expBuilderTitle}</div>\n    </div>\n    <div style=\"clear:both; border-bottom: #CCC thin solid;height:4%;max-height:4em;width:100%;\"></div>\n  </div>  \n  <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_expressionForm\" style=\"height:100%;width:99%;\">\n    <div class=\"esriFloatLeading\" data-dojo-attach-point=\"_selCalcFieldDiv\" style=\"width:100%;padding-bottom:0.5em;\">\n      <div><label class=\"esriLeadingMargin1\">${i18n.selectCalField}</label></div>\n      <select class=\"esriLeadingMargin1\" style=\"width:50%;\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-point=\"_selCalcField\"></select>\n    </div>\n    <div style=\"width:100%;padding-bottom:0.5em;\" class=\"esriFloatLeading\">\n      <label class=\"esriLeadingMargin1\" data-dojo-attach-point=\"_calcFieldLabel\"></label>\n    </div>\n    <input class=\"esriFloatLeading esriLeadingMargin1\" style=\"width:95%;\" data-dojo-type=\"dijit/form/SimpleTextarea\" data-dojo-attach-point=\"_exprBox\" data-dojo-props=\"rows:4 ,cols:2,required:true,intermediateChanges:true\"></input>  \n    <div class=\"esriFloatLeading\" style=\"width:100%;padding-bottom:0.5em;padding-top:0.75em;\">\n      <div class=\"esriFloatLeading esriLeadingMargin1\" style=\"width:70%;padding-bottom:0.5em;\" data-dojo-attach-point=\"_operatorCtr\"></div>\n      <div data-dojo-type=\"dijit/form/Button\" class=\"esriActionButton esriFloatTrailing esriTrailingMargin1\" data-dojo-props=\"label:'${i18n.remove}',iconClass:'esriCalcFieldClearIcon',showLabel: false, disabled:true\" data-dojo-attach-event=\"onClick:_handleRemoveBtnClick\" data-dojo-attach-point=\"_removeBtn\"></div>\n      <div data-dojo-type=\"dijit/form/Button\" class=\"esriActionButton esriFloatTrailing esriTrailingMargin1\" data-dojo-props=\"label:'${i18n.validate}',iconClass:'esriCalcFieldValidateIcon',showLabel: false, disabled:true\" data-dojo-attach-event=\"onClick:_handleValidationBtnClick\" data-dojo-attach-point=\"_validateBtn\"></div>\n    </div>    \n    <div style=\"clear:both;padding-top:0.5em;padding-bottom:0.5em;width:100%;height:65%;\">\n      <div class=\"esriFloatLeading\"  style=\"width:50%;height:100%\">\n        <div style=\"padding-bottom:0.5em;\"><label class=\"esriLeadingMargin1 esriCalcTitleLabel\">${i18n.fields}</label></div>\n        <div style=\"width:100%;padding-bottom:0.5em;\">\n          <label class=\"esriLeadingMargin1 esriSelectLabel esriTrailingMargin05\">\n            <input type=\"radio\" data-dojo-type=\"dijit/form/RadioButton\" data-dojo-attach-point=\"_strRadioBtn\" data-dojo-props=\"'class':'esriSelectLabel'\" name=\"functionType\" value=\"StrType\"/>\n            ${i18n.stringLabel}\n          </label>\n          <label class=\"esriSelectLabel esriTrailingMargin05\">\n            <input type=\"radio\" data-dojo-type=\"dijit/form/RadioButton\" data-dojo-attach-point=\"_numRadioBtn\" data-dojo-props=\"'class':'esriSelectLabel'\" name=\"functionType\" value=\"NumType\"/> \n            ${i18n.numeric}\n          </label>        \n          <label class=\"esriSelectLabel\">\n            <input type=\"radio\" data-dojo-type=\"dijit/form/RadioButton\" data-dojo-attach-point=\"_dateRadioBtn\"  data-dojo-props=\"'class':'esriSelectLabel'\" name=\"functionType\" value=\"DateType\"/> \n            ${i18n.dateLabel}\n          </label>        \n        </div>        \n        <div class=\"esriLeadingMargin1\" data-dojo-attach-point=\"_attributeListCtr\" style=\"width:70%;height:85%;overflow-y:auto;\">\n        </div>\n      </div>    \n      <div class=\"esriFloatTrailing\" style=\"width:50%;height:100%\">\n        <div style=\"padding-bottom:2em;\">\n          <label class=\"esriCalcTitleLabel\">${i18n.functions}</label>\n        </div>\n        <div data-dojo-attach-point=\"_helpersListCtr\"  style=\"width:90%;height:85%;overflow-y:auto;\">\n        </div>\n      </div>\n    </div>\n    <div class=\"esriLeadingMargin05 esriFormWarning esriRoundedBox\" data-dojo-attach-point=\"_errorMessagePane\" style=\"clear:both;display:none;height:3em;overflow-y:auto;padding:0.5em;\">\n      <a href=\"#\" title=\"${i18n.close}\" class=\"esriFloatTrailing closeIcon\" title='${i18n.close}' data-dojo-attach-event=\"onclick:_handleCloseMsg\">\n      </a>\n      <span data-dojo-attach-point=\"_bodyNode\" style=\"width:100%;height:100%;\"></span>\n    </div>\n    <div style=\"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;\"></div>\n    <div  class=\"esriFloatTrailing esriTrailingMargin2\" data-dojo-attach-point=\"_buttonCtr\" style=\"padding:1em 0\">\n      <div data-dojo-type=\"dijit/form/Button\"  class=\"${addButtonClass}\" data-dojo-attach-point=\"_addBtn\" data-dojo-attach-event=\"onClick:_handleAddButtonClick\">\n        ${i18n.calculate}\n      </div>\n       <div data-dojo-type=\"dijit/form/Button\" class=\"esriLeadingMargin05 ${closeButtonClass}\" data-dojo-attach-point=\"_closeBtn\" data-dojo-attach-event=\"onClick:_handleCloseButtonClick\">\n        ${i18n.close}\n      </div>\n    </div>\n  </div>\n  <div class=\"dijitDialogUnderlayWrapper\" data-dojo-attach-point=\"_underlay\" style=\"position:absolute;z-index:949;display:none;top:0px;left:0px;width:100%;height:100%;\">\n    <div class=\"dijitDialogUnderlay\" tabindex=\"-1\" style=\"width:100%;height:100%\"></div>\n    <div class=\"esriLoadingLarge\" style=\"height:100%;\"></div>\n  </div>\n</div>  \n"}});
//>>built
define("esri/dijit/CalculateField", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/json", "dojo/_base/kernel", "dojo/_base/fx", "dojo/has", "dojo/json", "dojo/string", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/query", "dojo/dom-class", "dojo/_base/event", "dojo/Evented", "dojo/fx/easing", "dojo/store/Memory", "dojo/mouse", "dojo/on", "dojo/_base/window", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/_OnDijitClickMixin", "dijit/_FocusMixin", "dijit/registry", "dijit/form/Button", "dijit/form/CheckBox", "dijit/form/Form", "dijit/form/Select", "dijit/form/MultiSelect", "dijit/form/TextBox", "dijit/form/SimpleTextarea", "dijit/form/ValidationTextBox", "dijit/layout/ContentPane", "dijit/form/ComboBox", "dijit/Dialog", "dijit/Tooltip", "dgrid/OnDemandList", "dgrid/Selection", "dgrid/Keyboard", "dgrid/extensions/DijitRegistry", "dgrid/util/mouse", "put-selector/put", "../kernel", "../lang", "../request", "./SingleFilter", "dojo/i18n!../nls/jsapi", "dojo/text!./templates/CalculateField.html"], function(D, t, d, f, R, u, m, v, S, T, e, h, p, g, U, V, w, E, x, q, y, z, A, F, G, H, I, J, W, K, X, Y, Z, $, aa, ba, ca, da, ea, fa, r, L, M, N, O, n, ga, s, P, B, ha, k, Q) {
    var C = t([L, N, M, O]);
    return t([F, G, H, I, J, E], {
        declaredClass: "esri.dijit.CalculateField",
        templateString: Q,
        basePath: D.toUrl("."),
        widgetsInTemplate: !0,
        showSelectField: !1,
        showHeader: !0,
        closeOnAdd: !0,
        addButtonClass: "",
        closeButtonClass: "",
        _showMsgTimerInterval: 3E3,
        constructor: function(a) {
            a.containerNode && (this.container = a.containerNode)
        },
        destroy: function() {
            this.inherited(arguments)
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            this.i18n = {};
            d.mixin(this.i18n, k.common);
            d.mixin(this.i18n, k.calculateFields)
        },
        postCreate: function() {
            this.inherited(arguments);
            this._buildUI();
            this._loadEvents();
            var a = ["ar", "he"],
                b, c;
            this.onlineHelpMap = {};
            for (b = 0; b < a.length; b += 1) c = a[b], m.locale && -1 !== m.locale.indexOf(c) && (-1 !== m.locale.indexOf("-") ? -1 !== m.locale.indexOf(c + "-") && (this._isRightToLeft = !0) : this._isRightToLeft = !0);
            this.validate()
        },
        _buildUI: function() {
            var a = [],
                b;
            h.set(this._header,
                "display", this.showHeader ? "block" : "none");
            h.set(this._selCalcFieldDiv, "display", this.showSelectField ? "block" : "none");
            this.field && (b = f.filter(this.layer.fields, function(a) {
                return a.name === this.field
            }, this), this._calcField = b = b[0], p.set(this._calcFieldLabel, "innerHTML", e.substitute(this.i18n.exprLabel, {
                fieldName: b.name
            })));
            if (!this.helperMethods || this.helperMethods && 0 === this.helperMethods.length) b = [{
                type: "NumType",
                label: e.substitute(this.i18n.absFunc, {
                    functionName: "ABS(\x3ci\x3enumber\x3c/i\x3e)",
                    num: "\x3ci\x3enumber\x3c/i\x3e"
                }),
                name: "ABS()"
            }, {
                type: "NumType",
                label: e.substitute(this.i18n.castFunc, {
                    functionName: "CAST(\x3ci\x3enumber\x3c/i\x3e",
                    num: "\x3ci\x3enumber\x3c/i\x3e"
                }),
                name: "CAST()"
            }, {
                type: "NumType",
                label: e.substitute(this.i18n.ceilingFunc, {
                    functionName: "CEILING(\x3ci\x3enumber\x3c/i\x3e)",
                    num: "\x3ci\x3enumber\x3c/i\x3e"
                }),
                name: "CEILING()"
            }, {
                type: "NumType",
                label: e.substitute(this.i18n.cosFunc, {
                    functionName: "COS(\x3ci\x3enumber\x3c/i\x3e)",
                    num: "\x3ci\x3enumber\x3c/i\x3e"
                }),
                name: "COS()"
            }, {
                type: "NumType",
                label: e.substitute(this.i18n.floorFunc, {
                    functionName: "FLOOR(\x3ci\x3enumber\x3c/i\x3e)",
                    num: "\x3ci\x3enumber\x3c/i\x3e"
                }),
                name: "FLOOR()"
            }, {
                type: "NumType",
                label: e.substitute(this.i18n.logFunc, {
                    functionName: "LOG(\x3ci\x3enumber\x3c/i\x3e)",
                    num: "\x3ci\x3enumber\x3c/i\x3e"
                }),
                name: "LOG()"
            }, {
                type: "NumType",
                label: e.substitute(this.i18n.log10Func, {
                    functionName: "LOG10(\x3ci\x3enumber\x3c/i\x3e)",
                    num: "\x3ci\x3enumber\x3c/i\x3e"
                }),
                name: "LOG10()"
            }, {
                type: "NumType",
                label: e.substitute(this.i18n.modFunc, {
                    functionName: "MOD(\x3ci\x3enumber\x3c/i\x3e, \x3ci\x3en\x3c/i\x3e)",
                    num: "\x3ci\x3enumber\x3c/i\x3e",
                    n: "\x3ci\x3en\x3c/i\x3e"
                }),
                name: "MOD(,)"
            }, {
                type: "NumType",
                label: e.substitute(this.i18n.powerFunc, {
                    functionName: "POWER(\x3ci\x3enumber\x3c/i\x3e, \x3ci\x3ey\x3c/i\x3e)",
                    num: "\x3ci\x3enumber\x3c/i\x3e",
                    y: "\x3ci\x3ey\x3c/i\x3e"
                }),
                name: "POWER(,)"
            }, {
                type: "NumType",
                label: e.substitute(this.i18n.roundFunc, {
                    functionName: "ROUND(\x3ci\x3enumber\x3c/i\x3e, \x3ci\x3elength\x3c/i\x3e)",
                    num: "\x3ci\x3enumber\x3c/i\x3e",
                    length: "\x3ci\x3elength\x3c/i\x3e"
                }),
                name: "ROUND(,)"
            }, {
                type: "NumType",
                label: e.substitute(this.i18n.sinFunc, {
                    functionName: "SIN(\x3ci\x3enumber\x3c/i\x3e)",
                    num: "\x3ci\x3enumber\x3c/i\x3e"
                }),
                name: "SIN()"
            }, {
                type: "NumType",
                label: e.substitute(this.i18n.tanFunc, {
                    functionName: "TAN(\x3ci\x3enumber\x3c/i\x3e)",
                    num: "\x3ci\x3enumber\x3c/i\x3e"
                }),
                name: "TAN()"
            }, {
                type: "NumType",
                label: e.substitute(this.i18n.truncateFunc, {
                    functionName: "TRUNCATE(\x3ci\x3enumber\x3c/i\x3e, \x3ci\x3edecimal_place\x3c/i\x3e)",
                    num: "\x3ci\x3enumber\x3c/i\x3e",
                    decimal_place: "\x3ci\x3edecimal_place\x3c/i\x3e"
                }),
                name: "TRUNCATE(,)"
            }, {
                type: "NumType",
                label: e.substitute(this.i18n.nullifFunc, {
                    functionName: "NULLIF(\x3ci\x3enumber\x3c/i\x3e,\x3ci\x3evalue\x3c/i\x3e)",
                    num: "\x3ci\x3enumber\x3c/i\x3e",
                    value: "\x3ci\x3evalue\x3c/i\x3e"
                }),
                name: "NULLIF(,)"
            }, {
                type: "StrType",
                label: e.substitute(this.i18n.char_lengthFunc, {
                    functionName: "CHAR_LENGTH(\x3ci\x3estring\x3c/i\x3e)",
                    str: "\x3ci\x3estring\x3c/i\x3e"
                }),
                name: "CHAR_LENGTH()"
            }, {
                type: "StrType",
                label: e.substitute(this.i18n.concatFunc, {
                    functionName: "CONCAT(\x3ci\x3estring1\x3c/i\x3e, \x3ci\x3estring2\x3c/i\x3e)"
                }),
                name: "CONCAT(,)"
            }, {
                type: "StrType",
                label: e.substitute(this.i18n.positionFunc, {
                    functionName: "POSITION(\x3ci\x3esubstring\x3c/i\x3e, \x3ci\x3estring\x3c/i\x3e)",
                    str: "\x3ci\x3estring\x3c/i\x3e"
                }),
                name: "POSITION(,)"
            }, {
                type: "StrType",
                label: e.substitute(this.i18n.lowerFunc, {
                    functionName: "LOWER(\x3ci\x3estring\x3c/i\x3e)",
                    str: "\x3ci\x3estring\x3c/i\x3e"
                }),
                name: "LOWER()"
            }, {
                type: "StrType",
                label: e.substitute(this.i18n.substringFunc, {
                    functionName: "SUBSTRING(\x3ci\x3estring\x3c/i\x3e, \x3ci\x3estart\x3c/i\x3e, \x3ci\x3elength\x3c/i\x3e)",
                    start: "\x3ci\x3estart\x3c/i\x3e",
                    length: "\x3ci\x3elength\x3c/i\x3e",
                    str: "\x3ci\x3estring\x3c/i\x3e"
                }),
                name: "SUBSTRING(,,)"
            }, {
                type: "StrType",
                label: e.substitute(this.i18n.trimFunc, {
                    functionName: "TRIM(BOTH|LEADING|TRAILING] \u2018 \u2018 FROM expression)",
                    str: "\x3ci\x3estring\x3c/i\x3e"
                }),
                name: "TRIM()"
            }, {
                type: "StrType",
                label: e.substitute(this.i18n.upperFunc, {
                    functionName: "UPPER(\x3ci\x3estring\x3c/i\x3e)",
                    str: "\x3ci\x3estring\x3c/i\x3e"
                }),
                name: "UPPER()"
            }, {
                type: "DateType",
                label: e.substitute(this.i18n.current_dateFunc, {
                    functionName: "CURRENT_DATE()"
                }),
                name: "CURRENT_DATE()"
            }, {
                type: "DateType",
                label: e.substitute(this.i18n.current_timeFunc, {
                    functionName: "CURRENT_TIME()"
                }),
                name: "CURRENT_TIME()"
            }, {
                type: "DateType",
                label: e.substitute(this.i18n.current_timestampFunc, {
                    functionName: "CURRENT_TIMESTAMP()"
                }),
                name: "CURRENT_TIMESTAMP()"
            }], f.forEach(b, function(a) {
                a.label = "\x3cb\x3e" + a.label.substring(0, a.label.lastIndexOf(":") + 1) + "\x3c/b\x3e\x3cbr/\x3e " + a.label.substring(a.label.lastIndexOf(":") + 1)
            }, this), this.set("helperMethods",
                b);
            (!this.operators || this.operators && 0 === this.operators.length) && this.set("operators", "+-/*()".split(""));
            this._operatorBtns = [];
            f.forEach(this.operators, function(a) {
                this._operatorBtns.push(new K({
                    value: a,
                    label: a,
                    style: {
                        width: "4em"
                    },
                    onClick: d.hitch(this, this._updateExpression, {
                        value: a,
                        type: "operator"
                    })
                }, g.create("div", null, this._operatorCtr)))
            }, this);
            this.layer && (this.layer.fields && 0 < this.layer.fields.length) && (a = this._createIds(this.layer.fields), b = f.map(this.layer.fields, function(a) {
                return {
                    label: a.name,
                    value: a.name
                }
            }), this._selCalcField.addOption(b), this._selCalcField.set("value", this.field));
            this.fieldsStore = new q({
                data: a
            });
            this.attributeList = new C({
                renderRow: d.hitch(this, this._renderAttributesRow),
                selectionMode: "single",
                store: this.fieldsStore
            }, this._attributeListCtr);
            a = this._createIds(this.get("helperMethods"));
            this.operatorStore = new q({
                data: a
            });
            this.helpersList = new C({
                renderRow: d.hitch(this, this._renderOperatorRow),
                selectionMode: "single",
                store: this.operatorStore
            }, this._helpersListCtr)
        },
        _loadEvents: function() {
            this.watch("fields",
                d.hitch(this, this._handleFieldsChange));
            this.watch("field", d.hitch(this, this._handleFieldChange));
            if (this.showSelectField) this._selCalcField.on("change", d.hitch(this, this._handleSelcCalFieldChange));
            this._expressionForm.watch("value", d.hitch(this, this._handleHelperTypeChange));
            this._expressionForm.on("focus", d.hitch(this, this._setfocus));
            this._exprBox.watch("value", d.hitch(this, this._handleExpChange));
            this.attributeList.on("dgrid-select", d.hitch(this, function(a) {
                this._updateExpression({
                    value: a.rows[0].data,
                    type: "field"
                })
            }));
            this.helpersList.on("dgrid-select", d.hitch(this, function(a) {
                this._updateExpression({
                    value: a.rows[0].data,
                    type: "helper"
                })
            }));
            this.attributeList.on(n.enterRow, d.hitch(this, function(a) {
                a = this.attributeList.row(a);
                var b, c;
                b = a.data.alias || a.data.name;
                c = this._getTypeLabel(a.data.type);
                this._showTooltip(a.element, "\x3cb\x3e" + b + "\x3c/b\x3e: " + c)
            }));
            this.attributeList.on(n.leaveRow, d.hitch(this, function(a) {
                a = this.attributeList.row(a);
                this._hideTooltip(a.element)
            }));
            this.helpersList.on(n.enterRow,
                d.hitch(this, function(a) {
                    a = this.helpersList.row(a);
                    this._showTooltip(a.element, a.data.label)
                }));
            this.helpersList.on(n.leaveRow, d.hitch(this, function(a) {
                a = this.helpersList.row(a);
                this._hideTooltip(a.element)
            }));
            this.attributeList.on("dgrid-refresh-complete", d.hitch(this, this._setfocus));
            this.helpersList.on("dgrid-refresh-complete", d.hitch(this, this._setfocus));
            this._exprBox.on("blur", d.hitch(this, function() {
                this._exprBox.textbox.setSelectionRange && "number" == typeof this._exprBox.textbox.selectionStart ?
                    this._exprBox.set("cursorPosition", [this._exprBox.textbox.selectionStart, this._exprBox.textbox.selectionEnd]) : this._exprBox.set("cursorPosition", this._getCursorRange(this._exprBox.textbox))
            }));
            this._exprBox.on("focus", d.hitch(this, function() {
                var a = this._exprBox.get("cursorPosition");
                a && (this._exprBox.textbox.setSelectionRange && "number" == typeof this._exprBox.textbox.selectionStart ? this._exprBox.textbox.setSelectionRange(a[1], a[1]) : this._setCaretPosition(this._exprBox.textbox, a[1], a[1]))
            }));
            z(this._calcFieldLabel,
                y.enter, d.hitch(this, function(a) {
                    a = "";
                    a = this._getTypeLabel(this._calcField.type);
                    this._showTooltip(this._calcFieldLabel, "\x3cb\x3e" + this._calcField.alias + "\x3c/b\x3e: " + a)
                }));
            z(this._calcFieldLabel, y.leave, d.hitch(this, function(a) {
                this._hideTooltip(this._calcFieldLabel)
            }))
        },
        startup: function() {
            this.inherited(arguments);
            this.attributeList.startup();
            this.helpersList.startup();
            this._setHelperType()
        },
        reset: function() {
            s.show(this.domNode);
            this._expressionForm.reset();
            this._handleCloseMsg();
            this._setHelperType()
        },
        _close: function() {
            this.emit("close", {});
            s.hide(this.domNode)
        },
        _createIds: function(a) {
            var b = [];
            a && 0 < a.length && (b = f.map(a, function(a, b) {
                return d.mixin(a, {
                    id: b
                })
            }));
            return b
        },
        _renderAttributesRow: function(a) {
            var b = g.create("div", {
                    "class": "esriCalExpRowOuter"
                }),
                c = g.create("div", {
                    "class": "esriCalcExpLabelRow"
                }, b);
            g.create("div", {
                "class": "esriCalcFieldTextTrimWithEllipses",
                innerHTML: a.name
            }, c);
            return b
        },
        _renderOperatorRow: function(a) {
            var b = g.create("div", {
                    "class": "esriCalExpRowOuter"
                }),
                c = g.create("div", {
                    "class": "esriCalcExpLabelRow"
                }, b);
            g.create("div", {
                "class": "esriCalcFieldTextTrimWithEllipses",
                innerHTML: a.name
            }, c);
            return b
        },
        _handleFieldsChange: function(a, b, c) {
            a = [];
            this.layer && (this.layer.fields && 0 < this.layer.fields.length) && (0 < this._selCalcField.getOptions().length && this._selCalcField.removeOption(this._selCalcField.getOptions()), a = this._createIds(this.layer.fields), b = f.map(this.layer.fields, function(a) {
                return {
                    label: a.name,
                    value: a.name
                }
            }), this._selCalcField.addOption(b), this._selCalcField.set("value",
                this.field));
            this.fieldsStore = new q({
                data: a
            });
            this.attributeList.set("store", this.fieldsStore)
        },
        _handleFieldChange: function(a, b, c) {
            p.set(this._calcFieldLabel, "innerHTML", e.substitute(this.i18n.exprLabel, {
                fieldName: c
            }));
            this._setHelperType();
            this._setfocus()
        },
        _setHelperType: function() {
            var a;
            this.field ? (a = f.filter(this.layer.fields, function(a) {
                return a.name === this.field
            }, this), this._calcField = a = a[0], "esriFieldTypeDate" === a.type ? this._dateRadioBtn.set("checked", !0) : "esriFieldTypeString" === a.type ? this._strRadioBtn.set("checked", !0) : -1 !== f.indexOf(["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeDouble"], a.type) && this._numRadioBtn.set("checked", !0)) : this._strRadioBtn.set("checked", !0)
        },
        _handleHelperTypeChange: function(a, b, c) {
            this.helpersList.set("query", {
                type: c.functionType
            });
            "DateType" === c.functionType ? this.attributeList.set("query", {
                type: "esriFieldTypeDate"
            }) : "StrType" === c.functionType ? this.attributeList.set("query", {
                type: "esriFieldTypeString"
            }) : "NumType" === c.functionType && this.attributeList.set("query",
                function(a) {
                    return -1 !== f.indexOf(["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeDouble"], a.type)
                });
            this.helpersList.refresh();
            this.attributeList.refresh()
        },
        _handleSelcCalFieldChange: function(a) {
            this.set("field", a)
        },
        _handleRemoveBtnClick: function() {
            this._exprBox.set("value", "");
            this._setfocus()
        },
        _handleAddButtonClick: function(a) {
            w.stop(a);
            var b = {
                    f: "json"
                },
                c;
            this._exprBox.get("value") ? (this._handleCloseMsg(), b.calcExpression = u.toJson(this.get("expression")),
                b.sqlFormat = "standard", this.layer.getDefinitionExpression && this.layer.getDefinitionExpression() ? b.where = this.layer.getDefinitionExpression() : P.isDefined(this.layer.definitionExpression) && "" !== this.layer.definitionExpression && (b.where = this.layer.definitionExpression), s.id.getCredential(this.layer.url + "/calculate").then(d.hitch(this, function(a) {
                    b.token = a.token;
                    c = B({
                        url: this.layer.url + "/calculate",
                        content: b
                    }, {
                        usePost: !0
                    });
                    this.emit("calculate-start", {
                        calcPromise: c.promise
                    });
                    this._addBtn.set("disabled", !0);
                    this._showLoading();
                    c.then(d.hitch(this, function(a) {
                        this._addBtn.set("disabled", !1);
                        this._hideLoading();
                        var c = {};
                        d.mixin(c, {
                            calcExpression: u.fromJson(b.calcExpression)[0].sqlExpression,
                            where: b.where,
                            sqlFormat: b.sqlFormat
                        }, a);
                        this.emit("calculate-success", c);
                        this.layer.refresh();
                        this._showMessages(e.substitute(this.i18n.successMsg, {
                            count: a.updatedFeatureCount
                        }), !0);
                        this.closeOnAdd && this._close()
                    }), d.hitch(this, this._handleErrorResponse))
                }), d.hitch(this, this._handleErrorResponse))) : this._addBtn.set("disabled", !0)
        },
        _handleErrorResponse: function(a) {
            this._addBtn.set("disabled", !1);
            this._hideLoading();
            this.emit("calculate-error", a);
            this._showMessages(e.substitute(this.i18n.exprFailedMsg, {
                expr: this._exprBox.get("value")
            }) + "\x3cbr/\x3e" + a.details.toString())
        },
        _handleCloseButtonClick: function(a) {
            w.stop(a);
            this._close()
        },
        _showTooltip: function(a, b) {
            var c = g.create("label", {
                innerHTML: b,
                className: "esriSmallFont"
            });
            this._isRightToLeft ? r.show(c.outerHTML, a, ["after"], !0) : r.show(c.outerHTML, a, ["after"])
        },
        _hideTooltip: function(a,
            b) {
            r.hide(a)
        },
        _setfocus: function() {
            this._exprBox.focus()
        },
        _showMessages: function(a, b) {
            p.set(this._bodyNode, "innerHTML", a);
            v.fadeIn({
                node: this._errorMessagePane,
                easing: x.quadIn,
                onEnd: d.hitch(this, function() {
                    h.set(this._errorMessagePane, {
                        display: ""
                    })
                })
            }).play();
            b && window.setTimeout(d.hitch(this, this._handleCloseMsg), this._showMsgTimerInterval)
        },
        _handleCloseMsg: function(a) {
            a && a.preventDefault();
            "none" !== h.get(this._errorMessagePane, "display") && v.fadeOut({
                node: this._errorMessagePane,
                easing: x.quadOut,
                onEnd: d.hitch(this, function() {
                    h.set(this._errorMessagePane, {
                        display: "none"
                    })
                })
            }).play()
        },
        validate: function() {
            var a = !0;
            this.layer ? this.field ? this.layer.supportsCalculate ? !this.layer.userIsAdmin && !this.layer.getEditCapabilities().canUpdate && (e.substitute(this.i18n.lyrUpdateCapMsg, {
                layername: this.layer.name
            }), a = !1) : (e.substitute(this.i18n.lyrSupportCalMsg, {
                layername: this.layer.name
            }), a = !1) : a = !1 : a = !1;
            this._addBtn.set("disabled", !a);
            return a
        },
        _validateExpObj: function(a) {
            var b = !0;
            a || (b = !1);
            b ? this._handleCloseMsg() :
                this._showMessages(void 0);
            return b
        },
        _updateExpression: function(a) {
            var b = this._exprBox.get("cursorPosition"),
                c = this._exprBox.get("value"),
                d = "",
                e = 0,
                l;
            this._validateExpObj(a) && (b || (b = [0, 0]), "operator" === a.type ? (l = " " + a.value + " ", e = l.length) : "helper" === a.type ? (l = a.value.name, e = -1 !== a.value.name.indexOf(",") ? a.value.name.indexOf(",") : a.value.name.length - 1) : "field" === a.type && (l = "esriFieldTypeDouble" === this._calcField.type && -1 !== f.indexOf(["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeSingle"],
                    a.value.type) ? "CAST(" + a.value.name + " AS FLOAT)" : a.value.name, e = l.length + 1), d = c.substring(0, b[0]) + l + c.substring(b[1]), this._exprBox.set("value", d), this._exprBox.focus(), this._exprBox.textbox.setSelectionRange && "number" == typeof this._exprBox.textbox.selectionStart ? (this._exprBox.textbox.setSelectionRange(b[0] + e, b[0] + e), this._exprBox.set("cursorPosition", [b[0] + e, b[0] + e])) : (this._setCaretPosition(this._exprBox.textbox, b[0] + e, b[0] + e), this._exprBox.set("cursorPosition", this._getCursorRange(this._exprBox.textbox))),
                this._setfocus())
        },
        _setCaretPosition: function(a, b, c) {
            a.setSelectionRange && "number" == typeof a.selectionStart ? a.setSelectionRange(b, c) : "undefined" != typeof a.createTextRange && (a = a.createTextRange(), a.collapse(!0), a.moveEnd("character", c), a.moveStart("character", b), a.select())
        },
        _getCaretPosition: function(a) {
            var b = 0;
            if (A.doc.selection) a.focus(), b = A.doc.selection.createRange(), b.moveStart("character", -a.value.length), b = b.text.length;
            else if (a.selectionStart || "number" == typeof a.selectionStart) b = a.selectionStart;
            return b
        },
        _getCursorRange: function(a) {
            var b, c;
            a.setSelectionRange && "number" == typeof a.selectionStart ? (b = a.selectionStart, c = a.selectionEnd) : "undefined" != typeof a.createTextRange && (b = this._getCaretPosition(a), c = this._getCaretPosition(a));
            return [b, c]
        },
        _handleExpChange: function(a, b, c) {
            this._addBtn.set("disabled", !c);
            this._validateBtn.set("disabled", !c);
            this._removeBtn.set("disabled", !c)
        },
        _handleValidationBtnClick: function() {
            var a = {
                    sql: this.field + " \x3d " + this._exprBox.get("value"),
                    sqlType: "where",
                    f: "json"
                },
                a = B({
                    url: this.layer.url + "/validateSQL",
                    content: a
                }, {
                    usePost: !0
                });
            this._addBtn.set("disabled", !0);
            this._validateBtn.set("disabled", !0);
            this._showLoading();
            a.then(d.hitch(this, function(a) {
                var c;
                this._hideLoading();
                this._validateBtn.set("disabled", !1);
                this._addBtn.set("disabled", !a.isValidSQL);
                a.isValidSQL ? this._handleCloseMsg() : a.validationErrors && 0 < a.validationErrors.length ? (c = "", f.forEach(a.validationErrors, function(a) {
                    if (a.params && k.calculateFields.errorCodes[a.errorCode]) {
                        var b = {},
                            d;
                        for (d in a.params) a.params.hasOwnProperty(d) &&
                            (b[d] = a.params[d]);
                        c += e.substitute(k.calculateFields.errorCodes[a.errorCode], b) + "\x3cbr/\x3e"
                    } else c += (k.calculateFields.errorCodes[a.errorCode] || a.description) + "\x3cbr/\x3e"
                }, this), this._showMessages(c, !1)) : this._showMessages(k.calculateFields.invalidExpression)
            }), d.hitch(this, function(a) {
                this._hideLoading();
                this._validateBtn.set("disabled", !1);
                this._addBtn.set("disabled", !1)
            }))
        },
        _showLoading: function() {
            h.set(this._underlay, "display", "block")
        },
        _hideLoading: function() {
            h.set(this._underlay, "display",
                "none")
        },
        _getTypeLabel: function(a) {
            var b; - 1 !== f.indexOf(["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeSingle"], a) ? b = this.i18n.integerLabel : "esriFieldTypeDouble" === a ? b = this.i18n.doubleLabel : "esriFieldTypeDate" === a ? b = this.i18n.dateLabel : "esriFieldTypeString" === a && (b = this.i18n.stringLabel);
            return b
        },
        _setLayerAttr: function(a) {
            this._set("layer", a);
            this._set("fields", a.fields)
        },
        _setFieldsAttr: function(a) {
            this._set("fields", a)
        },
        _setFieldAttr: function(a) {
            this._set("field", a)
        },
        _setHelperMethodsAttr: function(a) {
            this._set("helperMethods",
                a)
        },
        _setOperatorsAttr: function(a) {
            this._set("operators", a)
        },
        _setShowSelectFieldAttr: function(a) {
            this._set("showSelectField", a)
        },
        _setShowHeaderAttr: function(a) {
            this._set("showHeader", a)
        },
        _setCloseOnAddAttr: function(a) {
            this._set("closeOnAdd", a)
        },
        _getExpressionAttr: function() {
            var a = this._exprBox.get("value"),
                b, c;
            if (a) return a.split(" "), c = [], b = {
                field: this.field
            }, b.sqlExpression = a, c.push(b), c;
            this._addBtn.set("disabled", !0)
        },
        _setAddButtonClassAttr: function(a) {
            this._set("addButtonClass", a)
        },
        _setCloseButtonClassAttr: function(a) {
            this._set("closeButtonClass",
                a)
        }
    })
});