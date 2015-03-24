define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
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

function(declare, lang, _TemplatedMixin, _WidgetsInTemplateMixin, router, _ModelApiMixin, Button, DateTimePicker, DropdownStoreList, Form, FormItem, TabContainer, TextArea, TextBox, View, DropdownListItem, dateHandling, template) {

    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelApiMixin], {
        templateString: template,
        
        postCreate: function() {
            var emptyValidate = function() {
                if (this.get("value") === "") {
                    return "Required field";
                }
                return true;
            };

            this.store = lang.getObject("marker.stores.markers", false, app);
            console.log("the store", this.store);
            
            var categoryStore = lang.getObject("marker.stores.categories", false, app);
            console.log("category store", categoryStore);
            this.category.setStore(categoryStore);
            this.category.itemRenderer = DropdownListItem;
            
            this.saveButton.on("click", lang.hitch(this, this.save));
            this.deleteButton.on("click", lang.hitch(this, this.remove));
        },

        onModelComplete: function(model) {
            console.log("model", model);
            app.appbar.set("title", "Markers > " + model.id);
            
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
            //this.categoryId.set("value", this.model.categoryId || ""); 
            //this.category.set("value", this.model.categoryId);
            this.directionId.set("value", this.model.directionId || "");
            this.directionId.set("label", this.model.categoryId || "Select One");
            this.severityId.set("value", this.model.severityId || "");
            this.severityId.set("label", this.model.severityId || "Select One");
            this.subtypeId.set("value", this.model.subtypeId || "");
            this.subtypeId.set("label", this.model.subtypeId || "Select One");
            this.typeId.set("value", this.model.typeId || "");
            this.typeId.set("label", this.model.typeId || "Select One");
            this.utilityId.set("value", this.model.utilityId || "");
            this.utilityId.set("value", this.model.utilityId || "Select One");
            
            //Dates
            this.startDate.set("value", new Date(this.model.startDate) || "");
            this.updateDate.set("value", new Date(this.model.updateDate) || "");
            this.endDate.set("value", new Date(this.model.endDate) || "");
            this.createdDate.set("value", new Date(this.model.createdDate) || "");
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
            	this.model.categoryId = this.categoryId.get("value");
            	this.model.city = this.city.get("value");
            	this.model.createdBy = this.createdBy.get("value");
            	this.model.createdDate = this.createdDate.get("value");
            	this.model.description = this.description.get("value");
            	this.model.directionId = this.directionId.get("value");
            	this.model.editedBy = this.editedBy.get("value");
            	this.model.endCrossStreet  = this.endCrossStreet.get("value");
            	this.model.endDate = this.endDate.get("value");
            	this.model.endLatitude = this.endLatitude.get("value");
            	this.model.endLongitude = this.endLongitude.get("value");
            	this.model.fromCrossStreet  = this.fromCrossStreet.get("value");
            	this.model.latitude = this.latitude.get("value");
            	this.model.location = this.location.get("value");
            	this.model.longitude = this.longitude.get("value");
            	this.model.severityId = this.severityId.get("value");
            	this.model.specifyEnd = this.specifyEnd.get("value");
            	this.model.startDate = this.startDate.get("value");
            	this.model.street = this.street.get("value");
            	this.model.subtypeId = this.subtypeId.get("value");
            	this.model.typeId = this.typeId.get("value");
            	this.model.updateDate = this.updateDate.get("value");
            	this.model.utilityId = this.utilityId.get("value");
            	
                if (this.model.id) {
                	this.model.editedDate = dateHandling.javaISOString(new Date());
                    this.store.put(this.model);
                } else {
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
        }
    });
});