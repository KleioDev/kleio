/**
 * Created by cesarcruz on 4/5/15.
 */

var expect = require('chai').expect,
    Models = require('../../models').sequelize,
    data,
    newsModel,
    news;

describe('News', function(){

    before(function(){
        data = {
            title : 'It is Here',
            description : 'Dont worry about all the details, it is here',
            image : 'image.jpeg',
            AdministratorId : 1
        }
        newsModel = Models.model('News');

    });

    describe('Define', function() {
        it('should create an instance of News model', function(){
            expect(newsModel).to.not.be.undefined;
        });
    });

    before(function(){
        news = newsModel.build(data);
    });

    describe('Build', function(){
        it('Should build an instance of News', function(){
            expect(news).not.to.be.undefined;
        });

        it('Should have a title attribute', function(){
            expect(news.title).to.be.a('string').to.equal(data.title);
        });

        it('should have a description attribute', function(){
            expect(news.description).to.be.a('string').to.equal(data.description);
        });

        it('should have an image attribute', function(){
            expect(news.image).to.be.a('string').to.equal(data.image);
        });

        it('should have an AdministratorId attribute', function(){
            expect(news.AdministratorId).to.be.a('number').to.equal(data.AdministratorId);
        })
    });
});