const five = require("johnny-five");
// const firebase = require("firebase"); // falta incluir as configurações do firebase
const { Board, Proximity, Servo } = require("johnny-five");
const board = new Board();

board.on("ready", function() {
    const sensor_chuva = new five.Sensor({
        pin: "A1",
        freq: 5000,
        //threshold: 5
    });
    const motor_calha = new five.Servo({
        pin: 7,
        center: true
    });
    const cisterna1 = new Proximity({
        controller: "HCSR04",
        pin: "A2", // parametro de entrada
        freq: 5000, //frequencia de leitira do sensor, aproximadamente 5 segundos
    });
    const cisterna2 = new Proximity({
        controller: "HCSR04",
        pin: "A3", // parametro de entrada
        freq: 5000, //frequencia de leitira do sensor, aproximadamente 5 segundos
    });


    sensor_chuva.on("change", function() {
        if (sensor_chuva.value <= 400) {
            console.log("  Chuva forte : ", sensor_chuva.value);
        } else if (sensor_chuva.value > 400 && sensor_chuva.value <= 600) {
            console.log("  Chuva moderada : ", sensor_chuva.value);
        } else if (sensor_chuva.value > 600 && sensor_chuva.value <= 950) {
            console.log("  Chuva Fraca : ", sensor_chuva.value);
        } else {
            console.log("  Sem chuva : ", sensor_chuva.value);
        }
    });

    motor_calha.to(180);

    cisterna1.on("change", function() {
        const { centimeters, inches } = proximity;
        //console.log("Nível da Água: ");
        //console.log("  cm  : ", centimeters);
        conversao1 = (centimeters - conversao2) * (-1); //Converter o valor de 16>0 para 0>16.6 altura recipiente
        console.log("Nível de Água do Reservatório: ", conversao1.toFixed(2), "cm"); // retorna o valor com 2 decimais
        //console.log("Nível da Água: ", conversao1 , "cm");
        console.log("-----------------");
        conversao3 = conversao1 * 240; // 240 Medida do comprimento * largura
        console.log("Valor em Centimetros Cubico: ", conversao3.toFixed(2), "C³");
        console.log("-----------------");
        conversao4 = conversao3 / 1000; //dividir por 1000 para chegar em litros
        conversao5 = conversao4 * 100; // porém vamos simular um recipiente de 400 litros vamos multiplicar por 100
        console.log("Valor em Litros: ", conversao5.toFixed(2), "L");
        console.log("-----------------");

    });

    cisterna2.on("change", function() {
        const { centimeters, inches } = proximity;
        //console.log("Nível da Água: ");
        //console.log("  cm  : ", centimeters);
        conversao1 = (centimeters - conversao2) * (-1); //Converter o valor de 16>0 para 0>16.6 altura recipiente
        console.log("Nível de Água do Reservatório: ", conversao1.toFixed(2), "cm"); // retorna o valor com 2 decimais
        //console.log("Nível da Água: ", conversao1 , "cm");
        console.log("-----------------");
        conversao3 = conversao1 * 240; // 240 Medida do comprimento * largura
        console.log("Valor em Centimetros Cubico: ", conversao3.toFixed(2), "C³");
        console.log("-----------------");
        conversao4 = conversao3 / 1000; //dividir por 1000 para chegar em litros
        conversao5 = conversao4 * 100; // porém vamos simular um recipiente de 400 litros vamos multiplicar por 100
        console.log("Valor em Litros: ", conversao5.toFixed(2), "L");
        console.log("-----------------");

    });



});