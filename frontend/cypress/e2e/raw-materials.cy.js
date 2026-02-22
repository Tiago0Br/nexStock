/// <reference types="cypress" />

describe('Raw Materials (E2E)', () => {
  beforeEach(() => {
    cy.visit('/materials')
  })

  it('Should list all the registered raw materials', () => {
    cy.fixture('raw-materials').then((materials) => {
      cy.get('[data-cy="material-item"]').should('have.length', materials.length)
      cy.get('[data-cy="material-item"]').each((element, i) => {
        cy.wrap(element).within(() => {
          cy.get('[data-cy="material-id"]').should('have.text', materials[i].id)

          cy.get('[data-cy="material-name"]').should('have.text', materials[i].name)

          cy.get('[data-cy="material-stock"]').should(
            'have.text',
            `${materials[i].stockQuantity} (${materials[i].unit})`
          )
        })
      })
    })
  })

  it('Should register a new raw material', () => {
    cy.fixture('register-raw-material').then((material) => {
      cy.get('[data-cy="material-new"]').should('be.visible').click()
      cy.get('[data-cy="material-form-dialog"]').should('be.visible')

      cy.get('[data-cy="material-name-input"]').type(material.name)
      cy.get('[data-cy="material-stock-input"]').clear().type(material.stockQuantity)
      cy.get('[data-cy="material-unit-select-button"]').click()
      cy.get('[data-cy="material-unit-select-options"]')
        .should('be.visible')
        .contains('div[role=option]', `(${material.unit})`)
        .click()

      cy.get('[data-cy="material-form-submit"]').click()
      cy.get('[data-sonner-toaster]')
        .should('be.visible')
        .and('include.text', 'Matéria-prima cadastrada com sucesso!')
    })
  })

  it('Should update a raw material', () => {
    cy.fixture('update-raw-material').then((material) => {
      cy.contains('[data-cy="material-name"]', material.name)
        .parent()
        .find('[data-cy="material-edit"]')
        .click()

      cy.get('[data-cy="material-form-dialog"]').should('be.visible')
      cy.get('[data-cy="material-name-input"]').clear().type(material.data.name)
      cy.get('[data-cy="material-stock-input"]').clear().type(material.data.stockQuantity)
      cy.get('[data-cy="material-unit-select-button"]').click()
      cy.get('[data-cy="material-unit-select-options"]')
        .should('be.visible')
        .contains('div[role=option]', `(${material.data.unit})`)
        .click()

      cy.get('[data-cy="material-form-submit"]').click()
      cy.get('[data-sonner-toaster]')
        .should('be.visible')
        .and('include.text', 'Matéria-prima atualizada com sucesso!')
    })
  })

  it('Should delete a raw material', () => {
    cy.fixture('delete-raw-material').then((material) => {
      cy.contains('[data-cy="material-name"]', material.name)
        .parent()
        .find('[data-cy="material-delete"]')
        .click()

      cy.get('[data-sonner-toaster]')
        .should('be.visible')
        .and('include.text', 'Matéria-prima deletada!')
    })
  })
})
