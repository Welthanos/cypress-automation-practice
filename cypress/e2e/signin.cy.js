/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

describe('sign in page', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.contains('a', 'Sign in').click()
    })

    context('create an account', () => {
        it('deve criar conta com sucesso', () => {

            cy.get('#email_create').type(faker.internet.email())
            cy.get('#SubmitCreate').click()

            cy.get(`#id_gender${faker.number.int({ min: 1, max: 2 })}`).click()
            cy.get('#customer_firstname').type(faker.person.firstName())
            cy.get('#customer_lastname').type(faker.person.lastName())
            cy.get('#passwd').type(faker.internet.password())
            cy.get('#days').select(faker.number.int({ min: 1, max: 31 }))
            cy.get('#months').select(faker.date.month())
            cy.get('#years').select(faker.number.int({ min: 1950, max: 2008 }).toString())
            cy.get('#newsletter').check()
            cy.get('#submitAccount').click()

            cy.get('p.alert-success').invoke('text').should((text) => {
                expect(text.trim()).to.eq('Your account has been created.')
            })
        })

        it('não deve prosseguir para o formulário de dados pessoais se o e-mail já estiver cadastrado', () => {

            cy.get('#email_create').type('well@gmail.com')
            cy.get('#SubmitCreate').click()

            cy.get('#create_account_error').invoke('text').should((text) => {
                expect(text.trim()).to.eq('An account using this email address has already been registered. Please enter a valid password or request a new one.')
            })
        })

        it('não deve prosseguir para o formulário de dados pessoais se o e-mail for inválido', () => {

            cy.get('#email_create').type('email_invalido.com')
            cy.get('#SubmitCreate').click()

            cy.get('#create_account_error').invoke('text').should((text) => {
                expect(text.trim()).to.eq('Invalid email address.')
            })
        })

        it('nãe deve criar conta caso seja inserido um e-mail já cadastrado no formulário de dados pessoais', () => {

            cy.get('#email_create').type(faker.internet.email())
            cy.get('#SubmitCreate').click()

            cy.get(`#id_gender${faker.number.int({ min: 1, max: 2 })}`).click()
            cy.get('#customer_firstname').type(faker.person.firstName())
            cy.get('#customer_lastname').type(faker.person.lastName())
            cy.get('#email').clear().type('well@gmail.com')
            cy.get('#passwd').type(faker.internet.password())
            cy.get('#days').select(faker.number.int({ min: 1, max: 31 }))
            cy.get('#months').select(faker.date.month())
            cy.get('#years').select(faker.number.int({ min: 1950, max: 2008 }).toString())
            cy.get('#newsletter').check()
            cy.get('#submitAccount').click()

            cy.get('div#center_column > div > ol > li').invoke('text').should((text) => {
                expect(text.trim()).to.eq('An account using this email address has already been registered.')
            })
        })

        it('não deve criar conta com campos obrigatórios vazios', () => {

            cy.get('#email_create').type(faker.internet.email())
            cy.get('#SubmitCreate').click()

            cy.get('form#account-creation_form')
            cy.get('#email').clear()
            cy.get('#submitAccount').click()

            cy.get('div#center_column > div > ol').invoke('text').should((text) => {
                expect(text.split("\n")[1].trim()).to.eq('lastname is required.')
                expect(text.split("\n")[2].trim()).to.eq('firstname is required.')
                expect(text.split("\n")[3].trim()).to.eq('email is required.')
                expect(text.split("\n")[4].trim()).to.eq('passwd is required.')
            })
        })
    })

    context('sign in', () => {
        it('deve fazer sign in com sucesso', () => {

            cy.get('#email').type('well@gmail.com')
            cy.get('#passwd').type('n@d8thBZKywmAZR')
            cy.get('#SubmitLogin').click()

            cy.get('h1.page-heading').should('have.text', 'My account')
        })

        it('não deve fazer sign in com e-mail não cadastrado', () => {

            cy.get('#email').type(faker.internet.email())
            cy.get('#passwd').type(faker.internet.password())
            cy.get('#SubmitLogin').click()

            cy.get('div#center_column > div > ol > li').invoke('text').should((text) => {
                expect(text.trim()).to.eq('Authentication failed.')
            })
        })

        it('não deve fazer sign in com campo e-mail válido e senha incorreta', () => {

            cy.get('#email').type('well@gmail.com')
            cy.get('#passwd').type(faker.internet.password())
            cy.get('#SubmitLogin').click()

            cy.get('div#center_column > div > ol > li').invoke('text').should((text) => {
                expect(text.trim()).to.eq('Authentication failed.')
            })
        })

        it('não deve fazer sign in com campo e-mail vazio', () => {

            cy.get('#passwd').type(faker.internet.password())
            cy.get('#SubmitLogin').click()

            cy.get('div#center_column > div > ol > li').invoke('text').should((text) => {
                expect(text.trim()).to.eq('An email address required.')
            })
        })

        it('não deve fazer sign in com campo senha vazio', () => {

            cy.get('#email').type('well@gmail.com')
            cy.get('#SubmitLogin').click()

            cy.get('div#center_column > div > ol > li').invoke('text').should((text) => {
                expect(text.trim()).to.eq('Password is required.')
            })
        })
    })
})