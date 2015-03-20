/**
 * Created by cesarcruz on 3/19/15.
 */

var Model = require('../../models'),
    expect = require('chai').expect,
    categoryModel,
    category,
    data;

describe('Category', function() {

    before(function() {
       data = {
           category : 'Sports',
           parentCategory : null
       }
        categoryModel = Model.sequelize.model('Category');
    });

    describe('Define', function() {

        it('should create a instance of category model', function() {
           expect(categoryModel).not.to.be.undefined;
        });
    });

    before(function() {
       category = categoryModel.build(data);
    });

    describe('Build', function() {

        it('should build an instance of content', function() {
           expect(category).not.to.be.undefined;
        });

        it('shoudl have a parentCategory attribute', function() {
            expect(category.parentCategory).not.to.be.undefined;

            //Parent content can be null
            expect(category.parentCategory).to.be.a('null');
        });
    });
});