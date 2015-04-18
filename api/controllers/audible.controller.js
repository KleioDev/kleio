/**
 * Created by cesarcruz on 3/31/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router')
    koaBody = require('koa-better-body')();

/**
 * Handle requests related to audible media content
 * @returns {*}
 */
module.exports = function() {
    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var audibleController = new Router()
        .get('/artifact/audible/:id', loadModels, index)
        .get('/audible/:id', loadModels, show)
        .post('/audible', koaBody, loadModels, adminAuth, create)
        .put('/audible/:id', koaBody, loadModels, adminAuth, edit)
        .delete('/audible/:id', loadModels, adminAuth, destroy);

    return audibleController.routes();
}

/**
 * Get a list of audible content related to a given Artifact
 * Parameters: id -> ArtifactId
 */
function *index() {
    var audibles,
        id = this.params.id;

    if(isNaN(id)) this.throw('Invalid Parameters', 400);


    try {
        audibles = yield this.sequelize.query('select * from "Audibles" where "id" in (select "AudibleId" from "ArtifactAudibles" where "ArtifactId" = '+ id +');', {type: this.sequelize.QueryTypes.SELECT})
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!audibles || audibles.length < 1) this.throw('Not Found', 404);


    this.status = 200;

    this.body = { audibles : audibles };
}

/**
 * Get a single Audible
 * Parameter: id -> AudibleId
 */
function *show(){
    var audible,
        id = this.params.id;


    try {
        audible = yield this.models['Audible'].find({
            where : {
                id : id
            }
        });
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!audible) this.throw('Not Found', 404);

    this.status = 200;

    this.body = audible;
}

/**
 * Create an instance of Audible content, will also add this resource to an artifact
 * Payload : title, description, link, ArtifactId
 */
function *create(){
    var payload = this.request.body.fields,
        Audible = this.models['Audible'],
        ArtifactAudible = this.models['ArtifactAudible'],
        audibleId;

    if(!payload) this.throw('Invalid Payload', 400);

    try {
        yield this.sequelize.transaction(function(t) {
            return Audible.create(payload, {transaction : t}).then(function(audio){
                audibleId = audio.id;
            });
        });

        yield this.sequelize.transaction(function(t) {
            return ArtifactAudible.create({
                AudibleId : audibleId,
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
 * Edit an Audible resource
 * Parameter: id --> AudibleId
 */
function *edit(){
    var payload = this.request.body.fields,
        id = this.params.id,
        result,
        Audible = this.models['Audible'];

    if(!payload) this.throw('Invalid Payload', 400);

    try {
        result = yield this.sequelize.transaction(function (t){
            return Audible.update(payload, {
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
 * Destroy an Audible instance
 */
function *destroy() {
    var id = this.params.id,
        Audible = this.models['Audible'],
        ArtifactAudible = this.models['ArtifactAudible'],
        result;

    try {
        result = yield this.sequelize.transaction(function(t) {
            return ArtifactAudible.destroy({ where : { AudibleId : id}}, { transaction : t})
            .then( function (){
                return Audible.destroy({ where : { id : id}}, {transaction : t});
            });
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }
    if(!result) this.throw('Not Found', 404);

    this.status = 200;

}