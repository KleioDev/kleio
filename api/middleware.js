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
 * Allows facebook mobile application users and administrator users
 */
function *authenticate(next) {
    var loggedUser;

    if(!this.user){
        //There's no user in session, blow up.
        this.throw('Unauthorized', 401);
    }

    try {

        if(this.user.type === 'user'){
            loggedUser = this.models['User'].find({ where : { id : this.user.id}});
        } else {
            loggedUser = this.models['Administrator'].find({ where : { id : this.user.id}});
        }

    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!loggedUser){
        this.throw('Forbidden', 403);
    }

    this.state.user = loggedUser;

    yield next;

}

/**
 * Check ctx.user for an existing JWT Payload
 * @param next
 */
function *adminAuth(next){
    var response;

    if(this.user){

        try {
            response = yield this.models['Administrator'].find({
                where : {
                    email : this.user.email
                }
            });
        } catch(err) {
            this.throw(err.message, err.status || 500);
        }

        if(!response){
            this.throw('Forbidden', 403);
        }

        yield next;
    } else {
        this.throw('Unauthorized', 401);
    }
}


