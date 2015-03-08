define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dijit/_TemplatedMixin",
    "./View",
    "dojo/text!./templates/ListItem.html"],

function(declare, lang, domClass, _TemplatedMixin, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        selectable: false,
        selected: false,

        leftIcon: "",
        leftIconHide: "",
        busy: false,

        leftLabel: "",
        leftBody: "",

        rightText: "",

        rightIcon: "",
        rightIconHide: "",

        item: null,

        constructor: function(params) {
            this.item = params;
        },

        postCreate: function() {
            this.inherited(arguments);
            this.on("click", lang.hitch(this, function(evt) {
                this.emit("select", {
                    event: evt,
                    listItem: this
                });
            }));
        },

        _setSelectableAttr: function(selectable) {
            this.selectable = selectable;
        },

        _setSelectedAttr: function(selected) {
            this.selected = selected;
            if (selected) {
                domClass.add(this.domNode, "active");
            } else {
                domClass.remove(this.domNode, "active");
            }
        },

        _setLeftIconAttr: function(icon) {
            if (this.busy) {
                this.leftIconHide = icon;
            } else {
                this.leftIcon = icon;
                this.leftIconNode.innerHTML = icon;
            }
        },

        _setLeftLabelAttr: {
            node: "leftLabelNode",
            type: "innerHTML"
        },

        _setLeftBodyAttr: {
            node: "leftBodyNode",
            type: "innerHTML"
        },

        _setRightIconAttr: {
            node: "rightIconNode",
            type: "innerHTML"
        },

        _setRightTextAttr: {
            node: "rightTextNode",
            type: "innerHTML"
        },

        _setBusyAttr: function(busy) {
            if (busy) {
                if (!this.busy) {
                    this.busy = busy;
                    if (this.leftIconNode.innerHTML) {
                        this.leftIconHide = this.leftIconNode.innerHTML;
                    }
                    this.leftIconNode.innerHTML = '<div class="fa fa-spinner fa-spin"></div>';
                }
            } else {
                if (this.busy) {
                    this.busy = busy;
                    this.set("leftIcon", this.leftIconHide);
                }
            }
        }
    });
});
