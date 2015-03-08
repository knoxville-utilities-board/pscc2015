define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dijit/_TemplatedMixin",
    "common/routing/router",
    "common/ui/View",
    "dojo/text!./templates/ToolCard.html"],

function(declare, lang, on, _TemplatedMixin, router, View, template) {

    return declare([View, _TemplatedMixin], {
        templateString: template,

        label: "",

        toolRoute: "",

        icon: "",

        postCreate: function() {
            this.inherited(arguments);
            this.own(on(this.domNode, "click", lang.hitch(this, function() {
                router.go(this.toolRoute);
            })));
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