define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-class",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "./_ListMixin",
    "./DropdownListItem",
    "./TextBox",
    "./View",
    "dojo/text!./templates/SearchBox.html"],

function(declare, lang, on, domClass, _TemplatedMixin, _WidgetsInTemplateMixin, _ListMixin, DropdownListItem, TextBox, View, template) {

    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin, _ListMixin], {

        templateString: template,

        filter: "",

        select: "single",

        hasDropdown: false,

        value: "",

        placeholder: "",

        disabled: false,

        postCreate: function() {
            console.info("postCreate()");
            this.inherited(arguments);
            this.searchBox.on("keyup", lang.hitch(this, "_onChange"));
            this.own(on(this.clearNode, "click", lang.hitch(this, "clear")));
        },

        registerSearchFilter: function(item) {
            var listItem = new DropdownListItem(item);
            this.addChild(listItem);

            if (!this.hasDropdown) {
                this.filter = this.getFilter(listItem);
                this.hasDropdown = true;
                this.searchBox.set("placeHolder", listItem.placeHolder || listItem.label);
                domClass.remove(this.dropdownSpan, "disabled");
                domClass.remove(this.dropdownIcon, "hidden");
            }
            return listItem;
        },

        _onSelect: function(eventObj) {
            this.inherited(arguments);
            var listItem = eventObj.listItem;
            this.searchBox.set("value", "");
            this.searchBox.set("placeHolder", listItem.placeHolder || listItem.label);
            this.filter = this.getFilter(listItem);
            this.value = "";
            this.focus();
            this.emit("search", {
                value: this.value,
                filter: this.filter
            });
        },

        getFilter: function(listItem) {
            // Override as needed
            return listItem.value || "";
        },

        clear: function() {
            this.searchBox.set("value", "");
            this.onChange();
        },

        _onChange: function() {
            this.onChange();
        },

        onChange: function() {
            if (this.searchBox.get("value") != this.value) {
                if (this.searchBox.get("value")) {
                    domClass.remove(this.clearNode, "hidden");
                } else {
                    domClass.add(this.clearNode, "hidden");
                }
                this.value = this.searchBox.get("value") || "";
                this.emit("search", {
                    value: this.value,
                    filter: this.filter
                });
            }
        },

        focus: function() {
            this.searchBox.focus();
        },

        _setValueAttr: function(value) {
            this.value = value;
            this.searchBox.set("value", value);
        },

        _setPlaceholderAttr: function(placeholder) {
            this.placeHolder = placeholder;
            this.searchBox.set("placeHolder", placeholder);
        },

        _setDisabledAttr: function(value) {
            this.disabled = value;
            this.searchBox.set("disabled", value);
        }

    });
});