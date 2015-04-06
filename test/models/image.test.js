/**
 * Created by cesarcruz on 4/5/15.
 */

var expect = require('chai').expect,
    coMocha = require('co-mocha'),
    Models = require('../../models').sequelize,
    data,
    imageModel,
    image;

describe('Image', function(){

    before(function(){
        data = {
            title : 'A Song',
            description : 'This is a song',
            link : 'thisisalink.com'
        }
        imageModel = Models.model('Image');

    });

    describe('Define', function() {
        it('should create an instance of image model', function(){
            expect(imageModel).to.not.be.undefined;
        });
    });

    before(function(){
        image = imageModel.build(data);
    });

    describe('Build', function(){
        it('Should build an instance of Image', function(){
            expect(image).not.to.be.undefined;
        });

        it('Should have the same attributes as the data object', function(){
            expect(image.title).to.equal(data.title);
            expect(image.description).to.equal(data.description);
            expect(image.link).to.be.a('string').to.equal(data.link);
        });
    });
});
