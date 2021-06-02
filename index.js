//const fetch = require("node-fetch");


/*function getDataFromAPI() {
    return fetch("https://api.github.com/users/up1")
        .then(response => response.json())
        .then(data => data.login)
}*/

const server = require('./app')

/*const http = require('http');
//siempre recibe require y response
const server = http.createServer((req, res) => {
    res.end('Respuestirijilla ');
});*/

const port = 3000;

/*server.listen(port? port: 3000, () => {
    console.log('Server listening at port: ' + port);
});*/

server.server.listen(port? port: 3000, () => {
    console.log('Servidor haciendo la funcionacion en : ' + port);
});

