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

            var direct = null;
            var category = "All";

            var store = this.store = lang.getObject("marker.stores.markers", false, app);

            var detail = new Marker();
            this.set("detail", detail);

            var list = new StoreList({
                store: store,
                select: "single",
                hasWidgetContainer: true,
                itemRenderer: MarkerListItem,
                onSelect: function(evt) {
                    router.go("/marker/" + this.item.id);
                }
            });
            this.set("list", list);
            list.on("complete", lang.hitch(this, function(data) {
                app.marker.markers = data;
                detail.emit("new-markers", {
                    markers: data,
                    bubbles: true
                });
            }));

            var catStore = lang.getObject("marker.stores.categories", false, app);
            var catDropdown = new DropdownStoreList({
                store: catStore,
                forceSelect: false,
                select: "single",
                itemRenderer: DropdownListItem,
                allSelection: true
            });

            catDropdown.on("select", lang.hitch(this, function() {
                category = catDropdown.get("value");
                list.clearList();
                if (category != "All") {
                    list.setQuery({
                        categoryId: category
                        //Ed Broxson 4-18-15
                    	// Removed isActive filter - default isActive filter is built into java side now
                        // with value of 'true'
                    }, {
                        sort: [{
                            attribute: "createdDate",
                            descending: direct
                        }]
                    });
                } else {
                    list.setQuery({
                    	//Ed Broxson 4-18-15
                        // Add isActive filter, with value 'all', to display both active and inactive markers
                    	// or value 'false', to display only inactive markers
                        //  isActive: "all"
                    	
                    }, {
                        sort: [{
                            attribute: "createdDate",
                            descending: direct
                        }]
                    });
                }
                detail.emit("category-change", {
                    category: {
                        value: category,
                        title: catDropdown.get("label")
                    },
                    bubbles: true
                });
            }));
            list.addWidget(catDropdown);

            /*
TODO: Implement reversal of soft-deletion, if we have time. This checkbox allows viewing of inactive markers.
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
            	if (category) {
                	list.setQuery({
                		categoryId: category,
                		isActive: active
                	}, {
                		sort: [{attribute: "createdDate", descending: direct}]
                	});
            	} else {
                	list.setQuery({
                		isActive: active
                	}, {
                		sort: [{attribute: "createdDate", descending: direct}]
                	});
            	}
            }));
            list.addWidget(isActiveCheckbox);
*/

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

            var sortButton = this.sortButton = new Button({
                innerHTML: '<i class="buttonIcon fa fa-2x fa-toggle-up"></i>',
                "class": "pull-right btn-link userListWidget",
                title: "Sort Markers by Date"
            });
            sortButton.on("click", lang.hitch(this, function() {
                if (direct == null) {
                    direct = false;
                }
                direct = !direct;
                if (direct) {
                    sortButton.set("innerHTML", '<i class="buttonIcon fa fa-2x fa-toggle-down"></i>');
                } else {
                    sortButton.set("innerHTML", '<i class="buttonIcon fa fa-2x fa-toggle-up"></i>');
                }
                list.clearList();
                if (category != "All") {
                    list.setQuery({
                        categoryId: category
	                    //Ed Broxson 4-18-15
	                    // Removed isActive filter - default isActive filter is built into java side now
                        // with value of 'true'
                        
                    }, {
                        sort: [{
                            attribute: "createdDate",
                            descending: direct
                        }]
                    });
                } else {
                    list.setQuery({             	
                    	//Ed Broxson 4-18-15
                        // Add isActive filter, with value 'all', to display both active and inactive markers
                    	// or value 'false', to display only inactive markers
                        //  isActive: "all"
                    	
                    }, {
                        sort: [{
                            attribute: "createdDate",
                            descending: direct
                        }]
                    });
                }
            }));
            list.addWidget(sortButton);

            /* Button for removing filter; was replaced with a default option in DropdownListStore
             var createButton = this.createButton = new Button({
                innerHTML: '<i class="buttonIcon fa fa-2x fa-remove"></i>',
                "class": "pull-right btn-link userListWidget",
                title: "Remove Filter"
            });
            createButton.on("click", lang.hitch(this, function() {
            	category = null;
                list.clearList();
                list.setQuery({
            		isActive: active
            	}, {
            		sort: [{attribute: "createdDate", descending: direct}]
            	});
            }));
            list.addWidget(createButton);
            */



        }
    });
});
