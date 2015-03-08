define(["dojo/_base/array",
    "dojo/_base/declare",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/on",
    "dojo/query",
    "esri/dijit/Popup"],

function(array, declare, domClass, domConstruct, on, query, Popup) {


    return declare([Popup], {

        _actionList: [],

        show: function() {
            this.inherited(arguments);

            //TODO find out why setFeatures is not unhidding the actionList??
            domClass.remove(query(".actionList", this.domNode)[0], "hidden");
        },

        hide: function() {

            this.inherited(arguments);

            array.forEach(this._actionList, function(action) {
                domConstruct.destroy(action.link);
                action.handler.remove();
            });

            this._actionList = [];

        },

        addAction: function(action) {

            var link = domConstruct.create("a", {
                "class": "action",
                innerHTML: action.label,
                href: "javascript:void(0)"
            }, query(".actionList", this.domNode)[0]);

            var handler = on(link, "click", function() {
                action.owner.emit(action.type, action.event);
            });

            this._actionList.push({
                link: link,
                handler: handler
            });
        }
    });
});
