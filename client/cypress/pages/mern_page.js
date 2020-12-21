
class Page{
    textlabel(value){
        return cy.get(`.textColor:eq(${value})`)
    }

    foodNameInput(){
        return cy.get('input[placeholder="enter food name"]')
    }

    daysSinceIAgeInput(){
        return cy.get('input[placeholder="enter number"]')
    }

    textLabelOne(){
        return cy.get('.food .textColor')
    }

    deleteButton(){
        return cy.contains("Delete")
    }

    newFoodNameInput(){
        return cy.get('input[placeholder="enter new food name..."]')
    }

    updateButton(){
        return cy.contains("Update")
    }
}

module.exports = new Page()