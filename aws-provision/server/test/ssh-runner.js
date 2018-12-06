
const request = require('supertest');

const app = require('../app'); //reference to you app.js file
const assert = require('assert');

describe('script-pusher.js tests', () => {
    // these tests are examples
    it('should test /script-pusher/qux returns valid JSON', function(done) {
        request(app)
            .get('/qux')
            .expect(response => {
                if (response) {
                    console.log('GOT RESPONSE:', response.res.statusMessage);
                }
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});