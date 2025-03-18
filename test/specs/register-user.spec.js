import homePage from '../pageobjects/home.page.js';
import signupPage from '../pageobjects/signup.page.js';
import accountCreatedPage from '../pageobjects/account-created.page.js';
import { expect } from 'chai';
import { generateRandomUser } from '../utils/data-generator.js';

describe('User Registration', () => {
    it('Test Case 1: Register User', async () => {
        // Generate random user data
        const userData = generateRandomUser();

        // 1. Launch browser and navigate to url 'http://automationexercise.com'
        await homePage.open();

        // Verify home page is visible
        const title = await browser.getTitle();
        expect(title).to.include('Automation Exercise');

        // 2. Click on 'Signup / Login' button
        await homePage.clickSignupLogin();

        // 3. Verify 'New User Signup!' is visible
        expect(await signupPage.isNewUserSignupVisible()).to.be.true;

        // 4. Enter name and email address
        await signupPage.enterSignupDetails(userData.name, userData.email);

        // 5. Click 'Signup' button
        await signupPage.clickSignupButton();

        // 6. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        expect(await signupPage.isEnterAccountInfoVisible()).to.be.true;

        // 7. Fill details: Title, Name, Email, Password, Date of birth
        await signupPage.fillAccountDetails({
            title: userData.title,
            password: userData.password,
            dayOfBirth: userData.dayOfBirth,
            monthOfBirth: userData.monthOfBirth,
            yearOfBirth: userData.yearOfBirth
        });

        // 8. Select checkbox 'Sign up for our newsletter!'
        await signupPage.checkNewsletterSignup();

        // 9. Select checkbox 'Receive special offers from our partners!'
        await signupPage.checkSpecialOffers();

        // 10. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        await signupPage.fillAddressDetails({
            firstName: userData.firstName,
            lastName: userData.lastName,
            company: userData.company,
            address1: userData.address1,
            address2: userData.address2,
            country: userData.country,
            state: userData.state,
            city: userData.city,
            zipcode: userData.zipcode,
            mobileNumber: userData.mobileNumber
        });

        // 11. Click 'Create Account button'
        await signupPage.clickCreateAccountButton();

        // 12. Verify that 'ACCOUNT CREATED!' is visible
        expect(await accountCreatedPage.isAccountCreatedVisible()).to.be.true;

        // 13. Click 'Continue' button
        await accountCreatedPage.clickContinueButton();

        // 14. Verify that 'Logged in as username' is visible
        expect(await homePage.verifyUserLoggedIn()).to.be.true;
        const username = await homePage.getLoggedInUsername();
        expect(username).to.equal(userData.name);

        // 15. Click 'Delete Account' button
        await homePage.clickDeleteAccount();

        // 16. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        expect(await accountCreatedPage.isAccountDeletedVisible()).to.be.true;
        await accountCreatedPage.clickContinueButton();
    });
});