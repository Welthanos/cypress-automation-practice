/// <reference types="cypress" />
import { faker } from '@faker-js/faker'
import { selectors } from '../utils/selectors/signinSelectors'
import { user } from '../fixtures/user.data'

describe('sign in page', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get(selectors.signinPageBtn).click()
    })

    context('create an account', () => {

        it('deve criar conta com sucesso', () => {
            cy.submitEmailToCreateAccount(user.email.valid())
            cy.fillAndSubmitPersonalInformationForm()
            cy.compareText(selectors.accountCreatedMessage, 'Your account has been created.')
        })

        it('não deve prosseguir para o formulário de dados pessoais se o e-mail já estiver cadastrado', () => {
            cy.submitEmailToCreateAccount(user.email.existing)
            cy.compareText(selectors.createAccountErrorMessage, 'An account using this email address has already been registered. Please enter a valid password or request a new one.')
        })

        it('não deve prosseguir para o formulário de dados pessoais se o e-mail for inválido', () => {
            cy.submitEmailToCreateAccount(user.email.invalid)
            cy.compareText(selectors.createAccountErrorMessage, 'Invalid email address.')
        })

        it('não deve criar conta caso seja inserido um e-mail já cadastrado no formulário de dados pessoais', () => {
            cy.submitEmailToCreateAccount(user.email.valid())
            cy.fillAndSubmitPersonalInformationForm(user.email.existing)
            cy.compareText(selectors.emailFormFieldErrorMessage, 'An account using this email address has already been registered.')
        })

        it('não deve criar conta com campos obrigatórios vazios', () => {
            cy.submitEmailToCreateAccount(user.email.valid())
            cy.get(selectors.createAccountForm)
            cy.get(selectors.emailField).clear()
            cy.get(selectors.submitAccountBtn).click()
            cy.compareTextList(selectors.formFieldsErrorMessages, ['lastname is required.', 'firstname is required.', 'email is required.', 'passwd is required.'])
        })
    })

    context('sign in', () => {

        it('deve fazer sign in com sucesso', () => {
            cy.submitSigninData(user.email.existing, user.password.existing)
            cy.get(selectors.loggedInAreaTitle).should('have.text', 'My account')
        })

        it('não deve fazer sign in com e-mail não cadastrado', () => {
            cy.submitSigninData(user.email.valid(), user.password.valid())
            cy.compareText(selectors.signinErrorMessage, 'Authentication failed.')
        })

        it('não deve fazer sign in com campo e-mail válido e senha incorreta', () => {
            cy.submitSigninData(user.email.existing, user.password.valid())
            cy.compareText(selectors.signinErrorMessage, 'Authentication failed.')
        })

        it('não deve fazer sign in com campo e-mail vazio', () => {
            cy.submitSigninData('', user.password.valid())
            cy.compareText(selectors.signinErrorMessage, 'An email address required.')
        })

        it('não deve fazer sign in com campo senha vazio', () => {
            cy.submitSigninData(user.email.existing, '')
            cy.compareText(selectors.signinErrorMessage, 'Password is required.')
        })
    })
})