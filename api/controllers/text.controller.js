/**
 * Created by cesarcruz on 3/31/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router');

module.exports = function(){

    var loadModels = middleware.loadModel();

    var archiveController = new Router()
        .get('/artifact/archive/:id', loadModels, index)
        .get('/archive/:id', loadModels, show);

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

    if(!archives || archives.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { archives : archives};
}

/**
 * Get an Archive instance
 * Parameter : id -> ArchiveId
 */
function *show() {
    var archive,
        id = parseInt(this.params.id);

    if(isNaN(id)){
        this.throw('Invalid Parameters', 400);
    }

    try {
        archive = yield this.models['Text'].find({
            where : {
                id : id
            }
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!archive){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = archive;
}