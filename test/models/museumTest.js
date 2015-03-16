/**
 * Created by cesarcruz on 3/15/15.
 */

"use strict"

var expect = require('chai').expect;
var Museum = require('../../models/index').sequelize;
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
            about : 'Aqui va más información sobre el museo'
        }
        musa = museumModel.build(data);
    });

    describe('model', function(){
       it('Should be defined', function(){
           expect(museumModel).to.not.be.undefined;
       });
    });


    describe('Build', function() {

        beforeEach(function(){
          musa = museumModel.build(data);
        });

        describe('Success', function(){

            it('Should build an instance', function(){
               expect(musa).to.not.be.undefined;
            });

            it('Should have the same title as data', function(){
               expect(musa.title).to.equal(data.title);
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