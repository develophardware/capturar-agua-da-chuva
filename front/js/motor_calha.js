const { Board, Servo } = require("johnny-five");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const board = new Board();

board.on("ready", () => {
    const servo = new Servo(2);

    //servo.to(0, 60); 

    rl.setPrompt("SERVO TEST (0-180)> ");
    rl.prompt();

    rl.on("line", (line) => {
        servo.to(+line.trim());
        rl.prompt();
    }).on("close", () => process.exit(0));
});

//Referencia de posição do servo, lado direito enchendo com calaha lado esquedo levantada 80º pra menos <-
// Referencia de posição servo, lado esquerdo enchendo com calha lado direito levantada posição 93° pra mais ->