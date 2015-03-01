define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/on",
    "dijit/_TemplatedMixin",
    "common/routing/router",
    "common/ui/View",
    "dojo/text!./templates/SummaryCard.html"],

function(declare, lang, domClass, on, _TemplatedMixin, router, View, template) {

    return declare([View, _TemplatedMixin], {
        templateString: template,

        label: "",

        summary: "",

        imageClass: "",

        summaryRoute: "",

        summaryUrl: "",

        icon: "",

        postCreate: function() {
            this.inherited(arguments);
            this.own(on(this.domNode, "click", lang.hitch(this, function() {
                if (this.summaryRoute) {
                    router.go(this.summaryRoute);
                } else if (this.summaryUrl) {
                    window.open(this.summaryUrl);
                }
            })));
        },

        _setIconAttr: function(icon) {
            if (icon) {
                domClass.add(this.imageNode, "hidden");
                domClass.remove(this.iconNode, "hidden");
                this.iconNode.innerHTML = icon;
            }
            this.icon = icon;
        },

        _setImageClassAttr: function(imageClass) {
            if (imageClass) {
                domClass.add(this.iconNode, "hidden");
                domClass.remove(this.imageNode, "hidden");
                domClass.add(this.imageNode, imageClass);
            }
            this.imageClass = imageClass;
        },

        _setLabelAttr: {
            node: "labelNode",
            attribute: "innerHTML"
        },

        _setSummaryAttr: {
            node: "summaryNode",
            attribute: "innerHTML"
        }
    });
});