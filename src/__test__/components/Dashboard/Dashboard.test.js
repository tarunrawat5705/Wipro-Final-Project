const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/Dashboard/Dashboard.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('DashboardComponent boundary should contain "ScrumDetails" component', () => {
        expect(fileContent).toMatch(/<ScrumDetails scrum={selectedScrum} \/>/);
    });

    test('DashboardComponent boundary should contain axios GET request to fetch scrums', () => {
        expect(fileContent).toMatch(/axios.get\('http:\/\/localhost:4000\/scrums'\)/);
    });

    test('DashboardComponent boundary should contain axios GET request to fetch scrum details', () => {
        expect(fileContent).toMatch(/axios.get\(`http:\/\/localhost:4000\/scrums\/\${scrumId}`\)/);
    });

    test('DashboardComponent boundary should contain "Scrum Teams" heading', () => {
        expect(fileContent).toMatch(/<h2>Scrum Teams<\/h2>/);
    });

    test('DashboardComponent boundary should contain "Get Details" button', () => {
        expect(fileContent).toMatch(/<button onClick=\{\(\) => handleGetDetails\(scrum.id\)\}>Get Details<\/button>/);
    });
});

