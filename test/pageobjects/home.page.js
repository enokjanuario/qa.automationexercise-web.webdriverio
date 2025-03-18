import BasePage from './base.page.js';

class HomePage extends BasePage {
    // Locators
    get signupLoginBtn() { return $('a[href="/login"]'); }
    get productsBtn() { return $('a[href="/products"]'); }
    get cartBtn() { return $('a[href="/view_cart"]'); }
    get loggedInAs() { return $('.navbar-nav li:nth-child(10) a'); }
    get deleteAccountBtn() { return $('a[href="/delete_account"]'); }
    get logoutBtn() { return $('a[href="/logout"]'); }

    // Actions
    async navigateToSignupLogin() {
        await this.clickElement(this.signupLoginBtn);
    }

    async navigateToProducts() {
        await this.clickElement(this.productsBtn);
    }

    async navigateToCart() {
        await this.clickElement(this.cartBtn);
    }

    async verifyLoggedInAsUsername(username) {
        const loggedInText = await this.getText(this.loggedInAs);
        return loggedInText === `Logged in as ${username}`;
    }

    async deleteAccount() {
        await this.clickElement(this.deleteAccountBtn);
    }

    async logout() {
        await this.clickElement(this.logoutBtn);
    }

    async open() {
        return super.open('/');
    }
}

export default new HomePage();