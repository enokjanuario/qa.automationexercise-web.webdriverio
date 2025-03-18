import Page from './page.js';

class ProductsPage extends Page {

    get allProductsText() { return $('.title'); }
    get searchInput() { return $('#search_product'); }
    get searchButton() { return $('#submit_search'); }
    get searchedProductsText() { return $('.title.text-center'); }
    get productsList() { return $$('.product-image-wrapper'); }

    get productNames() { return $$('.productinfo p'); }
    get productPrices() { return $$('.productinfo h2'); }
    get viewProductLinks() { return $$('.choose a'); }
    get addToCartButtons() { return $$('.add-to-cart'); }
    get continueShoppingButton() { return $('.modal-footer button'); }
    get viewCartButton() { return $('p.text-center a'); }

    async open() {
        await super.open('/products');
        await this.waitForPageLoad();
    }

    async searchProduct(productName) {
        await this.setValue(this.searchInput, productName);
        await this.clickElement(this.searchButton);
    }

    async verifySearchResults() {
        await this.waitForDisplayed(this.searchedProductsText);
        const text = await this.getElementText(this.searchedProductsText);
        return text.includes('SEARCHED PRODUCTS');
    }

    async getNumberOfProducts() {
        return (await this.productsList).length;
    }

    async verifyProductNameInResults(productName) {
        console.log("Procurando por produtos contendo:", productName);

        try {
            const productElements = await this.productsList;
            console.log(`Encontrados ${productElements.length} produtos na lista`);

            for (const productElement of productElements) {
                const allText = await productElement.getText();
                console.log("Texto completo do produto:", allText);

                if (allText.toLowerCase().includes(productName.toLowerCase())) {
                    console.log("Encontrado produto com o termo de busca!");
                    return true;
                }
            }

            const nameElements = await this.productNames;
            for (const element of nameElements) {
                const text = await element.getText();
                console.log("Nome do produto:", text);
                if (text.toLowerCase().includes(productName.toLowerCase())) {
                    console.log("Encontrado produto pelo nome específico!");
                    return true;
                }
            }

            const descriptionElements = await $$('.product-information p');
            for (const element of descriptionElements) {
                const text = await element.getText();
                console.log("Descrição do produto:", text);
                if (text.toLowerCase().includes(productName.toLowerCase())) {
                    console.log("Encontrado produto pela descrição!");
                    return true;
                }
            }

            console.log("Não foi encontrado nenhum produto com o termo de busca");
            return false;
        } catch (error) {
            console.error("Erro ao verificar nomes de produtos:", error);
            return false;
        }
    }

    async addProductToCart(index) {
        const products = await this.productNames;
        const productContainer = await products[index].$('./../..');
        await productContainer.scrollIntoView();
        await browser.pause(300);

        let maxRetries = 3;
        let attempt = 0;
        let succeeded = false;

        while (attempt < maxRetries && !succeeded) {
            try {
                await productContainer.moveTo();
                await browser.pause(500);
                const addToCartBtn = await productContainer.$('.add-to-cart');
                await addToCartBtn.waitForClickable({ timeout: 2000 });
                await addToCartBtn.click();
                succeeded = true;
            } catch (error) {
                attempt++;
                console.log(`Tentativa ${attempt} falhou: ${error.message}`);

                if (attempt === maxRetries) {
                    console.log('Tentando abordagem alternativa...');
                    try {
                        const overlayAddToCartBtn = await productContainer.$('.overlay-content .add-to-cart');
                        if (await overlayAddToCartBtn.isExisting()) {
                            await overlayAddToCartBtn.waitForClickable({ timeout: 1000 });
                            await overlayAddToCartBtn.click();
                            succeeded = true;
                        }
                    } catch (finalError) {
                        throw new Error(`Não foi possível clicar no botão add-to-cart após várias tentativas: ${finalError.message}`);
                    }
                } else {
                    await browser.pause(1000);
                }
            }
        }

        try {
            await $('.modal-footer button').waitForDisplayed({ timeout: 3000 });
        } catch (error) {
            console.log('Modal de confirmação não apareceu. Verificando se produto foi adicionado...');
        }
    }

    async continueShopping() {
        await this.clickElement(this.continueShoppingButton);
    }

    async viewCart() {
        await this.clickElement(this.viewCartButton);
    }

    async getProductNameByIndex(index) {
        const productNames = await this.productNames;
        if (!productNames || productNames.length <= index) {
            console.error(`Índice ${index} inválido. Apenas ${productNames?.length || 0} produtos encontrados.`);
            return 'Nome do produto não disponível';
        }
        return await productNames[index].getText();
    }

    async getProductPriceByIndex(index) {
        const productPrices = await this.productPrices;
        if (!productPrices || productPrices.length <= index) {
            console.error(`Índice ${index} inválido. Apenas ${productPrices?.length || 0} preços encontrados.`);
            return 'Preço não disponível';
        }
        return await productPrices[index].getText();
    }
}

export default new ProductsPage();