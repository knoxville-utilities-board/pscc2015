require({cache:{
'url:esri/dijit/templates/FontAlignment.html':"<div class=\"esriFontAlignment\">\n  <div class=\"top\">\n    <button class=\"icon\" value=\"baseline,right\" data-dojo-attach-event=\"onClick:changeValue\"><div class=\"bot-right\"></button>\n    <button class=\"icon\" value=\"baseline,center\" data-dojo-attach-event=\"onClick:changeValue\"><div class=\"bot-mid\"></button>\n    <button class=\"icon\" value=\"baseline,left\" data-dojo-attach-event=\"onClick:changeValue\"><div class=\"bot-left\"></button>\n  </div>\n  <div class=\"mid\">\n    <button class=\"icon\" value=\"middle,right\" data-dojo-attach-event=\"onClick:changeValue\"><div class=\"mid-right\"></button>\n    <button class=\"icon\" value=\"middle,center\" data-dojo-attach-event=\"onClick:changeValue\"><div class=\"mid-mid\"></button>\n    <button class=\"icon\" value=\"middle,left\" data-dojo-attach-event=\"onClick:changeValue\"><div class=\"mid-left\"></button>\n  </div>\n  <div class=\"bot\">\n    <button class=\"icon\" value=\"top,right\" data-dojo-attach-event=\"onClick:changeValue\"><div class=\"top-right\"></button>\n    <button class=\"icon\" value=\"top,center\" data-dojo-attach-event=\"onClick:changeValue\"><div class=\"top-mid\"></button>\n    <button class=\"icon\" value=\"top,left\" data-dojo-attach-event=\"onClick:changeValue\"><div class=\"top-left\"></div></button>\n  </div>\n</div>"}});
//>>built
define("esri/dijit/FontAlignment", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel", "dojo/_base/array", "dojo/query", "dojo/dom-class", "dijit/_Widget", "dijit/_TemplatedMixin", "dojo/text!./templates/FontAlignment.html"], function(f, g, m, n, p, d, e, c, h, k, l) {
    return g([h, k], {
        declaredClass: "esri.dijit.FontAlignment",
        widgetsInTemplate: !0,
        templateString: l,
        _imageUrl: f.toUrl("./images/positionSprite.png"),
        constructor: function(b, a) {},
        destroy: function() {
            this.inherited(arguments)
        },
        setValue: function(b) {
            this.value = b;
            var a = e("button",
                this.domNode);
            d.forEach(a, function(a) {
                a.value === b && c.add(a, "selectedFontAlignment")
            })
        },
        getValue: function() {
            return this.value
        },
        changeValue: function(b) {
            var a = e("button", this.domNode);
            d.forEach(a, function(a) {
                c.remove(a, "selectedFontAlignment")
            });
            c.add(b.currentTarget, "selectedFontAlignment");
            this.value = b.currentTarget.value;
            this.emit("change", {
                value: this.value
            })
        }
    })
});