/**
 * Created by cesarcruz on 3/17/15.
 */

var database = require('../models');

/**
 * Generate middleware functions
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
        this.sequelize = database.sequelize;
        yield next;
    }
}

/**
 * Add authentication middleware to context
 */
function *authenticate(next) {
    //TODO: Fill

    var id;

    try {
        id = this.session.user.id;
    } catch(err) {
        this.throw('Unauthorized User', 401);
    }

    this.state.user = this.models['User'].find({ where : { id : id } });

    yield next;

}


