import app from '../app';
import supertest from 'supertest';

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const { status } = await supertest(app).get('/');
    expect(status).toBe(200);
  });
});
