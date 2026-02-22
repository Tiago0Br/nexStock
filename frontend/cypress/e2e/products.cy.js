/// <reference types="cypress" />

import { formatCurrency } from '../../src/utils/format-currency'

describe('Products (E2E)', () => {
  beforeEach(() => {
    cy.visit('/products')
  })

  it('Should list all the registered products', () => {
    cy.fixture('products').then((products) => {
      cy.get('[data-cy="product-item"]').should('have.length', products.length)
      cy.get('[data-cy="product-item"]').each((element, i) => {
        cy.wrap(element)
          .should('be.visible')
          .find('[data-cy="product-id"]')
          .should('have.text', products[i].id)

        cy.wrap(element)
          .find('[data-cy="product-name"]')
          .should('have.text', products[i].name)

        cy.wrap(element)
          .find('[data-cy="product-price"]')
          .should('have.text', `${formatCurrency(products[i].price)}`)

        products[i].composition.forEach((composition, pos) => {
          cy.wrap(element)
            .find('[data-cy="product-composition"]')
            .eq(pos)
            .should(
              'have.text',
              `${composition.name} (${composition.quantityRequired} ${composition.unit})`
            )
        })
      })
    })
  })

  it('Should register a new product', () => {
    cy.fixture('register-product').then((product) => {
      cy.get('[data-cy="product-new"]').click()
      cy.get('[data-cy="product-form-dialog"]').should('be.visible')

      cy.get('[data-cy="product-name-input"]').type(product.name)
      cy.get('[data-cy="product-price-input"]').clear().type(product.price)

      product.composition.forEach((material, i) => {
        cy.get('[data-cy="product-add-material"]').click()
        cy.get('[data-cy="product-material-select-button"]').eq(i).click()
        cy.get('[data-cy="product-material-select-options"]')
          .contains('div[role=option]', material.name)
          .click()
        cy.get('[data-cy="product-material-quantity"]')
          .eq(i)
          .clear()
          .type(material.quantityRequired)
      })

      cy.get('[data-cy="product-form-submit"]').click()
      cy.get('[data-sonner-toaster]')
        .should('be.visible')
        .and('include.text', 'Produto cadastrado com sucesso!')
    })
  })

  it('Should update a product', () => {
    cy.fixture('update-product').then((product) => {
      cy.contains('[data-cy="product-name"]', product.name)
        .parent()
        .find('[data-cy="product-edit"]')
        .click()
      cy.get('[data-cy="product-form-dialog"]').should('be.visible')

      cy.get('[data-cy="product-name-input"]').clear().type(product.data.name)
      cy.get('[data-cy="product-price-input"]').clear().type(product.data.price)

      cy.get('[data-cy="product-material-remove-button"]').each((button) => {
        cy.wrap(button).click()
      })
      product.data.composition.forEach((material, i) => {
        cy.get('[data-cy="product-add-material"]').click()
        cy.get('[data-cy="product-material-select-button"]').eq(i).click()
        cy.get('[data-cy="product-material-select-options"]')
          .contains('div[role=option]', material.name)
          .click()
        cy.get('[data-cy="product-material-quantity"]')
          .eq(i)
          .clear()
          .type(material.quantityRequired)
      })

      cy.get('[data-cy="product-form-submit"]').click()
      cy.get('[data-sonner-toaster]')
        .should('be.visible')
        .and('include.text', 'Produto atualizado com sucesso!')
    })
  })

  it('Should delete a product', () => {
    cy.fixture('delete-product').then((product) => {
      cy.contains('[data-cy="product-name"]', product.name)
        .parent()
        .find('[data-cy="product-delete"]')
        .click()

      cy.get('[data-sonner-toaster]')
        .should('be.visible')
        .and('include.text', 'Produto deletado!')
    })
  })
})
