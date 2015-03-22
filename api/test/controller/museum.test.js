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

    //TODO: Create a Museum object, insert into the database
    before(function() {
       Museum.create(museum);
    });

    describe('GET /museum', function(){
        it('should receieve an ok status', function(){
             return request.get('/museum').expect(200);
        });

        it('should return a JSON object', function() {
            return request.get('/museum').then(function(res) {
                expect(res.body).to.be.a('object');
            }) ;
        });

        it('Should have title attribute', function() {
            return request.get('/museum').then(function(res){
                expect(res.body.title).to.be.a('string');
            });
        });
    });
});