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
    var loadModels = middleware.loadModel();

    var newsController = new Router()

        .get('/news', loadModels, index)
        .get('/news/:id', loadModels, show)
        .post('/news', koaBody, loadModels, create)
        .put('/news/:id', koaBody, loadModels, edit)
        .delete('/news/:id', loadModels, destroy);

    return newsController.routes();
}

/**
 * Get a list of all Museum News, limited to 25 at a given time.
 * Query Parameter : page -> The page number that wants to fetched
 */
function *index() {
    var news,
        offset = this.query.page;

    if(!offset || offset < 1){
        offset = 0;
    }

    try {
        news = yield this.models['News'].findAll({
            order : '"createdAt" DESC',
            limit : 10,
            attributes : ['id', 'title', 'image', 'description'],
            offset : offset
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!news || news.length < 1){
        this.throw('Not Found', 404);
    }

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

    if(!id || id < 1){
        this.throw('Bad Request', 400);
    }

    try{
        news = yield this.models['News'].find({
            where : { id : id}
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if(!news) {
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = news;

}

/**
 * Create an instance of News
 * Payload: title, description, image, Administrator Id
 */
function *create(){
    var news = this.request.body.fields,
    result,
    News = this.models['News'];

    if(!news){
        this.throw('Bad Request', 400);
    }

    try {
        result = this.sequelize.transaction(function(t) {
            return News.create(news, {transaction : t});
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
 * Update an instance of News
 * Parameter: id --> News Id
 * Payload: title, description, image, Administrator Id
 * Note: Only the parameters that are included in the payload will be updated, the rest will remain the same
 */
function *edit(){
    var news = this.request.body.fields,
    result,
    id = this.params.id,
    News = this.models['News'];

    if(!news) {
        this.throw('Bad Request', 400);
    }

    try {
        result = yield this.sequelize.transaction(function (t) {
            return News.update(news, {
                where : {
                    id : id
                }
            }, {transaction : t});
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
                }
            });
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) {
        this.throw('Not Found', 404);
    }

    this.status = 200;
}

