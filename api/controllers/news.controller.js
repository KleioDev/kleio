/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router');

module.exports = function(){
    var loadModels = middleware.loadModel();

    var newsController = new Router()

        .get('/news', loadModels, index)
        .get('/news/:id', loadModels, show);

    return newsController.routes();
}

function *index() {
    var news,
        offset = this.query.page;

    if(!offset || offset < 2){
        offset = 1
    }

    try {
        news = yield this.models['News'].findAll({
            //order : '"createdAt" DESC',
            //limit : 10,
            //attributes : ['id', 'title', 'image', 'description'],
            //offset : offset
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