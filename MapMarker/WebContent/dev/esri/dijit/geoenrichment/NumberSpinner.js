require({cache:{
'url:esri/dijit/geoenrichment/templates/NumberSpinner.html':"<div class=\"dijit dijitReset dijitInline dijitLeft NumberSpinner\" id=\"widget_${id}\" role=\"presentation\">\n    <div class='dijitReset dijitValidationContainer'>\n        <input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\" />\n    </div>\n    <div class=\"dijitReset dijitInputField dijitInputContainer\">\n        <input class='dijitReset dijitInputInner' data-dojo-attach-point=\"textbox,focusNode\" type=\"${type}\" data-dojo-attach-event=\"onkeydown:_onKeyDown\"\n\t\t\trole=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}/>\n    </div>\n    <div data-dojo-attach-point=\"upArrowNode\" class=\"NumberSpinner_RadiusButton NumberSpinner_RadiusPlus\">+</div>\n    <div data-dojo-attach-point=\"downArrowNode\" class=\"NumberSpinner_RadiusButton NumberSpinner_RadiusMinus\">&ndash;</div>\n</div>"}});
//>>built
require({
    cache: {
        "url:esri/dijit/geoenrichment/templates/NumberSpinner.html": '\x3cdiv class\x3d"dijit dijitReset dijitInline dijitLeft NumberSpinner" id\x3d"widget_${id}" role\x3d"presentation"\x3e\n    \x3cdiv class\x3d\'dijitReset dijitValidationContainer\'\x3e\n        \x3cinput class\x3d"dijitReset dijitInputField dijitValidationIcon dijitValidationInner" value\x3d"\x26#935; " type\x3d"text" tabIndex\x3d"-1" readonly\x3d"readonly" role\x3d"presentation" /\x3e\n    \x3c/div\x3e\n    \x3cdiv class\x3d"dijitReset dijitInputField dijitInputContainer"\x3e\n        \x3cinput class\x3d\'dijitReset dijitInputInner\' data-dojo-attach-point\x3d"textbox,focusNode" type\x3d"${type}" data-dojo-attach-event\x3d"onkeydown:_onKeyDown"\n\t\t\trole\x3d"spinbutton" autocomplete\x3d"off" ${!nameAttrSetting}/\x3e\n    \x3c/div\x3e\n    \x3cdiv data-dojo-attach-point\x3d"upArrowNode" class\x3d"NumberSpinner_RadiusButton NumberSpinner_RadiusPlus"\x3e+\x3c/div\x3e\n    \x3cdiv data-dojo-attach-point\x3d"downArrowNode" class\x3d"NumberSpinner_RadiusButton NumberSpinner_RadiusMinus"\x3e\x26ndash;\x3c/div\x3e\n\x3c/div\x3e'
    }
});
define("esri/dijit/geoenrichment/NumberSpinner", ["../../declare", "dijit/form/NumberSpinner", "dojo/text!./templates/NumberSpinner.html"], function(a, b, c) {
    return a([b], {
        templateString: c,
        cssStateNodes: {},
        required: !0
    })
});