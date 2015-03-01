define(["dojo/_base/array",
    "dojo/_base/declare",
    "./Alert",
    "./View"],

function(array, declare, Alert, View) {

    return declare([View], {
        growl: function(params) {
            var alert = new Alert(params);
            this.addChild(alert);
            return alert;
        },

        clear: function() {
            array.forEach(this.getChildren(), function(child) {
                child.close();
            });
        }
    });
});
