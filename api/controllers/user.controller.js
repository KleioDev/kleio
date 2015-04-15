/**
 * Created by cesarcruz on 3/31/15.
 */


var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')(),
    rq = require('co-request'),
    jwt = require('koa-jwt');

/**
 * Handle requests related to Users
 * @returns {*}
 */
module.exports = function(){

    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth,
        auth = middleware.authentication,
        userController = new Router()

        .get('/leaderboard', loadModels, auth, leaderboard)
        .get('/user', loadModels, adminAuth, index)
        .get('/user/:id', loadModels, auth, show)
        .put('/user/:id', koaBody, loadModels, adminAuth, edit)
        .delete('/user/:id', loadModels, adminAuth, destroy)
        .post('/user', koaBody, loadModels, create);

    return userController.routes();

}

/**
 * Get a list of User instances
 * Query Parameters: limit and offset
 */
function *index(){
    var users,
        offset = this.query.offset,
        limit = this.query.limit;

    if(!offset){
        offset = 0;
    }

    //Default limit is 25
    if(!limit){
        limit = 25;
    }

    try {
        users = yield this.models['User'].findAll({
            offset : offset,
            limit : limit
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!users || users.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { users : users };
}

/**
 * Get an instance of User
 * Parameter: id --> User id
 */
function *show(){
    var user,
        id = this.params.id;

    try {
        user = yield this.models['User'].find({
            where : {
                id : id
            }
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!user) {
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = user;
}

/**
 * Udpate an instance of User
 */
function *edit(){
    var user = this.request.body.fields
        User = this.models['User'],
        result,
        id = this.params.id;

    if(!user){
        this.throw('Bad Request', 400);
    }

    try {
        result = yield this.sequelize.transaction( function(t) {
            return User.update(user, { where : { id : id }}, { transaction : t});
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result){
        this.throw('Not Found', 404);
    }

    this.status = 200;
}

/**
 * Destroy an instance of User
 */
function *destroy(){
    var id = this.params.id,
        User = this.models['User'],
        result;
    try {
        result = yield this.sequelize.transaction( function (t) {
            return User.destroy({ where : { id : id }}, { transaction : t});
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) {
        this.throw('Not Found', 404);
    }

    this.status = 200;
}

/**
 * Get a list of User scores, limited to 25 at a time
 * Query Parameter : page -> The page number that wants to fetche
 */
function *leaderboard(){
    var leaderboard,
        offset = this.request.query.offset
        limit = this.query.limit;

    if(!offset || offset < 1){
        offset = 0;
    }

    if(!limit){
        limit = 25;
    }

    try {
        leaderboard = yield this.models['User'].findAll({
            order : '"points" DESC',
            limit : limit,
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
    var body = this.request.body.fields,
        appId = process.env.FACEBOOK_APP_ID,
        appSecret = process.env.FACEBOOK_APP_SECRET,
        user, fbuser;


    if(!body) {
        this.throw('Bad Request', 400);
    }

    var response = yield rq({
        uri: "https://graph.facebook.com/v2.3/" + body.userID + "?access_token=" + body.accessToken + "&client_id=" + appId + "&client_secret=" + appSecret,
        method: 'GET',
        json: true
    });

    if(response.statusCode == 200){
        var user = {
            email : response.body.email,
            firstName : response.body.first_name,
            lastName : response.body.last_name,
            gender : response.body.gender,
            facebook_id : response.body.id,
            accessToken : body.accessToken
        }

        try {
            fbuser = yield this.models['User'].create(user);
        } catch(err) {
            this.throw(err.message, err.status || 500);
        }
    } else {
        this.throw('Bad Request', 400);
    }

    var token = jwt.sign({id : fbuser.id, type : 'user'}, 'some-secret', { expiresInMinutes: 60 * 24 * 60});

    this.status = 200;

    this.body = token;

}


