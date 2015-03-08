define({
    "mapOptions": {
        "logo": false,
        "showAttribution": false

    },
    "webmap": {
        "item": {
            "title": "KUB Map defaults",
            "snippet": "These defaults are suitable for an Employee map",
            "spatialReference": {
                "wkid": 2915
            }
        },
        "itemData": {
            "operationalLayers": [{
                "id": "electricSystem",
                "url": "http://kub.org/MaximoSpatial/MS_ElecSystem/MapServer",
                "title": "Electric System",
                "opacity": 0.75,
                "visibility": true
            }
            //            , {
            //                "id": "gasSystem",
            //                "url": "http://kub.org/MaximoSpatial/MS_GasSystem/MapServer",
            //                "title": "Gas System",
            //                "opacity": 0.75,
            //                "visibility": false
            //            }, {
            //                "id": "sewerSystem",
            //                "url": "http://kub.org/MaximoSpatial/MS_SewerSystem/MapServer",
            //                "title": "Sewer System",
            //                "opacity": 0.75,
            //                "visibility": false
            //            }, {
            //                "id": "waterSystem",
            //                "url": "http://kub.org/MaximoSpatial/MS_WaterSystem/MapServer",
            //                "title": "Water System",
            //                "opacity": 0.75,
            //                "visibility": false
            //
            //            }, {
            //                "id": "maximoWorkOrders",
            //                "url": "http://kub.org/MaximoSpatial/maximo_service/MapServer",
            //                "title": "Maximo Work Orders",
            //                "opacity": 0.75,
            //                "visibility": false
            //            }
            ],
            "baseMap": {
                "title": "Kub_Base",
                "baseMapLayers": [{
                    "id": "kubBase",
                    "url": "http://kub.org/Base/MapServer",
                    "opacity": 1,
                    "visibility": true
                }, {
                    "id": "kubMaximoLabels",
                    "url": "http://kub.org/BaseLabels/MapServer",
                    "opacity": 0.6,
                    "visibility": true
                }]

            },
            "version": "1.1"
        }
    }, // "24e01ef45d40423f95300ad2abc5038a",

    "proxyurl": "/wps/api/common/maps/proxy",

    "helperServices": {
        "geometry": {
            "url": "http://kub.org/Utilities/Geometry/GeometryServer"
        },
        "printTask": {
            "url": null
        },
        "elevationSync": {
            "url": null
        },
        "geocode": [{
            "url": "http://kub.org/ServiceAddressSearch/GeocodeServer",
            "name": "Service/Customer",
            "singleLineFieldName": "SingleLine"
        }, {
            "url": "http://kub.org/NineCountyAddressLocator/GeocodeServer",
            "name": "Nine County",
            "singleLineFieldName": "Street"
        }, {
            "url": "http://kub.org/KnoxAddrPts/GeocodeServer",
            "name": "Knox Addr",
            "singleLineFieldName": "Street"
        }]
    },

    "lods": [{
        "level": 0,
        "resolution": 550,
        "scale": 633600
    }, {
        "level": 1,
        "resolution": 330,
        "scale": 380160
    }, {
        "level": 2,
        "resolution": 165,
        "scale": 190080
    }, {
        "level": 3,
        "resolution": 82.5,
        "scale": 95040
    }, {
        "level": 4,
        "resolution": 55,
        "scale": 63360
    }, {
        "level": 5,
        "resolution": 41.66,
        "scale": 48000
    }, {
        "level": 6,
        "resolution": 20.83,
        "scale": 24000
    }, {
        "level": 7,
        "resolution": 10.4167,
        "scale": 12000
    }, {
        "level": 8,
        "resolution": 8.333,
        "scale": 9600
    }, {
        "level": 9,
        "resolution": 5.2083,
        "scale": 6000
    }, {
        "level": 10,
        "resolution": 4.1667,
        "scale": 4800
    }, {
        "level": 11,
        "resolution": 2.0833,
        "scale": 2400
    }, {
        "level": 12,
        "resolution": 1.04167,
        "scale": 1200
    }, {
        "level": 13,
        "resolution": 0.52,
        "scale": 600
    }],

    tasks: {
        queryTasks: [{
            layerID: ["gasSystem"],
            layerName: ["Valve Control"],
            sreachField: "VALVENUMBER",
            name: "Gas Valve",
            placeholder: "Gas Valve: ex 3202"
        }, {
            layerID: ["waterSystem"],
            layerName: ["Air Relief", "Auto Blow Off", "Check", "Control", "Altitude", "Pressure Reducing", "Pressure Relief"],
            sreachField: "VALVENUMBER",
            name: "Water Valve",
            placeholder: "Water Valve: ex 1303A"
        }, {
            layerID: ["electricSystem"],
            layerName: ["Substation"],
            sreachField: "SUBSTATIONID",
            name: "Substation ID",
            placeholder: "Substation ID: ex UT"
        }, {
            layerID: ["electricSystem"],
            layerName: ["Fuse", "Switch Distribution", "Recloser", "Switch Transmission"],
            sreachField: "DEVICEID",
            name: "Switch/ Fuse",
            placeholder: "Switch/Fuse: ex 33120"
        }, {
            layerID: ["electricSystem"],
            layerName: ["Transformer", "Fuse", "Recloser", "Switch Distribution", "Pole"],
            sreachField: "STRUCTURENUMBER",
            name: "Electric Structure",
            placeholder: "Structure: ex CCK05"
        }, {
            layerID: ["electricSystem"],
            layerName: ["KUB.E_TransformerUnit"],
            sreachField: "TRANSFORMERID ",
            name: "Transformer",
            placeholder: "Xfmr: ex 22561"
        }, {
            layerID: ["electricSystem", "gasSystem"],
            layerName: ["Poles", "Main"],
            sreachField: "IPID ",
            name: "IPID",
            placeholder: "IPID: ex 40022008"
        }]
    }
});