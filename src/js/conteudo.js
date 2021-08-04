$(document).ready(function() {
    //$(".dial").knob();
    $('.dial').knob({
        'min': 0,
        'max': 400,
        'width': 250,
        'height': 250,
        'displayInput': true,
        'fgColor': "#e74c3c",
        'release': function(v) { $("p").number(v); },
        'readOnly': true
    });
});