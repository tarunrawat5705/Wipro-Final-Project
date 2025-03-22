const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../src/App.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('AppComponent boundary should contain "Dashboard" route for /', () => {
        expect(fileContent).toMatch(/Dashboard/);
    });

    test('AppComponent boundary should contain "Login" route for /login', () => {
        expect(fileContent).toMatch(/Login/);
    });

    test('AppComponent boundary should contain "SignUp" route for /signup', () => {
        expect(fileContent).toMatch(/SignUp/);
    });

    test('AppComponent boundary should contain "UserProfile" route for /profiles', () => {
        expect(fileContent).toMatch(/UserProfile/);
    });

    test('AppComponent boundary should contain "Nav" component', () => {
        expect(fileContent).toMatch(/Nav/);
    });

    test('NavComponent boundary should contain "Dashboard" link', () => {
        expect(fileContent).toMatch(/<Link to="\/">Dashboard<\/Link>/);
    });

    test('NavComponent boundary should contain "Profiles" link when user is logged in', () => {
        expect(fileContent).toMatch(/<Link to="\/profiles">Profiles<\/Link>/);
    });

    test('NavComponent boundary should contain "Logout" button when user is logged in', () => {
        expect(fileContent).toMatch(/<button onClick=\{handleLogout\}>Logout<\/button>/);
    });

    test('NavComponent boundary should contain "Login" link when user is not logged in', () => {
        expect(fileContent).toMatch(/<Link to="\/login">Login<\/Link>/);
    });
});
