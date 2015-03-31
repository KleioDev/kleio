/**
 * Created by cesarcruz on 3/31/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router');

module.exports = function(){

    var loadModels = middleware.loadModel(),
        videoController = new Router()

        .get('/artifact/video/:id', loadModels, index)
        .get('/video/:id', loadModels, show);

    return videoController.routes();
}

function *index(){
    var videos,
        id = this.params.id;

    if(!id || id < 1){
        this.throw('Bad Request', 400);
    }

    try {
        videos = yield this.models['Artifact'];
    } catch(err){
        console.log(err);
        this.throw(err.message, err.status || 500);
    }

    if(!videos || videos.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { videos : videos};
}

function *show(){

}