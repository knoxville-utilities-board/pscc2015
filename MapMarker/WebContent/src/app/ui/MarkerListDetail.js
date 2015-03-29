define(["dojo/_base/declare",
    "dojo/_base/lang",
    "common/routing/router",
    "common/ui/Button",
    "common/ui/CheckBox",
    "common/ui/StoreList",
    "common/ui/ListDetailView",
    "common/ui/DropdownStoreList",
    "app/ui/DropdownListItem",
    "app/ui/Marker",
    "app/ui/MarkerListItem"],

function(declare, lang, router, Button, CheckBox, StoreList, ListDetailView, DropdownStoreList, DropdownListItem, Marker, MarkerListItem) {

    return declare([ListDetailView], {
        postCreate: function() {
            console.log("postCreate()");
            
            // Ed Broxson 3-29-15
            //  Added flags for sorting and filtering
            var direct = null;
            var active = null;

            var store = this.store = lang.getObject("marker.stores.markers", false, app);

            var list = new StoreList({
                store: store,
                select: "single",
                hasWidgetContainer: true,
                // Ed Broxson 3-29-15
                //  Added query for sorting and filtering
                query: {
                	isActive: true
                },
                itemRenderer: MarkerListItem,
                onSelect: function(evt) {
                    router.go("/marker/" + this.item.id);
                }
            });
            this.set("list", list);
            
            // Ed Broxson 3-29-15
            //  Added catStore and catDropdown for sorting and filtering
            var catStore = lang.getObject("marker.stores.categories", false, app);
            var catDropdown = new DropdownStoreList({
            	store: catStore,
            	select: "single",
            	itemRenderer: DropdownListItem
            });
            
            catDropdown.on("select", lang.hitch(this, function(){
            	list.clearList();
            	list.setQuery({
            		categoryId: catDropdown.get("value"),
            		isActive: active
            	}, {
            		sort: [{attribute: "createdDate", descending: direct}]
            	});
            }));
            list.addWidget(catDropdown);
            
            // Ed Broxson 3-29-15
            //  Added isActiveCheckbox for sorting and filtering
            var isActiveCheckbox = this.isActiveCheckbox = new CheckBox({
            	// Next 2 lines will change the checkbox graphic to be more inline with others on page
            	//  but it will not be obvious when checked
//            	innerHTML: '<i class="checkBoxIcon fa fa-2x fa-check-square"></i>',
//            	"class": "fa.pull-right btn-link",
            	label: "Inactive"
            });
            isActiveCheckbox.on("click", lang.hitch(this, function(){
            	if(active == null){
            		active = true;
            	}
            	active = !active;
            	list.clearList();
            	list.setQuery({
            		categoryId: catDropdown.get("value"),
            		isActive: active
            	}, {
            		sort: [{attribute: "createdDate", descending: direct}]
            	});
            }));
            list.addWidget(isActiveCheckbox);
            
            // Ed Broxson 3-29-15
            //  Changed from queryButton and modified for sorting and filtering
            var sortButton = this.sortButton = new Button({
            	innerHTML: '<i class="buttonIcon fa fa-2x fa-toggle-down"></i>',
            	"class": "pull-left btn-link userListWidget",
            	title: "Sort Markers"
            });
            sortButton.on("click", lang.hitch(this, function(){
            	if(direct == null){
            		direct = false;
            	}
            	direct = !direct;
            	list.clearList();
            	list.setQuery({
            		categoryId: catDropdown.get("value"),
            		isActive: active
            	}, {
            		sort: [{attribute: "createdDate", descending: direct}]
            	});
            }));
            list.addWidget(sortButton);

            var createButton = this.createButton = new Button({
                innerHTML: '<i class="buttonIcon fa fa-2x fa-plus"></i>',
                "class": "pull-right btn-link userListWidget",
                title: "Create a Marker"
            });
            createButton.on("click", lang.hitch(this, function() {
                list.deselectAll();
                router.go("/marker/create");
            }));
            list.addWidget(createButton);
            
            var detail = new Marker();
            this.set("detail", detail);
        }
    });
});
