define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "common/routing/router",
    "common/ui/_ModelApiMixin",
    "common/ui/Button",
    "common/ui/DropdownStoreList",
    "common/ui/Form",
    "common/ui/FormItem",
    "common/ui/TextArea",
    "common/ui/TextBox",
    "common/ui/View",
    "util/dateHandling",
    "dojo/text!./templates/Marker.html"],

function(declare, lang, _TemplatedMixin, _WidgetsInTemplateMixin, router, _ModelApiMixin, Button, DropdownStoreList, Form, FormItem, TextArea, TextBox, View, dateHandling, template) {

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
            
            this.saveButton.on("click", lang.hitch(this, this.save));
            this.deleteButton.on("click", lang.hitch(this, this.remove));
        },

        onModelComplete: function(model) {
            console.log("model", model);
            app.appbar.set("title", "Markers > " + model.id);
            
            this.form.clearValidation();

            this.categoryId.set("value", this.model.categoryId || "");
            this.city.set("value", this.model.city || "");
            this.createdBy.set("value", this.model.createdBy || "");
            this.createdDate.set("value", this.model.createdDate || "");
            this.description.set("value", this.model.description || "");
            this.directionId.set("value", this.model.directionId || "");
            this.editedBy.set("value", this.model.editedBy || "");
            this.editedDate.set("value", this.model.editedDate || "");
            this.endCrossStreet.set("value", this.model.endCrossStreet || "");
            this.endDate.set("value", this.model.endDate || "");
            this.endLatitude.set("value", this.model.endLatitude || "");
            this.endLongitude.set("value", this.model.endLongitude || "");
            this.fromCrossStreet.set("value", this.model.fromCrossStreet || "");
            this.latitude.set("value", this.model.latitude || "");
            this.location.set("value", this.model.location || "");
            this.longitude.set("value", this.model.longitude || "");
            this.severityId.set("value", this.model.severityId || "");
            this.specifyEnd.set("value", this.model.specifyEnd || "");
            this.startDate.set("value", this.model.startDate || "");
            this.street.set("value", this.model.street || "");
            this.subtypeId.set("value", this.model.subtypeId || "");
            this.typeId.set("value", this.model.typeId || "");
            this.updateDate.set("value", this.model.updateDate || "");
            this.utilityId.set("value", this.model.utilityId || "");

            if (this.model.id) {
            	this.deleteButton.show();
            } else {
            	this.deleteButton.hide();
            	this.model.createdDate = dateHandling.javaISOString(new Date());
            }
            
            /*if (!model.id) {
                //model defaults here
                model.createdDate = dateHandling.javaISOString(new Date());
            }*/
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
            	this.model.editedDate = dateHandling.javaISOString(new Date());
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