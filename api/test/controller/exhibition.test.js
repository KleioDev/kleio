/**
 * Created by cesarcruz on 3/27/15.
 */

var supertest = require('supertest-as-promised'),
    expect = require('chai').expect,
    utilities = require('../../utilities'),
    app = utilities.server;
    request = supertest(app.callback()),
    exhibition = require('./dummy').exhibition,
    Exhibition = utilities.models['Exhibition'];

describe('Exhibition', function(){

    before(function *(){
        yield Exhibition.create(exhibition);
    });

    describe('GET /exhibition', function(){

        it('should return a status of 200', function *(){
            yield request.get('/exhibition').expect(200);
        });
    });

    after(function *(){
        yield Exhibition.destroy({where : { name : exhibition.name}})
    });
});