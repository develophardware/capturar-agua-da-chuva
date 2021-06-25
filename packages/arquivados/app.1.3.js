let modulos = require("./app.1.4");

let http = require('http');

http.createServer(function(req, res) {
    //let modulos = require("./modulo");
    res.end(console.log(this.modulos));
}).listen(8081);