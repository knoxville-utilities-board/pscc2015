/* global $ */
define(["dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/topic",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dijit/_TemplatedMixin",
    "./SideNavDropdown",
    "./SideNavFooterItem",
    "./SideNavListItem",
    "./View",
    "dojo/text!./templates/SideNav.html"],

function(array, declare, lang, on, topic, domClass, domConstruct, domStyle, _TemplatedMixin, SideNavDropdown, SideNavFooterItem, SideNavListItem, View, template) {

    function isActiveDropdownChild(child) {
        return child.isInstanceOf(SideNavDropdown) && domClass.contains(child.itemNode, "active");
    }

    return declare([View, _TemplatedMixin], {

        templateString: template,

        footerChildren: null,

        environment: "",

        postCreate: function() {
            this.inherited(arguments);
            $(this.domNode).modal({
                backdrop: true,
                show: false
            });

            this.own(on(this.brandNode, "click", function() {
                window.location = location.href.replace(location.hash, "");
            }));

            $(this.domNode).on("hidden.bs.modal", lang.hitch(this, "_onHide"));
            $(this.domNode).on("shown.bs.modal", lang.hitch(this, "_onShow"));
            topic.subscribe("/dojo/hashchange", lang.hitch(this, "updateAll"));
            this.footerChildren = [];
        },

        _setEnvironmentAttr: function(environment) {
            this.environment = environment;
            if (environment && environment !== "prod") {
                this.environmentNode.innerHTML = environment;
            }
        },

        deselectAll: function() {
            function deselect(child) {
                child.set("selected", false);
            }
            array.forEach(this.getChildren(), deselect);
            array.forEach(this.footerChildren, deselect);
        },

        updateAll: function(hash) {
            this.deselectAll();

            function update(child) {
                child.update(hash);
            }
            array.forEach(this.getChildren(), update);
            array.forEach(this.footerChildren, update);
        },

        hide: function() {
            $(this.domNode).modal("hide");
        },

        _onHide: function() {
            this.onHide();
        },

        onHide: function() {
            //User defined
        },

        show: function() {
            $(this.domNode).modal("show");
        },

        _onShow: function() {
            array.forEach(this.getChildren(), function(child) {
                if (isActiveDropdownChild(child)) {
                    $(child.domNode).find('.dropdown-toggle').trigger('click.bs.dropdown');
                }
            });
            this.onShow();
        },

        onShow: function() {
            //User defined
        },

        _createSideNavListItem: function(menuItem) {
            var item = new SideNavListItem({
                label: menuItem.label,
                route: menuItem.route,
                url: menuItem.url,
                sideNav: this
            });
            if (menuItem.register) {
                this[menuItem.register] = item;
            }
            return item;
        },

        makeMenu: function(menuObject) {
            domConstruct.empty(this.containerNode);
            domConstruct.empty(this.footerNode);
            array.forEach(menuObject.menu, function(menuItem) {
                if (menuItem.divider) {
                    domConstruct.create("div", {
                        "class": "divider"
                    }, this.containerNode);
                } else if (menuItem.items) {
                    var dropdown = new SideNavDropdown({
                        label: menuItem.label
                    });

                    if (menuItem.register) {
                        this[menuItem.register] = dropdown;
                    }

                    array.forEach(menuItem.items, function(menuItem) {
                        if (menuItem.divider) {
                            domConstruct.create("div", {
                                "class": "divider"
                            }, dropdown.containerNode);
                        } else if (app.isUserInRole(menuItem.role)) {
                            var item = this._createSideNavListItem(menuItem);
                            dropdown.addChild(item);
                        }
                    }, this);

                    if (dropdown.getChildren().length) {
                        this.addChild(dropdown);
                    }
                } else if (!menuItem.role || app.isUserInRole(menuItem.role)) {
                    var item = this._createSideNavListItem(menuItem);
                    this.addChild(item);
                }
            }, this);

            domStyle.set(this.pushNode, "height", "43px");
            if (menuObject.footer) {
                array.forEach(menuObject.footer, function(menuItem) {
                    if (app.isUserInRole(menuItem.role)) {
                        var item = new SideNavFooterItem({
                            label: menuItem.label,
                            route: menuItem.route,
                            url: menuItem.url,
                            sideNav: this
                        }).placeAt(this.footerNode);
                        item.startup();

                        if (menuItem.register) {
                            this[menuItem.register] = item;
                        }
                        this.footerChildren.push(item);
                        domStyle.set(this.pushNode, "height", domStyle.get(this.pushNode, "height") + 43 + "px");
                    }
                }, this);
            }
        }
    });
});
