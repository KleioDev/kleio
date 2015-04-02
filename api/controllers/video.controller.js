/**
 * Created by cesarcruz on 3/31/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router');

/**
 * Handle requests related to Videos
 * @returns {*}
 */
module.exports = function(){

    var loadModels = middleware.loadModel(),
        videoController = new Router()

        .get('/artifact/video/:id', loadModels, index)
        .get('/video/:id', loadModels, show);

    return videoController.routes();
}

/**
 * Get a list of video instances, limited to 25 at a time
 * Query Parameter : page -> The page number that wants to fetched
 */
function *index(){
    var videos,
        id = this.params.id;

    if(!id || parseInt(id) < 1){
        this.throw('Bad Request', 400);
    }

    try {
        //TODO: Escape Parameters in this query
        videos = yield this.sequelize.query('select * from "Videos" where "id" in (select "VideoId" from "ArtifactVideos" where "ArtifactId" = '+ id +');', {type: this.sequelize.QueryTypes.SELECT})
    } catch(err) {
        console.log(err);
        this.throw(err.message, err.status || 500);
    }

    if(!videos || videos.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { videos : videos};
}

/**
 * Get a Video instance
 * Parameter: id -> VideoId
 */
function *show(){
    var video,
        id;

    try {
        id = parseInt(this.params.id);
    } catch(err) {
        this.throw('Invalid Parameters', 400);
    }

    try {
        video = yield this.models['Video'].find({
            where : {
                id : id
            }
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!video){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = video;
}