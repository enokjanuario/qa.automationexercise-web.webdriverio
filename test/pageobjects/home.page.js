import Page from './page.js';

class HomePage extends Page {

    get signupLoginLink() { return $('a[href="/login"]'); }
    get productsLink() { return $('a[href="/products"]'); }
    get cartLink() { return $('a[href="/view_cart"]'); }
    get homeLink() { return $('a[href="/"]'); }
    get loggedInAsUserText() { return $('//a[contains(text(), "Logged in as")]'); }
    get deleteAccountLink() { return $('a[href="/delete_account"]'); }
    get logoutLink() { return $('a[href="/logout"]'); }

    async open() {
        await super.open('/');
        await this.waitForPageLoad();
    }

    async clickSignupLogin() {
        await this.clickElement(this.signupLoginLink);
    }

    async clickProducts() {
        await this.clickElement(this.productsLink);
    }

    async clickCart() {
        await this.clickElement(this.cartLink);
    }

    async verifyUserLoggedIn() {
        return await this.isElementVisible(this.loggedInAsUserText);
    }

    async getLoggedInUsername() {
        const text = await this.getElementText(this.loggedInAsUserText);
        return text.replace('Logged in as ', '');
    }

    async clickDeleteAccount() {
        await this.clickElement(this.deleteAccountLink);
    }

    async clickLogout() {
        await this.clickElement(this.logoutLink);
    }
}

const homePage = new HomePage();
export default homePage;