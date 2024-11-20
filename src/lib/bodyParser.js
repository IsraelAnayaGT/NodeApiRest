
function bodyParser(request){

    return new Promise((resolve, reject) => {
        let totalData = '';

        //llegan los datos en partes
        request
        .on('data', chunk =>{
            totalData += chunk
        })
    
        //Convierte los datos recividos
        .on('end', () => {
           request.body = JSON.parse(totalData);
           resolve();
        })
    
        .on('error', err => {
            console.log(err);
            reject(); 
        })
    })
}

module.exports = { bodyParser }