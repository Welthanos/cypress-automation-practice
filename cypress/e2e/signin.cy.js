/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

describe('signin', () => {
    context('create an account', () => {
        
        beforeEach(() => {
            cy.visit('/')
        })

        it('deve criar uma conta com sucesso', () => {
            cy.contains('a', 'Sign in').click()

            cy.get('#email_create').type(faker.internet.email())
            cy.get('#SubmitCreate').click()

            cy.get(`#id_gender${faker.number.int({ min: 1, max: 2 })}`).click()
            cy.get('#customer_firstname').type(faker.person.firstName())
            cy.get('#customer_lastname').type(faker.person.lastName())
            cy.get('#passwd').type(faker.internet.password())
            cy.get('#days').select(faker.number.int({ min: 1, max: 31 }))
            cy.get('#months').select(faker.date.month())
            cy.get('#years').select(faker.number.int({ min: 1950, max: 2008 }).toString())
            cy.get('#newsletter').click()
            cy.get('#submitAccount').click()

            cy.get('p.alert-success').invoke('text').should((text) => {
                expect(text.trim()).to.eq('Your account has been created.')
            })
        })
    })
})