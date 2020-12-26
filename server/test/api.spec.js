const fetch = require("node-fetch");
const { expect } = require('chai');
const { readApi, updateApi } = require('./helper/api-helper');

describe('my first promise test', () => {
    it('test', () => {
        return readApi().then((result) => {
            expect(result.length).to.eq(2)
            expect(result.map(food => food.foodName)).to.eql([ 'test2', 'test1' ])
        })
    })

    it('test using await and async', async () => {
        let result = await readApi();
        expect(result.length).to.eq(2)
        expect(result.map(food => food.foodName)).to.eql([ 'test2', 'test1' ])
    })

    it('updates', () => {
        return readApi()
            .then((result) => {
            var id = result[0]._id
            var foodName = "newFood112221"
            return updateApi(id, foodName).then((result) => {
                expect(result.foodName).to.eql(foodName)
                return readApi().then((resultOne) => {
                    expect(resultOne.length).to.eq(2)
                    expect(resultOne.map(food => food.foodName)).to.eql([ foodName, 'test1'])
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