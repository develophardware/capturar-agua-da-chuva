const path = require("path");
require("dotenv").config({ path: path.join(__dirname,"../.env") })
const mysql = require('mysql');

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
});

module.exports = {
    /**
     * Função que verifica o volume de todos os recipientes
     * @returns sem retorno
     */
	queryVolumes: function() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(error, connection) {
                if (error) {
                    console.error(error);
                    callback(true);
                    reject();
                }
    
                let sql = 'SELECT * FROM monitoramento';
    
                connection.query(sql, [], function(error, results) {
                    if (error) {
                        console.error(error);
                        callback(true);
                        reject();
                    }
                    resolve(results);
                });
                
            });
        });
	},
	/**
     * Função que atualiza o volume dos recipientes
     * @param {number} recipiente_id id do recipiente (5 ou 15)
     * @param {number} volume volume atual do recipiente
     * @returns sem retorno
     */
	atualizaVolume: function(recipiente_id, volume) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(error, connection) {
                if (error) {
                    console.error(error);
                    callback(true);
                    reject();
                }
    
                let sql = 'UPDATE monitoramento set volume = ? WHERE recipiente_id = ?';
    
                connection.query(sql, [ volume, recipiente_id ], function(error) {
                    if (error) {
                        console.error(error);
                        callback(true);
                        reject();
                    }
                    console.log('Volume do recipiente ' + recipiente_id + ' atualizado para ' + volume);
                    resolve();
                });
            });
        })
	},
    /**
     * Função que cria o registro de volume economizado no dia
     * @param {number} volume volume obtido no dia
     * @param {Date} data dia em que a economia foi realizada
     * @returns sem retorno
     */
    insereEconmiaRealizada: function(volume, data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(error, connection) {
                if (error) {
                    console.error(error);
                    callback(true);
                    reject();
                }
    
                let sql = 'INSERT INTO economia_realizada (data, qtd_litros_economizados) VALUES (?, ?)';
    
                connection.query(sql, [ data, qtd_litros_economizados ], function(error) {
                    if (error) {
                        console.error(error);
                        callback(true);
                        reject();
                    }
                    console.log('Volume do recipiente ' + recipiente_id + ' atualizado para ' + volume);
                    resolve();
                });
            });
        })
	},
    /**
     * Função que atualiza o registro de volume economizado no dia
     * @param {number} volume volume obtido no dia
     * @param {Date} data dia em que a economia foi realizada
     * @returns sem retorno
     */
    atualizaEconmiaRealizada: function(volume, data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(error, connection) {
                if (error) {
                    console.error(error);
                    callback(true);
                    reject();
                }
    
                let sql = 'UPDATE economia_realizada (qtd_litros_economizados) VALUES (?) WHERE data = ?';
    
                connection.query(sql, [ volume, data ], function(error) {
                    if (error) {
                        console.error(error);
                        callback(true);
                        reject();
                    }
                    console.log('Volume do recipiente ' + recipiente_id + ' atualizado para ' + volume);
                    resolve();
                });
            });
        })
	}
};
