define({

    "mapOptions": {

        "logo": false,

        "showAttribution": false



    },

    "webmap": {

        "item": {

            "title": "KUB Map defaults",

            "snippet": "These defaults are suitable for a public map",

            "spatialReference": {

                "wkid": 2915

            }

        },

        "itemData": {

            "baseMap": {

                "title": "Kub_Base",

                "baseMapLayers": [{

                    "id": "kubBase",

                    "url": "https://www20.kub.org/arcgis/rest/services/outage_servicearea_esri/MapServer",

                    //if the above doesn't work

                    //"url": "https://www30.kub.org/arcgis/rest/services/outage_servicearea_esri/MapServer",

                    "opacity": 1,

                    "visibility": true

                }]



            },

            "version": "1.1"

        }

    },



    "helperServices": {

        "geometry": {

            "url": null

        }

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

    }]

});