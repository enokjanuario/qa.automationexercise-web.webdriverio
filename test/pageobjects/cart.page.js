import Page from './page.js';

class CartPage extends Page {

    get cartProductNames() { return $$('td.cart_description h4 a'); }
    get cartProductPrices() { return $$('td.cart_price p'); }
    get cartProductQuantities() { return $$('td.cart_quantity button'); }
    get cartProductTotals() { return $$('td.cart_total p.cart_total_price'); }
    get cartTable() { return $('#cart_info_table'); }
    get emptyCartMessage() { return $('#empty_cart'); }
    get proceedToCheckoutButton() { return $('.check_out'); }
    get continueShoppingButton() { return $('.btn-default'); }
    get quantityInputs() { return $$('td.cart_quantity input'); }
    get deleteProductButtons() { return $$('a.cart_quantity_delete'); }

    async open() {
        await super.open('/view_cart');
        await this.waitForPageLoad();
    }

    async getNumberOfProducts() {
        const productNames = await this.cartProductNames;
        return productNames.length;
    }

    async verifyProductInCart(productName) {
        await this.waitForDisplayed(this.cartTable);
        const productNames = await this.cartProductNames;
        for (const element of productNames) {
            await this.waitForDisplayed(element);
            const text = await element.getText();
            console.log('Found product in cart:', text);
            if (text.toLowerCase().includes(productName.toLowerCase())) {
                return true;
            }
        }
        console.log('Product not found in cart:', productName);
        return false;
    }

    async getProductQuantity(index) {
        const quantityInputs = await this.quantityInputs;

        if (quantityInputs.length === 0) {
            const quantityCells = await $$('td.cart_quantity');
            if (quantityCells && quantityCells.length > index) {
                const text = await quantityCells[index].getText();
                return parseInt(text) || 1;
            }
            return 1;
        }

        if (quantityInputs && quantityInputs.length > index) {
            return parseInt(await quantityInputs[index].getValue()) || 1;
        }

        return 1;
    }

    async getProductPrice(index) {
        const prices = await this.cartProductPrices;
        return await prices[index].getText();
    }

    async getProductTotal(index) {
        const totals = await this.cartProductTotals;
        return await totals[index].getText();
    }

    async deleteProduct(index) {
        const deleteButtons = await this.deleteProductButtons;
        await this.clickElement(deleteButtons[index]);
        await browser.pause(1000);
    }

    async isCartEmpty() {
        try {
            return await this.emptyCartMessage.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async getProductName(index) {
        const names = await this.cartProductNames;
        return await names[index].getText();
    }

    async getAllProductNames() {
        const productNames = await this.cartProductNames;
        const names = [];
        for (const element of productNames) {
            names.push(await element.getText());
        }
        return names;
    }
}

export default new CartPage();