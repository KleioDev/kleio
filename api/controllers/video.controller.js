/**
 * Created by cesarcruz on 3/31/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

/**
 * Handle requests related to Videos
 * @returns {*}
 */
module.exports = function(){

    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth,
        videoController = new Router()

        .get('/artifact/video/:id', loadModels, index)
        .get('/video/:id', loadModels, show)
        .post('/video', koaBody, loadModels, adminAuth, create)
        .put('/video/:id', koaBody, loadModels, adminAuth, edit)
        .delete('/video/:id', loadModels, adminAuth, destroy);

    return videoController.routes();
}

/**
 * Get a list of video instances, limited to 25 at a time
 */
function *index(){
    var videos,
        id = parseInt(this.params.id);

    if(isNaN(id)){
        this.throw('Invalid Parameters', 400);
    }

    try {
        videos = yield this.sequelize.query('select * from "Videos" where "id" in (select "VideoId" from "ArtifactVideos" where "ArtifactId" = '+ id +');', {type: this.sequelize.QueryTypes.SELECT})
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!videos || videos.length < 1) this.throw('Not Found', 404);

    this.status = 200;

    this.body = { videos : videos};
}

/**
 * Get a Video instance
 * Parameter: id -> VideoId
 */
function *show(){
    var video,
        id = this.params.id;

    try {
        video = yield this.models['Video'].find({
            where : {
                id : id
            }
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!video) this.throw('Not Found', 404);

    this.status = 200;

    this.body = video;
}

/**
 * Create an instance of Video
 * Payload: title, description, link, ArtifactId
 */
function *create(){
    var payload = this.request.body.fields,
        Video = this.models['Video'],
        ArtifactVideo = this.models['ArtifactVideo'],
        videoId;

    if(!payload) this.throw('Invalid Payload', 400);

    try {
        yield this.sequelize.transaction(function(t) {
            return Video.create(payload, {transaction : t}).then(function(video){
                videoId = video.id;
            });
        });

        yield this.sequelize.transaction(function(t) {
            return ArtifactVideo.create({
                VideoId : videoId,
                ArtifactId : payload.ArtifactId
            }, {transaction : t});
        });

    } catch (err){
        if(typeof err ==='ValidationError'){
            this.throw('Invalid Payload', 400);
        } else {
            this.throw(err.message, err.status || 500);
        }
    }

    this.status = 201;
}

/**
 * Update an instance of Video
 * Payload: title, description, link, ArtifactId
 * Note: Only attributes included in the Payload will be updated.
 */
function *edit(){
    var payload = this.request.body.fields,
        id = this.params.id,
        result,
        Video = this.models['Video'];

    if(!payload) this.throw('Invalid Payload', 400);

    try {
        result = yield this.sequelize.transaction(function (t){
            return Video.update(payload, {
                where : {
                    id  : id
                }
            }, {transaction : t});
        });
    } catch(err) {
        this.throw(err.message. err.status || 500);
    }

    if(!result) this.throw('Not Found', 404);

    this.status = 200;
}

/**
 * Destroy an instance of Archive
 * Parameter: id --> Archive Id
 */
function *destroy() {
    var id = this.params.id,
        Video = this.models['Video'],
        ArtifactVideo = this.models['ArtifactVideos'],
        result;

    try {
        result = yield this.sequelize.transaction(function(t) {
            return ArtifactVideo.destroy({ where : { VideoId : id}}, { transaction : t})
                .then( function() {
                    return Video.destroy({ where : { id : id}}, { transaction : t});
                })
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    if (!result) this.throw('Not Found', 404);

    this.status = 200;
}
