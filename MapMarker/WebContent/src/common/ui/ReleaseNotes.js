define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/json",
    "common/ui/ReleaseNotesItem",
    "common/ui/View",
    "dojo/text!app/releaseNotes.json"],

function(declare, lang, JSON, ReleaseNotesItem, View, releaseNotesJson) {

    return declare([View], {

        postCreate: function() {
            var releases = JSON.parse(releaseNotesJson);

            releases.forEach(lang.hitch(this, function(release) {
                this.addChild(new ReleaseNotesItem(release));
            }));
        }
    });
});
