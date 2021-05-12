var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

    var motor_calha = new five.Servo({
        pin: 7,
        center: true
    });

    motor_calha.to(180);
});