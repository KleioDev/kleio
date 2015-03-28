/**
 * Created by cesarcruz on 3/21/15.
 */


var supertest = require('supertest-as-promised'),
    expect = require('chai').expect,
    utilities = require('../../utilities'),
    app = utilities.server;
    request = supertest(app.callback()),
    museum = require('./dummy').museum,
    Museum = utilities.models['Museum'];

describe('Museum', function() {

    /**
     * Create database instance for testing
     */
    before(function *() {
       yield Museum.create(museum);
    });

    describe('GET /museum', function(){
        it('should receieve an ok status', function *(){
             yield request.get('/museum').expect(200);
        });

        it('should return a JSON object', function *() {
            var res = yield request.get('/museum');
            expect(res.body).to.be.a('object');
        });

        it('Should have title attribute', function *() {
            var res = yield request.get('/museum');
            expect(res.body.title).to.be.a('string');
        });

    });

    /**
     * Destroy the instance once the tests are complete
     */
    after(function * () {
        yield Museum.destroy({where : { title : museum.title}});
    });
});