//>>built
define("esri/dijit/editing/Delete", ["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../../kernel", "../../OperationBase", "./Add"], function(b, e, f, g, c, d) {
    return b(c, {
        declaredClass: "esri.dijit.editing.Delete",
        type: "edit",
        label: "Delete Features",
        constructor: function(a) {
            a = a || {};
            this._add = new d({
                featureLayer: a.featureLayer,
                addedGraphics: a.deletedGraphics
            })
        },
        performUndo: function() {
            this._add.performRedo()
        },
        performRedo: function() {
            this._add.performUndo()
        }
    })
});