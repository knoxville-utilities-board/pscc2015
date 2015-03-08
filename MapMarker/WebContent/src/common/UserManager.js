define(["dojo/_base/lang",
    "dojo/request/registry",
    "common/services/environmentService"],

function(lang, request, environmentService) {

    return {

        getUser: function() {
            return app.user;
        },

        getUserRoles: function() {
            return app.roles;
        },

        isUserInRole: function(role) {
            return this.getUserRoles().indexOf(role) !== -1;
        },

        setUser: function(user) {
            app.user = user;
        },

        getFullname: function() {
            return app.user.fullname;
        },

        isAuthenticated: function() {
            return lang.getObject("app.user.username") ? true : false;
        },

        login: function(username, password) {
            console.info("login()");

            //login and getPropertyBag
            return environmentService.login(username, password).then(function(response) {
                return environmentService.getPropertyBag();
            }).then(function(response) {
                lang.mixin(app, response.data);
            });
        },

        logout: function() {
            this.setUser(null);

            // the RS is to cause new JSESSIONID
            // because of session fixation settings in WAS
            // posting to ibm_security_logout too,
            // otherwise the WASReqURL is null
            environmentService.logout().then(function() {
                return request.post("ibm_security_logout", {});
            }).always(function() {
                document.location.href = "./";
            });
        }
    };
});
