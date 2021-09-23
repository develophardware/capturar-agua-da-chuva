const path = require("path");
require("dotenv").config({ path: path.join(__dirname,"../.env") })
const mysql = require('../db/mysql');
const formatacoes = require('../utility/formatacoes');
const sensores = require('./sensores');

module.exports = {
    /**
     * Função que realizar todo o processamento dos volumes, para verificar a economia realizada.
     * @returns 
     */
    verificaEconomiaRealizada: async function() {
        console.log('** Inicio do script **');
        let data_atual = formatacoes.convertUTCDateToLocalDate(new Date());
        let retorno = sensores.processaSensores();
        let volume_atual = retorno.cisterna1 + retorno.cisterna2;
        let registro_db = await buscaVolumeRegistrado(data_atual);

        // await mysql.insereEconomiaRealizada(data_atual, volume_atual)

        if(data_atual !== process.env.DATA_ECONOMIA) {

            process.env.DATA_ECONOMIA = data_atual;

            if(volume_atual > process.env.VOLUME_ECONOMIZADO) {

                await mysql.insereEconomiaRealizada(data_atual, volume_atual - process.env.VOLUME_ECONOMIZADO)

                process.env.VOLUME_ECONOMIZADO = volume_atual;
                console.log('valor da variavei volume_economizado atualizado para: ', process.env.VOLUME_ECONOMIZADO);

            } else if(volume_atual < process.env.VOLUME_ECONOMIZADO) {

                process.env.VOLUME_ECONOMIZADO = volume_atual;
                console.log('valor da variavei volume_economizado atualizado para: ', process.env.VOLUME_ECONOMIZADO);
    
            }

        } else if(data_atual === process.env.DATA_ECONOMIA && volume_atual > process.env.VOLUME_ECONOMIZADO) {

            await mysql.atualizaEconomiaRealizada(data_atual, registro_db.qtd_litros_economizados + volume_atual - process.env.VOLUME_ECONOMIZADO);

            process.env.VOLUME_ECONOMIZADO = volume_atual;
            console.log('valor da variavei volume_economizado atualizado para: ', process.env.VOLUME_ECONOMIZADO);

        } else if(volume_atual < process.env.VOLUME_ECONOMIZADO) {

            process.env.VOLUME_ECONOMIZADO = volume_atual;
            console.log('valor da variavei volume_economizado atualizado para: ', process.env.VOLUME_ECONOMIZADO);

        } else if(!registro_db) {

            await mysql.insereEconomiaRealizada(data_atual, 0)

        }

        await mysql.atualizaVolume(5, retorno.cisterna1);
        await mysql.atualizaVolume(15, retorno.cisterna2);

        console.log('** Fim do script **');
    }
}

async function buscaVolumeRegistrado(data) {
    let registro_atual;

    await mysql.queryEconomiaRealizada(data).then( results => (
        registro_atual = results[0]
    ));
    
    return registro_atual;
}