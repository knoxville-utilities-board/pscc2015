define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/when",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "kubgis/defaults",
    "kubgis/utils",
    "bootstrapmap/bootstrapmap",
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
    "util/dateHandling",
    "dojo/text!./templates/Marker.html"],

function(declare, lang, when, _TemplatedMixin, _WidgetsInTemplateMixin, kubgisDefaults, kubgisUtils, bootstrapMap, router, _ModelApiMixin, Button, DateTimePicker, DropdownStoreList, Form, FormItem, TabContainer, TextArea, TextBox, View, DropdownListItem, dateHandling, template) {

    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelApiMixin], {
        templateString: template,
        
        startup: function() {
            var options = {
            	    mapOptions: {
            	        lods: kubgisDefaults.lods,
            	        scrollWheelZoom: true,
            	        slider: true
            	    }
            	};

            //kubgis/utils
            kubgisUtils.createWebMap(this.mapLarge, options).then(lang.hitch(this, this.onMapCompleteLarge));
            
            //ArcGIS
        	var mapInputStart;
            mapInputStart = bootstrapMap.create("mapStart", {
                basemap:"streets",
                center:[-83.93,35.97],
                zoom:13,
              });
            mapInputStart.on("load", this.onMapCompleteInputStart);
            
        	var mapInputEnd;
            mapInputEnd = bootstrapMap.create("mapEnd", {
                basemap:"streets",
                center:[-83.93,35.97],
                zoom:13,
              });
            mapInputEnd.on("load", this.onMapCompleteInputEnd);
        },

        postCreate: function() {
            var emptyValidate = function() {
                if (this.get("value") === "") {
                    return "Required field";
                }
                return true;
            };

            this.store = lang.getObject("marker.stores.markers", false, app);
            console.log("the store", this.store);
                                   
            this.saveButton.on("click", lang.hitch(this, this.save));
            this.deleteButton.on("click", lang.hitch(this, this.remove));
        },

        onModelComplete: function(model) {
            console.log("model", model);
            
            var categoryStore = lang.getObject("marker.stores.categories", false, app);
            console.log("category store", categoryStore);
            this.category.setStore(categoryStore);
            this.category.itemRenderer = DropdownListItem;
            console.log(categoryStore.get(1));
            
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
            
            var markerNo = model.id? model.id : 'New';
            app.appbar.set("title", "Markers > " + markerNo);
            
            this.form.clearValidation();
            
            //Text
            this.description.set("value", this.model.description || "");
            this.street.set("value", this.model.street || "");
            this.city.set("value", this.model.city || "");
            this.fromCrossStreet.set("value", this.model.fromCrossStreet || "");
            this.endCrossStreet.set("value", this.model.endCrossStreet || "");
            this.location.set("value", this.model.location || "");
            this.specifyEnd.set("value", this.model.specifyEnd || "");
            this.createdBy.set("value", this.model.createdBy || "");
            this.editedBy.set("value", this.model.editedBy || "");


            //Dropdowns
            var label = "Select One...";
            var value = null;            
            if (this.model.categoryId) {
	            var categoryModel = categoryStore.get(this.model.categoryId);
	            when(categoryModel).then(function(categoryModel) {
	            	label = categoryModel.title;
	                value = categoryModel.id;
	            });
        	}
            this.category.set("label", label || 'Select One...');
            this.category.set("value", value);
            
            label = "Select One...";
            value = null;
            if (this.model.directionId) {
	            var directionModel = directionStore.get(this.model.directionId);
	            when(directionModel).then(function(directionModel) {
	            	label = directionModel.title;
	                value = directionModel.id;
	            });
            }
            this.direction.set("label", label || 'Select One...');
            this.direction.set("value", value);
            
            label = "Select One...";
            value = null;            
            if (this.model.severityId) {
	            var severityModel = severityStore.get(this.model.severityId);
	            when(severityModel).then(function(severityModel) {
	            	label = severityModel.title;
	                value = severityModel.id;
	            });
            }
            this.severity.set("label", label || 'Select One...');
            this.severity.set("value", value);
            
            label = "Select One...";
            value = null;            
            if (this.model.subtypeId) {
	            var subtypeModel = subtypeStore.get(this.model.subtypeId);
	            when(subtypeModel).then(function(subtypeModel) {
	            	label = subtypeModel.title;
	                value = subtypeModel.id;
	            });
            }
            this.subtype.set("label", label || 'Select One...');
            this.subtype.set("value", value);
            
            label = "Select One...";
            value = null;            
            if (this.model.typeId) {
	            var typeModel = typeStore.get(this.model.typeId);
	            when(typeModel).then(function(typeModel) {
	            	label = typeModel.title;
	                value = typeModel.id;
	            });
            }
            this.type.set("label", label || 'Select One...');
            this.type.set("value", value);
            
            label = "Select One...";
            value = null;            
            if (this.model.utilityId) {
	            var utilityModel = utilityStore.get(this.model.utilityId);
	            when(utilityModel).then(function(utilityModel) {
	            	label = utilityModel.title;
	                value = utilityModel.id;
	            });
            }
            this.utility.set("label", label || 'Select One...');
            this.utility.set("value", value);
            
            //Dates
            this.startDate.set("value", new Date(this.model.startDate) || "");
            this.updateDate.set("value", new Date(this.model.updateDate) || "");
            this.endDate.set("value", new Date(this.model.endDate) || "");
            this.createdDate.set("value", new Date(this.model.createdDate));
            this.editedDate.set("value", new Date(this.model.editedDate) || "");

            //Map
            this.latitude.set("value", this.model.latitude || "");
            this.longitude.set("value", this.model.longitude || "");
            this.endLatitude.set("value", this.model.endLatitude || "");
            this.endLongitude.set("value", this.model.endLongitude || "");
            
            //Disabled - these values are set automatically on saving
            this.createdBy.set("disabled", true);
            this.createdDate.set("disabled", true);
            this.editedBy.set("disabled", false); //Should be disabled & set with login info when app is deployed
            this.editedDate.set("disabled", true);

            if (this.model.id) {
            	this.deleteButton.show();
            } else {
            	this.deleteButton.hide();
            	this.createdDate.set("value", new Date());
            	this.createdBy.set("disabled", false); //Should be disabled & set with login info when app is deployed
            	this.editedBy.set("disabled", true);
            	this.editedDate.set("disabled", true);
            }
            
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
            	
            	this.model.latitude = this.latitude.get("value");
            	this.model.longitude = this.longitude.get("value");
            	
            	//If there is no distance, then the end point == the start point
            	if (this.endLatitude.get("value") == "") {
            		this.model.endLatitude = this.latitude.get("value");
            	} else {
                	this.model.endLatitude = this.endLatitude.get("value");
            	};
            	if (this.endLongitude.get("value") == "") {
            		this.model.endLongitude = this.longitude.get("value");
            	} else {
            		this.model.endLongitude = this.endLongitude.get("value");
            	};        
            	
            	this.model.description = this.description.get("value");
            	this.model.street = this.street.get("value");
            	this.model.city = this.city.get("value");
            	this.model.fromCrossStreet  = this.fromCrossStreet.get("value");
            	this.model.endCrossStreet  = this.endCrossStreet.get("value");
            	this.model.location = this.location.get("value");
            	this.model.specifyEnd = this.specifyEnd.get("value");
            	this.model.createdBy = this.createdBy.get("value")
            	this.model.editedBy = this.editedBy.get("value");

                if (this.model.id) {
                	this.model.editedDate = dateHandling.javaISOString(new Date());
                    this.store.put(this.model);
                } else {
                	this.model.createdDate = dateHandling.javaISOString(this.createdDate.get("value"));
                    console.log(this.store.put(this.model));
                    router.go("/marker/create/success");
                }
            }
        },

        remove: function() {
            if (!this._confirmDelete) {
            	this.deleteButton.set("label", "Confirm Delete");
            	this._confirmDelete = true;
            } else {
            	this._confirmDelete = false;
            	this.store.remove(this.model.id).then(function() {
            		router.go("/marker");
            	});
            }            
        },
        
        
        onMapCompleteLarge: function(response) {
            this.mapLarge = response.map;
            this.mapLarge.enableScrollWheelZoom();
            this.mapLarge.showZoomSlider();
            //set up map related events here
        },
        
        onMapCompleteInputStart: function(response) {
            //this.mapInputStart = response.map;
            //set up map related events here
        },
        
        onMapCompleteInputEnd: function(response) {
            //this.mapInputEnd = response.map;
            //set up map related events here
        }

    });
});