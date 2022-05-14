// test API endpoints
const test = require('tape');
const supertest = require('supertest');
const app = require('../src/app');
let testUser = {
  email: 'test5@test.com', password: 'test5'
}
test('user Login', t => {
  supertest(app)
    .post('/api/v1/login')
    .send({ email: testUser.email, password: testUser.password })
    .expect(200)
    .end((err, res) => {
      if (err) {
        t.notOk(err);
      } else {
        t.same(res.body.email, testUser.email, `email should be the same as the input which is ${testUser.email}`);
        t.same(res.statusCode, 200, 'Status code is 200');
        testUser.token = res.body.token;
        t.end();
      }
    });
});

