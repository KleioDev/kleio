/**
 * Created by cesarcruz on 3/31/15.
 */


var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')(),
    rq = require('co-request'),
    utils = require('../utilities');

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
        .put('/leaderboard', loadModels, reset)
        .get('/user', loadModels, adminAuth, index)
        .get('/user/:id', loadModels, auth, show)
        .put('/user/:id', koaBody, loadModels, adminAuth, edit)
        .delete('/user/:id', loadModels, adminAuth, destroy)
        .post('/user', koaBody, loadModels, create);

    return userController.routes();

}

/**
 * Get a list of User instances
 * Query parameters: page, per_page, first_name, email
 */
function *index(){
    var users,
        offset = this.query.offset,
        limit = this.query.limit,
        first_name = this.query.first_name,
        email = this.query.email,
        where = {};

    if(!offset) offset = 0;

    if(!limit) limit = 25;

    if(first_name) where.first_name  = first_name;

    if(email) where.email = email;

    try {
        users = yield this.models['User'].findAll({
            offset : offset,
            limit : limit,
            where : where
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!users || users.length < 1) this.throw('Not Found', 404);

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

    if(!user) this.throw('Not Found', 404);

    this.status = 200;

    this.body = user;
}

/**
 * Udpate an instance of User
 */
function *edit(){
    var payload = this.request.body.fields,
        User = this.models['User'],
        result,
        id = this.params.id;

    if(!payload) this.throw('Invalid Payload', 400);

    try {
        result = yield this.sequelize.transaction( function(t) {
            return User.update(payload, { where : { id : id }, transaction : t});
        });
    } catch(err) {
        if(typeof err ==='ValidationError'){
            this.throw('Invalid Payload', 400);
        } else {
            this.throw(err.message, err.status || 500);
        }
    }

    if(!result) this.throw('Not Found', 404);

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
            return User.destroy({ where : { id : id }, transaction : t});
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) this.throw('Not Found', 404);

    this.status = 200;
}

/**
 * Get a list of User scores, limited to 25 at a time
 * Query Parameter : page, per_page
 */
function *leaderboard(){
    var leaderboard,
        offset = this.request.query.page,
        limit = this.query.per_page;

    if(!offset) offset = 0;

    if(!limit) limit = 25;

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

    if(!leaderboard || leaderboard < 1) this.throw('Not Found', 404);

    this.status = 200;

    this.body = { leaderboard : leaderboard};
}

/**
 * Create a User instance
 */
function *create() {
    var payload = this.request.body.fields,
        fbuser, existingUser, token, response,
        User = this.models['User'];


    if(!body) this.throw('Invalid Payload', 400);


    try {
        existingUser = yield this.models['User'].find({
            where : { facebook_id : payload.userID}
        });
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!existingUser){

        var uri = utils.fbCall({
            route : payload.userID,
            accessToken : payload.accessToken
        });

        try {
            response = yield rq({
                uri: uri,
                method: 'GET',
                json: true
            });
        } catch(err){
            this.throw(err.message, err.status || 500);
        }

        if(response.statusCode !== 200 || !response.body.email){
            this.throw('Internal Server Error', 500);
        }

        var user = {
            email : response.body.email,
            firstName : response.body.first_name,
            lastName : response.body.last_name,
            gender : response.body.gender,
            facebook_id : response.body.id,
            accessToken : body.accessToken
        }

        try {
            fbuser = yield this.sequelize.transaction( function (t) {
                return User.create(user, { transaction : t});
            });
        } catch(err) {
            if(typeof err ==='ValidationError'){
                this.throw('Invalid Payload', 400);
            } else {
                this.throw(err.message, err.status || 500);
            }
        }


    }

    token = utils.generateToken(existingUser || fbuser);

    this.status = 201;

    this.body = token;

}

/**
 * Reset all User points to 0
 */
function *reset(){

    var User = this.models['User'];

    try{
        yield this.sequelize.transaction( function (t) {
            return User.update({ points : 0}, {where : {}, transaction : t});
        });
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    this.status = 200;
}

