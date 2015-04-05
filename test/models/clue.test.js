/**
 * Created by cesarcruz on 4/5/15.
 */

var expect = require('chai').expect,
    coMocha = require('co-mocha'),
    Models = require('../../models').sequelize,
    data,
    clueModel,
    clue;

describe('Clue', function(){

    before(function(){
        data = {
            image : 'thisisaurl.com'
        }
        clueModel = Models.model('Clue');

    });

    describe('Define', function() {
        it('should create an instance of clue model', function(){
            expect(clueModel).to.not.be.undefined;
        });
    });

    before(function(){
        clue = clueModel.build(data);
    });

    describe('Build', function(){
        it('Should build an instance of Clue', function(){
            expect(clue).not.to.be.undefined;
        });

        it('Should have the same attributes as the data object', function(){
            expect(clue.image).to.be.a('string').to.equal(data.image);
        });
    });
});
