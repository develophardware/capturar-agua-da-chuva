
module.exports = {
    convertUTCDateToLocalDate: function (date) {
        var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
    
        newDate.setHours(hours - offset);
    
        return this.formataData(newDate);   
    },
    formataData: function(data = new Date()) {
        let dataFormatada = '';
        dataFormatada = dataFormatada.concat(data.getDate() + '/' + data.getMonth() + '/' + data.getFullYear());

        return dataFormatada;
    }
};
