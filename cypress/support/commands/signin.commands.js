import { selectors } from "../../utils/selectors/signinSelectors"
import { user } from "../../fixtures/user.data"

Cypress.Commands.add('fillAndSubmitPersonalInformationForm', (email = '') => {
    cy.get(selectors.genderRadio + user.gender()).click()
    cy.get(selectors.firstNameField).type(user.name.first())
    cy.get(selectors.lastNameField).type(user.name.last())
    if (email !== '') cy.get(selectors.emailField).clear().type(email)
    cy.get(selectors.passwordField).type(user.password.valid())
    cy.get(selectors.daySelect).select(user.birthDate.day())
    cy.get(selectors.monthSelect).select(user.birthDate.month())
    cy.get(selectors.yearSelect).select(user.birthDate.year())
    cy.get(selectors.newsLetterCheck).check()
    cy.get(selectors.submitAccountBtn).click()
})

Cypress.Commands.add('submitEmailToCreateAccount', (email) => {
    cy.get(selectors.createAccountEmailField).type(email)
    cy.get(selectors.createAccountSubmitEmailBtn).click()
})

Cypress.Commands.add('compareText', (selector, textToCompare) => {
    cy.get(selector).invoke('text').should((text) => {
        expect(text.trim()).to.eq(textToCompare)
    })
})

Cypress.Commands.add('compareTextList', (selector, textsToCompare) => {
    cy.get(selector).invoke('text').should((text) => {
        for (let i = 0; i < textsToCompare.length; i++)
            expect(text.split("\n")[i + 1].trim()).to.eq(textsToCompare[i])
    })
})

Cypress.Commands.add('submitSigninData', (email, password) => {
    if (email !== '') cy.get(selectors.signinEmailField).type(email)
    if (password !== '') cy.get(selectors.singinPasswordField).type(password)
    cy.get(selectors.signinSubmitBtn).click()
})







