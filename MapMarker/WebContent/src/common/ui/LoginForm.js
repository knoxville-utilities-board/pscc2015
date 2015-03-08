define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/topic",
    "dojo/dom-class",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "../routing/router",
    "./_ModelApiMixin",
    "./Button",
    "./Growler",
    "./TextBox",
    "./View",
    "dojo/text!./templates/LoginForm.html"],

function(declare, lang, topic, domClass, _TemplatedMixin, _WidgetsInTemplateMixin, router, _ModelApiMixin, Button, Growler, TextBox, View, template) {

    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelApiMixin], {

        templateString: template,

        model: null,

        growler: null,

        postCreate: function() {
            console.info("postCreate()");
            this.inherited(arguments);

            this.loginButton.on("click", lang.hitch(this, "_handleLogin"));
        },

        _handleLogin: function(evt) {
            console.info("_handleLogin()");

            evt.preventDefault();

            if (!this.validate()) {
                return;
            }

            var username = this.j_username.get("value");
            var password = this.j_password.get("value");

            // clear after reading
            this.j_password.set("value", "");

            app.login(username, password).then(lang.hitch(this, "_onLoginSuccess"), lang.hitch(this, function(err) {
                this.growler.growl({
                    message: "Login Failed",
                    level: "danger",
                    timeout: 5000
                });
            }));
        },

        _onLoginSuccess: function() {
            this.onLoginSuccess();
            topic.publish("app.login");
        },

        onLoginSuccess: function(response) {
            var redirectURL = "";
            var segue = null;

            if (this.model) {
                redirectURL = this.model.redirectURL;
                segue = this.model.segue;
            }

            router.go(redirectURL, true, segue);

            this.set("model", false);
            this.resetForm();
        },

        resetForm: function() {
            this.j_username.set("value", "");
            this.j_password.set("value", "");
        },

        validate: function() {
            var valid = true;

            if (this.j_username.get("value").length <= 0) {
                domClass.add(this.usernameControl, "has-error");
                this.usernameErrorSpan.innerHTML = "Required Field";
                valid = false;
            } else {
                this.usernameErrorSpan.innerHTML = "";
                domClass.remove(this.usernameControl, "has-error");
            }

            if (this.j_password.get("value").length <= 0) {
                domClass.add(this.passwordControl, "has-error");
                this.passwordErrorSpan.innerHTML = "Required Field";
                valid = false;
            } else {
                this.passwordErrorSpan.innerHTML = "";
                domClass.remove(this.passwordControl, "has-error");
            }

            return valid;
        }
    });
});
