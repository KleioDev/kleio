/**
 * Created by cesarcruz on 4/5/15.
 */


var expect = require('chai').expect,
    coMocha = require('co-mocha'),
    Models = require('../../models').sequelize,
    data,
    beaconModel,
    beacon;

describe('Event', function(){

    before(function(){
        data = {
            title : 'Darth Vader Exhibition',
            description : 'An Exhibition showcasing Darth Vader Excellence',
            eventDate : Date.now(),
            image : 'darthVader.jpeg',
            location : 'location.com',
            author : 1
        }
        eventModel = Models.model('Event');

    });

    describe('Define', function() {
        it('should create an instance of event model', function(){
            expect(eventModel).to.not.be.undefined;
        });
    });

    before(function(){
        event = eventModel.build(data);
    });

    describe('Build', function(){
        it('Should build an instance of Event', function(){
            expect(event).not.to.be.undefined;
        });

        it('Should have the same attributes as the data object', function(){
            expect(event.title).to.be.a('string').to.equal(data.title);
        });

        it('should have a description attribute', function(){
            expect(event.description).to.be.a('string').to.equal(data.description);
        });

        it('should have an image attribute', function(){
            expect(event.image).to.be.a('string').to.equal(data.image);
        });

        it('should have a location attribute', function(){
            expect(event.location).to.be.a('string').to.equal(data.location);
        });

        it('should have an author attribute', function(){
            expect(event.author).to.be.a('number').to.equal(data.author);
        })
    });
});