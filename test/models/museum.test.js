/**
 * Created by cesarcruz on 3/15/15.
 */

"use strict"

var mocha = require('co-mocha')
var expect = require('chai').expect;
var Museum = require('../../models').sequelize;
var data,
    museumModel,
    musa;

describe('Museum', function(){

    before(function(){
        museumModel = Museum.model('Museum');
        data = {
            name : 'Musa',
            description : 'Museuo del Colegio de Mayaguez',
            terms : 'Some Terms',
            about : 'About the Museum',
            hoursOfOperation : 'Weekdays 9 - 9',
            phone : '787787878',
            email : 'cesar@cesar.com',
            image : 'Somthing.jpeg',
            location : 'location.com'
        }
    });

    describe('model', function(){
       it('Should be defined', function (){
           expect(museumModel).to.not.be.undefined;
       });
    });


    describe('Build', function() {

        before(function(){
          musa = museumModel.build(data);

        });

        describe('Success', function(){

            it('Should build an instance', function(){
               expect(musa).not.be.undefined;
            });

            it('Should have the same title as data', function(){
               expect(musa.name).be.a('string').and.to.equal(data.name);
            });

            it('Should have the same description as data', function(){
                expect(musa.description).to.be.a('string').and.to.equal(data.description);
            });

            it('Should have the same terms as data', function() {
                expect(musa.terms).to.be.a('string').and.to.equal(data.terms);
            });

            it('Should have the same about as data', function() {
               expect(musa.about).to.be.a('string').and.to.equal(data.about);
            });

            it('Should not allow for a null image', function() {
               expect(musa.image).to.not.be.a('null');
            });
        });

        /**
         * Test for failing conditions
         */
        //describe('Failure', function(){
        //
        //});
    });
});