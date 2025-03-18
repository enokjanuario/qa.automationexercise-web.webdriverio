import homePage from '../pageobjects/home.page.js';
import productsPage from '../pageobjects/products.page.js';
import { searchData } from '../data/testData.js';
import { expect } from 'chai';

describe('Product Search', () => {
    it('Test Case 9: Search Product', async () => {
        // 1. Launch browser and navigate to url 'http://automationexercise.com'
        await homePage.open();

        // Verify home page is visible
        const title = await browser.getTitle();
        expect(title).to.include('Automation Exercise');

        // 2. Click on 'Products' button
        await homePage.clickProducts();

        // 3. Verify user is navigated to ALL PRODUCTS page successfully
        const productsTitle = await productsPage.allProductsText.getText();
        expect(productsTitle).to.include('ALL PRODUCTS');

        // 4. Enter product name in search input and click search button
        await productsPage.searchProduct(searchData.productName);

        // 5. Verify 'SEARCHED PRODUCTS' is visible
        const searchResults = await productsPage.verifySearchResults();
        expect(searchResults).to.be.true;

        // 6. Verify all the products related to search are visible
        const numberOfProducts = await productsPage.getNumberOfProducts();
        expect(numberOfProducts).to.be.greaterThan(0);

        // Verify product names contain the search term
        const productNameContainsSearchTerm = await productsPage.verifyProductNameInResults(searchData.productName);
        expect(productNameContainsSearchTerm).to.be.true;
    });
});