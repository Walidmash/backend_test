// test models/helpers/
require('env2')('./config.env');
const test = require('tape');
const { hashPassword, comparePassword } = require('./../../src/models/helpers/user');
const testUser = {
  id: 6, email: 'test6@test.com', password: 'test6', stripe_id: '5426', token: ''
}
const hashedPass = hashPassword(testUser.password);
// test user.js helpers
test('Test models/helpers/user', t => {
    t.ok(comparePassword( testUser.password, hashedPass ), 'password hashed and compared correctly');
    t.end();
  });