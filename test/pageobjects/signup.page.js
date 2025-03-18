import Page from './page.js';

class SignupPage extends Page {

    get newUserSignupText() { return $('div.signup-form h2'); }
    get signupNameInput() { return $('input[data-qa="signup-name"]'); }
    get signupEmailInput() { return $('input[data-qa="signup-email"]'); }
    get signupButton() { return $('button[data-qa="signup-button"]'); }

    get accountInfoTitle() { return $('h2.title'); }
    get titleMr() { return $('#id_gender1'); }
    get titleMrs() { return $('#id_gender2'); }
    get nameInput() { return $('#name'); }
    get emailInput() { return $('#email'); }
    get passwordInput() { return $('#password'); }
    get daysDropdown() { return $('#days'); }
    get monthsDropdown() { return $('#months'); }
    get yearsDropdown() { return $('#years'); }

    get newsletterCheckbox() { return $('#newsletter'); }
    get specialOffersCheckbox() { return $('#optin'); }

    get firstNameInput() { return $('#first_name'); }
    get lastNameInput() { return $('#last_name'); }
    get companyInput() { return $('#company'); }
    get address1Input() { return $('#address1'); }
    get address2Input() { return $('#address2'); }
    get countryDropdown() { return $('#country'); }
    get stateInput() { return $('#state'); }
    get cityInput() { return $('#city'); }
    get zipcodeInput() { return $('#zipcode'); }
    get mobileNumberInput() { return $('#mobile_number'); }
    get createAccountButton() { return $('button[data-qa="create-account"]'); }

    async isNewUserSignupVisible() {
        await this.waitForDisplayed(this.newUserSignupText);
        const text = await this.getElementText(this.newUserSignupText);
        return text.includes('New User Signup!');
    }

    async enterSignupDetails(name, email) {
        await this.setValue(this.signupNameInput, name);
        await this.setValue(this.signupEmailInput, email);
    }

    async clickSignupButton() {
        await this.clickElement(this.signupButton);
    }

    async isEnterAccountInfoVisible() {
        await this.waitForDisplayed(this.accountInfoTitle);
        const text = await this.getElementText(this.accountInfoTitle);
        return text.includes('ENTER ACCOUNT INFORMATION');
    }

    async fillAccountDetails(details) {
        if (details.title === 'Mr') {
            await this.clickElement(this.titleMr);
        } else {
            await this.clickElement(this.titleMrs);
        }

        await this.setValue(this.passwordInput, details.password);

        await this.daysDropdown.selectByAttribute('value', details.dayOfBirth);
        await this.monthsDropdown.selectByAttribute('value', details.monthOfBirth);
        await this.yearsDropdown.selectByAttribute('value', details.yearOfBirth);
    }

    async checkNewsletterSignup() {
        await this.clickElement(this.newsletterCheckbox);
    }

    async checkSpecialOffers() {
        await this.clickElement(this.specialOffersCheckbox);
    }

    async fillAddressDetails(details) {
        await this.setValue(this.firstNameInput, details.firstName);
        await this.setValue(this.lastNameInput, details.lastName);
        await this.setValue(this.companyInput, details.company);
        await this.setValue(this.address1Input, details.address1);
        await this.setValue(this.address2Input, details.address2);

        await this.countryDropdown.selectByVisibleText(details.country);

        await this.setValue(this.stateInput, details.state);
        await this.setValue(this.cityInput, details.city);
        await this.setValue(this.zipcodeInput, details.zipcode);
        await this.setValue(this.mobileNumberInput, details.mobileNumber);
    }

    async clickCreateAccountButton() {
        await this.clickElement(this.createAccountButton);
    }
}

export default new SignupPage();