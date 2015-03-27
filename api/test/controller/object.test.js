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
var id,
    contentOneId,
    contentTwoId;

describe('Object', function() {


    //TODO: Create a Museum object, insert into the database
    before(function* () {

        id = (yield Artifact.create(data.object)).dataValues.id;

        contentOneId = (yield Content.create(data.contentOne)).dataValues.id;

        contentTwoId = (yield Content.create(data.contentTwo)).dataValues.id;

        yield ObjectContent.create({ ObjectId : id, ContentId : contentOneId});

        yield ObjectContent.create({ ObjectId : id, ContentId : contentTwoId});


    });

    describe('GET /object', function(){
        it('should return an ok status', function*() {
            var res = yield request.get('/object/' + id).expect(200);
        });

        it('should return an json with object and its content', function*() {
            var res = yield request.get('/object/' + id)
            expect(res.body).to.be.a('object');

            expect(res.body.object).to.be.a('object');

            expect(res.body.content).to.be.a('array');
        });

        it('should return have a title attribute', function*(){
            var res = yield request.get('/object/' + id)

            expect(res.body.object.title).to.be.a('string').and.be.equal(data.object.title);

        });

        it('should return a description attribute', function*() {
            var res = yield request.get('/object/' + id);
            expect(res.body.object.description).to.be.a('string').and.be.equal(data.object.description);
        });

        it('should have two associated contents', function*(){
            var res = yield request.get('/object/'+id);
            expect(res.body.content).to.be.a('array');

            expect(res.body.content.length).to.be.equal(2);

        });
    });

    after(function*() {
        yield Artifact.destroy({ where : { title : data.object.title}});
        yield Content.destroy({ where : { title : data.contentOne.title}});
        yield Content.destroy({ where : { title : data.contentTwo.title}});
    });
});