define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/on",
    "./TextBox",
    "dojo/text!./templates/TextArea.html"],

function(declare, lang, domClass, on, TextBox, template) {

    return declare([TextBox], {

        templateString: template,

        characterLimit: "",

        baseClass: "",

        postCreate: function() {
            console.info("postCreate()");
            this.inherited(arguments);
            this.countCharacters();
            this.own(on(this.textbox, "keyup", lang.hitch(this, "countCharacters")));
        },

        countCharacters: function() {
            if (this.characterLimit) {
                var count = this.textbox.value.length;
                var maxCount = this.characterLimit;
                this.counterNode.innerHTML = count + "/" + maxCount;
                if (count > maxCount) {
                    domClass.add(this.counterNode, "text-danger");
                    domClass.add(this.domNode, "has-error");
                    return false;
                } else {
                    domClass.remove(this.counterNode, "text-danger");
                    domClass.remove(this.domNode, "has-error");
                }
            }
            return true;
        },

        _validate: function() {
            if (!this.countCharacters()) {
                return "Max character limit exceeded";
            }
            return true;
        },

        _setValueAttr: function() {
            this.inherited(arguments);
            this.countCharacters();
        }
    });
});
