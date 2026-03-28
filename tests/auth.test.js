const request = require('supertest');

describe('Auth API', () => {
  it('should sign up a new user', async () => {
    const res = await request('http://localhost:3000')
      .post('/api/signup')
      .send({
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});