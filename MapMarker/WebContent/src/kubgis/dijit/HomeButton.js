define(["dojo/_base/declare",
    "dojo/on",
    "esri/dijit/HomeButton",
    "./MapButton"],

function(declare, on, HomeButton, MapButton) {

    return declare([HomeButton, MapButton], {

        fontIcon: "fa fa-home mapButtonIcon",

        title: "Home",

        buildRendering: function() {
            this.inherited(arguments);
            this._homeNode = this.domNode;
        },

        _setLocateButtonAttr: function(locateButton) {
            this.own(on(this, "home", function() {
                if (locateButton) {
                    locateButton.clear();
                }
            }));
        }
    });
});
