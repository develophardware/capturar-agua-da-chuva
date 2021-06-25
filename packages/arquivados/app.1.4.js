let modulo = function() {

    const five = require("johnny-five");
    const firebase = require("firebase");
    const { Board, Proximity, Servo } = require("johnny-five");
    const board = new Board();

    let cisterna1_conversao1;
    let cisterna1_conversao2 = 16.5 // Valor da base do recipiente até o sensor 
    let cisterna1_conversao3;
    let cisterna1_conversao4;
    let cisterna1_conversao5;

    let cisterna2_conversao1;
    let cisterna2_conversao2 = 16.40 // Valor da base do recipiente até o sensor 
    let cisterna2_conversao3;
    let cisterna2_conversao4;
    let cisterna2_conversao5;



    board.on("ready", function() {
        const sensor_chuva = new five.Sensor({
            pin: "A1",
            freq: 5000,
        });
        const motor_calha = new five.Servo({
            pin: 7,
            center: true
        });
        const cisterna1 = new Proximity({
            controller: "HCSR04",
            pin: "A2", // parametro de entrada LD esquerdo da telha
            freq: 10000, //frequencia de leitira do sensor, aproximadamente 5 segundos
        });
        const cisterna2 = new Proximity({
            controller: "HCSR04",
            pin: "A3", // parametro de entrada LD direito da telha
            freq: 10000, //frequencia de leitira do sensor, aproximadamente 5 segundos
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

        motor_calha.to(90);

        cisterna1.on("change", function() {
            const { centimeters, inches } = cisterna1;
            console.log("| 1° Primeira Cisterna |");
            console.log("-----------------");
            cisterna1_conversao1 = (centimeters - cisterna1_conversao2) * (-1); //Converter o valor de 16>0 para 0>16.6 altura recipiente
            console.log("Nível de Água da Cisterna (1): ", cisterna1_conversao1.toFixed(2), "cm"); // retorna o valor com 2 decimais
            console.log("-----------------");
            cisterna1_conversao3 = cisterna1_conversao1 * 240; // 240 Medida do comprimento * largura
            console.log("Valor em Centimetros Cubico: ", cisterna1_conversao3.toFixed(2), "C³");
            console.log("-----------------");
            cisterna1_conversao4 = cisterna1_conversao3 / 1000; //dividir por 1000 para chegar em litros
            cisterna1_conversao5 = cisterna1_conversao4 * 100; // porém vamos simular um recipiente de 400 litros vamos multiplicar por 100
            console.log("Valor em Litros: ", cisterna1_conversao5.toFixed(2), "L");
            console.log("-----------------");
            console.log("");
            console.log("");

        });

        cisterna2.on("change", function() {
            const { centimeters, inches } = cisterna2;
            console.log("| 2° Segunda Cisterna |");
            cisterna2_conversao1 = (centimeters - cisterna2_conversao2) * (-1); //Converter o valor de 16>0 para 0>16.6 altura recipiente
            console.log("Nível de Água da Cisterna (2): ", cisterna2_conversao1.toFixed(2), "cm"); // retorna o valor com 2 decimais
            console.log("-----------------");
            cisterna2_conversao3 = cisterna2_conversao1 * 240; // 240 Medida do comprimento * largura
            console.log("Valor em Centimetros Cubico: ", cisterna2_conversao3.toFixed(2), "C³");
            console.log("-----------------");
            cisterna2_conversao4 = cisterna2_conversao3 / 1000; //dividir por 1000 para chegar em litros
            cisterna2_conversao5 = cisterna2_conversao4 * 100; // porém vamos simular um recipiente de 400 litros vamos multiplicar por 100
            console.log("Valor em Litros: ", cisterna2_conversao5.toFixed(2), "L");
            console.log("-----------------");
            console.log("");
            console.log("");
        });

    });

}

modulo();

module.exports = modulo;