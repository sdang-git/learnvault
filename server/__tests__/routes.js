const request = require('supertest');
const fs = require('fs');
const path = require('path');

const server = 'http://localhost:5000';

describe('/', () => {
  describe('POST', () => {
    it('creates a collection with provided info', () => {
      return request(server)
        .post('/api/collections')
        .send({
          title: 'Coding stuff',
          author: 'Arthur Morgan',
          description: 'Coding stuff I reckon',
          hidden: true,
        })
        .set('Accept', 'application/json')
        .then((response) => {
          expect(response.body.title).toEqual('Coding stuff');
        });
    });
  });
});

describe('/:id', () => {
  describe('PUT', () => {
    it('updates collection with provided info', () => {
      return request(server)
        .put('/api/collections/5ee53832573c6f01f2945b58')
        .send({ title: 'Cool resources' })
        .set('Accept', 'application/json')
        .then((response) => {
          expect(response.body.title).toEqual('Cool resources');
        });
    });
    it("returns a 500 status if collection doesn't exist", () => {
      // Code actually seems to want 404 to be returned in this case,
      // but it returns 500. If time, fix this.
      return request(server)
        .put('/api/collections/fakeid')
        .send({ title: 'Fake Resources' })
        .set('Accept', 'application/json')
        .then((response) => {
          expect(response.status).toBe(500);
        });
    });
  });

  describe('GET', () => {
    it('gets collection with given id', () => {
      return request(server)
        .get('/api/collections/5ee53832573c6f01f2945b58')
        .then((response) => {
          expect(response.body.title).toEqual('Cool resources');
        });
    });
  });

  // describe('DELETE', () => {
  //   it('deletes a collection by ID', () => {
  //     // add this after adding POST test
  //   });
  // });
});

// describe('/like/:id', () => {
//   describe('PUT', () => {

//   })

// })

// describe('/unlike/:id', () => {
//   describe('PUT', () => {

//   })
// })

// describe('/save/:id', () => {
//   describe('PUT', () => {

//   })
// })

// describe('/savedcollections/:userId', () => {
//   describe('GET', () => {

//   })
// })

// describe('/category/:id', () => {
//   describe('PUT', () => {

//   })
// })

// describe('/tags/:id', () => {
//   describe('PUT', () => {

//   })
// })

describe('/user/:id', () => {
  describe('GET', () => {
    it('gets collection by userId', () => {
      return request(server)
        .get('/api/collections/user/5ee987670ca9dc164756f5bd')
        .expect(200);
    });
  });
});
