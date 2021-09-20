const path = require("path");
require("dotenv").config({ path: path.join(__dirname,"../.env") })
var mysql = require('../db/mysql');
const formatacoes = require('../utility/formatacoes');

module.exports = {
    /**
     * Função que realizar todo o processamento dos volumes, para verificar a economia realizada.
     * @returns 
     */
    verificaEconomiaRealizada: async function() {
        let volume_atual = await buscaVolumeRegistrado();
        let data_atual = formatacoes.convertUTCDateToLocalDate(new Date());

        if(data_atual !== process.env.DATA_ECONOMIA) {
            process.env.DATA_ECONOMIA = data_atual;
            console.log('** Variavel local que armazena a data da economia foi atualizada para: ' + process.env.DATA_ECONOMIA + ' **');
        } else if(data_atual === process.env.DATA_ECONOMIA) {

        }
    }
}

async function buscaVolumeRegistrado() {
    let volume_atual = 0;

    await mysql.queryVolumes().then( results => (
        volume_atual += results[0].volume,
        volume_atual += results[1].volume
    ));

    return volume_atual;
}