// tests/auth.test.cjs
// This tests if the signup and login routes are working

const request = require('supertest');

const BASE_URL = 'http://localhost:3000';

describe('Auth API', () => {
  const testUser = {
    email: `test_${Date.now()}@example.com`,
    username: 'testuser',
    password: 'password123',
  };

  let token;

  it('should sign up a new user', async () => {
    const res = await request(BASE_URL)
      .post('/api/signup')
      .send(testUser);

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

  it('should reject duplicate signup', async () => {
    const res = await request(BASE_URL)
      .post('/api/signup')
      .send(testUser);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('should login with correct credentials', async () => {
    const res = await request(BASE_URL)
      .post('/api/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should reject login with wrong password', async () => {
    const res = await request(BASE_URL)
      .post('/api/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBeDefined();
  });
});