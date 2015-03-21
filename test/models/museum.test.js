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
            title : 'Museo de Arte de la Universidad de Mayaguez',
            description : 'Applicación oficial del Museo de Arte de la Universidad de Mayaguez',
            terms : 'No bregues tierra, no te robes nada',
            about : 'Aqui va más información sobre el museo',
            hours_of_operation : 'LMV 8:00AM - 10:00PM',
            phone : '7878787878',
            email : 'carlos.ortega@upr.edu',
            image : 'https://scontent-mia.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/10491119_410992365710317_5423442214926463587_n.jpg?oh=d05839d44a29ba6faad2271a8289ecfb&oe=5573FB45',
            social_media_links : null,
            location : 'Here'
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
               expect(musa.title).be.a('string').and.to.equal(data.title);
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