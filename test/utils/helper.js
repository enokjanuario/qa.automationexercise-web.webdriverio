/**
 * Gera email único baseado no timestamp
 * @returns {String} Email único
 */
export function generateUniqueEmail() {
    return `test_user_${Date.now()}@example.com`;
}

/**
 * Pausa a execução dos testes por um período definido
 * @param {Number} ms Tempo em milissegundos
 */
export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Lida com popups/anúncios que podem aparecer durante os testes
 */
export async function handleAds() {
    try {
        const adCloseButton = $('#ad_close_button');
        if (await adCloseButton.isExisting()) {
            await adCloseButton.click();
        }
    } catch (error) {

    }
}

/**
 * Verifica se dois arrays contêm os mesmos elementos, independente da ordem
 * @param {Array} arr1 Primeiro array
 * @param {Array} arr2 Segundo array
 * @returns {Boolean} True se contêm os mesmos elementos
 */
export function arraysContainSameElements(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    const lowerArr1 = arr1.map(item => item.toLowerCase());
    const lowerArr2 = arr2.map(item => item.toLowerCase());

    for (const item of lowerArr1) {
        if (!lowerArr2.includes(item)) return false;
    }

    return true;
}