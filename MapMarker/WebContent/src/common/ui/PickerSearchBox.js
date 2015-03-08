/* global $ */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-class",
    "dojo/keys",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "./FilteredStoreList",
    "./DropdownStoreList",
    "./SearchBox",
    "dojo/text!./templates/PickerSearchBox.html"],

function(declare, lang, on, domClass, keys, _TemplatedMixin, _WidgetsInTemplateMixin, FilteredStoreList, DropdownStoreList, SearchBox, template) {

    return declare([FilteredStoreList, _TemplatedMixin, _WidgetsInTemplateMixin], {

        templateString: template,

        limitToList: true,

        valueFromList: false,

        value: null,

        label: "",

        placeholder: "",

        store: null,

        pageSize: 6,

        refreshOnStartup: false,

        showMore: false,

        selectedIndex: null,

        wildcard: false,

        disabled: false,

        postCreate: function() {
            this.inherited(arguments);

            this.searchBox.on("search", lang.hitch(this, this.onSearch));

            this.searchBox._onChange = lang.hitch(this, this.onSearchBoxInput);

            this.own(on(this.backdrop, "click", lang.hitch(this, function() {
                this.toggleDropdown(false);
            })));

            this.set("placeholder", this.placeholder);

            domClass.add(this.searchBox.dropdownSpan, "hidden");
        },

        onSearchBoxInput: function(evt) {
            var children = this.getChildren();
            if (this.showing && this.selectedIndex != null) {
                if (evt.keyCode === keys.ENTER) {
                    var selectedItem = children[this.selectedIndex];
                    if (!selectedItem.noCheck) {

                        this.selectFromList(selectedItem);
                        this.emit("selected", {
                            value: this.value,
                            label: this.label
                        });
                    } else {
                        this.selectNotFromList(this.searchBox.get("value"));
                        if (!this.limitToList) {
                            this.emit("selected", {
                                value: this.value,
                                label: this.label
                            });
                        }
                    }
                    this.toggleDropdown(false);

                } else if (evt.keyCode === keys.UP_ARROW) {
                    if (this.selectedIndex !== 0 && !children[this.selectedIndex - 1].noCheck) {
                        domClass.remove(children[this.selectedIndex].domNode, "active");
                        this.selectedIndex -= 1;
                        domClass.add(children[this.selectedIndex].domNode, "active");
                    }

                } else if (evt.keyCode === keys.DOWN_ARROW) {
                    if ((this.selectedIndex != (children.length - 1)) && !children[this.selectedIndex + 1].noCheck) {
                        domClass.remove(children[this.selectedIndex].domNode, "active");
                        this.selectedIndex += 1;
                        domClass.add(children[this.selectedIndex].domNode, "active");
                    }

                } else {
                    this.searchBox.onChange(evt);
                }
            } else {
                this.searchBox.onChange(evt);
                if (!this.limitToList && evt.keyCode === keys.ENTER) {
                    this.selectNotFromList(this.searchBox.get("value"));
                    this.emit("selected", {
                        value: this.value,
                        label: this.label
                    });
                }
            }
        },

        registerSearchFilter: function(item) {
            domClass.remove(this.searchBox.dropdownSpan, "hidden");
            domClass.remove(this.searchBox.dropdownSpan, "fa-search");
            this.searchBox.registerSearchFilter(item);
        },

        _configurePaging: function() {
            // Left blank so the list can decide the page size
        },

        _validate: function() {
            if (this.limitToList && !this.valueFromList) {
                return "Please select from the list";
            }
            return true;
        },

        _onSelect: function(eventObj) {
            if (!eventObj.listItem.noCheck) {
                this.toggleDropdown(false);

                this.selectFromList(eventObj.listItem);

                this.emit("selected", {
                    value: this.value,
                    label: this.label
                });
            }
        },

        onComplete: function() {
            this.inherited(arguments);
            var children = this.getChildren();
            if (children.length && !children[0].noCheck) {
                this.selectedIndex = 0;
                domClass.add(this.getChildren()[this.selectedIndex].domNode, "active");
            }
        },

        onSearch: function(evt) {
            this.searchParam = evt.filter || this.searchParam;
            if (evt.value === "") {
                this.toggleDropdown(false);
            } else {
                this.toggleDropdown(true);
            }

            this.selectNotFromList(evt.value);

            this.inherited(arguments);
        },

        _setFilter: function(filter) {
            if (this.wildcard) {
                filter = new RegExp(".*" + filter, "i");
            }
            this.inherited(arguments);
        },

        toggleDropdown: function(show) {
            if (show) {
                this.showing = true;
                $(this.containerNode).show();
                domClass.remove(this.backdrop, "hidden");
            } else {
                this.showing = false;
                this.selectedIndex = null;
                $(this.containerNode).hide();
                domClass.add(this.backdrop, "hidden");
            }
        },

        _setPlaceholderAttr: function(value) {
            this.searchBox.searchBox.set("placeHolder", value);
        },

        _setLabelAttr: function(label) {
            this.label = label;
            if (label === "") {
                this.searchBox.clear();
            } else {
                this.searchBox.searchBox.set("value", label);
            }
        },

        _setValueAttr: function(value) {
            if (typeof value == "string") {
                this.set("label", value);
                this.valueFromList = false;
            }
            this.value = value;
        },

        _setDisabledAttr: function(value) {
            this.disabled = value;
            this.searchBox.set("disabled", value);
        },

        selectFromList: function(item) {
            this.valueFromList = true;
            this.set("label", item.leftLabel);
            this.set("value", item.item);
        },

        selectNotFromList: function(value) {
            this.valueFromList = false;
            this.set("value", value);
        },

        focus: function() {
            this.searchBox.focus();
        }
    });
});
