const cisternaDois = function() {

    let conversao1;
    let conversao2 = 16.40 // Valor da base do recipiente até o sensor 

    cisterna2.on("change", function() {
        const { centimeters, inches } = cisterna2;
        conversao1 = (centimeters - conversao2) * (-1); //Converter o valor de 16.40 > 0 para 0 > 16.40 altura recipiente
    });
    return conversao1;
}

module.exports = cisternaDois;