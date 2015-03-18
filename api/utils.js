/**
 * Created by cesarcruz on 3/17/15.
 */

var database = require('../models');

//TODO: Take models and return a middleware function that adds models to ctx

module.exports = function() {


    var modelNames = database.sequelize.models


    return function *(next) {
        this.models = modelNames;
        this.sequelize = database.sequelize;
        yield next;
    }

}