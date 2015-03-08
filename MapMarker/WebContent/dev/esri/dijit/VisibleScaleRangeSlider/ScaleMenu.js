require({cache:{
'url:esri/dijit/VisibleScaleRangeSlider/templates/ScaleMenu.html':"<div class=\"${baseClass}\">\n  <div class=\"${baseClass}Header\">\n    <div data-dojo-attach-point=\"dap_currentScaleLabel\" class=\"${baseClass}Item\"></div>\n    <div id=\"${id}_scaleInput\" data-dojo-attach-point=\"dap_scaleInput\" data-dojo-type=\"dijit/form/TextBox\"></div>\n    <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'${id}_scaleInput'\">${labels.customScaleInputTooltip}</div>\n  </div>\n  <hr/>\n  <ol data-dojo-attach-point=\"dap_recommendedScales\" class=\"${baseClass}List\">\n    <li data-dojo-attach-point=\"dap_currentScaleItem\" class=\"${baseClass}Item ${baseClass}Selectable\"></li>\n    <!--additional list items added dynamically-->\n  </ol>\n</div>\n"}});
//>>built
define("esri/dijit/VisibleScaleRangeSlider/ScaleMenu", ["../../domUtils", "../../kernel", "dijit/_TemplatedMixin", "dijit/_WidgetBase", "dijit/_WidgetsInTemplateMixin", "dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/dom-construct", "dojo/dom-prop", "dojo/has", "dojo/keys", "dojo/number", "dojo/on", "dojo/query", "dojo/string", "dojox/lang/functional/object", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/ScaleMenu.html", "dijit/form/TextBox"], function(d, y, m, n, p, q, r, f, s, g, z, t, h, k, u, l, v, w, x) {
    return q([n, m, p], {
        declaredClass: "esri.dijit.VisibleScaleRangeSlider.ScaleMenu",
        templateString: x,
        baseClass: "esriScaleMenu",
        labels: w.visibleScaleRangeSlider,
        _recommendedScales: {
            world: 1E8,
            continent: 5E7,
            countriesBig: 25E6,
            countriesSmall: 12E6,
            statesProvinces: 6E6,
            stateProvince: 3E6,
            counties: 15E5,
            county: 75E4,
            metropolitanArea: 32E4,
            cities: 16E4,
            city: 8E4,
            town: 4E4,
            neighborhood: 2E4,
            streets: 1E4,
            street: 5E3,
            buildings: 2500,
            building: 1250
        },
        _elementValueMap: null,
        _elements: null,
        _scaleRangeCategories: null,
        _originalScaleInputValue: null,
        buildRendering: function() {
            this.inherited(arguments);
            var a = this.labels.featuredScaleLabels,
                b = this._recommendedScales,
                c = this.baseClass + "Item " + this.baseClass + "Selectable",
                d;
            r.forEach(v.keys(b), function(e) {
                d = a[e];
                e = l.substitute(d, {
                    scaleLabel: this._formatScale(b[e])
                });
                s.create("li", {
                    innerHTML: e,
                    className: c
                }, this.dap_recommendedScales)
            }, this)
        },
        _formatScale: function(a) {
            return "1:" + h.format(a, {
                fractional: !1
            })
        },
        postCreate: function() {
            this.inherited(arguments);
            k(this.domNode, k.selector("." + this.baseClass + "Item." + this.baseClass + "Selectable", "click"), f.hitch(this, function(a) {
                this.emit("scale-selected", {
                    scale: this._parseScale(a.target.innerHTML)
                })
            }));
            this.dap_scaleInput.on("keyDown", f.hitch(this, function(a) {
                a.keyCode === t.ENTER && this._handleCustomScaleInput()
            }))
        },
        _handleCustomScaleInput: function() {
            var a = this._parseScale(this.dap_scaleInput.get("value"));
            a !== this._originalScaleInputValue && (isNaN(a) || this.emit("scale-selected", {
                scale: a
            }))
        },
        _parseScale: function(a) {
            a = a.replace(/.*\(/, "").replace(/\).*$/, "").replace(/.*1:/, "");
            return h.parse(a)
        },
        _setCurrentScaleAttr: function(a) {
            var b = this._formatScale(a.scale);
            g.set(this.dap_currentScaleLabel, "innerHTML", a.label);
            this.dap_scaleInput.set("value", b, !1);
            this._originalScaleInputValue = b;
            b = l.substitute(this.labels.featuredScaleLabels.current, {
                scaleLabel: this._formatScale(a.mapScale)
            });
            g.set(this.dap_currentScaleItem, "innerHTML", b);
            this._hideOutOfScaleRanges(a.ranges)
        },
        _hideOutOfScaleRanges: function(a) {
            var b;
            u("." + this.baseClass + "Item." + this.baseClass + "Selectable", this.dap_recommendedScales).forEach(function(c) {
                c !== this.dap_currentScaleItem && (b = this._parseScale(c.innerHTML),
                    a.contains(b) ? d.show(c) : d.hide(c))
            }, this)
        }
    })
});