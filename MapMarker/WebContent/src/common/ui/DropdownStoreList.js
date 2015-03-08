define(["dojo/_base/declare",
    "dojox/mobile/_StoreListMixin",
    "./DropdownList",
    "./GenericDropdownListItem"],

function(declare, _StoreListMixin, DropdownList, GenericDropdownListItem) {

    return declare([DropdownList, _StoreListMixin], {
        itemRenderer: GenericDropdownListItem
    });
});
