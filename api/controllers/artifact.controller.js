/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

/**
 * Handle request related to Artifacts
 * @returns {*}
 */
module.exports = function(){
    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var artifactController = new Router()
        .get('/artifact', loadModels, index)
        .get('/artifact/:id', loadModels, show)
        .post('/artifact', koaBody, loadModels, adminAuth, create)
        .put('/artifact/:id', koaBody, loadModels, adminAuth, edit)
        .delete('/artifact/:id', loadModels, adminAuth, destroy);

    return artifactController.routes();
}

/**
 * Get a list of all artifacts
 * The list will be limited to 10 at a time.
 * Query Parameters: Offset, indicates page that is being requests, if omitted will default
 */
function *index(){
    var artifacts,
        offset = this.request.query.offset,
        limit = this.request.query.limit,
        artist = this.query.artist,
        where = {};

    if(!offset || offset < 1){
        offset = 0;
    }

    if(!limit || limit < 1){
        limit = 25;
    }

    if(this.query.description){
        where.description = description;
    }

    if(this.query.title){
        where.title = this.query.title;
    }

    if(this.query.artist){
        try {
            artist = yield this.models['Artist'].find({
                where : { name : this.query.artist},
                limit : 1
            });
        } catch(err){
            this.throw(err.message, err.status || 500);
        }

        if(!artist){
            this.throw('Artist Not Found', 404)
        }

        where.ArtistId = artist.id;
    }


    try {
        artifacts = yield this.models['Artifact'].findAll({
            order : '"createdAt" DESC',
            limit : limit,
            offset : offset,
            where : where
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

/**
 * Create an instance of Artifacts
 * Payload:
 */
function *create(){
    var artifact = this.request.body.fields,
        Artifact = this.models['Artifact'],
        result;

    if(!artifact){
        this.throw('Bad Request', 400);
    }

    try {
        result = yield this.sequelize.transaction( function (t) {
            return Artifact.create(artifact, {transaction : t});
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
 * Update an instance of Artifact
 * Payload:
 * Note: Will only update the available payload attributes
 */
function *edit(){
    var artifact = this.request.body.fields,
        Artifact = this.models['Artifact'],
        id = this.params.id,
        result;

    if(!artifact){
        this.throw('Bad Request', 400);
    }

    try {
        result = yield this.sequelize.transaction( function (t) {
            return Artifact.update(artifact, { where : { id : id } }, {transaction : t});
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
 * Destroy an instance of Artifact
 * Parameter: id --> Artifact Id
 */
function *destroy(){
    var id = this.params.id,
        Artifact = this.models['Artifact'],
        result;

    try {
        result = yield this.sequelize.transaction( function (t) {
            return Artifact.destroy({ where : { id : id}}, { transaction : t});
        })
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) {
        this.throw('Not Found', 404);
    }

    this.status = 200;
}

