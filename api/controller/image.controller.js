/**
 * Created by cesarcruz on 3/31/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router');

module.exports = function(){

    var loadModels = middleware.loadModel();

    var imageController = new Router()
        .get('/artifact/image/:id', loadModels, index)
        .get('/image/:id', loadModels, show);

    return imageController.routes();
}

function *index() {
    var images,
        id = parseInt(this.params.id);

    if(!id || id === NaN){
        this.throw('Invalid Parameters', 400);
    }

    try {
        images = yield this.sequelize.query('select * from "Images" where "id" in (select id from "ArtifactImages" where "ArtifactId" = '+ id +');', {type: this.sequelize.QueryTypes.SELECT});
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!images || images.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { images : images};
}

function *show() {
    var image,
        id = parseInt(this.params.id);

    if(!id || id === NaN){
        this.throw('Invalid Parameters', 400);
    }

    try {
        image = yield this.models['Image'].find({
            where : {
                id : id
            }
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!image){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = image;
}