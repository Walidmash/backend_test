// test API endpoints
const test = require('tape');
const supertest = require('supertest');
const app = require('../src/app');
let testUser = {
  email: 'test5@test.com', password: 'test5'
}
test('user Login success', t => {
  supertest(app)
    .post('/api/v1/login')
    .send({ email: testUser.email, password: testUser.password })
    .expect(200)
    .end((err, res) => {
      if (err) t.notOk(err);
      else {
        t.same(res.body.email, testUser.email, `email should be the same as the input which is ${testUser.email}`);
        t.same(res.statusCode, 200, 'Status code is 200');
        testUser.token = res.body.token;
        t.end();
      }
    })
  });
test('user Login missing password/email', t => {
  supertest(app)
    .post('/api/v1/login')
    .send({ email: testUser.email })
    .expect(400)
    .end((err, res) => {
      if (err) t.notOk(err);
      else {
        t.same(res.statusCode, 400, 'Status code is 400 in case password or email is not provided');
        t.end();
      }
    })
});
test('user Login wrong password/email', t => {
  supertest(app)
    .post('/api/v1/login')
    .send({ email: testUser.email, password: 'dsda' })
    .expect(401)
    .end((err, res) => {
      if (err) t.notOk(err);
      else {
        t.same(res.statusCode, 401, 'Status code is 401 in case password or email is not correct');
        t.end();
      }
    })
});


test('failure to authenticate /api/v1/allproducts', t => {
  supertest(app)
    .get('/api/v1/allproducts')
    .expect(401)
    .end((err, res) => {
      if (err) {
        t.notOk(err);
      } else {
        t.same(res.statusCode, 401, 'No token Status code is 401');
        t.end();
      }
    });
});
test('successfull to authenticate /api/v1/allproducts', t => {
  supertest(app)
    .get('/api/v1/allproducts')
    .set('x-access-token',testUser.token)
    .expect(200)
    .end((err, res) => {
      if (err) {
        t.notOk(err);
      } else {
        t.same(res.statusCode, 200, 'Token accepted');
        t.end();
      }
    });
});