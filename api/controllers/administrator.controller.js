/**
 * Created by cesarcruz on 4/7/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    bcrypt = require('bcrypt'),
    koaBody = require('koa-better-body')(),
    jwt = require('koa-jwt');

/**
 * Handle request related to Administrators
 * @returns {*}
 */
module.exports = function(){
    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var administratorController = new Router()
        .get('/administrator', loadModels, adminAuth, index)
        .get('/administrator/:id', loadModels, adminAuth, show)
        .post('/administrator', koaBody, loadModels, adminAuth, create)
        .put('/administrator/:id', koaBody, loadModels, adminAuth, edit)
        .delete('/administrator/:id', loadModels,  destroy)
        .post('/authenticate', koaBody, loadModels, login);

    return administratorController.routes();
}

/**
 * Get a list of administrators for the Museum
 * Query Parameters: page, per_page, email, first_name
 * Response: List of administrators
 */
function *index(){
    var offset = this.query.page,
        limit = this.query.per_page,
        email = this.query.email,
        firstName = this.query.first_name,
        administrators, where = {};

    if(!offset) offset = 0;

    if(!limit) limit = 25;

    if(email) where.email = email;

    if(firstName) where.firstName = firstName;

    try {
        administrators = yield this.models['Administrator'].findAll({
            limit : limit,
            offset : offset * limit,
            attributes : ['id', 'firstName', 'lastName', 'email', 'phone'],
            where : where
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!administrators || administrators.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { administrators : administrators}
}

/**
 * Get a single administrator instance
 */
function *show(){
    var id = this.params.id,
    administrator;

    try {
        administrator = yield this.models['Administrator'].find({
            where : {
                id : id
            },
            attributes : ['id', 'firstName', 'lastName', 'email', 'phone']
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!administrator) {
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = administrator;
}

/**
 * Update an instance of Administrator
 * Payload: firstName, lastName, phone, email, password
 * Note: Will only update the parameters present, no other parameter will be affected.
 */
function *edit() {
    var payload = this.request.body.fields,
        id = this.params.id,
        result,
        Administrator = this.models['Administrator'];

    if(!payload) this.throw('Invalid Payload', 400);


        if(payload.password){
            //Hash password before updating
            var salt = bcrypt.genSaltSync(10);

            var hash = bcrypt.hashSync(payload.password, salt);

            payload.password = hash;
        }

        try {
            result = yield this.sequelize.transaction(function(t) {
                return Administrator.update(payload, {
                    where : {
                        id : id
                    }
                }, {transaction : t})
            });
        } catch(err) {
            if(typeof err ==='ValidationError'){
                this.throw('Invalid Payload', 400);
            } else {
                this.throw(err.message, err.status || 500);
            }
        }

        if(!result) this.throw('Not Found', 404);


        //Success!!
        if(payload.email && this.state.user.email === payload.email){
            var token = jwt.sign({email : payload.email, type : 'admin', id : id}, process.env.APP_JWT_SECRET , { expiresInMinutes: 60 * 24});

            this.body = token;
        }


        this.status = 200;

}


/**
 * Create an Administrator Instance
 * Payload: Name, email, phone and a password.
 */
function *create(){
    var payload = this.request.body.fields,
        Administrator = this.models['Administrator'],
        result;

    if(!payload || !payload.email || !payload.password){
        this.throw('Invalid Payload', 400);
    }

    //Check that the email is not already in use before creating instance
    try {
        result = yield Administrator.find({
            where : {
                email : payload.email
            }
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(result){
        this.throw('Email already in use', 409);
    }

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(payload.password, salt);

    payload.password = hash;

    try {
        yield this.sequelize.transaction(function(t){
            return Administrator.create(payload, { transaction : t});
        })
    } catch(err) {
        if(typeof err ==='ValidationError'){
            this.throw('Invalid Payload', 400);
        } else {
            this.throw(err.message, err.status || 500);
        }
    }

    this.status = 201;
}

/**
 * Delete an instance of Administrator
 */
function *destroy() {
    var id = this.params.id,
        Administrator = this.models['Administrator'],
        Events = this.models['Event'],
        News = this.models['News'],
        result;

    try {
        result = yield this.sequelize.transaction(function(t) {
            return Events.update({
                author : null}, {
                where : {
                    author : id
                }
            }, {transaction : t}).then(function(event){
                return News.update({AdministratorId : null},
                    {where : {
                        AdministratorId: id
                    }
                }, {transaction : t}).then(function(news){
                    return Administrator.destroy({ where : {id : id}}, {transaction : t});
                });
            });
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) this.throw('Not Found', 404);

    this.status = 200;
}

/**
 * Authenticate an administrator
 */
function *login(){
    var payload = this.request.body.fields,
        admin;

    if(!payload) this.throw('Invalid Payload', 400);


    try {
        admin = yield this.models['Administrator'].find({
            where : {
                email : payload.email
            }
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!bcrypt.compareSync(payload.password, admin.password)) {
        this.throw('Unauthorized', 403);
    }

    //Success!!
    var token = jwt.sign({email : admin.email, type : 'admin', id : admin.id}, process.env.APP_JWT_SECRET , { expiresInMinutes: 60 * 24});

    this.body = token;

    this.status = 200;
}