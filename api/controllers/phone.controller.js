/**
 * Created by cesarcruz on 4/28/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

/**
 * Handle requests related to phones
 * @returns {*}
 */
module.exports = function(){

    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var phoneController = new Router()

        .get('/phones', loadModels, index)
        .get('/phones/:id', loadModels, show)
        .post('/phones', koaBody, loadModels, create)
        .put('/phones/:id', koaBody, loadModels, adminAuth, edit)
        .delete('/phones/:id', loadModels, destroy);


    return phoneController.routes();
}



/**
 * Get a list of Phones, limited to 25 at a given time.
 * Query Parameters: page, per_page, os
 */
function *index() {
    var phones,
        offset = this.query.page,
        limit = this.query.per_page,
        os = this.query.os,
        where = {};

    if(!offset) offset = 0;

    if(!limit) limit = 25;

    if(os) where.os = os;

    try {

        phones = yield this.models['Phone'].findAll({
            limit : limit,
            offset : offset * limit,
            where : where
        });
    } catch (err) {
        console.log(err);
        this.throw(err.message, err.status || 500);
    }

    if(!phones || phones.length < 1) this.throw('Not Found', 404);

    this.status = 200;

    this.body = { phones : phones};
}

/**
 * Get a Phone
 * Parameter: id -> Phone id
 */
function *show() {
    var phone,
        id = this.params.id;

    try {
        phone = yield this.models['Phone'].find({
            where : { id : id}
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!phone) this.throw('Not Found', 404);

    this.status = 200;

    this.body = phone;
}

/**
 * Create an instance of Phone
 * Payload: token, os
 */
function *create(){
    var payload = this.request.body.fields,
        result,
        Phone = this.models['Phone'];

    if(!payload || !payload.token) this.throw('Invalid Payload', 400);

    try {

        result = yield Phone.find({ where : { token : payload.token}});

        if(!result){
            result = this.sequelize.transaction(function(t) {
                return Phone.create(payload, {transaction : t});
            });
        }
    } catch(err) {
        if(typeof err ==='ValidationError'){
            this.throw('Invalid Payload', 400);
        } else {
            this.throw(err.message, err.status || 500);
        }
    }

    if(!result) this.throw('Not Found', 404);

    this.status = 201;
}

/**
 * Update an Phone instance
 * Parameter: id --> PhoneId
 * Payload: os, token
 */
function *edit(){
    var payload = this.request.body.fields,
        result,
        id = this.params.id,
        Phone = this.models['Phone'];

    if(!payload) this.throw('Invalid Payload', 400);


    try {
        result = yield this.sequelize.transaction(function (t) {
            return Phone.update(payload, {
                where : {
                    id : id
                }
            }, {transaction : t});
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
 * Destroy an Phone instance
 * Parameter: id --> PhoneId
 */
function *destroy() {
    var id = this.params.id,
        Phone = this.models['Phone'],
        result;

    try {
        result = yield this.sequelize.transaction(function (t) {
            return Phone.destroy({
                where : {
                    token : id
                }
            }, { transaction : t});
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) this.throw('Not Found', 404);


    this.status = 200;
}