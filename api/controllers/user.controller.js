/**
 * Created by cesarcruz on 3/31/15.
 */


var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')(),
    rq = require('co-request');

/**
 * Handle requests related to Users
 * @returns {*}
 */
module.exports = function(){

    var loadModels = middleware.loadModel()
        auth = middleware.authentication,
        userController = new Router()

        .get('/leaderboard', loadModels, auth, leaderboard)
        .post('/user', koaBody, loadModels, create);

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
    var body = this.request.body;

    //TODO: Have a file that programatically adds these to files

    appId = process.env.FACEBOOK_APP_ID;

    appSecret = process.env.FACEBOOK_APP_SECRET;



    if(!body) {
        this.throw('Bad Request: No Body', 400);
    }

    var accessToken = body.fields.accessToken;

    var userId = body.fields.userId;

    var longAccessTokenUrl = "/oauth/access_token?grant_type=fb_exchange_token&client_id=" + appId + "&client_secret=" + appSecret+ "&fb_exchange_token=" + accessToken;

    var userProfileUrl = "https://graph.facebook.com/v2.3/" + userId;

    var longAccessToke = yield rq(url);

    var userCredentials = yield rq(userId);

    try {
        var user = yield this.models.User.create(userCredentials);
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!user) {
        this.throw('Internal Server Error', 500);
    }

    this.status = 200;

    this.body = 'OK';



}


