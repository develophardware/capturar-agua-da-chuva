    var five = require("johnny-five");
    var board = new five.Board();

    board.on("ready", function() {

        //var sensor = new five.Sensor("A3");
        var sensor = new five.Sensor({
            pin: "A1",
            freq: 5000,
            //threshold: 5
        });

        sensor.on("change", function() {
            return console.log(this.value);
        });

    });