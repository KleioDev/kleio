/**
 * Created by cesarcruz on 3/19/15.
 */

var Model = require('../../models'),
    expect = require('chai').expect,
    articleModel,
    article,
    data;


describe('Article', function() {

    before(function() {
        data = {
            title : 'Musa',
            content : 'This is an article about musa',
            type : 'news',
            author : 1
        }

        articleModel = Model.sequelize.model('Article');
    });

    describe('Define', function() {

        it('should create an instance of article model', function() {
           expect(articleModel).not.to.be.undefined;
        });
    });

    before(function() {
       article = articleModel.build(data);
    });

    describe('Build', function() {

        it('should create an instance of Article', function() {
           expect(article).not.to.be.undefined;
        });

        it('should have a title attribute', function() {
            expect(article.title).to.be.a('string').and.be.equal(data.title);
        });

        it('should have a content attribute', function() {
            expect(article.content).to.be.a('string').and.be.equal(data.content);
        });

        it('should have a type attribute', function() {
            expect(article.type).to.be.a('string').and.be.equal(data.type)
        });

        it('should have an author attribute', function() {
           expect(article.author).to.be.a('number').and.to.equal(data.author);
        });
    });
});