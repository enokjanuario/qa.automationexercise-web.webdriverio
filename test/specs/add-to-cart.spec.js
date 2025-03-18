import homePage from '../pageobjects/home.page.js';
import productsPage from '../pageobjects/products.page.js';
import cartPage from '../pageobjects/cart.page.js';
import { productData } from '../data/testData.js';
import { expect } from 'chai';

describe('Add Products to Cart', () => {
    it('Test Case 12: Add Products in Cart', async () => {
        // 1. Launch browser and navigate to url 'http://automationexercise.com'
        await homePage.open();

        // Verify home page is visible
        const title = await browser.getTitle();
        expect(title).to.include('Automation Exercise');

        // 2. Click 'Products' button
        await homePage.clickProducts();

        // 3. Hover over first product and click 'Add to cart'
        const firstProductName = await productsPage.getProductNameByIndex(productData.firstProductIndex);
        await productsPage.addProductToCart(productData.firstProductIndex);

        // 4. Click 'Continue Shopping' button
        await productsPage.continueShopping();

        // 5. Hover over second product and click 'Add to cart'
        const secondProductName = await productsPage.getProductNameByIndex(productData.secondProductIndex);
        await productsPage.addProductToCart(productData.secondProductIndex);

        // 6. Click 'View Cart' button
        await productsPage.viewCart();

        // 7. Verify both products are added to Cart
        const isFirstProductInCart = await cartPage.verifyProductInCart(firstProductName);
        expect(isFirstProductInCart).to.be.true;

        const isSecondProductInCart = await cartPage.verifyProductInCart(secondProductName);
        expect(isSecondProductInCart).to.be.true;

        // 8. Verify their prices, quantity and total price
        const numberOfProducts = await cartPage.getNumberOfProducts();
        expect(numberOfProducts).to.equal(2);

        // Verify first product details
        const firstProductQuantity = await cartPage.getProductQuantity(0);
        expect(firstProductQuantity).to.equal(1);

        // Verify second product details
        const secondProductQuantity = await cartPage.getProductQuantity(1);
        expect(secondProductQuantity).to.equal(1);
    });
});