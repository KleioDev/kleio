/**
 * Created by cesarcruz on 3/23/15.
 */

var supertest = require('supertest-as-promised'),
    expect = require('chai').expect,
    utilities = require('../../utilities'),
    app = utilities.server;
request = supertest(app.callback()),
    data = require('./dummy'),
    Artifact = utilities.models['Object'],
    Content = utilities.models['Content'],
    ObjectContent = utilities.models['ObjectContent'];

describe('Object', function() {

    var id, contentOneId, contentTwoId;

    //TODO: Create a Museum object, insert into the database
    before(function() {
        return createdObject = Artifact.create(data.object).then(function (result) {
                id = result.dataValues.id;
            Content.create(data.contentOne).then(function(result) {
                contentOneId = result.dataValues.id;
            });
            Content.create(data.contentTwo).then(function(result) {
                contentTwoId = result.dataValues.id;
            });

            ObjectContent.create({
                ObjectId : id,
                ContentId : contentOneId
            }).then(function(result) {
                ObjectContent.create({
                    ObjectId : id,
                    ContentId : contentTwoId
                });
            });
        });
    });

    describe('GET /object/' + id, function(){
        it('should return an ok status', function() {
            return request.get('/object/1') .expect(200);
        });

        it('should return an object', function() {
            return request.get('/object/' + id).then(function(result){
               expect(result.body).to.be.a('object');
            });
        });

        it('should return have a title attribute', function(){
            return request.get('/object/' + id, function(result) {
                expect(result.title).to.be.a('string').and.be.equal(data.object.title);
            });
        });

        it('should return a description attribute', function() {
           return request.get('/object/' + id, function(result){
                expect(result.description).to.be.a('string').and.be.equal(data.object.description);
           });
        });

        it('should have two associated contents', function(){
           return request.get('/object/'+id, function(result) {
                expect(result.content).to.be.a('string');
           });
        });
    });

    after(function() {
        Artifact.destroy({ where : { title : data.object.title}});
        Content.destroy({ where : { title : data.contentOne.title}});
        Content.destroy({ where : { title : data.contentTwo.title}});
    });
});