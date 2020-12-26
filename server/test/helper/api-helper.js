const fetch = require("node-fetch");
 
function readApi(){
    return new Promise((resolve, reject) => {
        fetch("http://localhost:3001/read").then((result) => {
            if(result.status == 200){
                resolve(result.json())
            } else {
                reject('Error')
            }
        })
    })
}

function updateApi(id, newFoodName){
    var body = {
        id: id,
        newFoodName: newFoodName
    }
    return new Promise((resolve, reject) => {
        fetch("http://localhost:3001/update", 
            { method: 'PUT', 
              body: JSON.stringify(body),
              headers: { 'Content-Type': 'application/json' }
            })
        .then((result) => {
            if(result.status == 200){
                resolve(result.json())
            } else {
                reject(result)
            }
        })
    })
}

module.exports = { readApi, updateApi }