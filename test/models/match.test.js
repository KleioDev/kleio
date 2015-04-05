/**
 * Created by cesarcruz on 3/20/15.
 */

var Model = require('../../models'),
    expect = require('chai').expect,
    matchModel,
    match,
    data;

describe('Match', function() {

    before(function(){
        data = {
            UserId : 2,
            ClueId : 1,
            qrcode : 'zsrgmseinrg'
        }
        matchModel = Model.sequelize.model('Match');
    });

    describe('Define', function() {

        it('should create an match model instance', function() {
            expect(matchModel).not.to.be.undefined;
        });
    });

    before(function(){

        match = matchModel.build(data);
    });

    describe('Build', function() {

        it('should create an instance of match', function() {
            expect(match).not.to.be.undefined;
        });

        it('should have a userId attribute', function(){
            expect(match.UserId).to.be.a('number').and.be.equal(data.UserId);
        });

        it('should have a ObjectId attribute', function() {
            expect(match.ClueId).to.be.a('number').and.be.equal(data.ClueId);
        });

    });
});