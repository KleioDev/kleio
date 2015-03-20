/**
 * Created by cesarcruz on 3/20/15.
 */

var Model = require('../../models'),
    expect = require('chai').expect,
    userModel,
    user,
    data;

describe('User', function() {

    before(function(){
        data = {
            email : 'cesar.cruz5@upr.edu',
            firstName : 'Cesar',
            lastName : 'Cruz',
            gender : 'male',
            age : 23,
            points : 9001,
            banished : false
        }
        userModel = Model.sequelize.model('User');
    });

    describe('Define', function() {

        it('should create an User  model instance', function() {
            expect(userModel).not.to.be.undefined;
        });
    });

    before(function(){

        user = userModel.build(data);
    });

    describe('Build', function() {

        it('should create an instance of user', function() {
            expect(user).not.to.be.undefined;
        });

        it('should have a email attribute', function(){
            expect(user.email).to.be.a('string').and.be.equal(data.email);
        });

        it('should have a first name attribute', function() {
            expect(user.firstName).to.be.a('string').and.be.equal(data.firstName);
        });

        it('should have a last name attribute', function() {
            expect(user.lastName).to.be.a('string').and.be.equal(data.lastName);
        });

        it('should have a gender attribute', function() {
            expect(user.gender).to.be.a('string').and.be.equal(data.gender);
        });

        it('should have a age attribute', function() {
            expect(user.age).to.be.a('number').and.be.equal(data.age);
        });

        it('should have a points attribute', function() {
            expect(user.points).to.be.a('number').and.be.equal(data.points);
        });

        it('should have a banished attribute', function() {
            expect(user.banished).to.be.a('boolean').and.be.equal(data.banished);
        });
    });
});