define(["dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-class",
    "dijit/_TemplatedMixin",
    "../routing/router",
    "./DropdownListItem",
    "./View",
    "dojo/text!./templates/Appbar.html"],

function(array, declare, lang, on, domClass, _TemplatedMixin, router, DropdownListItem, View, template) {
	
	function requiresAuthentication() {
		return app.requiresAuthentication;
	}

    return declare([View, _TemplatedMixin], {

        templateString: template,

        title: "",

        loading: false,

        contextMenuItems: null,

        searchBox: null,

        postCreate: function() {
            this.inherited(arguments);

            this.own(on(this.backButtonNode, "click", lang.hitch(this, this.onBackButton)));
            this.own(on(this.logoutNode, "click", lang.hitch(this, this.onLogoutButton)));
            this.own(on(this.searchCollapsedButton, "click", lang.hitch(this, this.toggleSearchBox)));

            this.contextMenuItems = [];
        },

        startup: function() {
            if (!requiresAuthentication()) {
                domClass.add(this.contextButtonNode, "hidden");
                domClass.add(this.logoutNode, "hidden");
            }

            this.getParent().on("loading", lang.hitch(this, function(evt) {
                this.set("loading", evt.loading);
            }));
        },

        _setSearchBoxAttr: function(searchBox) {
            if (this.searchBox !== searchBox) {
                if (this.searchBox) {
                    this.searchNode.removeChild(this.searchBox.domNode);
                }

                this.searchBox = searchBox;
                searchBox.placeAt(this.searchNode).startup();
            }
        },

        _setLoadingAttr: function(loading) {
            this.loading = loading;
            if (loading) {
                domClass.remove(this.loadingNode, "hidden");
            } else {
                domClass.add(this.loadingNode, "hidden");
            }
        },

        _setTitleAttr: {
            node: "titleNode",
            type: "innerHTML"
        },

        hideMenuButtons: function(hide) {
            if (hide) {
                domClass.add(this.menuButtonNode, "invisible");
                domClass.add(this.contextButtonNode, "invisible");
            } else {
                domClass.remove(this.menuButtonNode, "invisible");
                domClass.remove(this.contextButtonNode, "invisible");
            }
        },

        onBackButton: function() {
            if (this.isSearchShowing()) {
                this.toggleSearchBox();
            } else {
                router.go(app.returnToRoute);
            }
        },

        onLogoutButton: function() {
            app.logout();
        },

        showBackButton: function(show, isNewPage) {
            this.backButtonShown = show;
            if (show) {
                if (isNewPage) {
                    domClass.add(this.menuButtonNode, "hidden");
                    domClass.remove(this.backButtonNode, "hidden hidden-sm hidden-md hidden-lg");
                } else {
                    domClass.add(this.menuButtonNode, "hidden-xs");
                    domClass.remove(this.backButtonNode, "hidden");
                    domClass.remove(this.menuButtonNode, "hidden");
                    domClass.add(this.backButtonNode, "hidden-sm hidden-md hidden-lg");
                }
            } else {
                domClass.add(this.backButtonNode, "hidden");
                domClass.remove(this.backButtonNode, "hidden-sm hidden-md hidden-lg");
                domClass.remove(this.menuButtonNode, "hidden-xs hidden");
            }
        },

        removeWidgets: function() {
            this.getChildren().forEach(function(child) {
                child.destroyRecursive();
            });
        },

        clearContextMenu: function() {
            array.forEach(this.contextMenuItems, function(item) {
                item.destroyRecursive();
            });
            domClass.add(this.contextDividerNode, "hidden");
            this.contextMenuItems = [];

            if (!requiresAuthentication()) {
                domClass.add(this.contextButtonNode, "hidden");
            }
        },

        isSearchShowing: function() {
            return !domClass.contains(this.searchNode, "hidden");
        },

        toggleSearchBox: function() {
            if (this.searchToggleCallback) {
                this.searchToggleCallback(!this.isSearchShowing());
            }
            if (!this.backButtonShown) {
                if (!this.isSearchShowing()) {
                    domClass.add(this.searchCollapsedButton, "hidden");
                    domClass.add(this.menuButtonNode, "hidden");
                    domClass.remove(this.backButtonNode, "hidden");
                    domClass.remove(this.searchNode, "hidden");
                    domClass.add(this.titleNode, "hidden");
                    domClass.add(this.containerNode, "hidden");
                    this.searchBox.focus();
                } else {
                    domClass.remove(this.searchCollapsedButton, "hidden");
                    domClass.remove(this.menuButtonNode, "hidden");
                    domClass.add(this.backButtonNode, "hidden");
                    domClass.add(this.searchNode, "hidden");
                    domClass.remove(this.titleNode, "hidden");
                    domClass.remove(this.containerNode, "hidden");
                }
            }
        },

        showSearchBox: function(callback, toggleCallback) {
            domClass.remove(this.searchCollapsedButton, "hidden");
            this.searchBox.clear();
            if (callback) {
                this.searchCallbackHandler = on(this.searchBox, "search", callback);
            }
            if (toggleCallback) {
                this.searchToggleCallback = toggleCallback;
            }
            return this.searchBox;
        },

        hideSearchBox: function() {
            if (this.isSearchShowing()) {
                this.toggleSearchBox();
            }
            domClass.add(this.searchCollapsedButton, "hidden");
            if (this.searchCallbackHandler) {
                this.searchCallbackHandler.remove();
            }
            if (this.searchToggleCallback) {
                this.searchToggleCallback = null;
            }
        },

        registerContextItem: function(label, callback, hasCheckbox) {
            var item = new DropdownListItem({
                label: label,
                hasCheckbox: hasCheckbox
            }).placeAt(this.contextMenuNode, "first");
            item.startup();
            item.on("click", callback);
            this.contextMenuItems.push(item);

            domClass.remove(this.contextButtonNode, "hidden");
            if (requiresAuthentication()) {
                domClass.remove(this.contextDividerNode, "hidden");
            }

            return item;
        }
    });
});
