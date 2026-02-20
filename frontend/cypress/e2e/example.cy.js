/// <reference types="cypress" />

describe('Isso aqui é um exemplo de teste E2E utilizando o Cypress', () => {
  it('O teste começa aqui', () => {
    cy.visit('/materials')
    cy.wait(5000)
  })
})
