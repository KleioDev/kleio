/**
 * Created by cesarcruz on 4/5/15.
 */

var expect = require('chai').expect,
    coMocha = require('co-mocha'),
    Models = require('../../models').sequelize,
    data,
    archiveModel,
    archive;

describe('Archive', function(){

    before(function(){
        data = {
            title : 'A Song',
            description : 'This is a song',
            link : 'thisisalink.com'
        }
        archiveModel = Models.model('Text');

    });

    describe('Define', function() {
        it('should create an instance of Text model', function(){
            expect(archiveModel).to.not.be.undefined;
        });
    });

    before(function(){
        archive = archiveModel.build(data);
    });

    describe('Build', function(){
        it('Should build an instance of Archive', function(){
            expect(archive).not.to.be.undefined;
        });

        it('Should have the same attributes as the data object', function(){
            expect(archive.title).to.equal(data.title);
            expect(archive.description).to.equal(data.description);
            expect(archive.link).to.be.a('string').to.equal(data.link);
        });
    });
});
