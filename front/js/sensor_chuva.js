var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

    //var sensor = new five.Sensor("A3");
    var sensor = new five.Sensor({
        pin: "A3",
        freq: 5000,
        //threshold: 5
    });
    sensor.on("change", function() {
        if (sensor.value <= 400) {
            console.log("  Chuva forte : ", sensor.value);
        } else if (sensor.value > 400 && sensor.value <= 600) {
            console.log("  Chuva moderada : ", sensor.value);
        } else if (sensor.value > 600 && sensor.value <= 950) {
            console.log("  Chuva Fraca : ", sensor.value);
        } else {
            console.log("  Sem chuva : ", sensor.value);
        }
        //console.log(this.value);
    });
});