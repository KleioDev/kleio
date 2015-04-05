/**
 * Created by cesarcruz on 3/16/15.
 */

var expect = require('chai').expect,
    coMocha = require('co-mocha'),
    Models = require('../../models').sequelize,
    data,
    feedbackModel,
    feedback,
    feedbackPromise;

describe('Feedback', function(){

    before(function(){
       data = {
           title: 'The Museum App Rocks',
           message: 'Greatest App in the market, by far',
           type: 'general',
           MuseumId : 1
       }
       feedbackModel = Models.model('Feedback');

    });

    describe('Define', function() {
       it('should create an instance of feedback model', function(){
           expect(feedbackModel).to.not.be.undefined;
       });

       it('should have property title', function(){
          expect(feedbackModel.title).to.be.undefined;
       });
    });

    beforeEach(function(){
        feedback = feedbackModel.build(data);
    });

    describe('Build', function(){
       it('Should build an instance of Feedback', function(){
            expect(feedback).not.to.be.undefined;
       });

       it('Should have the same attributes as the data object', function(){
           expect(feedback.title).to.equal(data.title);
           expect(feedback.content).to.equal(data.content);
           expect(feedback.seen).to.be.false;
           expect(feedback.type).to.equal(data.type);
           expect(feedback.MuseumId).to.equal(data.MuseumId);
       });
    });
});
