define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/on",
    "dijit/_TemplatedMixin",
    "../routing/router",
    "./View",
    "dojo/text!./templates/SideNavFooterItem.html"],

function(declare, lang, domClass, on, _TemplatedMixin, router, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        label: "",

        selected: false,

        route: "",

        sideNav: null,

        postCreate: function() {
            this.inherited(arguments);

            this.own(on(this.domNode, "click", lang.hitch(this, this.onClick)));
        },

        update: function(hash) {
            if (hash == this.route) {
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
                this.sideNav.hide();
            }
        },

        _setLabelAttr: {
            node: "itemNode",
            type: "innerHTML"
        },

        _setSelectedAttr: function(selected) {
            this.selected = selected;
            if (selected) {
                domClass.add(this.itemNode, "active");
            } else {
                domClass.remove(this.itemNode, "active");
            }
        }
    });
});
