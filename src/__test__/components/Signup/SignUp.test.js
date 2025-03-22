const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/Signup/SignUp.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('SignUpComponent boundary should contain "Name" input', () => {
        expect(fileContent).toMatch(/name/);
    });

    test('SignUpComponent boundary should contain "Email" input', () => {
        expect(fileContent).toMatch(/email/);
    });

    test('SignUpComponent boundary should contain "Password" input', () => {
        expect(fileContent).toMatch(/password/);
    });

    test('SignUpComponent boundary should contain form with onSubmit handler', () => {
        expect(fileContent).toMatch(/<form onSubmit=\{handleSignUp\}>/);
    });

    test('SignUpComponent boundary should contain axios POST request to sign up user', () => {
        expect(fileContent).toMatch(/axios.post\('http:\/\/localhost:4000\/users', \{[\s\S]*name,[\s\S]*email,[\s\S]*password,[\s\S]*role: 'employee'[\s\S]*\}\)/);
    });

    test('SignUpComponent boundary should contain "Sign Up" button', () => {
        expect(fileContent).toMatch(/<button type="submit">Sign Up<\/button>/);
    });

    test('SignUpComponent boundary should redirect to login on successful sign up', () => {
        expect(fileContent).toMatch(/history.push\('\/login'\);/);
    });
});
