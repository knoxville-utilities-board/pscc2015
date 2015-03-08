/* global $ */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dijit/_TemplatedMixin",
    "./Button",
    "./View",
    "dojo/text!./templates/DateTimePicker.html"],

function(declare, lang, domClass, domConstruct, _TemplatedMixin, Button, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        picker: null,

        type: "datetime", // "date" and "time" are valid, any other values defualt to datetime

        format: "MM/dd/yyyy HH:mm PP",

        startDate: -Infinity,

        endDate: Infinity,

        _isShown: false,

        postMixInProperties: function() {
            this.inherited(arguments);
            if (this.type == "date") {
                this.format = "MM/dd/yyyy";
            } else if (this.type == "time") {
                this.format = "HH:mm PP";
            }
        },

        postCreate: function() {
            this.inherited(arguments);

            var options = {
                language: "en",
                maskInput: true,
                pickDate: true,
                pickTime: true,
                pick12HourFormat: true,
                pickSeconds: false,
                startDate: this.startDate,
                endDate: this.endDate
            };

            if (this.type == "date") {
                options.pickTime = false;
            } else if (this.type == "time") {
                options.pickDate = false;
            }

            $(this.domNode).datetimepicker(options);

            this.picker = $(this.domNode).data("datetimepicker");

            $(this.domNode).children().on("click", lang.hitch(this, "_handleHide"));

            var buttonDiv = domConstruct.create("div", {
                "class": "dateTimePickerButtonDiv"
            }, this.picker.widget[0]);

            var setButton = new Button({
                "class": "btn-link center-block",
                label: "Set"
            }).placeAt(buttonDiv);
            setButton.on("click", lang.hitch(this, function() {
            	this.emit("set");
                this.picker.hide();
            }));
            setButton.startup();

            this.set("value", new Date());
        },

        _handleHide: function(evt) {
            if (this._isShown) {
                this.picker.hide();
            }
            this._isShown = !this._isShown;
        },

        _setValueAttr: function(date) {
            this.picker.setDate(date);
        },

        _getValueAttr: function() {
            return this.inputNode.value;
        },

        _setDisabledAttr: function(disabled) {
            this.disabled = disabled;
            if (disabled) {
                domClass.add(this.inputNode, "disabled");
                this.picker.disable();
            } else {
                domClass.remove(this.inputNode, "disabled");
                this.picker.enable();
            }
        },
        
        focus: function() {
            this.picker.show();
            this._handleHide();
        },

        blur: function() {
            this.picker.hide();
        }
    });
});