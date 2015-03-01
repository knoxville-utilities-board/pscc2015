define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_TemplatedMixin",
    "common/ui/Panel",
    "dojo/text!./templates/ReleaseNotesItem.html"],

function(declare, lang, _TemplatedMixin, Panel, template) {

    return declare([Panel, _TemplatedMixin], {

        postCreate: function() {

            this.set("title", "Release " + this.release + " - " + this.date);

            var content = "";
            var itemNumber = 0;
            var featureClass = "";

            this.features.forEach(lang.hitch(this, function(feature) {

                featureClass = itemNumber % 2 == 1 ? "gray" : "";

                content += lang.replace(template, {
                    featureClass: featureClass,
                    featureTag: feature.tag,
                    featureNote: feature.note
                });

                itemNumber += 1;
            }));

            this.containerNode.innerHTML = content;
        }
    });
});