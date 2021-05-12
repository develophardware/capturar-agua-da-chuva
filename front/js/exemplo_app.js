var five = require("johnny-five"),
    board, button;
var firebase = require("firebase");

board = new five.Board();

board.on("ready", function() {
    var led = new five.Led(13);
    //var rele = new five.Relay(8);
    var on = false;

    var firebaseConfig = {
        apiKey: "AIzaSyA4TUQckCM7kN_u-I5f4p2O_3JvFh29RX4",
        authDomain: "iot-7b861.firebaseapp.com",
        databaseURL: "https://iot-7b861-default-rtdb.firebaseio.com",
        projectId: "iot-7b861",
        storageBucket: "iot-7b861.appspot.com",
        messagingSenderId: "1036489764101",
        appId: "1:1036489764101:web:375fa080e06a7a2b1ddb6c",
        measurementId: "G-FERQ91D9M8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //firebase.analytics();


    // Get a reference to the database service
    var database = firebase.database();

    database.ref('led/').on('value', snapshot => {
        var state = snapshot.val();

        if (state == 'on') {
            on = true;
            led.on();

        } else {
            on = false;
            led.off();

        }
    });
});