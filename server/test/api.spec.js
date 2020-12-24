const fetch = require("node-fetch");
const { expect } = require('chai');

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

describe('my first promise test', () => {
    it('test', () => {
        return readApi().then((result) => {
            expect(result.length).to.eq(3)
            expect(result.map(food => food.foodName)).to.eql(['test','test','test'])
        })
    })

    it('updates', () => {
        return readApi()
            .then((result) => {
            var id = result[0]._id
            var foodName = "newFood112221"
            return updateApi(id, foodName).then((result) => {
                expect(result.foodName).to.eql(foodName)
                return readApi().then((resultOne) => {
                    expect(resultOne.length).to.eq(3)
                    expect(resultOne.map(food => food.foodName)).to.eql([ foodName, 'werwerwr', 'test' ])
                })
            })
        })
    })

    it('update 2', async() =>{
        var readOne = await readApi()
        var id = readOne[0]._id
        var foodName = "jayUpdate"
        var update = await updateApi(id, foodName)
        console.log(update)
    })
})