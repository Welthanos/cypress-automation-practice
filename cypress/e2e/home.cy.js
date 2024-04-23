/// <reference types="cypress" />

describe('home', () => {
  it('webapp deve estar online', () => {
    cy.visit('/')

    cy.title().should('eq', 'My Shop')
  })
})