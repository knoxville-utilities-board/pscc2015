require({cache:{
'url:esri/dijit/templates/Form.html':"<div class=\"esriForm\">\n</div>"}});
//>>built
define("esri/dijit/Form", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel", "dojo/_base/array", "dojo/dom-style", "dojo/dom-construct", "dojo/dom-class", "dojo/query", "dijit/_Widget", "dijit/_TemplatedMixin", "dojo/text!./templates/Form.html"], function(q, r, l, w, x, g, s, m, n, h, t, u, v) {
    return r([t, u], {
        declaredClass: "esri.dijit.Form",
        widgetsInTemplate: !0,
        templateString: v,
        widgets: {},
        fieldTypes: {
            string: {
                widget: "dijit/form/TextBox"
            },
            date: {
                widget: "dijit/form/DateTextBox"
            },
            number: {
                widget: "dijit/form/NumberTextBox"
            },
            "boolean": {
                widget: "dijit/form/Select",
                widgetParameters: {
                    options: [{
                        label: "True",
                        value: "true"
                    }, {
                        label: "False",
                        value: "false"
                    }]
                }
            }
        },
        fieldTemplate: "\x3cdiv\x3e\x3cdiv\x3e{label}\x3c/div\x3e\x3cdiv\x3e{widget}\x3c/div\x3e\x3c/div\x3e",
        constructor: function(a, b) {
            this.fieldTypes = l.mixin(this.fieldTypes, a.fieldTypes)
        },
        postCreate: function() {
            this._fieldsLength = this.fields.length;
            g.forEach(this.fields, function(a) {
                this.addField(a)
            }, this)
        },
        destroy: function() {
            this.inherited(arguments);
            var a, b;
            for (a in this.widgets) this.widgets.hasOwnProperty(a) && (b = this.widgets[a],
                b.destroy());
            this.widgets = null
        },
        addField: function(a) {
            var b, c, g, p, e, d = this;
            b = (a.template || this.fieldTemplate).replace("{label}", '\x3cspan class\x3d"esriFormFieldLabel"\x3e' + (a.label || a.name) + "\x3c/span\x3e");
            b = b.replace("{widget}", '\x3cdiv class\x3d"esriFormFieldWidget"\x3e\x3c/div\x3e');
            c = m.toDom(b);
            n.add(c, "esriFormField");
            g = h(".esriFormFieldWidget", c)[0];
            s.set(c, {
                display: !1 === a.visible ? "none" : "block"
            });
            q([a.widget || this.fieldTypes[a.type].widget], function(b) {
                p = a.widgetParameters || d.fieldTypes[a.type].widgetParameters || {};
                e = new b(p, g);
                e.startup();
                n.add(e.domNode, "esriFormFieldWidget");
                e.fieldNode = c;
                e.initialState = {
                    value: a.value || null,
                    visible: a.visible || !0,
                    disabled: a.disabled || !1
                };
                d.domNode.appendChild(c);
                d.widgets[a.name] = e;
                d.setField(a);
                e.on("change", l.hitch(d, function(a, b) {
                    var c;
                    b && (c = b.value || b, b.target && b.target.value && (c = b.target.value), c = {
                        fieldName: a,
                        value: c
                    }, d.emit("value-change", c))
                }, a.name));
                d._fieldsLength--;
                var f, k;
                if (0 === d._fieldsLength) {
                    b = h(".esriFormField", d.domNode);
                    for (f = 0; f < b.length; f++)
                        for (k = f; k <
                            b.length; k++)(d.fields[f].label || d.fields[f].name) === h(".esriFormFieldLabel", b[k])[0].innerHTML && m.place(b[k], d.domNode, f)
                }
            })
        },
        removeField: function(a) {
            l.isString(a) || (a = a.name);
            a = this.getWidget(a);
            a.fieldNode.parentNode.removeChild(a.fieldNode);
            a.destroy()
        },
        getWidget: function(a) {
            return this.widgets[a]
        },
        reset: function() {
            var a, b;
            for (a in this.widgets) this.widgets.hasOwnProperty(a) && (b = this.widgets[a].initialState, this.setField({
                name: a,
                value: b.value,
                visible: b.visible,
                disabled: b.disabled
            }))
        },
        getField: function(a) {
            var b =
                this.getWidget(a);
            return {
                label: h(".esriFormFieldLabel", b.parentNode)[0].innerHTML,
                name: a,
                value: b.value || b.getValue(),
                visible: b.visible,
                disabled: b.disabled
            }
        },
        setValues: function(a) {
            for (var b in a) a.hasOwnProperty(b) && this.setValue(b, a[b])
        },
        setValue: function(a, b) {
            var c = this.getWidget(a);
            c.setValue ? c.setValue(b) : c.set && c.set("value", b)
        },
        setFields: function(a) {
            g.forEach(a, function(a) {
                this.setField(a)
            })
        },
        setField: function(a) {
            var b = this.getWidget(a.name);
            h(".esriFormFieldLabel", b.fieldNode)[0].innerHTML =
                a.label || a.name;
            if (!0 === a.visible || !1 === a.visible) b.setVisibility ? b.setVisibility(a.visible) : b.set && b.set("visible", a.visible);
            if (!0 === a.disabled || !1 === a.disabled) b.setDisabled ? b.setDisabled(a.disabled) : b.set && b.set("disabled", a.disabled);
            if (void 0 !== a.value || null !== a.value) b.setValue ? b.setValue(a.value) : b.set && b.set("value", a.value)
        }
    })
});