/**
 * Created by cesarcruz on 3/20/15.
 */

var Model = require('../../models'),
    expect = require('chai').expect,
    artifactModel,
    artifact,
    data;

describe('Artifact', function() {

    before(function(){
        data = {
            title : 'Spring Vader',
            description : 'Darth Vader taking a walk during Spring by an Emperial Garden',
            medium : 'Canvas',
            classification : 'Something',
            attribution : 'Something',
            type : 'Good Type',
            dimensions : '11.5 x 8',
            dated : '2015',
            period : 'Post Modern',
            culture : 'North American Culture',
            department : 'Emperial',
            objectNumber : '923450983450983450345908',
            image : 'emperor.jpeg',
            ArtistId : 1,
            qrcode : 'someqrcode.com'
        }
        artifactModel = Model.sequelize.model('Artifact');
    });

    describe('Define', function() {

        it('should create an object model instance', function() {
            expect(artifactModel).not.to.be.undefined;
        });
    });

    before(function(){

        artifact = artifactModel.build(data);
    });

    describe('Build', function() {

        it('should create an instance of object', function() {
            expect(artifact).not.to.be.undefined;
        });

        it('should have a title attribute', function(){
            expect(artifact.title).to.be.a('string').and.be.equal(data.title);
        });

        it('should have a description attribute', function() {
            expect(artifact.description).to.be.a('string').and.be.equal(data.description);
        });

        it('should have a medium attribute', function() {
            expect(artifact.medium).to.be.a('string').and.be.equal(data.medium);
        });

        it('should have a classification attribute', function() {
            expect(artifact.classification).to.be.a('string').and.be.equal(data.classification);
        });

        it('should have a attribution attribute', function() {
            expect(artifact.attribution).to.be.a('string').and.be.equal(data.attribution);
        });

        it('should have a type attribute', function() {
            expect(artifact.type).to.be.a('string').and.be.equal(data.type);
        });

        it('should have a dimensions attribute', function() {
            expect(artifact.dimensions).to.be.a('string').and.be.equal(data.dimensions);
        });

        it('should have a dated attribute', function() {
            expect(artifact.dated).to.be.a('string').and.be.equal(data.dated);
        });

        it('should have a period attribute', function() {
            expect(artifact.period).to.be.a('string').and.be.equal(data.period);
        });

        it('should have a culture attribute', function() {
            expect(artifact.culture).to.be.a('string').and.be.equal(data.culture);
        });

        it('should have a department attribute', function() {
            expect(artifact.department).to.be.a('string').and.be.equal(data.department);
        });

        it('should have a objectNumber attribute', function() {
            expect(artifact.objectNumber).to.be.a('string').and.be.equal(data.objectNumber);
        });

        it('should have a artist attribute', function() {
            expect(artifact.ArtistId).to.be.a('number').and.be.equal(data.ArtistId);
        });
    });
});