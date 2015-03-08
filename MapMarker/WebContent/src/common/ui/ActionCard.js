define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/on",
    "dijit/_TemplatedMixin",
    "common/routing/router",
    "common/ui/View",
    "dojo/text!./templates/ActionCard.html"],

function(declare, lang, domClass, on, _TemplatedMixin, router, View, template) {

    return declare([View, _TemplatedMixin], {
        templateString: template,

        count: 0,

        label: "",

        actionRoute: "",

        icon: "",

        statusClass: "panel-info",

        postCreate: function() {
            this.inherited(arguments);
            this.own(on(this.domNode, "click", lang.hitch(this, function() {
                router.go(this.actionRoute);
            })));
        },

        _setCountAttr: {
            node: "counterNode",
            attribute: "innerHTML"
        },

        _setStatusClassAttr: function(statusClass) {
            domClass.remove(this.panelNode, this.statusClass);
            domClass.add(this.panelNode, statusClass);
            this.statusClass = statusClass;
        },

        _setLabelAttr: {
            node: "labelNode",
            attribute: "innerHTML"
        },

        _setIconAttr: {
            node: "iconNode",
            attribute: "innerHTML"
        }
    });
});