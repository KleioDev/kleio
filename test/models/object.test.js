/**
 * Created by cesarcruz on 3/20/15.
 */

var Model = require('../../models'),
    expect = require('chai').expect,
    objectModel,
    object,
    data;

describe('Object', function() {

    before(function(){
        data = {
            title : 'La Voz',
            description : 'Water based painting by Francisco Pirulo',
            medium : 'Canvas',
            classification : 'Modern',
            attribution : 'Plenty',
            type : 'OG',
            dimensions : 'Too big',
            dated : '1991',
            period : 'Modernist',
            culture : 'hipsters',
            department : 'Some',
            objectNumber : 'somenumber',
            ArtistId : 3
        }
        objectModel = Model.sequelize.model('Object');
    });

    describe('Define', function() {

        it('should create an object model instance', function() {
            expect(objectModel).not.to.be.undefined;
        });
    });

    before(function(){

        object = objectModel.build(data);
    });

    describe('Build', function() {

        it('should create an instance of object', function() {
            expect(object).not.to.be.undefined;
        });

        it('should have a title attribute', function(){
            expect(object.title).to.be.a('string').and.be.equal(data.title);
        });

        it('should have a description attribute', function() {
            expect(object.description).to.be.a('string').and.be.equal(data.description);
        });

        it('should have a medium attribute', function() {
            expect(object.medium).to.be.a('string').and.be.equal(data.medium);
        });

        it('should have a classification attribute', function() {
            expect(object.classification).to.be.a('string').and.be.equal(data.classification);
        });

        it('should have a attribution attribute', function() {
            expect(object.attribution).to.be.a('string').and.be.equal(data.attribution);
        });

        it('should have a type attribute', function() {
            expect(object.type).to.be.a('string').and.be.equal(data.type);
        });

        it('should have a dimensions attribute', function() {
            expect(object.dimensions).to.be.a('string').and.be.equal(data.dimensions);
        });

        it('should have a dated attribute', function() {
            expect(object.dated).to.be.a('string').and.be.equal(data.dated);
        });

        it('should have a period attribute', function() {
            expect(object.period).to.be.a('string').and.be.equal(data.period);
        });

        it('should have a culture attribute', function() {
            expect(object.culture).to.be.a('string').and.be.equal(data.culture);
        });

        it('should have a department attribute', function() {
            expect(object.department).to.be.a('string').and.be.equal(data.department);
        });

        it('should have a objectNumber attribute', function() {
            expect(object.objectNumber).to.be.a('string').and.be.equal(data.objectNumber);
        });

        it('should have a artist attribute', function() {
            expect(object.ArtistId).to.be.a('number').and.be.equal(data.ArtistId);
        });
    });
});