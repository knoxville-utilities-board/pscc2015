define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/keys",
    "./GenericDropdownListItem",
    "./SearchBox",
    "dojo/text!./templates/ResultsSearchBox.html"],

function(declare, lang, on, domClass, domConstruct, keys, GenericDropdownListItem, SearchBox, template) {

    return declare([SearchBox], {

        templateString: template,

        resultItems: null,

        resultsItemRenderer: GenericDropdownListItem,

        loadingItem: null,

        emptyItem: null,

        postCreate: function() {
            this.inherited(arguments);
            this.resultItems = [];
            this.own(on(this.backdrop, "click", lang.hitch(this, function() {
                this.toggleDropdown(false);
            })));

            this.loadingItem = new GenericDropdownListItem({
                noCheck: true,
                label: "Loading..."
            });
            this.loadingItem.startup();

            this.emptyItem = new GenericDropdownListItem({
                noCheck: true,
                label: "No Results"
            });
            this.emptyItem.startup();
        },

        _onChange: function(evt) {
            var children = this.resultItems;
            if (this.showing && this.selectedIndex != null) {
                if (evt.keyCode === keys.ENTER && !children[this.selectedIndex].noCheck) {
                    this.selectAndClose(children[this.selectedIndex]);
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
                    this.onChange(evt);
                }
            } else {
                this.onChange(evt);
            }
        },

        addResult: function(result) {
            var item = new this.resultsItemRenderer(result);
            item.on("select", lang.hitch(this, this._onResultSelect));
            this.resultItems.push(item);
            item.placeAt(this.resultsNode);
            item.startup();
            if (this.resultItems.length == 1) {
                this.selectedIndex = 0;
                domClass.add(item.domNode, "active");
            }
        },

        addEmptyItem: function() {
            this.clearResults();
            this.emptyItem.placeAt(this.resultsNode);
            this.toggleDropdown(true);
        },

        addLoadingItem: function() {
            this.clearResults();
            this.loadingItem.placeAt(this.resultsNode);
            this.toggleDropdown(true);
        },

        showResults: function(results) {
            this.clearResults();
            if (results.length === 0) {
                this.addEmptyItem();
            } else {
                results.forEach(lang.hitch(this, function(result) {
                    this.addResult(result);
                }));
            }
            this.toggleDropdown(true);
        },

        clearResults: function() {
            domConstruct.empty(this.resultsNode);
            this.resultItems.forEach(lang.hitch(this, function(item) {
                item.destroyRecursive();
            }));
            this.resultItems.length = 0;
        },

        _onResultSelect: function(evt) {
            this.selectAndClose(evt.listItem);
        },

        selectAndClose: function(item) {
            this.set("value", "");
            this.emit("selected", {
                item: item
            });
            this.toggleDropdown(false);
        },

        toggleDropdown: function(show) {
            if (show) {
                this.showing = true;
                $(this.resultsNode).show();
                domClass.remove(this.backdrop, "hidden");
            } else {
                this.showing = false;
                this.selectedIndex = null;
                $(this.resultsNode).hide();
                domClass.add(this.backdrop, "hidden");
            }
        },

        _setLoadingAttr: function(loading) {
            this.loading = loading;

            this.addLoadingItem();
            this.toggleDropdown(true);
        }
    });
});
