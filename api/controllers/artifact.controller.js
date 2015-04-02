/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router');

/**
 * Handle request related to Artifacts
 * @returns {*}
 */
module.exports = function(){
    var loadModels = middleware.loadModel();

    var artifactController = new Router()
        .get('/artifact', loadModels, index)
        .get('/artifact/:id', loadModels, show);

    return artifactController.routes();
}

/**
 * Get a list of all artifacts
 * The list will be limited to 10 at a time.
 * Query Parameters: Offset, indicates page that is being requests, if ommited will default
 */
function *index(){
    var artifacts,
        offset = this.query.page;

    if(!offset || offset < 1){
        offset = 0;
    }

    try {
        artifacts = yield this.models['Artifact'].findAll({
            order : '"createdAt" DESC',
            limit : 10,
            attributes : ['image', 'title', 'description', 'id'],
            offset : offset
            });
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!artifacts || artifacts.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { artifacts : artifacts};

}

/**
 * Get a single artifact instance
 * Parameter: id -> ArtifactId
 */
function *show(){
    var artifact,
        id = parseInt(this.params.id);


    if(isNaN(id)){
        this.throw('Bad Request', 404);
    }

    try {
        var Artifact = this.models['Artifact'],
            Video = this.models['Video'],
            Audible = this.models['Audible'],
            Image = this.models['Image'],
            Text = this.models['Text'];

        artifact = yield Artifact.find({
            where : {
                id : id
            },
            include : [Video, Audible, Image, Text]
        });


    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!artifact){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = artifact;
}

