/**
 * Created by cesarcruz on 3/31/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

module.exports = function(){

    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var archiveController = new Router()
        .get('/artifact/archive/:id', loadModels, index)
        .get('/archive/:id', loadModels, show)
        .post('/archive', koaBody, loadModels, adminAuth, create)
        .put('/archive/:id', koaBody, loadModels, adminAuth, edit)
        .delete('/archive/:id', loadModels, destroy);

    return archiveController.routes();
}

/**
 * Get a list of Archives related to an artifact
 * Parameter : id -> ArtifactId
 */
function *index() {
    var archives,
        id = parseInt(this.params.id);

    if(isNaN(id)){
        this.throw('Invalid Parameters', 400);
    }

    try {
        archives = yield this.sequelize.query('select * from "Texts" where "id" in (select "TextId" from "ArtifactTexts" where "ArtifactId" = '+id+');', {type: this.sequelize.QueryTypes.SELECT});
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!archives || archives.length < 1) this.throw('Not Found', 404);

    this.status = 200;

    this.body = { archives : archives};
}

/**
 * Get an Archive instance
 * Parameter : id -> ArchiveId
 */
function *show() {
    var archive,
        id = this.params.id;

    try {
        archive = yield this.models['Text'].find({
            where : {
                id : id
            }
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!archive) this.throw('Not Found', 404);

    this.status = 200;

    this.body = archive;
}

/**
 * Create an instance of Archives
 * Payload: title, description, link, ArtifactId
 */
function *create(){
    var payload = this.request.body.fields,
        Archive = this.models['Text'],
        ArtifactArchive = this.models['ArtifactText'],
        archiveId;

    if(!payload) this.throw('Invalid Payload', 400);


    try {
        yield this.sequelize.transaction(function(t) {
            return Archive.create(payload, {transaction : t}).then(function(archive){
                archiveId = archive.id;
            });
        });

        yield this.sequelize.transaction(function(t) {
            return ArtifactArchive.create({
                TextId : archiveId,
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

    this.status = 200;
}

/**
 * Update an instance of Archive
 * Payload: title, description, link, ArtifactId
 * Note: Only attributes included in the Payload will be updated.
 */
function *edit(){
    var payload = this.request.body.fields,
        id = this.params.id,
        result,
        Archive = this.models['Text'];

    if(!payload) this.throw('Invalid Payload', 400);

    try {
        result = yield this.sequelize.transaction(function (t){
            return Archive.update(payload, {
                where : {
                    id  : id
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
 * Destroy an instance of Archive
 *
 */
function *destroy(){
    var id = this.params.id,
        Archive = this.models['Text'],
        ArtifactArchive = this.models['ArtifactText'],
        result;

    try {
        result = yield this.sequelize.transaction(function(t) {
            return ArtifactArchive.destroy({ where : { TextId : id}}, { transaction : t})
            .then( function() {
                return Archive.destroy({ where : { id : id}}, { transaction : t});
            })
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) this.throw('Not Found', 404);

    this.status = 200;
}