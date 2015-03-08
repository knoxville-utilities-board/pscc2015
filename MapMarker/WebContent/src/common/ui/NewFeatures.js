define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dijit/_TemplatedMixin",
    "common/routing/router",
    "common/ui/View",
    "dojo/text!./templates/NewFeaturesItem.html",
    "dojo/text!./templates/NewFeatures.html"],

function(declare, lang, on, _TemplatedMixin, router, View, newFeaturesTemplate, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        postCreate: function() {
            this.inherited(arguments);

            this.own(on(this.releaseNotesButton, "click", lang.hitch(this, "showReleaseNotes")));
        },

        makeFeatures: function(release) {

            this.titleNode.innerHTML = "What's New - " + release.date;

            var content = "";
            var featureClass = "";

            release.features.forEach(lang.hitch(this, function(feature) {

                if (feature.tag == "New") {
                    featureClass = "text-info";
                } else if (feature.tag == "Changed") {
                    featureClass = "text-warning";
                } else if (feature.tag == "Fixed") {
                    featureClass = "text-success";
                } else {
                    featureClass = "text-danger";
                }

                content += lang.replace(newFeaturesTemplate, {
                    featureClass: featureClass,
                    featureTag: feature.tag,
                    featureNote: feature.note
                });
            }));

            this.containerNode.innerHTML = content;
        },

        showReleaseNotes: function() {
            this.hide();
            router.go("/release-notes");
        },

        show: function() {
            $(this.domNode).modal("show");
        },

        hide: function() {
            $(this.domNode).modal("hide");
        }
    });
});
