define(["dojo/_base/declare",
    "dojox/mobile/_StoreListMixin",
    "./DropdownList",
    "./GenericDropdownListItem"],

function(declare, _StoreListMixin, DropdownList, GenericDropdownListItem) {

    return declare([DropdownList, _StoreListMixin], {
        itemRenderer: GenericDropdownListItem,
        
        allSelection: false,

        allSelectionLabel: "All",

        allSelectionValue: "",

        postMixInProperties: function() {
            this.inherited(arguments);
            if (this.allSelection) {
                this.forceSelect = false;
            }
            if (!this.allSelectionValue) {
                this.allSelectionValue = this.allSelectionLabel;
            }
        },

        generateList: function( /*Array*/ items) {
            if (this.allSelection) {
                var item = {
                    label: this.allSelectionLabel,
                    value: this.allSelectionValue
                };
                items.unshift(item);
            }
            this.inherited(arguments);
        },

        _createItemProperties: function( /*Object*/ item) {
            var props = {};

            if (!item.label) {
                props.label = item[this.labelProperty];
            }

            props.item = {};
            for (var name in item) {
                if (item.hasOwnProperty(name)) {
                    //notice this change
                    //props[(this.itemMap && this.itemMap[name]) || name] = item[name];
                    props.item[(this.itemMap && this.itemMap[name]) || name] = item[name];
                }
            }

            return props;
        },

        onAdd: refresh,

        onUpdate: refresh,

        onDelete: refresh
    });

    function refresh() {
        this.refresh();
    }
});