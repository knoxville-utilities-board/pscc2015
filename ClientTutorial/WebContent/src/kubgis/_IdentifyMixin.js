define(["dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/promise/all",
    "esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters"],

function(array, declare, lang, all, IdentifyTask, IdentifyParameters) {

    return declare(null, {

        doIdentify: function(evt) {
            console.log("doIdentify()", this.layers);

            var identifyParameters = new IdentifyParameters();

            identifyParameters.tolerance = 10;
            identifyParameters.returnGeometry = true;
            identifyParameters.layerIds = [];
            identifyParameters.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            identifyParameters.mapExtent = this.map.extent;
            identifyParameters.width = this.map.width;
            identifyParameters.height = this.map.height;
            identifyParameters.geometry = evt.geometry;

            var identifies = [];
            var visibleTOCLayer = [];

            array.forEach(this.layers, function(layer) {
                var layerObject = layer.layerObject;
                if (layerObject.visible) {
                    // only layers that are visible can be searched
                    if (layerObject.capabilities === "Map,Query,Data") {
                        // only layers with Query and Data can be searched
                        if (layerObject.visibleLayers.length !== 0 || layerObject.visibleLayers[0] === -1) {
                            if (layerObject._tocInfos) {
                                array.forEach(layerObject._tocInfos, function(_tocInfo) {
                                    if (_tocInfo.visible) {
                                        visibleTOCLayer.push(_tocInfo.id);
                                    }
                                });
                            }

                            var params = lang.clone(identifyParameters);
                            params.layerIds = visibleTOCLayer;

                            identifyParameters.layerIds = params.layerIds;

                            var identifyTask = new IdentifyTask(layerObject.url);
                            identifies.push(identifyTask.execute(params));
                        }
                    }
                }
            });
            
            return all(identifies);
        }
    });
});