define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/on",
    "dijit/_TemplatedMixin",
    "../routing/router",
    "./SideNavDropdown",
    "./View",
    "dojo/text!./templates/SideNavListItem.html"],

function(declare, lang, domClass, on, _TemplatedMixin, router, SideNavDropdown, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        label: "",

        badge: "",

        selected: false,

        route: "",

        sideNav: null,

        postCreate: function() {
            this.inherited(arguments);

            this.own(on(this.domNode, "click", lang.hitch(this, this.onClick)));
        },

        update: function(hash) {
            if (hash === this.route || (hash.indexOf(this.route) !== -1 && this.route !== "/")) {
                this.set("selected", true);
            }
        },

        onClick: function() {
            if (!this.selected) {
                if (this.route) {
                    router.go(this.route);
                } else if (this.url) {
                    window.open(this.url);
                }
            }
            this.sideNav.hide();
        },

        _setLabelAttr: function(label) {
            this.label = label;
            this.labelNode.innerHTML = label + " ";
        },

        _setBadgeAttr: {
            node: "badgeNode",
            type: "innerHTML"
        },

        _setSelectedAttr: function(selected) {
            this.selected = selected;
            if (selected) {
                if (this.getParent().isInstanceOf(SideNavDropdown)) {
                    this.getParent().set("selected", true);
                }
                domClass.add(this.itemNode, "active");

            } else {
                domClass.remove(this.itemNode, "active");
            }
        }
    });
});
