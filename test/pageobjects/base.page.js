/**
 * Page base com métodos comuns para todas as páginas
 */
export default class BasePage {
    /**
     * Abre uma url específica
     * @param {String} path Path da página para abrir
     */
    open(path) {
        return browser.url(path);
    }

    /**
     * Espera elemento estar visível com timeout personalizado
     * @param {Object} element WebdriverIO element
     * @param {Number} timeout Timeout em ms
     */
    async waitForDisplayed(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Clica em um elemento após ele estar visível
     * @param {Object} element WebdriverIO element
     */
    async clickElement(element) {
        await this.waitForDisplayed(element);
        await element.click();
    }

    /**
     * Insere texto em um elemento após ele estar visível
     * @param {Object} element WebdriverIO element
     * @param {String} text Texto para inserir
     */
    async setValue(element, text) {
        await this.waitForDisplayed(element);
        await element.setValue(text);
    }

    /**
     * Verifica se um elemento está visível
     * @param {Object} element WebdriverIO element
     * @returns {Boolean} Verdadeiro se visível
     */
    async isElementDisplayed(element) {
        try {
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Verifica se texto existe em um elemento
     * @param {Object} element WebdriverIO element
     * @param {String} text Texto para verificar
     * @returns {Boolean} Verdadeiro se contém texto
     */
    async hasText(element, text) {
        await this.waitForDisplayed(element);
        const elementText = await element.getText();
        return elementText.includes(text);
    }

    /**
     * Obtém texto de um elemento
     * @param {Object} element WebdriverIO element
     * @returns {String} Texto do elemento
     */
    async getText(element) {
        await this.waitForDisplayed(element);
        return await element.getText();
    }
}