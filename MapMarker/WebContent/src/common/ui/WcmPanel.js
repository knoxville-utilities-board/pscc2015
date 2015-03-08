define(["dojo/_base/declare",
    "dojo/_base/lang",
    "common/services/wcmService",
    "common/ui/Panel"],

function(declare, lang, wcmService, Panel) {
    return declare([Panel], {
        _setModelAttr: function(model) {
            if (!this.model) {
                this.model = model;
                this.containerNode.innerHTML = "Loading...";
                wcmService.getContent(model).then(lang.hitch(this, this.onWcmLoad), lang.hitch(this, this.onWcmFail));
            }
        },

        onWcmLoad: function(response) {
            this.containerNode.innerHTML = response;
        },

        onWcmFail: function(response) {
            this.containerNode.innerHTML = "Wcm content failed to load.";
        }
    });
});