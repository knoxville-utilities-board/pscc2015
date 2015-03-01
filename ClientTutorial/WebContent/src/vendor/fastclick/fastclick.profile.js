/* jshint unused:false */
var profile = (function() {
    var copyOnly = function(filename, mid) {
        var list = {
            "fastclick/fastclick.profile": 1,
            "fastclick/fastclick.json": 1
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