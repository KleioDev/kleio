/**
 * Created by cesarcruz on 3/20/15.
 */

var Model = require('../../models'),
    expect = require('chai').expect,
    exhibitionModel,
    exhibition,
    data;

describe('Exhibition', function() {

    before(function(){
        data = {
            title : 'Master Collection',
            description : 'Master Collection for the MuSA',
            image : 'master.jpeg',
            active : true,
            MuseumId : 1
        }
        exhibitionModel = Model.sequelize.model('Exhibition');
    });

    describe('Define', function() {

        it('should create an exhibition model instance', function() {
            expect(exhibitionModel).not.to.be.undefined;
        });
    });

    before(function(){

        exhibition = exhibitionModel.build(data);
    });

    describe('Build', function() {

        it('should create an instance of exhibition', function() {
            expect(exhibition).not.to.be.undefined;
        });

        it('should have a name attribute', function(){
            expect(exhibition.title).to.be.a('string').and.be.equal(data.title);
        });

        it('should have a description attribute', function() {
            expect(exhibition.description).to.be.a('string').and.be.equal(data.description);
        });

        it('should have a museumId attribute', function() {
            expect(exhibition.MuseumId).to.be.a('number').and.be.equal(data.MuseumId);
        });
    });
});