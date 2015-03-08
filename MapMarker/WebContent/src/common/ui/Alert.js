/* global $ */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/on",
    "dijit/_TemplatedMixin",
    "./View",
    "dojo/text!./templates/Alert.html"],

function(declare, lang, domClass, on, _TemplatedMixin, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        message: "",

        level: "info",

        timeout: 5000,

        postCreate: function() {
            this.inherited(arguments);
            if (this.timeout) {
                setTimeout(lang.hitch(this, function() {
                    this.close();
                }), this.timeout);
            }
            this.own(on(this.closeNode, "click", lang.hitch(this, this.close)));
        },

        close: function() {
            domClass.remove(this.domNode, "alertTransparent");
            $("#" + this.domNode.id).alert('close');
            setTimeout(lang.hitch(this, function() {
                this.destroyRecursive();
            }), 500); // Allow animation to complete before destroying
            this.onClose();
        },

        onClose: function() {
            // user defined
        },

        _setLevelAttr: function(level) {
            this.level = level;
            domClass.add(this.domNode, "alert-" + level);
        },

        _setMessageAttr: {
            node: "messageNode",
            type: "innerHTML"
        }
    });
});
