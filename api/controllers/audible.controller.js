/**
 * Created by cesarcruz on 3/31/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router');

module.exports = function() {
    var loadModels = middleware.loadModel();

    var audibleController = new Router()
        .get('/artifact/audible/:id', loadModels, index)
        .get('/audible/:id', loadModels, show);

    return audibleController.routes();
}


function *index() {
    var audibles,
        id = parseInt(this.params.id);

    if(!id || id === NaN){
        this.throw('Invalid Parameters', 400);
    }

    try {
        audibles = yield this.sequelize.query('select * from "Audibles" where "id" in (select "AudibleId" from "ArtifactAudibles" where "ArtifactId" = '+ id +');', {type: this.sequelize.QueryTypes.SELECT})
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!audibles || audibles.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { audibles : audibles };
}

function *show(){
    var audible,
        id = parseInt(this.params.id);

    if(!id || id === NaN){
        this.throw('Invalid Parameters', 400);
    }

    try {
        audible = yield this.models['Audible'].find({
            where : {
                id : id
            }
        });
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!audible) {
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = audible;
}