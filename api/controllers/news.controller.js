/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

/**
 * Handle requests related to Museum News
 * @returns {*}
 */
module.exports = function(){
    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var newsController = new Router()

        .get('/news', loadModels, index)
        .get('/news/:id', loadModels, show)
        .post('/news', koaBody, loadModels, adminAuth, create)
        .put('/news/:id', koaBody, loadModels, adminAuth, edit)
        .delete('/news/:id', loadModels, adminAuth, destroy);

    return newsController.routes();
}

/**
 * Get a list of all Museum News, limited to 25 at a given time.
 * Query parameters : page, per_page, title
 */
function *index() {
    var news,
        offset = this.query.page,
        limit = this.query.per_page,
        title = this.query.title,
        where = {};

    if(!offset) offset = 0;


    if(!limit) limit = 25

    if(title) where.title = title;

    try {
        news = yield this.models['News'].findAll({
            order : '"createdAt" DESC',
            limit : limit,
            offset : offset * limit,
            where : where
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!news || news.length < 1) this.throw('Not Found', 404);

    this.status = 200;

    this.body = { news : news};

}

/**
 * Get a News Instance, given an Id
 * Parameter : id -> NewsId
 */
function *show() {

    var news,
        id = this.params.id;

    try{
        news = yield this.models['News'].find({
            where : { id : id}
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!news) this.throw('Not Found', 404);

    this.status = 200;

    this.body = news;

}

/**
 * Create an instance of News
 * Payload: title, description, image, AdministratorId
 */
function *create(){
    var payload = this.request.body.fields,
        result,
        News = this.models['News'];

    if(!payload) this.throw('Invalid Payload', 400);

    try {
        result = this.sequelize.transaction(function(t) {
            return News.create(payload, {transaction : t});
        });
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
 * Update an instance of News
 * Parameter: id --> News Id
 * Payload: title, description, image, Administrator Id
 */
function *edit(){
    var payload = this.request.body.fields,
        result,
        id = this.params.id,
        News = this.models['News'];

    if(!payload) this.throw('Invalid Payload', 400);

    try {
        result = yield this.sequelize.transaction(function (t) {
            return News.update(payload, {
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
 * Destroy an instance of News
 * Parameter: id --> News Id
 */
function *destroy() {
    var id = this.params.id,
        News = this.models['News'],
        result;

    try {
        result = yield this.sequelize.transaction(function (t) {
            return News.destroy({
                where : {
                    id : id
                },
                transaction : t
            });
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) this.throw('Not Found', 404);

    this.status = 200;
}

