define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/when",
    "dojo/dom-construct",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "kubgis/defaults",
    "kubgis/utils",
    "kubgis/dijit/Popup",
    "bootstrapmap/bootstrapmap",
    "esri/layers/GraphicsLayer",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/InfoTemplate",
    "common/routing/router",
    "common/ui/_ModelApiMixin",
    "common/ui/Button",
    "common/ui/DateTimePicker",
    "common/ui/DropdownStoreList",
    "common/ui/Form",
    "common/ui/FormItem",
    "common/ui/TabContainer",
    "common/ui/TextArea",
    "common/ui/TextBox",
    "common/ui/View",
    "app/ui/DropdownListItem",
    "app/ui/PointPicker",
    "util/dateHandling",
    "dojo/text!./templates/MarkerInfoWindowTemplate.html",
    "dojo/text!./templates/Marker.html"],

function(declare, lang, on, when, domConstruct, _TemplatedMixin, _WidgetsInTemplateMixin, kubgisDefaults, kubgisUtils, Popup, bootstrapMap, GraphicsLayer, Graphic, Point, SimpleMarkerSymbol, InfoTemplate, router, _ModelApiMixin, Button, DateTimePicker, DropdownStoreList, Form, FormItem, TabContainer, TextArea, TextBox, View, DropdownListItem, PointPicker, dateHandling, markerInfoTemplate, template) {

    var symbols = {
        circle: "STYLE_CIRCLE",
        cross: "STYLE_CROSS",
        diamond: "STYLE_DIAMOND",
        square: "STYLE_SQUARE",
        x: "STYLE_X"
    };

    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelApiMixin], {
        templateString: template,

        chosenCategory: {},

        startup: function() {
            this.inherited(arguments);

            var customPopup = new Popup({}, domConstruct.create("div"));

            //ArcGIS
            var mapInputLarge;
            mapInputLarge = bootstrapMap.create("mapLarge", {
                mapOptions: {
                    infoWindow: customPopup
                },
                basemap: "streets",
                center: [-83.93, 35.97],
                zoom: 11
            });
            mapInputLarge.on("load", lang.hitch(this, this.onMapCompleteLarge));
        },

        postCreate: function() {
            this.inherited(arguments);
            
            var emptyValidate = function() {
                if (this.get("value") === "") {
                    return "Required field";
                }
                return true;
            };

            this.store = lang.getObject("marker.stores.markers", false, app);
            console.log("the store", this.store);

            this.on("category-change", lang.hitch(this, function(evt) {
                if (evt.category.title == "All") {
                    this.chosenCategory = {};
                } else {
                    this.chosenCategory = evt.category;
                }
                if (!this.model.id) {
                    this.category.set("label", this.chosenCategory.title || "Select One...");
                    this.category.set("value", this.chosenCategory.value || null);
                }
            }));

            this.saveButton.on("click", lang.hitch(this, this.save));
            this.deleteButton.on("click", lang.hitch(this, this.remove));
        },

        onModelComplete: function(model) {
            console.log("model", model);
                                    
            //Stores for dropdowns
            var categoryStore = lang.getObject("marker.stores.categories", false, app);
            this.category.setStore(categoryStore);
            this.category.itemRenderer = DropdownListItem;

            var directionStore = lang.getObject("marker.stores.directions", false, app);
            this.direction.setStore(directionStore);
            this.direction.itemRenderer = DropdownListItem;

            var severityStore = lang.getObject("marker.stores.severities", false, app);
            this.severity.setStore(severityStore);
            this.severity.itemRenderer = DropdownListItem;

            var subtypeStore = lang.getObject("marker.stores.subtypes", false, app);
            this.subtype.setStore(subtypeStore);
            this.subtype.itemRenderer = DropdownListItem;

            var typeStore = lang.getObject("marker.stores.types", false, app);
            this.type.setStore(typeStore);
            this.type.itemRenderer = DropdownListItem;

            var utilityStore = lang.getObject("marker.stores.utilities", false, app);
            this.utility.setStore(utilityStore);
            this.utility.itemRenderer = DropdownListItem;

            //Set marker ID
            var markerNo = model.id ? model.id : 'New';
            app.appbar.set("title", "Markers > " + markerNo);

            this.form.clearValidation();

            //Text
            this.title.set("value", this.model.title || "");
            this.description.set("value", this.model.description || "");
            this.street.set("value", this.model.street || "");
            this.city.set("value", this.model.city || "");
            this.fromCrossStreet.set("value", this.model.fromCrossStreet || "");
            this.endCrossStreet.set("value", this.model.endCrossStreet || "");
            this.location.set("value", this.model.location || "");
            this.specifyEnd.set("value", this.model.specifyEnd || "");

            //Dropdowns
            if (this.model.categoryId) {
                var categoryModel = categoryStore.get(this.model.categoryId);
                when(categoryModel).then(lang.hitch(this, function(categoryModel) {
                    this.category.set("label", categoryModel.title);
                    this.category.set("value", categoryModel.id);
                }));
            } else {
            	this.category.set("label", this.chosenCategory.title || "Select One...");
            	this.category.set("value", this.chosenCategory.value);
            }
            
            if (this.model.directionId) {
                var directionModel = directionStore.get(this.model.directionId);
                when(directionModel).then(lang.hitch(this, function(directionModel) {
                    this.direction.set("label", directionModel.title);
                    this.direction.set("value", directionModel.id);
                }));
            } else {
	            this.direction.set("label", 'Select One...');
	            this.direction.set("value", null);
            }

            if (this.model.severityId) {
                var severityModel = severityStore.get(this.model.severityId);
                when(severityModel).then(lang.hitch(this, function(severityModel) {
                    this.severity.set("label", severityModel.title);
                    this.severity.set("value", severityModel.id);
                }));
            } else {
                this.severity.set("label", 'Select One...');
                this.severity.set("value", null);
            }

            if (this.model.subtypeId) {
                var subtypeModel = subtypeStore.get(this.model.subtypeId);
                when(subtypeModel).then(lang.hitch(this, function(subtypeModel) {
                    this.subtype.set("label", subtypeModel.title);
                    this.subtype.set("value", subtypeModel.id);
                }));
            } else {
                this.subtype.set("label", 'Select One...');
                this.subtype.set("value", null);
            }

            if (this.model.typeId) {
                var typeModel = typeStore.get(this.model.typeId);
                when(typeModel).then(lang.hitch(this, function(typeModel) {
                    this.type.set("label", typeModel.title);
                    this.type.set("value", typeModel.id);
                }));
            } else {
                this.type.set("label", 'Select One...');
                this.type.set("value", null);
            }

            if (this.model.utilityId) {
                var utilityModel = utilityStore.get(this.model.utilityId);
                when(utilityModel).then(lang.hitch(this, function(utilityModel) {
                    this.utility.set("label", utilityModel.title);
                    this.utility.set("value", utilityModel.id);
                }));
            } else {
                this.utility.set("label", 'Select One...');
                this.utility.set("value", null);
            }

            //Dates
            this.startDate.set("value", new Date(this.model.startDate) || "");
            this.updateDate.set("value", new Date(this.model.updateDate) || "");
            this.endDate.set("value", new Date(this.model.endDate) || "");

            //Map
            this.startPoint.latitude = this.model.latitude;
            this.startPoint.longitude = this.model.longitude;
            this.startPoint.set("value", (this.model.latitude) ? this.model.latitude + ", " + this.model.longitude : "");

            if (this.model.latitude != this.model.endLatitude || this.model.longitude != this.model.endLongitude) {
                this.endPoint.latitude = this.model.latitude;
                this.endPoint.longitude = this.model.longitude;
                this.endPoint.set("value", (this.model.endLatitude) ? this.model.endLatitude + ", " + this.model.endLongitude : "");
            } else {
                this.endPoint.set("value", "");
            }

            //Should be removed & automatically set with login info when app is deployed
            this.createdBy.set("value", this.model.createdBy || "");
            this.createdBy.set("disabled", true);
            this.editedBy.set("value", this.model.editedBy || "");
            this.editedBy.set("disabled", false); 

            //Handle differences between existing marker vs. new marker
            if (this.model.id) {
            	//Set map infoWindow
                if (this.graphics) {
                    var graphic = this.graphics[model.id];
                    this.showGraphic(graphic);
                }
                //Show delete button
                this.deleteButton.show();
                if(this._confirmDelete) {
                	this._confirmDelete = false;
                	this.deleteButton.set("label", "Delete");
                    this.deleteButton.set("style", "color: #063c6f;");
                }
                //Show audit info
                $('#createDetails').text("Created on " + dateHandling.kubDate(this.model.createdDate) + " at " + dateHandling.kubTime(this.model.editedDate) + " by " + this.model.createdBy);
                if (this.model.editedDate && this.model.editedBy !== '') {
                	$('#editDetails').text("Last modified on " + dateHandling.kubDate(this.model.editedDate) + " at " + dateHandling.kubTime(this.model.editedDate) + " by " + this.model.editedBy);
                } else {
                	$('#editDetails').text("");
                }
            } else {
            	$(this.formTab).tab("show");
                this.deleteButton.hide();
                this.createdBy.set("disabled", false); //Should be removed & automatically set with login info when app is deployed
                this.editedBy.set("disabled", true);
                $('#createDetails').text("");
                $('#editDetails').text("");
            }
        },
        
        showGraphic: function(graphic) {
        	$(this.mapTab).tab("show");
            this.mapLarge.infoWindow.setContent(graphic.getContent());
            this.mapLarge.infoWindow.setTitle(graphic.getTitle());
            this.mapLarge.centerAt(graphic.geometry).then(lang.hitch(this, function() {
                this.mapLarge.infoWindow.show(graphic.geometry);
            }));
        },

        save: function() {
            if (this.form.validate()) {
                this.model.categoryId = this.category.get("value");
                this.model.directionId = this.direction.get("value");
                this.model.severityId = this.severity.get("value");
                this.model.subtypeId = this.subtype.get("value");
                this.model.typeId = this.type.get("value");
                this.model.utilityId = this.utility.get("value");

                this.model.startDate = dateHandling.javaISOString(this.startDate.get("value"));
                this.model.updateDate = dateHandling.javaISOString(this.updateDate.get("value"));
                this.model.endDate = dateHandling.javaISOString(this.endDate.get("value"));
                //createdDate and editedDate are set automatically

                this.model.latitude = this.startPoint.latitude;
                this.model.longitude = this.startPoint.longitude;

                //If there is no distance, then the end point == the start point
                if (this.endPoint.get("value") === "") {
                    this.model.endLatitude = this.startPoint.latitude;
                    this.model.endLongitude = this.startPoint.longitude;
                } else {
                    this.model.endLatitude = this.endPoint.latitude;
                    this.model.endLongitude = this.endPoint.longitude;
                }
                
                this.model.title = this.title.get("value");
                this.model.description = this.description.get("value");
                this.model.street = this.street.get("value");
                this.model.city = this.city.get("value");
                this.model.fromCrossStreet = this.fromCrossStreet.get("value");
                this.model.endCrossStreet = this.endCrossStreet.get("value");
                this.model.location = this.location.get("value");
                this.model.specifyEnd = this.specifyEnd.get("value");
                this.model.createdBy = this.createdBy.get("value");
                this.model.editedBy = this.editedBy.get("value");

                if (this.model.id) {
                    this.model.editedDate = dateHandling.javaISOString(new Date());
                    this.store.put(this.model);
                } else {
                    this.model.isActive = true;
                    this.model.createdDate = dateHandling.javaISOString(new Date());
                    console.log(this.store.put(this.model));
                    router.go("/marker/create/success");
                }
            }
        },

        remove: function() {
            if (!this._confirmDelete) {
                this.deleteButton.set("label", "Confirm Delete");
                this.deleteButton.set("style", "color: #dc6e65;");
                this._confirmDelete = true;
            } else {
                this.deleteButton.set("label", "Delete");
                this.deleteButton.set("style", "color: #063c6f;");
                this._confirmDelete = false;
                this.store.remove(this.model.id).then(function() {
                    router.go("/marker");
                });
            }
        },

        setMarkers: function(markers) {
            this.mapLargeGraphicsLayer.clear();
            this.mapLarge.infoWindow.hide();
            var categoryStore = lang.getObject("marker.stores.categories", false, app);

            this.graphics = [];
            
            markers.forEach(function(marker) {
                var cat = categoryStore.get(marker.categoryId);
                when(cat).then(lang.hitch(this, function(cat) {
                    var split = cat.symbology.split(",");
                    var symbol = split[0].toLowerCase();
                    var color = split[1];

                    var markerDates = lang.clone(marker);
                    markerDates.startDate = dateHandling.kubDate(marker.startDate);
                    markerDates.endDate = dateHandling.kubDate(marker.endDate);

                    var infoTemplate = new InfoTemplate("${title}", markerInfoTemplate);
                    var graphic = new Graphic(
                    new Point(marker.longitude, marker.latitude),
                    new SimpleMarkerSymbol(SimpleMarkerSymbol[symbols[symbol]], 12, null, color),
                    markerDates,
                    infoTemplate);

                    this.mapLargeGraphicsLayer.add(graphic);
                    this.graphics[marker.id] = graphic;
                }));
            }, this);

        },

        onMapCompleteLarge: function(response) {
            this.mapLarge = response.map;
            this.mapLarge.enableScrollWheelZoom();
            this.mapLarge.showZoomSlider();

            this.mapLargeGraphicsLayer = new GraphicsLayer();
            this.mapLarge.addLayer(this.mapLargeGraphicsLayer);
            this.setMarkers(app.marker.markers);
            
            if (this.model.id) {
	            this.defer(function() {
	                var graphic = this.graphics[this.model.id];
	                this.showGraphic(graphic);
	            }, 250);
            }
            
            this.on("new-markers", lang.hitch(this, function(evt) {
                this.setMarkers(evt.markers);
            }));
        }
    });
});