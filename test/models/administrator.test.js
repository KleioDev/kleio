/**
 * Created by cesarcruz on 3/19/15.
 */


var expect = require('chai').expect,
    Model = require('../../models'),
    data,
    administratorModel,
    administrator;

describe('Administrator', function() {


    before(function() {
       data = {
           email : 'cesar.cruz5@upr.edu',
           firstName : 'César',
           lastName : 'Cruz',
           password : ''
       }
        administratorModel = Model.sequelize.model('Administrator');
    });

    describe('Define', function() {
        it('should define an instance of Administrator model',function() {
            expect(administratorModel).not.to.be.undefined;
        });
    });

    before(function() {
        administrator = administratorModel.build(data);
    });

    describe('Build', function() {

        it('should contruct an administrator insatnce', function() {
           expect(administrator).not.to.be.undefined;
        });

        it('should have an email attribute', function() {
           expect(administrator.email).to.be.a('string').and.be.equal(data.email);
        });

        it('should have a firstName attribute', function() {
            expect(administrator.firstName).to.be.a('string').and.be.equal(data.firstName);
        });

        it('should have a lastName attribute', function() {
            expect(administrator.lastName).to.be.a('string').and.be.equal(data.lastName);
        })

        it('should have a password attribute', function() {
           expect(administrator.password).to.be.a('string').and.be.equal(data.password);
        });
    });
});