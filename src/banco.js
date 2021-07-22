const Sequelize = require('sequelize') // Biblioteca Sequelize 
const sequelize = new Sequelize('heroku_99c310fb1abd7e2', 'b7a968139deee5', 'da64a6d5', { // Configurações do banco, nomedatabase, user, senha
    host: "us-cdbr-east-04.cleardb.com", //Servidor do banco
    dialect: 'mysql' // Tipo de Banco
})

sequelize.authenticate().then(function() {
    console.log("Conectado com sucesso")
}).catch(function(erro) {
    console.log("Erro na conexão" + erro)
})

//mysql://b7a968139deee5:da64a6d5@us-cdbr-east-04.cleardb.com/heroku_99c310fb1abd7e2?reconnect=true



/*CREATE TABLE `heroku_99c310fb1abd7e2`.`monitoramento` (
    `recipiente_id` INT NOT NULL AUTO_INCREMENT,
    `volume` FLOAT NOT NULL,
    PRIMARY KEY (`recipiente_id`));
 Criação da tabela monitoramento*/