const path = require("path");
require("dotenv").config({ path: path.join(__dirname,"../.env") })
var mysql = require('./db/mysql');
const formatacoes = require('./utility/formatacoes');
const controller = require('./js/controller');

async function script() {
    // let recipiente_um = { recipiente_id: 5};
    // let recipiente_dois = { recipiente_id: 15};

    // await mysql.queryVolumes().then( results => (
    //     recipiente_um.volume = results[0].volume,
    //     recipiente_dois.volume = results[1].volume
    // ));

    // console.log('Recipiente 1: ' + JSON.stringify(recipiente_um));
    // console.log('Recipiente 2: ' + JSON.stringify(recipiente_dois));

	// await mysql.atualizaVolume(5, 200);
	// await mysql.atualizaVolume(15, 200);

    // await mysql.queryVolumes().then( results => (
    //     recipiente_um.volume = results[0].volume,
    //     recipiente_dois.volume = results[1].volume
    // ));
    
    // console.log('Recipiente 1: ' + JSON.stringify(recipiente_um));
    // console.log('Recipiente 2: ' + JSON.stringify(recipiente_dois));

    // console.log(formatacoes.convertUTCDateToLocalDate(new Date()));
    await controller.verificaEconomiaRealizada();
};
	
script();