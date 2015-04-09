define(["dojo/_base/declare",
    "dojo/_base/lang",
    "bootstrapmap/bootstrapmap",
    "common/ui/_ModelApiMixin",
    "common/ui/View",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/PointPicker.html"],

function(declare, lang, bootstrapMap, _ModelApiMixin, View, _TemplatedMixin, _WidgetsInTemplateMixin, template) {

        templateString: template,

        postCreate: function() {
            this.inherited(arguments);

            var map = bootstrapMap.create(this.id + "-map", {
                basemap: "streets",
                center: [-83.93, 35.97],
                zoom: 13
            });
            map.on("load", lang.hitch(this, this.onMapComplete));
            //create map here
        },

        startup: function() {
            this.inherited(arguments);
        },

        onModelComplete: function(model) {

        },

        onMapComplete: function(response) {
            this.map = response.map;
        },

        show: function() {
            $(this.domNode).modal("show");
        },

        hide: function() {
            $(this.domNode).modal("hide");
        }
    });
});