define(["dojo/_base/declare",
    "dojox/mobile/_StoreListMixin",
    "./DropdownList",
    "./GenericDropdownListItem"],

function(declare, _StoreListMixin, DropdownList, GenericDropdownListItem) {

    return declare([DropdownList, _StoreListMixin], {
        itemRenderer: GenericDropdownListItem,

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
        }
    });
});
