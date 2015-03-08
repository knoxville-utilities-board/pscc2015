define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-class",
    "dijit/_TemplatedMixin",
    "./_ListMixin",
    "./GroupLabelListItem",
    "./Row",
    "./SearchBox",
    "./View",
    "dojo/text!./templates/List.html"],

function(declare, lang, on, domClass, _TemplatedMixin, _ListMixin, GroupLabelListItem, Row, SearchBox, View, template) {



    return declare([View, _TemplatedMixin, _ListMixin], {

        templateString: template,

        title: "",

        hasWidgetContainer: false,

        searchBox: null,

        hasSearchBox: false,

        widgetContainer: null,

        _lastGroupLabel: "",

        postCreate: function() {
            if (!(this.hasSearchBox || this.hasWidgetContainer)) {
                domClass.add(this.headingDiv, "hidden");
            }
            if (this.hasSearchBox) {
                var searchBox = this.searchBox = new SearchBox();
                searchBox.placeAt(this.searchDiv);
                searchBox.startup();
                this.own(on(this.searchBox, "search", lang.hitch(this, this.onSearch)));
            }
            if (!(this.title || this.hasSearchBox)) {
                domClass.add(this.listTitleContainerDiv, "hidden");
            }

            if (this.hasWidgetContainer) {
                var widgetContainer = this.widgetContainer = new Row();
                widgetContainer.placeAt(this.widgetContainerDiv);
                widgetContainer.startup();
            }
        },

        addChild: function(child, position, partOfGroup) {
            if (partOfGroup !== false) {
                var item = child.item;
                if (item) {
                    var label = this.groupLabel(item);
                    if (label !== false && label !== this._lastGroupLabel) {
                        var groupLabelListItem = new GroupLabelListItem({
                            innerHTML: label
                        });
                        position = position ? position++ : position;
                        this.addChild(groupLabelListItem, position, false);
                        this._lastGroupLabel = label;
                    }
                }
            }
            this.inherited(arguments);
        },

        groupLabel: function(item) {
            /* user implemented */
            return false;
        },

        addWidget: function(widget) {
            if (this.widgetContainer) {

                domClass.add(widget.domNode, "listToolbarItem");
                this.widgetContainer.addChild(widget);
            }
        },

        onSearch: function(searchObj) {
            // User Defined
        },

        _setTitleAttr: {
            node: "titleNode",
            type: "innerHTML"
        }
    });
});
