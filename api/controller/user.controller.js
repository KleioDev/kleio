/**
 * Created by cesarcruz on 3/31/15.
 */


var middleware = require('../middleware'),
    Router = require('koa-router');

module.exports = function(){

    var loadModels = middleware.loadModel(),
        userController = new Router()

        .get('/leaderboard', loadModels, leaderboard);

    return userController.routes();

}

function *leaderboard(){
    var leaderboard,
        offset = this.request.query.offset;

    if(!offset || offset < 1){
        offset = 1;
    }

    try {
        leaderboard = yield this.models['User'].findAll({
            order : '"points" DESC',
            limit : 25,
            attributes : ['firstName', 'lastName', 'points']
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