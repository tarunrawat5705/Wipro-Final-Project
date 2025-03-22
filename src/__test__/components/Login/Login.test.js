const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/Login/Login.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('LoginComponent boundary should contain email input', () => {
        expect(fileContent).toMatch(/email/);
    });

    test('LoginComponent boundary should contain password input', () => {
        expect(fileContent).toMatch(/password/);
    });

    test('LoginComponent boundary should contain form with onSubmit handler', () => {
        expect(fileContent).toMatch(/<form onSubmit=\{handleLogin\}>/);
    });

    test('LoginComponent boundary should contain axios GET request to fetch user', () => {
        expect(fileContent).toMatch(/axios.get\(`http:\/\/localhost:4000\/users\?email=\$\{email\}&password=\$\{password\}`\)/);
    });

    test('LoginComponent boundary should contain "Login" button', () => {
        expect(fileContent).toMatch(/<button type="submit">Login<\/button>/);
    });

    test('LoginComponent boundary should contain "Sign Up" button', () => {
        expect(fileContent).toMatch(/<button onClick=\{\(\) => history.push\('\/signup'\)\}>Sign Up<\/button>/);
    });

    test('LoginComponent boundary should use UserContext for login', () => {
        expect(fileContent).toMatch(/useContext\(UserContext\)/);
        expect(fileContent).toMatch(/login\(user\)/);
    });

    test('LoginComponent boundary should redirect based on user role', () => {
        expect(fileContent).toMatch(/if \(user.role === 'admin'\) \{[\s\S]*?history.push\('\/'\)/);
        expect(fileContent).toMatch(/else \{[\s\S]*?history.push\('\/profiles'\)/);
    });
});
