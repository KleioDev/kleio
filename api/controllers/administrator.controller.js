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
        .delete('/administrator/:id', loadModels, adminAuth, destroy)
        .post('/authenticate', koaBody, loadModels, login);

    return administratorController.routes();
}

/**
 * Get a list of administrators for the Museum
 * Parameters: {
 *  limit : amount of administrators to fetch in a single try.
 *  page : the number of the page to fetch
 *  }
 */
function *index(){
    var offset = this.request.query.page,
        limit = this.request.query.limit,
        administrators;

    if(!offset) { //Set default offset
        offset = 0;
    }

    if(!limit) { //Set default limit
        limit = 10
    }

    try {
        administrators = yield this.models['Administrator'].findAll({
            limit : limit,
            offset : offset,
            attributes : ['id', 'firstName', 'lastName', 'email', 'phone']
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
    var administrator = this.request.body.fields,
        id = this.params.id,
        result,
        Administrator = this.models['Administrator'];

        //TODO: Add transaction to this.

        if(!administrator){
            this.throw('Bad Request', 400);
        }

        if(administrator.password){
            //Hash password before updating
            var salt = bcrypt.genSaltSync(10);

            var hash = bcrypt.hashSync(administrator.password, salt);

            administrator.password = hash;
        }

        try {
            result = yield this.sequelize.transaction(function(t) {
                return Administrator.update(administrator, {
                    where : {
                        id : id
                    }
                }, {transaction : t})
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
 * Create an Administrator Instance
 * Payload: Name, email, phone and a password.
 */
function *create(){
    var administrator = this.request.body.fields,
        Administrator = this.models['Administrator'];

    if(!administrator){
        this.throw('Bad Request', 400);
    }

    //TODO: Make async later
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(administrator.password, salt);

    administrator.password = hash;

    try {
        yield this.sequelize.transaction(function(t){
            return Administrator.create(administrator, { transaction : t});
        })
    } catch(err) {
        if(typeof err ==='ValidationError'){
            this.throw('Invalid Parameters', 400);
        } else {
            this.throw(err.message, err.status || 500);
        }
    }

    this.status = 200;
}

/**
 * Delete an instance of Administrator
 */
function *destroy() {
    var id = this.params.id,
        Administrator = this.models['Administrator'],
        result;

    //TODO: add deleteAt timestamps, don't actually delete the instances

    try {
        result = yield this.sequelize.transaction(function(t) {
            return Administrator.destroy({
                where : {
                    id : id
                }
            }, {transaction : t})
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) {
        this.throw('Not Found', 404);
    }

    this.status = 200;
}

function *login(){
    var payload = this.request.body.fields,
        admin;

    if(!payload) {
        this.throw('Bad Request', 400);
    }

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
        this.throw('Unauthorized', 401);
    }

    //Success!!
    var token = jwt.sign({email : admin.email, name : admin.firstName +' '+ admin.lastName}, 'some-secret', { expiresInMinutes: 60 * 24});

    this.body = token;

    this.status = 200;
}