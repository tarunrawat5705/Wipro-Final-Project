const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/Scrum Details/ScrumDetails.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('ScrumDetailsComponent boundary should contain "Scrum Details for {scrum.name}" heading', () => {
        expect(fileContent).toMatch(/<h3>Scrum Details for \{scrum.name\}<\/h3>/);
    });

    test('ScrumDetailsComponent boundary should contain "Tasks" heading', () => {
        expect(fileContent).toMatch(/<h4>Tasks<\/h4>/);
    });

    test('ScrumDetailsComponent boundary should contain list of tasks', () => {
        expect(fileContent).toMatch(/tasks.map\(task => \(/);
    });

    test('ScrumDetailsComponent boundary should contain axios GET request to fetch tasks', () => {
        expect(fileContent).toMatch(/axios.get\(`http:\/\/localhost:4000\/tasks\?scrumId=\$\{scrum.id\}`\)/);
    });

    test('ScrumDetailsComponent boundary should contain "Users" heading', () => {
        expect(fileContent).toMatch(/<h4>Users<\/h4>/);
    });

    test('ScrumDetailsComponent boundary should contain list of users', () => {
        expect(fileContent).toMatch(/users.map\(user => \(/);
    });

    test('ScrumDetailsComponent boundary should contain axios GET request to fetch users', () => {
        expect(fileContent).toMatch(/axios.get\('http:\/\/localhost:4000\/users'\)/);
    });

    test('ScrumDetailsComponent boundary should check for logged-in user and redirect if not logged in', () => {
        expect(fileContent).toMatch(/const checkUser = \(\) => \{[\s\S]*const loggedInUser = JSON.parse\(localStorage.getItem\('user'\)\);[\s\S]*if \(!loggedInUser\) \{[\s\S]*history.push\('\/login'\);/);
    });
});
