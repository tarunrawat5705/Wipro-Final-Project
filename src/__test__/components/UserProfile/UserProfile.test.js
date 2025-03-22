const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/UserProfile/UserProfile.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('UserProfileComponent boundary should contain "User Profiles" heading', () => {
        expect(fileContent).toMatch(/<h2>User Profiles<\/h2>/);
    });

    test('UserProfileComponent boundary should fetch users on mount', () => {
        expect(fileContent).toMatch(/axios.get\('http:\/\/localhost:4000\/users'\)/);
    });

    test('UserProfileComponent boundary should fetch tasks for selected user', () => {
        expect(fileContent).toMatch(/axios.get\(`http:\/\/localhost:4000\/tasks\?assignedTo=\$\{userId\}`\)/);
    });

    test('UserProfileComponent boundary should display tasks for logged-in user if not admin', () => {
        expect(fileContent).toMatch(/Tasks Worked By/);
    });

    test('UserProfileComponent boundary should display task details for selected user if admin', () => {
        expect(fileContent).toMatch(/<h3>Tasks Worked By \{selectedUser.name\}<\/h3>/);
    });

    test('UserProfileComponent boundary should use UserContext to get logged-in user', () => {
        expect(fileContent).toMatch(/useContext\(UserContext\)/);
    });
});
