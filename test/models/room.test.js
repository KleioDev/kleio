/**
 * Created by cesarcruz on 3/20/15.
 */

var Model = require('../../models'),
    expect = require('chai').expect,
    roomModel,
    room,
    data;

describe('Room', function() {

    before(function(){
        data = {
            identifier : 'S-123',
            description : 'El Laboratorio de Capstone',
            ibeacons : ['ibeacon1', 'ibeacon2']
        }
        roomModel = Model.sequelize.model('Room');
    });

    describe('Define', function() {

        it('should create an Room  model instance', function() {
            expect(roomModel).not.to.be.undefined;
        });
    });

    before(function(){

        room = roomModel.build(data);
    });

    describe('Build', function() {

        it('should create an instance of room', function() {
            expect(room).not.to.be.undefined;
        });

        it('should have a identifier attribute', function(){
            expect(room.identifier).to.be.a('string').and.be.equal(data.identifier);
        });

        it('should have a description attribute', function() {
            expect(room.description).to.be.a('string').and.be.equal(data.description);
        });

        it('should have a ibeacons attribute', function() {
            expect(room.ibeacons).to.be.a('array').and.be.equal(data.ibeacons);

            expect(room.ibeacons.length).be.equal(2);
        });

    });
});