import homePage from '../pageobjects/home.page.js';
import productsPage from '../pageobjects/products.page.js';
import cartPage from '../pageobjects/cart.page.js';
import { productData } from '../data/testData.js';
import { expect } from 'chai';

describe('Remove Products From Cart', () => {
    it('Test Case 17: Remove Products From Cart', async () => {
        // 1. Launch browser and navigate to url 'http://automationexercise.com'
        await homePage.open();

        // Verify home page is visible
        const title = await browser.getTitle();
        expect(title).to.include('Automation Exercise');

        // 2. Click 'Products' button
        await homePage.clickProducts();

        // 3. Add products to cart
        const productName = await productsPage.getProductNameByIndex(productData.firstProductIndex);
        await productsPage.addProductToCart(productData.firstProductIndex);

        // 4. Click 'View Cart' button
        await productsPage.viewCart();

        // 5. Verify that products are visible in cart
        const isProductInCart = await cartPage.verifyProductInCart(productName);
        expect(isProductInCart).to.be.true;

        // Store number of products before deletion
        const initialNumberOfProducts = await cartPage.getNumberOfProducts();
        expect(initialNumberOfProducts).to.be.greaterThan(0);

        // 6. Click 'X' button corresponding to particular product
        await cartPage.deleteProduct(0);

        // 7. Verify that product is removed from the cart
        const finalNumberOfProducts = await cartPage.getNumberOfProducts();

        if (initialNumberOfProducts === 1) {
            const isCartEmpty = await cartPage.isCartEmpty();
            expect(isCartEmpty).to.be.true;
        } else {
            expect(finalNumberOfProducts).to.equal(initialNumberOfProducts - 1);
            const isProductStillInCart = await cartPage.verifyProductInCart(productName);
            expect(isProductStillInCart).to.be.false;
        }
    });
});