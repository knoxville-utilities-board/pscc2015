define(["dojo/_base/Color",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "bootstrapmap/bootstrapmap",
    "common/ui/_ModelApiMixin",
    "common/ui/Button",
    "common/ui/View",
    "esri/geometry/Point",
    "app/ui/PointPickerModal",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/PointPicker.html"],

function(Color, declare, lang, bootstrapMap, _ModelApiMixin, Button, View, Point, PointPickerModal, _TemplatedMixin, _WidgetsInTemplateMixin, template) {

    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelApiMixin], {
        templateString: template,

        postCreate: function() {
            this.inherited(arguments);

            this.pointPicker = new PointPickerModal().placeAt(this.domNode);

            $(this.domNode).on("click", lang.hitch(this, function() {
                this.pointPicker.show();
            }));

            this.pointPicker.on("set", lang.hitch(this, function(evt) {
                this.point = evt.point;
                this.set("latitude", this.point.getLatitude().toFixed(6));
                this.set("longitude", this.point.getLongitude().toFixed(6));
                this.inputNode.value = this.get("latitude") + ', ' + this.get("longitude");
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