/**
 * Created by cesarcruz on 4/5/15.
 */


var expect = require('chai').expect,
    coMocha = require('co-mocha'),
    Models = require('../../models').sequelize,
    data,
    beaconModel,
    beacon;

describe('Beacon', function(){

    before(function(){
        data = {
            code : 'This is supposed to be a beacon id'
        }
        beaconModel = Models.model('Beacon');

    });

    describe('Define', function() {
        it('should create an instance of beacon model', function(){
            expect(beaconModel).to.not.be.undefined;
        });
    });

    before(function(){
        beacon = beaconModel.build(data);
    });

    describe('Build', function(){
        it('Should build an instance of Beacon', function(){
            expect(beacon).not.to.be.undefined;
        });

        it('Should have the same attributes as the data object', function(){
            expect(beacon.code).to.be.a('string').to.equal(data.code);
        });
    });
});
