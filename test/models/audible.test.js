/**
 * Created by cesarcruz on 4/5/15.
 */


var expect = require('chai').expect,
    coMocha = require('co-mocha'),
    Models = require('../../models').sequelize,
    data,
    audibleModel,
    audible;

describe('Audible', function(){

    before(function(){
        data = {
            title : 'A Song',
            description : 'This is a song',
            link : 'thisisalink.com'
        }
        audibleModel = Models.model('Audible');

    });

    describe('Define', function() {
        it('should create an instance of audible model', function(){
            expect(audibleModel).to.not.be.undefined;
        });
    });

    before(function(){
        audible = audibleModel.build(data);
    });

    describe('Build', function(){
        it('Should build an instance of Audible', function(){
            expect(audible).not.to.be.undefined;
        });

        it('Should have the same attributes as the data object', function(){
            expect(audible.title).to.equal(data.title);
            expect(audible.description).to.equal(data.description);
            expect(audible.link).to.be.a('string').to.equal(data.link);
        });
    });
});
