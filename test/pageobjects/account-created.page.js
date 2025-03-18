import Page from './page.js';


class AccountCreatedPage extends Page {

    get accountCreatedTitle() { return $('h2[data-qa="account-created"]'); }
    get accountDeletedTitle() { return $('h2[data-qa="account-deleted"]'); }
    get continueButton() { return $('a[data-qa="continue-button"]'); }


    async isAccountCreatedVisible() {
        await this.waitForDisplayed(this.accountCreatedTitle);
        const text = await this.getElementText(this.accountCreatedTitle);
        return text.includes('ACCOUNT CREATED!');
    }

    async isAccountDeletedVisible() {
        await this.waitForDisplayed(this.accountDeletedTitle);
        const text = await this.getElementText(this.accountDeletedTitle);
        return text.includes('ACCOUNT DELETED!');
    }

    async clickContinueButton() {
        await this.clickElement(this.continueButton);
    }
}

export default new AccountCreatedPage();