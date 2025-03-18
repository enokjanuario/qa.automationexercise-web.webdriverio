export function generateRandomUser() {
    const randomId = Math.floor(Math.random() * 100000);

    return {
        title: Math.random() > 0.5 ? 'Mr' : 'Mrs',
        name: `Test User ${randomId}`,
        firstName: `Test`,
        lastName: `User ${randomId}`,
        email: `testuser${randomId}@example.com`,
        password: `password${randomId}`,
        dayOfBirth: '15',
        monthOfBirth: '6',
        yearOfBirth: '1990',
        company: 'Test Company',
        address1: '123 Test Street',
        address2: 'Apt 456',
        country: 'United States',
        state: 'Test State',
        city: 'Test City',
        zipcode: '12345',
        mobileNumber: `555${randomId}`
    };
}