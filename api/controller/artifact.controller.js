/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router');

module.exports = function(){
    var loadModels = middleware.loadModel();

    var artifactController = new Router()
        .get('/artifact', loadModels, index)
        .get('/artifact/:id', loadModels, show);

    return artifactController.routes();
}

/**
 * Get a list of all artifacts, limited 10 at a time
 */
function *index(){
    var artifacts,
        offset = this.query.page;

    if(!offset || offset < 1){
        offset = 1
    }

    try {
        artifacts = yield this.models['Artifact'].findAll({
            order : '"createdAt" DESC',
            limit : 10,
            attributes : ['image', 'title', 'description', 'id']
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
 * Get a single artifact instance based on a provided id
 */
function *show(){
    var artifact,
        id = this.params.id;


    //if(typeof id !== 'number'){
    //    this.throw('Bad Request', 404);
    //}

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

