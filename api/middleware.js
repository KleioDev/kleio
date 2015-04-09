/**
 * Created by cesarcruz on 3/17/15.
 */

var database = require('../models');

/**
 * Generate middleware functions
 */
module.exports = {
    loadModel : loadModel,
    authentication : authenticate,
    adminAuth : adminAuth
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

    var user = this.session.user;

    if(!user){
        //There's no user in session, blow up.
        this.throw('Unauthorized', 401);
    }

    try {
        this.state.user = this.models['User'].find({ where : { id : user.id } });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    yield next;

}

/**
 * Check ctx.user for an existing JWT Payload
 * @param next
 */
function *adminAuth(next){

    if(this.user){
        yield next;
    } else {
        this.throw('Unauthorized', 401);
    }
}


