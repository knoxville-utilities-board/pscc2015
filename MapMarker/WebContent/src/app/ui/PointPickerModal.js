define(["dojo/_base/Color",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "bootstrapmap/bootstrapmap",
    "common/ui/_ModelApiMixin",
    "common/ui/Button",
    "common/ui/View",
    "esri/layers/GraphicsLayer",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/PointPickerModal.html"],

function(Color, declare, lang, bootstrapMap, _ModelApiMixin, Button, View, GraphicsLayer, Graphic, Point, SimpleMarkerSymbol, SimpleLineSymbol, _TemplatedMixin, _WidgetsInTemplateMixin, template) {

    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelApiMixin], {
        templateString: template,

        map: null,

        postCreate: function() {
            this.inherited(arguments);

            this.setButton.on("click", lang.hitch(this, function(evt) {
                evt.preventDefault();
                this.emit("set", {
                    bubble: true,
                    point: this.mapPoint, //sends esri point
                    relatedTarget: this.relatedTarget
                });
                this.hide();
            }));
        },

        getPoint: function(evt) {
            // esri/geometry/point
            this.mapPoint = evt.mapPoint;

            this.graphicsLayer.clear();
            //var color = new Color("#444");
            //var outline = new SimpleLineSymbol(SimpleMarkerSymbol.STYLE_SOLID, 3, null, color);
            var color = new Color("063c6f");
            var symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 15, null, color);
            var graphic = new Graphic(this.mapPoint, symbol);
            this.graphicsLayer.add(graphic);
        },

        startup: function() {
            this.inherited(arguments);

            var map = bootstrapMap.create(this.id + "-map", {
                basemap: "streets",
                center: [-83.93, 35.97],
                zoom: 13
            });
            map.enableScrollWheelZoom();
            map.on("load", lang.hitch(this, this.onMapComplete));
            map.on("click", lang.hitch(this, this.getPoint));
        },

        onModelComplete: function(model) {

        },

        onMapComplete: function(response) {
            this.map = response.map;
            this.map.enableScrollWheelZoom();
            this.graphicsLayer = new GraphicsLayer();
            this.map.addLayer(this.graphicsLayer);
        },

        show: function(element) {
        	this.relatedTarget = element;
            $(this.domNode).modal("show");
        },

        hide: function() {
            $(this.domNode).modal("hide");
            if (this.graphicsLayer) {
                this.graphicsLayer.clear();
            }
        }
    });
});