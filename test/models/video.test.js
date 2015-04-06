/**
 * Created by cesarcruz on 4/5/15.
 */

var expect = require('chai').expect,
    Models = require('../../models').sequelize,
    data,
    videoModel,
    video;

describe('Video', function(){

    before(function(){
        data = {
            title : 'A Song',
            description : 'This is a song',
            link : 'thisisalink.com'
        }
        videoModel = Models.model('Video');

    });

    describe('Define', function() {
        it('should create an instance of video model', function(){
            expect(videoModel).to.not.be.undefined;
        });
    });

    before(function(){
        video = videoModel.build(data);
    });

    describe('Build', function(){
        it('Should build an instance of Video', function(){
            expect(video).not.to.be.undefined;
        });

        it('Should have the same attributes as the data object', function(){
            expect(video.title).to.equal(data.title);
            expect(video.description).to.equal(data.description);
            expect(video.link).to.be.a('string').to.equal(data.link);
        });
    });
});
