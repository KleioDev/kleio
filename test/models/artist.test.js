/**
 * Created by cesarcruz on 3/19/15.
 */

var Model = require('../../models'),
    expect = require('chai').expect,
    artistModel,
    artist,
    data;

describe('Artist', function() {

    before(function(){
       data = {
           name : 'Franscisco Pirulo',
           biography : 'Franscisco Pirulo es natural del pueblo de Guanajibo y toca las maracas',
           birthDay : '1980'
       }
        artistModel = Model.sequelize.model('Artist');
    });

    describe('Define', function() {

        it('should create an article model instance', function() {
           expect(artistModel).not.to.be.undefined;
        });
    });

    before(function(){

        artist = artistModel.build(data);
    });

    describe('Build', function() {

        it('should create an instance of artist', function() {
           expect(artist).not.to.be.undefined;
        });

        it('should have a name attribute', function(){
          expect(artist.name).to.be.a('string').and.be.equal(data.name);
        });

        it('should have a biography attribute', function() {
           expect(artist.biography).to.be.a('string').and.be.equal(data.biography);
        });

        it('should have a birthday attribute', function() {
           expect(artist.birthDay).to.be.a('string').and.be.equal(data.birthDay);
        });
    });
});