/**
 * Created by cesarcruz on 3/31/15.
 */


var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

/**
 * Handle requests related to Users
 * @returns {*}
 */
module.exports = function(){

    var loadModels = middleware.loadModel()
        auth = middleware.authentication,
        userController = new Router()

        .get('/leaderboard', loadModels, auth, leaderboard)
        .post('/user', auth, koaBody, loadModels, create);

    return userController.routes();

}

/**
 * Get a list of User scores, limited to 25 at a time
 * Query Parameter : page -> The page number that wants to fetche
 */
function *leaderboard(){
    var leaderboard,
        offset = this.request.query.offset;

    if(!offset || offset < 1){
        offset = 0;
    }

    try {
        leaderboard = yield this.models['User'].findAll({
            order : '"points" DESC',
            limit : 25,
            attributes : ['firstName', 'lastName', 'points'],
            offset : offset
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!leaderboard || leaderboard < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { leaderboard : leaderboard};
}

/**
 * Create a User instance
 */
function *create() {
    var user,
        data = this.request.body

        if(!data) {
            this.throw('Bad Request', 400)
        }

        try {
            user = yield this.models['User'].create(data);
        } catch(err) {
            this.throw(err.message , err.status || 500);
        }

        this.status = 200;

        this.body = 'OK';
}