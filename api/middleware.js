/**
 * Created by cesarcruz on 3/17/15.
 */

var database = require('../models');

//TODO: Take models and return a middleware function that adds models to ctx

/**
 * Generate a middleware functions
 */
module.exports = {
    loadModel : loadModel,
    authentication : authenticate
}

/**
 * Load models into the context object
 * @returns {Function}
 */
function loadModel() {

    return function* (next) {
        this.models = database.sequelize.models;
        yield next;
    }
}

/**
 * Add authentication middleware to context
 */
function *authenticate() {
    //TODO: Fill
}



//Controllers will eventually need middleware like authenticating a user, access to the models

