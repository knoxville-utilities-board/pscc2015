define(["dojo/_base/declare",
    "dojo/_base/lang",
    "common/routing/router",
    "common/ui/Button",
    "common/ui/StoreList",
    "common/ui/ListDetailView",
    "app/ui/Marker",
    "app/ui/MarkerListItem"],

function(declare, lang, router, Button, StoreList, ListDetailView, Marker, MarkerListItem) {

    return declare([ListDetailView], {
        postCreate: function() {
            console.log("postCreate()");

            var store = this.store = lang.getObject("marker.stores.markers", false, app);

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
            
            var queryButton = this.queryButton = new Button({
            	innerHTML: '<i class="buttonIcon fa fa-2x fa-minus"></i>',
            	"class": "pull-left btn-link userListWidget",
            	title: "Filter Markers"
            });
            queryButton.on("click", lang.hitch(this, function(){
            	list.clearList();
            	list.setQuery({
            		createdBy: "fsdarwin"
            	}, {
            		sort: [{attribute: "createdDate", descending: true}]
            	});
            }));
            list.addWidget(queryButton);

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
