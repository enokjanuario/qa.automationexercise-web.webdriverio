export default class Page {

    open(path) {
        return browser.url(path);
    }

    async waitForDisplayed(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
    }

    async getPageTitle() {
        return await browser.getTitle();
    }

    async isElementVisible(element) {
        try {
            await this.waitForDisplayed(element);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async clickElement(element) {
        await this.waitForDisplayed(element);
        await element.click();
    }

    async setValue(element, value) {
        await this.waitForDisplayed(element);
        await element.setValue(value);
    }

    async getElementText(element) {
        await this.waitForDisplayed(element);
        return await element.getText();
    }

    async scrollToElement(element) {
        await element.scrollIntoView();
    }

    async waitForPageLoad() {
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            {
                timeout: 10000,
                timeoutMsg: 'Page did not finish loading'
            }
        );
    }

    async selectByValue(element, value) {
        await element.selectByAttribute('value', value);
    }

    async selectByVisibleText(element, text) {
        await element.selectByVisibleText(text);
    }

}