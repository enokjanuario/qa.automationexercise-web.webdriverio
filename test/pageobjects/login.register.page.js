import BasePage from './base.page.js';

class LoginRegisterPage extends BasePage {
    // Locators - Signup
    get signupNameInput() { return $('input[data-qa="signup-name"]'); }
    get signupEmailInput() { return $('input[data-qa="signup-email"]'); }
    get signupButton() { return $('button[data-qa="signup-button"]'); }

    // Locators - Account Information
    get titleMrRadio() { return $('#id_gender1'); }
    get titleMrsRadio() { return $('#id_gender2'); }
    get passwordInput() { return $('#password'); }
    get daySelect() { return $('#days'); }
    get monthSelect() { return $('#months'); }
    get yearSelect() { return $('#years'); }
    get newsletterCheckbox() { return $('#newsletter'); }
    get specialOffersCheckbox() { return $('#optin'); }

    // Locators - Address Information
    get firstNameInput() { return $('#first_name'); }
    get lastNameInput() { return $('#last_name'); }
    get companyInput() { return $('#company'); }
    get address1Input() { return $('#address1'); }
    get address2Input() { return $('#address2'); }
    get countrySelect() { return $('#country'); }
    get stateInput() { return $('#state'); }
    get cityInput() { return $('#city'); }
    get zipcodeInput() { return $('#zipcode'); }
    get mobileNumberInput() { return $('#mobile_number'); }
    get createAccountButton() { return $('button[data-qa="create-account"]'); }

    // Locators - Account Created
    get accountCreatedMsg() { return $('h2[data-qa="account-created"]'); }
    get continueButton() { return $('a[data-qa="continue-button"]'); }

    // Locators - Account Deleted
    get accountDeletedMsg() { return $('h2[data-qa="account-deleted"]'); }

    // Actions
    async enterSignupDetails(name, email) {
        await this.setValue(this.signupNameInput, name);
        await this.setValue(this.signupEmailInput, email);
        await this.clickElement(this.signupButton);
    }

    async fillAccountInfo(userInfo) {
        if (userInfo.title === 'Mr') {
            await this.clickElement(this.titleMrRadio);
        } else {
            await this.clickElement(this.titleMrsRadio);
        }

        await this.setValue(this.passwordInput, userInfo.password);

        await this.daySelect.selectByAttribute('value', userInfo.day);
        await this.monthSelect.selectByVisibleText(userInfo.month);
        await this.yearSelect.selectByAttribute('value', userInfo.year);

        if (userInfo.newsletter) {
            await this.clickElement(this.newsletterCheckbox);
        }

        if (userInfo.specialOffers) {
            await this.clickElement(this.specialOffersCheckbox);
        }
    }

    async fillAddressInfo(addressInfo) {
        await this.setValue(this.firstNameInput, addressInfo.firstName);
        await this.setValue(this.lastNameInput, addressInfo.lastName);
        await this.setValue(this.companyInput, addressInfo.company);
        await this.setValue(this.address1Input, addressInfo.address1);
        await this.setValue(this.address2Input, addressInfo.address2);

        await this.countrySelect.selectByVisibleText(addressInfo.country);

        await this.setValue(this.stateInput, addressInfo.state);
        await this.setValue(this.cityInput, addressInfo.city);
        await this.setValue(this.zipcodeInput, addressInfo.zipcode);
        await this.setValue(this.mobileNumberInput, addressInfo.mobileNumber);
    }

    async createAccount() {
        await this.clickElement(this.createAccountButton);
    }

    async verifyAccountCreated() {
        return await this.isElementDisplayed(this.accountCreatedMsg);
    }

    async clickContinueAfterCreation() {
        await this.clickElement(this.continueButton);
    }

    async verifyAccountDeleted() {
        return await this.isElementDisplayed(this.accountDeletedMsg);
    }

    async open() {
        return super.open('/login');
    }
}

export default new LoginRegisterPage();