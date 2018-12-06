const request = require('supertest');

const app = require('../app'); //reference to you app.js file

describe('Test index.js', function() {
    it('should call foo route', function(done) {
        request(app)
            .get('/foo')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should call /associate-elastic-ip route', function(done) {
        request(app)
            .get('/associate-elastic-ip')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it.only('should call /associate-elastic-ip route', function(done) {
        request(app)
            .get('/associate-elastic-ip')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({ result: 'success', status: 'endpoint-called: /foo' })
            .expect(200, done);
    });

    it('should check foo route', function(done) {
        request(app)
            .get('/foo')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({ result: 'success', status: 'endpoint-called: /foo' })
            .expect(200, done);
    });

    it('should call create-standard route', function(done) {
        request(app)
            .get('/create-standard')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should check create-standard route', function(done) {
        request(app)
            .get('/create-standard')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            //.expect({ file: 'api.js', result: 'success', status: 'bar' });
            .expect({
                result: 'success',
                status: 'endpoint-called: /create-standard'
            });
    });

    it('should call associate-elastic-ip route', function(done) {
        request(app)
            .get('/associate-elastic-ip')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should check associate-elastic-ip route', function(done) {
        request(app)
            .get('/associate-elastic-ip')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            //.expect({ file: 'api.js', result: 'success', status: 'bar' });
            .expect({
                result: 'success',
                status: 'endpoint-called: /associate-elastic-ip'
            });
    });

    it('should call create-educate route', function(done) {
        request(app)
            .get('/create-educate')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should check create-educate route', function(done) {
        request(app)
            .get('/create-educate')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            //.expect({ file: 'api.js', result: 'success', status: 'bar' });
            .expect({
                result: 'success',
                status: 'endpoint-called: /create-educate'
            });
    });
});