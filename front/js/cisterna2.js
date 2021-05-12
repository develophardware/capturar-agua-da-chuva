const { Board, Proximity } = require("johnny-five");
const board = new Board();

let conversao1;
let conversao2 = 17.6 // Valor da base do recipiente até o sensor 
let conversao3;
let conversao4;
let conversao5; //parametro de saida

board.on("ready", () => {
    const proximity = new Proximity({
        controller: "HCSR04",
        pin: "A1", // parametro de entrada
        freq: 5000, //frequencia de leitira do sensor, aproximadamente 5 segundos
    });

    proximity.on("change", function() {
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