/* jshint unused:false */
var profile = (function() {
    var copyOnly = function(filename, mid) {
        var list = {
            "bootstrap-jasny/bootstrap-jasny.profile": 1,
            "bootstrap-jasny/bootstrap-jasny.json": 1
        };
        return (mid in list) || /^dojo\/_base\/config\w+$/.test(mid) || (/^dojo\/resources\//.test(mid) && !/\.css$/.test(filename)) || /(png|jpg|jpeg|gif|tiff)$/.test(filename);
    };

    return {
        resourceTags: {
            test: function(filename, mid) {
                return false;
            },

            copyOnly: function(filename, mid) {
                return copyOnly(filename, mid);
            }
        },

        trees: [
            [".", ".", /(\/\.)|(~$)|(CVS)/]
        ]
    };
})();