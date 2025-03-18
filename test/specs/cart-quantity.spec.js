import homePage from '../pageobjects/home.page.js';
import productsPage from '../pageobjects/products.page.js';
import cartPage from '../pageobjects/cart.page.js';
import { productData } from '../data/testData.js';
import { calculateExpectedTotal } from '../utils/helpers.js';
import { expect } from 'chai';

describe('Cart Quantity Verification', () => {
    it('Test Case 13: Verify Product quantity in Cart', async () => {
        // 1. Launch browser and navigate to url 'http://automationexercise.com'
        await homePage.open();

        // Verify home page is visible
        const title = await browser.getTitle();
        expect(title).to.include('Automation Exercise');

        // 2. Click 'View Product' for any product on home page
        await homePage.clickProducts();

        // Wait for products page to load completely
        await browser.pause(2000);

        // Get product information for verification
        const productNames = await productsPage.productNames;
        const productName = await productNames[productData.firstProductIndex].getText();
        console.log('Product name:', productName);

        const productPrices = await productsPage.productPrices;
        const productPrice = await productPrices[productData.firstProductIndex].getText();
        console.log('Product price:', productPrice);

        // 3. Add product to cart
        await productsPage.addProductToCart(productData.firstProductIndex);

        // 6. Click 'View Cart' button
        await productsPage.viewCart();

        // Wait for cart page to load
        await browser.pause(2000);

        // 7. Verify that product is displayed in cart page with exact quantity
        const isProductInCart = await cartPage.verifyProductInCart(productName);
        expect(isProductInCart).to.be.true;

        const quantity = await cartPage.getProductQuantity(0);
        expect(quantity).to.equal(productData.expectedQuantity);

        // Verify price is correct
        const cartPrice = await cartPage.getProductPrice(0);
        expect(cartPrice).to.include(productPrice);

        // Verify total matches price * quantity
        const cartTotal = await cartPage.getProductTotal(0);
        const expectedTotal = calculateExpectedTotal(productPrice, productData.expectedQuantity);
        expect(cartTotal).to.include(expectedTotal);
    });
});