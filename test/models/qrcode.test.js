/**
 * Created by cesarcruz on 3/20/15.
 */

var Model = require('../../models'),
    expect = require('chai').expect,
    qrcodeModel,
    qrcode,
    data;

describe('QRCode', function() {

    before(function(){
        data = {
            size : '300x300',
            text : 'Chequea la colección de Francisco Pirulo',
            url : 'https://github.com/sezalcru',
            image : 'el enlace a una imagen'
        }
        qrcodeModel = Model.sequelize.model('QRCode');
    });

    describe('Define', function() {

        it('should create an QRCode  model instance', function() {
            expect(qrcodeModel).not.to.be.undefined;
        });
    });

    before(function(){

        qrcode = qrcodeModel.build(data);
    });

    describe('Build', function() {

        it('should create an instance of qrcode', function() {
            expect(qrcode).not.to.be.undefined;
        });

        it('should have a size attribute', function(){
            expect(qrcode.size).to.be.a('string').and.be.equal(data.size);
        });

        it('should have a text attribute', function() {
            expect(qrcode.text).to.be.a('string').and.be.equal(data.text);
        });

        it('should have a url attribute', function() {
            expect(qrcode.url).to.be.a('string').and.be.equal(data.url);
        });

        it('should have a image attribute', function() {
            expect(qrcode.image).to.be.a('string').and.be.equal(data.image);
        });

    });
});