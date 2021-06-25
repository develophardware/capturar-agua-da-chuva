let modulos = require("../js/modulo");

let http = require('http');

http.createServer(function(req, res) {
    //let modulos = require("./modulo");
    res.end(console.log(this.modulos));
}).listen(8081);