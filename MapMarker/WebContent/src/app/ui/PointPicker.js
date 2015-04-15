define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "common/ui/_ModelApiMixin",
    "common/ui/Button",
    "common/ui/View",
    "esri/geometry/Point",
    "app/ui/PointPickerModal",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/PointPicker.html"],

function(declare, lang, domConstruct, _ModelApiMixin, Button, View, Point, PointPickerModal, _TemplatedMixin, _WidgetsInTemplateMixin, template) {

    var pointPickerModal = new PointPickerModal().placeAt(domConstruct.create("div", null, window.document.body));
    pointPickerModal.startup();
    
    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelApiMixin], {
        templateString: template,

        postCreate: function() {
            this.inherited(arguments);

            this.on("click", function(evt) {
                pointPickerModal.show(this);
            });

            pointPickerModal.on("set", lang.hitch(this, function(evt) {
            	if (this.domNode === evt.relatedTarget) {
            		this.point = evt.point;
                    this.set("latitude", this.point.getLatitude().toFixed(6));
                    this.set("longitude", this.point.getLongitude().toFixed(6));
                    this.inputNode.value = this.get("latitude") + ', ' + this.get("longitude");
            	}
            }));

            this.inputNode.value = '';
        },


        onModelComplete: function(model) {

        },

        _setValueAttr: function(value) {
            this.inputNode.value = value;
        },

        _getValueAttr: function() {
            return this.inputNode.value;
        }

    });
});