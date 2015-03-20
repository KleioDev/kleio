/**
 * Created by cesarcruz on 3/20/15.
 */

var Model = require('../../models'),
    expect = require('chai').expect,
    objectContentModel,
    objectContent,
    data;

describe('ObjectContent', function() {

    before(function(){
        data = {
            ObjectId : 2,
            ContentId : 3
        }
        objectContentModel = Model.sequelize.model('ObjectContent');
    });

    describe('Define', function() {

        it('should create an Object Content model instance', function() {
            expect(objectContentModel).not.to.be.undefined;
        });
    });

    before(function(){

        objectContent = objectContentModel.build(data);
    });

    describe('Build', function() {

        it('should create an instance of objectContent', function() {
            expect(objectContent).not.to.be.undefined;
        });

        it('should have a object id attribute', function(){
            expect(objectContent.ObjectId).to.be.a('number').and.be.equal(data.ObjectId);
        });

        it('should have a content id attribute', function() {
            expect(objectContent.ContentId).to.be.a('number').and.be.equal(data.ContentId);
        });
    });
});