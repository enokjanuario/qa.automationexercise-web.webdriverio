const generateRandomEmail = () => {
    return `test_${Math.floor(Math.random() * 100000)}@test.com`;
};

const userData = {
    name: 'Test User',
    email: generateRandomEmail(),
    title: 'Mr',
    password: 'Password123',
    day: '10',
    month: '5',
    year: '1990',
    firstName: 'Test',
    lastName: 'User',
    company: 'Test Company',
    address1: '123 Test Street',
    address2: 'Apt 456',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    zipcode: '94101',
    mobileNumber: '1234567890',
    newsletter: true,
    offers: true
};

const searchData = {
    productName: 'tshirt'
};

const productData = {
    firstProductIndex: 0,
    secondProductIndex: 1,
    expectedQuantity: 1
};

export { userData, searchData, productData, generateRandomEmail };