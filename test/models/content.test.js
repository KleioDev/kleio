/**
 * Created by cesarcruz on 3/20/15.
 */

var Model = require('../../models'),
    expect = require('chai').expect,
    contentModel,
    content,
    contentFail,
    data;

describe('Content', function() {

    before(function() {
        data = {
            title : 'Entrevista al gran Francisco Pirulo',
            mediaLink : 'http://www.timbuk2.com/command-tsa-friendly-ipad-laptop-messenger-bag/174-4-2226.html#/dwvar_174-4-4090_size=8&dwvar_174-4-4090_color=2226',
            description : 'Escucha la gran voz de este excelente cantautor boricua',
            type : 'image'
        }
        contentModel = Model.sequelize.model('Content');
    });

    describe('Define', function() {

        it('should create a instance of content model', function() {
            expect(contentModel).not.to.be.undefined;
        });
    });

    before(function() {
        content = contentModel.build(data);
    });

    describe('Build', function() {

        it('should build an instance of content', function() {
            expect(content).not.to.be.undefined;
        });

        it('should have a title attribute', function() {
            expect(content.title).to.be.a('string').and.be.equal(data.title);
        });

        it('should have a mediaLink attribute', function() {
            expect(content.mediaLink).not.to.be.undefined;

            //Parent content can be null
            expect(content.mediaLink).to.be.a('string').and.be.equal(data.mediaLink);
        });

        it('should have a description attribute', function() {
           expect(content.description).to.be.a('string').and.be.equal(data.description);
        });

        it('should have a type attribute', function() {
            expect(content.type).to.be.a('string').and.be.equal(data.type);
        });
    });
    //TODO: test for failure
});