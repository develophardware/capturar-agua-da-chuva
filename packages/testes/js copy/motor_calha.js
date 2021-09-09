let motorCalha = function() {

    const { Board, Servo } = require("johnny-five");
    const readline = require("readline");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //const board = new Board();

    //board.on("ready", () => {
    const servo = new Servo(2);

    //servo.to(0, 60); 


    // });

}

motorCalha();

module.exports = motorCalha;

//Referencia de posição do servo, levantando lado esquerdo da calha, enchemos a cisterna do lado diretio 80º ou <-
// Referencia de posição do servo, levantando lado direito da calha, enchemos a cisterna do lado esquerdo 93º