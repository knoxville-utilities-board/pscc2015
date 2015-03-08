define(["dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_Contained",
    "dijit/_Container"],

function(array, declare, lang, _Contained, _Container) {

    return declare([_Container, _Contained], {

        select: "",

        deselectItem: function(item) {
            item.set("selected", false);
        },

        deselectAll: function() {
            array.forEach(this.getChildren(), function(child) {
                child.set("selected", false);
            });
        },

        selectItem: function(item) {
            item.set("selected", true);
        },

        selectAll: function() {
            array.forEach(this.getChildren(), function(child) {
                child.set("selected", true);
            });
        },

        getSelected: function() {
            var selected = [];

            array.forEach(this.getChildren(), function(child) {
                if (child.selected) {
                    selected.push(child);
                }
            });

            return selected;
        },

        addChild: function(listItem, position) {
            listItem.on("select", lang.hitch(this, this._onSelect));
            if (this.select && !listItem.noCheck) {
                listItem.set("selectable", true);
            }
            this.inherited(arguments);
        },

        _onSelect: function(eventObj) {
            var listItem = eventObj.listItem;
            if (!eventObj.listItem.noCheck && listItem.selectable) {
                if (this.select == "multiple") {
                    listItem.set("selected", !listItem.get("selected"));
                }
                if (this.select == "single") {
                    listItem.set("selected", true);
                }
                if (listItem.get("selected") && this.select == "single") {
                    array.forEach(this.getChildren(), function(child) {
                        if (child !== listItem) {
                            child.set("selected", false);
                        }
                    });
                }
            }

            if (!eventObj.listItem.noCheck) {
                this.onSelect.call(eventObj.listItem, eventObj.event);
            }
        },

        onSelect: function(eventObj) {
            // User defined onSelect
        }
    });
});
