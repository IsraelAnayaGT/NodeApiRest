const http = require('http');
const { bodyParser } = require('./lib/bodyParser');

let database = [];

// *************************************************/
//***** Manejador de peticiones Inicio *************/
// *************************************************/

/******************** Pedir Tarea Inicio *********************/
function getTaskHandler(request, response){
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(database));
    response.end();
}
/******************* Pedir Tarea Final ****************************/

/************************ Crear Tareas Inicio ********************/
async function createTaskHandler(request, response){
    try {
        await bodyParser(request);
        database.push(request.body);
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(database));
        response.end();
    } catch (error) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('Invalid Data');
        response.end();
    }
    
}
/************************* Crear Tareas Final**********************/

/************************* Manejador Tareas Inicio**********************/
async function updateTaskHandler(request, response){
    try {
        let { url } = request;

        let idQuery = url.split("?")[1];
        let idKey   = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];

        if(idKey === "id"){
            await bodyParser(request);
            database[idValue - 1] = request.body;
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(database));
            response.end();
        }else{
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write('Invalide request Query');
            response.end();
    }
    } catch (error) {
        response.writeHead(400, {'Content-Type': 'text/plain'});
        response.write('Invalide Body Data was provide', error.message);
        response.end();
    }

}
/************************* Manejador Tareas Final**********************/

/************************* Eliminar Tareas Inicio**********************/
async function deleteTaskHandle(request, response){
    let { url } = request;

    let idQuery = url.split("?")[1];
    let idKey   = idQuery.split("=")[0];
    let idValue = idQuery.split("=")[1];

    if(idKey === 'id'){
        database.splice(idValue - 1, 1)
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('DELETE Successfully');
        response.end();
    }else{
        response.writeHead(400, {'Content-Type': 'text/plain'});
        response.write('Invalide Query');
            esponse.end();
    }
}
/************************* Eleiminar Tareas Inicio**********************/

const server = http.createServer((request, response)=>
{
    const {url, method} = request;

    //registro de lo que llega (Logger)*/
    console.log(`URL: ${url} - Method: ${method}`);

//***************Manejo de verbos  Inicio***********************/
    switch(method)
    {
        case "GET":
            if(url === "/"){
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write(JSON.stringify({message: '¡Hello World!'}));
                response.end();
            }

            if(url === "/tareas"){
                getTaskHandler(request, response);
            }
            break;

        case "POST":
            if(url === "/tareas"){
                createTaskHandler(request, response);
            }
            break;

        case "PUT":
            updateTaskHandler(request, response);
            break;
        case "DELETE":
            deleteTaskHandle(request, response);
        break;
    default: 
        response.writeHead(400, {'Content-Type': 'text/plain'});
        response.write(JSON.stringify('404 NOT FOUND'));
        response.end();
    };
//***************Manejo de verbos  Final***********************/

});

server.listen(3000);
console.log('Server en el puerto: ', 3000);
// ************************************************/
//***** Manejador de peticiones Final *************/
// ************************************************/