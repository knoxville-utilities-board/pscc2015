define(["dojo/_base/array",
    "dojo/_base/Color",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "esri/geometry/Point",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol"],

function(array, Color, declare, lang, Point, Graphic, GraphicsLayer, SimpleMarkerSymbol, SimpleLineSymbol) {

    return declare([GraphicsLayer], {

        map: null,

        constructor: function( /*Object*/ kwArgs) {
            console.log("constructor()");

            lang.mixin(this, kwArgs);
        },

        destroy: function() {
            this.clear();

            this.map.removeLayer(this);
        },

        update: function(data) {
            this.data = data;
            this.clear();
            this._addMarkers();
        },

        _addMarkers: function() {
            var data = this.data;

            array.forEach(data, function(job) {
            	if(job.location && job.location.x){
	                var point = new Point(job.location.x, job.location.y, this.map.spatialReference);
	
	                var marker = this._getMarker(job);
	
	                var graphic = new Graphic(point, marker, job);
	
	                if (graphic) {
	                    this.add(graphic);
	                }
            	}
            }, this);
        },

        _getMarker: function(outage) {
            var alpha = 0.8;

            // outline color for markers
            var outlineColor = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([204, 204, 204, alpha]), 2);

            var greenMarkerColor = new Color([50, 190, 60, alpha]);

            var marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10, outlineColor, greenMarkerColor);

            return marker;
        }
    });
});