'use strict';

process.env.SECRET = "toes";


const supertest = require('supertest');
const server = require('../src/server.js');
const { db } = require('../src/auth/models/index.js');

const mockRequest = supertest(server);

let User = {
  admin: { username: 'admin', password: 'password' },
  editor: { username: 'editor', password: 'password' },
  user: { username: 'user', password: 'password' },
};

beforeAll(async () => {
  await db.sync();
//   done();
});
afterAll(async () => {
  await db.drop();
//   done();
});


describe('Auth Router', () => {

  Object.keys(User).forEach(userType => {

    describe(`${userType} users`, () => {

        xit('can create one', async (done) => {

        const response = await mockRequest.post('/signup').send(users[userType]);
        const userObject = response.body;

        expect(response.status).toBe(201);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)
        done();
      });

      xit('can signin with basic', async (done) => {

        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);

        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)
        done();
      });

      xit('can signin with bearer', async (done) => {

        // First, use basic to login to get a token
        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);

        const token = response.body.token;

        // First, use basic to login to get a token
        const bearerResponse = await mockRequest
          .get('/users')
          .set('Authorization', `Bearer ${token}`)

        // Not checking the value of the response, only that we "got in"
        expect(bearerResponse.status).toBe(200);
        done();
      });

    });

    describe('bad logins', () => {
        xit('basic fails with known user and wrong password ', async (done) => {

        const response = await mockRequest.post('/signin')
          .auth('admin', 'xyz')
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined();
        done();
      });

      xit('basic fails with unknown user', async (done) => {

        const response = await mockRequest.post('/signin')
          .auth('nobody', 'xyz')
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined()
        done();
      });

      xit('bearer fails with an invalid token', async (done) => {

        // First, use basic to login to get a token
        const bearerResponse = await mockRequest
          .get('/user')
          .set('Authorization', `Bearer foobar`)

        // Not checking the value of the response, only that we "got in"
        expect(bearerResponse.status).toBe(403);
        done();
      })
    })

  });

});
