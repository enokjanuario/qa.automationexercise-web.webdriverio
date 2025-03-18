const extractPriceValue = (priceString) => {
    const priceMatch = priceString.match(/[0-9]+/);
    return priceMatch ? parseInt(priceMatch[0]) : 0;
};

const calculateExpectedTotal = (priceString, quantity) => {
    const priceValue = extractPriceValue(priceString);
    const totalValue = priceValue * quantity;

    if (priceString.includes('Rs.')) {
        return `Rs. ${totalValue}`;
    }

    return `${totalValue}`;
};

const handleAds = async () => {
    try {
        const adModal = await $('#adModal');
        if (await adModal.isDisplayed()) {
            const closeButton = await $('#adModal .close');
            await closeButton.click();
        }
    } catch (error) {
        console.log("Modal is not displayed");
    }
};

export { extractPriceValue, calculateExpectedTotal, handleAds };