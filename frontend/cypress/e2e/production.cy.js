/// <reference types="cypress" />

import { formatCurrency } from '../../src/utils/format-currency'

describe('Production (E2E)', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should display production information on the dashboard.', () => {
    cy.fixture('production-plan').then((plan) => {
      cy.get('[data-cy="total-value"]')
        .should('be.visible')
        .and('have.text', formatCurrency(plan.totalValue))

      cy.get('[data-cy="total-items"]')
        .should('be.visible')
        .and('have.text', plan.totalItems)

      cy.get('[data-cy="production-plan-item"]').should(
        'have.length',
        plan.productionList.length
      )

      cy.get('[data-cy="production-plan-item"]').each((product, i) => {
        cy.wrap(product).within(() => {
          cy.get('[data-cy="production-plan-product-name"]').should(
            'have.text',
            plan.productionList[i].productName
          )

          cy.get('[data-cy="production-plan-product-quantity"]').should(
            'include.text',
            plan.productionList[i].quantityToProduce
          )

          cy.get('[data-cy="production-plan-product-price"]').should(
            'have.text',
            formatCurrency(plan.productionList[i].unitPrice)
          )

          cy.get('[data-cy="production-plan-product-subtotal"]').should(
            'have.text',
            formatCurrency(plan.productionList[i].subTotal)
          )
        })
      })
    })
  })
})
