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
            .expect({
                result: 'success',
                status: 'endpoint-called: /create-standard'
            })
            .expect(200, done);
    });


    it('should call /associate-elastic-ip route', function(done) {
        request(app)
            .get('/associate-elastic-ip')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should check /associate-elastic-ip route', function(done) {
        request(app)
            .get('/associate-elastic-ip?foo=bar&instanceId=123&allocationId=456&region=Home')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({
                result: 'success',
                //foo: 'endpoint-called: bar',
                status: 'endpoint-called: /associate-elastic-ip',
                instanceId: '123',
                allocationId: '456',
                region: 'Home'
            })
            .expect(200, done);
    });




    it.only('should check /get-instance-status route', function(done) {
        request(app)
            .get('/get-instance-status?instanceId=321')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({
                result: 'success',
                status: 'endpoint-called: /get-instance-status',
                instanceId: '321'
            })
            .expect(200, done);
    });

    it('should call /create-educate route', function(done) {
        request(app)
            .get('/create-educate')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should check /create-educate route', function(done) {
        request(app)
            .get('/create-educate')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({
                result: 'success',
                status: 'endpoint-called: /create-educate'
            })
            .expect(200, done);
    });
});