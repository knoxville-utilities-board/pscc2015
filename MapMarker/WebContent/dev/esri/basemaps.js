//>>built
define("esri/basemaps", ["dojo/has", "./kernel", "dojo/i18n!./nls/jsapi"], function(b, c, a) {
    return {
        streets: {
            title: a.basemaps.streets,
            thumbnailUrl: "//www.arcgis.com/sharing/rest/content/items/d8855ee4d3d74413babfb0f41203b168/info/thumbnail/world_street_map.jpg",
            itemId: "d8855ee4d3d74413babfb0f41203b168",
            baseMapLayers: [{
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer"
            }]
        },
        satellite: {
            title: a.basemaps.satellite,
            thumbnailUrl: "//www.arcgis.com/sharing/rest/content/items/86de95d4e0244cba80f0fa2c9403a7b2/info/thumbnail/tempimagery.jpg",
            itemId: "86de95d4e0244cba80f0fa2c9403a7b2",
            baseMapLayers: [{
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
            }]
        },
        hybrid: {
            title: a.basemaps.hybrid,
            thumbnailUrl: "//www.arcgis.com/sharing/rest/content/items/413fd05bbd7342f5991d5ec96f4f8b18/info/thumbnail/tempimagery_with_labels_ne_usa.png",
            itemId: "413fd05bbd7342f5991d5ec96f4f8b18",
            baseMapLayers: [{
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
            }, {
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer",
                isReference: !0
            }]
        },
        terrain: {
            title: a.basemaps.terrain,
            thumbnailUrl: "//www.arcgis.com/sharing/rest/content/items/aab054ab883c4a4094c72e949566ad40/info/thumbnail/tempTerrain_with_labels_ne_usa.png",
            itemId: "aab054ab883c4a4094c72e949566ad40",
            baseMapLayers: [{
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer"
            }, {
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer",
                isReference: !0
            }]
        },
        topo: {
            title: a.basemaps.topo,
            thumbnailUrl: "//www.arcgis.com/sharing/rest/content/items/6e03e8c26aad4b9c92a87c1063ddb0e3/info/thumbnail/topo_map_2.jpg",
            itemId: "6e03e8c26aad4b9c92a87c1063ddb0e3",
            baseMapLayers: [{
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer"
            }]
        },
        gray: {
            title: a.basemaps.gray,
            thumbnailUrl: "//www.arcgis.com/sharing/rest/content/items/8b3b470883a744aeb60e5fff0a319ce7/info/thumbnail/templight_gray_canvas_with_labels__ne_usa.png",
            itemId: "8b3b470883a744aeb60e5fff0a319ce7",
            baseMapLayers: [{
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer"
            }, {
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer",
                isReference: !0
            }]
        },
        "dark-gray": {
            title: a.basemaps["dark-gray"],
            thumbnailUrl: "//www.arcgis.com/sharing/rest/content/items/da65bacab5bd4defb576f839b6b28098/info/thumbnail/DGCanvasWebMap.jpg",
            itemId: "da65bacab5bd4defb576f839b6b28098",
            baseMapLayers: [{
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer"
            }, {
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer",
                isReference: !0
            }]
        },
        oceans: {
            title: a.basemaps.oceans,
            thumbnailUrl: "//www.arcgis.com/sharing/rest/content/items/48b8cec7ebf04b5fbdcaf70d09daff21/info/thumbnail/tempoceans.jpg",
            itemId: "48b8cec7ebf04b5fbdcaf70d09daff21",
            baseMapLayers: [{
                url: "http://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer"
            }, {
                url: "http://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer",
                isReference: !0
            }]
        },
        "national-geographic": {
            title: a.basemaps["national-geographic"],
            thumbnailUrl: "//www.arcgis.com/sharing/rest/content/items/509e2d6b034246d692a461724ae2d62c/info/thumbnail/natgeo.jpg",
            itemId: "509e2d6b034246d692a461724ae2d62c",
            baseMapLayers: [{
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer"
            }]
        },
        osm: {
            title: a.basemaps.osm,
            thumbnailUrl: "//www.arcgis.com/sharing/rest/content/items/5d2bfa736f8448b3a1708e1f6be23eed/info/thumbnail/temposm.jpg",
            itemId: "5d2bfa736f8448b3a1708e1f6be23eed",
            baseMapLayers: [{
                type: "OpenStreetMap"
            }]
        }
    }
});