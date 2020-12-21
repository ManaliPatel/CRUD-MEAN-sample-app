var page = require('../pages/mern_page.js')
/// <reference types="Cypress" />
// if you add header to this file - it will load autosuggestions

describe('actions', function(){
    const random = Math.random().toString(36).substring(7);

    beforeEach(function(){
        cy.visit(Cypress.env('host'))
    })

    it('add to list', function(){
        page.foodNameInput().type(random)
        page.daysSinceIAgeInput().type(9)
        cy.get('.addbutton').click()

        page.textLabelOne().then(($el, $index) => {
            page.textLabelOne().eq(0).should('contain.text',random)
            page.textLabelOne().eq(1).should('contain.text','9')
        })
    })

    it('delete from list', function(){
        page.deleteButton().click()
        page.textLabelOne().eq(0).should('not.contain.text',random)
    })

    it('updates name', function(){
        page.newFoodNameInput().eq(0).type('newOne' + random)
        page.updateButton().click()
        page.textLabelOne().eq(0).should('contain.text', 'newOne' + random)

        page.textLabelOne().each(($el) => {
            var text = $el.eq(0).text()
            if(text == 'newOne' + random){
                $el.eq(0).siblings('button').eq(1).click()
            }
        })
    })
})