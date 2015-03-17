/**
 * Created by cesarcruz on 3/17/15.
 */

var database = require('../models');

//TODO: Take models and return a middleware function that adds models to ctx

module.exports = function(tableName) {


    var modelName = database.sequelize.models[tableName]


    return function *(next) {
        this.model = modelName;
        yield next;
    }

}