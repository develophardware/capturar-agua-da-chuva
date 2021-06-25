const { Board, Proximity } = require("johnny-five");
const board = new Board();

let conversao1;
let conversao2 = 16.60 // Valor da base do recipiente até o sensor 
let conversao3;
let conversao4;
//let conversao5;

board.on("ready", () => {
    const proximity = new Proximity({
        controller: "HCSR04",
        pin: "A2", // parametro de entrada LD esquerdo da telha
        freq: 5000, //frequencia de leitira do sensor, aproximadamente 5 segundos
    });

    proximity.on("change", function() {
        const { centimeters, inches } = proximity;
        console.log("Nível da Água: ");
        console.log("  cm  : ", centimeters); // sem conversão debug
        console.log("-----------------");
        conversao1 = (centimeters - conversao2) * (-1); //Converter o valor de 16.60 > 0 para 0 > 16.60 altura recipiente
        console.log("Nível de Água do Reservatório: ", conversao1.toFixed(2), "cm"); // retorna o valor com 0 decimais para inibir a oscilação do sensor
        console.log("-----------------");
        conversao3 = conversao1 * 240; // Volume -> Conversão1 = Altura, comprimento * profundidade = 240, medida do recipiente.
        console.log("Valor em Centimetros Cubico: ", conversao3.toFixed(2), "C³");
        console.log("-----------------");
        conversao4 = conversao3 / 1000; //C³ centimetros cubicos dividir por 1000 para chegar em litros
        console.log("Valor em Litros: ", conversao4.toFixed(3), "L");
        console.log("-----------------");
        // // conversao5 = conversao4 * 100; // porém vamos simular um recipiente de 400 litros aproximadamente vamos multiplicar por 100
        // // console.log("Valor em Litros: ", conversao5.toFixed(2), "L");
        // console.log("-----------------");d

    });
});