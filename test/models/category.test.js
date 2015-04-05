/**
 * Created by cesarcruz on 4/5/15.
 */

var expect = require('chai').expect,
    coMocha = require('co-mocha'),
    Models = require('../../models').sequelize,
    data,
    categoryModel,
    category;

describe('Category', function(){

    before(function(){
        data = {
            category : 'Post-Modern',
            ParentCategory : null
        }
        categoryModel = Models.model('Category');

    });

    describe('Define', function() {
        it('should create an instance of category model', function(){
            expect(categoryModel).to.not.be.undefined;
        });
    });

    before(function(){
        category = categoryModel.build(data);
    });

    describe('Build', function(){
        it('Should build an instance of Category', function(){
            expect(category).not.to.be.undefined;
        });

        it('Should have the same attributes as the data object', function(){
            expect(category.category).to.be.a('string').to.equal(data.category);
        });
    });
});
