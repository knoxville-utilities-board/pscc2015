define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/on",
    "dojo/has",
    "dojo/sniff",
    "dijit/_TemplatedMixin",
    "dijit/form/_FormValueMixin",
    "dijit/form/_TextBoxMixin",
    "./View",
    "dojo/text!./templates/TextBox.html"],

function(declare, lang, domConstruct, on, has, sniff, _TemplatedMixin, _FormValueMixin, _TextBoxMixin, View, template) {

    has.add("html-placeholders", function() {
        var i = document.createElement("input");
        return "placeholder" in i;
    });

    var isIE = has("ie");
    var isTrident = has("trident") >= 7;
    var hasPlaceholderSupport = has("html-placeholders");

    return declare([View, _TemplatedMixin, _FormValueMixin, _TextBoxMixin], {

        templateString: template,

        trim: true,

        autocapitalize: "sentences",

        _setAutocapitalizeAttr: null,

        _setTypeAttr: null,

        _setPlaceHolderAttr: function(value) {
            value = this._cv ? this._cv(value) : value;
            this._set("placeHolder", value);
            this.textbox.setAttribute("placeholder", value);

            if (!hasPlaceholderSupport || isIE || isTrident) {
                var focus = lang.hitch(this, "focus");
                if (!this._phspan) {
                    this._attachPoints.push("_phspan");
                    this._phspan = domConstruct.create("div", {
                        className: "textBoxPlaceholder"
                    }, this.textbox, "after");
                    this.own(on(this._phspan, "click", focus));
                }
                this._phspan.innerHTML = "";
                this._phspan.appendChild(this._phspan.ownerDocument.createTextNode(value));
                this._updatePlaceHolder();
                this.own(on(this.textbox, "blur", lang.hitch(this, "blur")));
                this.own(on(this.textbox, "focus", focus));
            }
        },

        _onInput: function() {
            this.inherited(arguments);
            this._updatePlaceHolder();
        },

        _updatePlaceHolder: function() {
            if (this._phspan) {
                var style = "none";
                if (this.placeHolder) {
                    //show the placeholder value in ie > 9 when field is focused
                    if ((isIE > 9 || isTrident) && !this.textbox.value && this._focused) {
                        style = "";
                    } else if (isIE > 9 || isTrident) {
                        /* intentionally left blank */
                        //jshint noempty: false
                    } else if (!this.textbox.value) {
                        style = "";
                    }
                }
                this._phspan.style.display = style;
            }
        },

        focus: function() {
            this._focused = true;
            this.textbox.focus();
        },

        blur: function() {
            this._focused = false;
            this.textbox.blur();
            this._updatePlaceHolder();
        }
    });
});
