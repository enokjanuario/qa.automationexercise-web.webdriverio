import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';
import LoginRegisterPage from '../pageobjects/login.register.page.js';
import { USER_DATA } from '../utils/constants.js';
import { generateUniqueEmail, handleAds } from '../utils/helper.js';

describe('Test Case 1: Register User', () => {
    const testData = {
        ...USER_DATA,
        email: generateUniqueEmail()
    };

    before(async () => {
        await HomePage.open();
        await handleAds();
    });

    it('should navigate to signup/login page', async () => {
        await HomePage.navigateToSignupLogin();
        const url = await browser.getUrl();
        expect(url).toContain('/login');
    });

    it('should enter signup details and submit', async () => {
        await LoginRegisterPage.enterSignupDetails(testData.name, testData.email);
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/signup');
    });

    it('should fill account information', async () => {
        await LoginRegisterPage.fillAccountInfo(testData);
    });

    it('should fill address information', async () => {
        await LoginRegisterPage.fillAddressInfo(testData);
    });

    it('should create account successfully', async () => {
        await LoginRegisterPage.createAccount();
        const accountCreated = await LoginRegisterPage.verifyAccountCreated();
        expect(accountCreated).toBe(true);
    });

    it('should continue after account creation', async () => {
        await LoginRegisterPage.clickContinueAfterCreation();
        await handleAds();
    });

    it('should verify user is logged in', async () => {
        const isLoggedIn = await HomePage.verifyLoggedInAsUsername(testData.name);
        expect(isLoggedIn).toBe(true);
    });

    it('should delete account', async () => {
        await HomePage.deleteAccount();
        const accountDeleted = await LoginRegisterPage.verifyAccountDeleted();
        expect(accountDeleted).toBe(true);
    });

    it('should continue after account deletion', async () => {
        await LoginRegisterPage.clickContinueAfterCreation();
    });
});