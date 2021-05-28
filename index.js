const fetch = require("node-fetch");

let dataFetch;
let dataa;


function testSum() {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then(res => {
        return res.json()
    })
    .then(data => {
        return data.abilities;

    })
}

function test2() {
    return new Promise(async (resolve, reject) => {
        
          resolve("¡Éxito!"); // ¡Todo salió bien!

    });
}

/*function getDataFromAPI() {
    return fetch("https://api.github.com/users/up1")
        .then(response => response.json())
        .then(data => data.login)
}*/

async function validateEndDate(oldDate, newDate) {
    return 10;
}

let aaa = await validateEndDate(0, 1)

console.log(aaa);

