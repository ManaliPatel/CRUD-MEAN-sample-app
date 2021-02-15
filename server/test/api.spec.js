const fetch = require("node-fetch");
const { expect } = require('chai');
const { readApi, updateApi } = require('./helper/api-helper');
// import readApi from './helper/api-helper'

describe('testing apis', () => {
    it('verifies read api output', () => {
        return readApi().then((result) => {
            expect(result.length).to.eq(2)
            expect(result.map(food => food.foodName)).to.eql([ 'test2', 'test1' ])
        })
    })

    it('verifies read api output using await and async', async () => {
        let result = await readApi();
        expect(result.length).to.eq(2)
        expect(result.map(food => food.foodName)).to.eql([ 'test2', 'test1' ])
    })

    it.skip('verifies update api OLD way', () => {
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

    it('verifies update api using await/async', async() =>{
        var readOne = await readApi()
        var id = readOne[0]._id
        var foodName = "newName"
        
        //change to new name
        var updateOne = await updateApi(id, foodName)
        expect(updateOne.foodName).to.eq('newName')

        //change back to old name
        var foodNameTwo = "test2"
        var updateTwo = await updateApi(id, foodNameTwo)
        expect(updateTwo.foodName).to.eq('test2')
    })
})