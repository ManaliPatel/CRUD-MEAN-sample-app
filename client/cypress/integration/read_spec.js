var page = require('../pages/mern_page.js')

describe('first cypress test', function(){
    beforeEach(function(){
        cy.visit(Cypress.env('host'))
    });

    it('mocking read api', function(){
        cy.log('first test');
        cy.intercept(
          { pathname: '/read' },
          { fixture: 'read.json'}
        ).as('read')

        cy.get('.food .textColor').then(($el) => {
          expect($el.eq(0).text()).to.eq('Cypressapple1')
          expect($el.eq(1).text()).to.eq('3')
          expect($el.eq(2).text()).to.eq('Cypressapple2')
          expect($el.eq(3).text()).to.eq('3')
          expect($el.eq(4).text()).to.eq('Cypressapple3')
          expect($el.eq(5).text()).to.eq('3')
          expect($el.eq(6).text()).to.eq('Cypressapple4')
          expect($el.eq(7).text()).to.eq('1')
          expect($el.eq(8).text()).to.eq('Cypressapple5')
          expect($el.eq(9).text()).to.eq('23')
          expect($el.eq(10).text()).to.eq('Cypressapple6')
          expect($el.eq(11).text()).to.eq('234')
        })
    })

    it('validate input fields', function(){
       page.textlabel(0).should('contain.text','CRUD Application with MERN')
       page.textlabel(1).should('contain.text','Food Name :')
       page.textlabel(2).should('contain.text','Days Since You Ate It : ')
    })
});