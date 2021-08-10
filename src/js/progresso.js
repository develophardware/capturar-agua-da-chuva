$(document).ready(function() {
    //$(".dial").knob();
    $('.dial').knob({
        'min': 0,
        'max': 400,
        'width': 250,
        'height': 250,
        'displayInput': true,
        'fgColor': "#00BFFF",
        'release': function(v) { $("p").number(v); },
        'readOnly': true
    });
});