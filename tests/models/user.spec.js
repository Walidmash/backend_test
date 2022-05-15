// test database queries
const test = require('tape');
const userFunctions = require('../../src/models/queries/user');
const testUser = {
    id: 6, email: 'test6@test.com', password: 'test6', stripe_id: '5426', token: ''
  }
// test getUser
test('Test Models GetUser', t => {
    userFunctions.getUser(testUser.email, (err, user) => {
        t.notOk(err, 'No error');
        t.deepEqual(user.email, testUser.email, 'get user details correctly from DB');
        t.end();
    });
});
// test userLogin
test('Test Models userLogin with the right email and password', t => {
    userFunctions.userLogIn(testUser.email, testUser.password, (err, user) => {
        t.notOk(err, 'No error');
        t.deepEqual(user.email, testUser.email, 'email and password are correctly matched');
        t.end();
    });
});
test('Test Models userLogin with the incorrect email and password', t => {
    userFunctions.userLogIn(testUser.email, 'wrong password', err => {
        t.ok(err.notMatched, 'wrong email/password test');
        t.end();
    });
});