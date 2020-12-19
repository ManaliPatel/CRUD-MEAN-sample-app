describe('first cypress test', function(){
    beforeEach(function(){
        cy.visit('http://localhost:3000/')
    });

    it('mocking read api', function(){
        cy.log('first test');
        cy.intercept(
          { pathname: '/read' },
          { fixture: 'read.json'}
        ).as('read')
    })

    it('delete', function(){
        cy.intercept(
            { pathname: '/read' },
            { fixture: 'read.json'}
          ).as('read')
        cy.wait('@read')

        cy.intercept('DELETE', '**/delete/**', {
            statusCode: 200,
            body: 'it worked!'
            }).as('delete')
            cy.contains('Delete').click()
        cy.wait('@delete')
        cy.intercept(
            { pathname: '/read' },
            { fixture: 'read.json'}
          ).as('read')
        cy.wait('@read')

    })

});