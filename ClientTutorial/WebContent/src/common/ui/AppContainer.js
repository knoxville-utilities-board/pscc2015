define(["dojo/_base/declare",
    "./View"],

function(declare, View) {

    return declare([View], {

        currentView: null,

        addChild: function(view) {
            view.hide();
            this.inherited(arguments);
        },

        hideCurrentView: function() {
            if (this.currentView) {
                this.currentView.hide();
            }
        },

        showView: function(view) {
            view.show();
            this.currentView = view;
        }
    });
});
