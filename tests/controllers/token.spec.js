// test controllers/api/v1/helpers/token
require('env2')('./config.env');
const test = require('tape');
const jwt = require('jsonwebtoken');
const { createToken } = require('./../../src/controllers/api/v1/helpers/token');
const testUser = {
  id: 6, email: 'test@test.com', password: 'test5', stripe_id: '5426', token: ''
}
const token = createToken(testUser.id, testUser.email, testUser.stripe_id);

test('token test', async t => {
  const user = await jwt.verify(token, process.env.TOKEN_SECRET);
  t.deepEqual(user.email, testUser.email, 'token generated correctly');
  t.end();
});
