/**
 * Created by cesarcruz on 3/23/15.
 */

var Router = require('koa-router');
var middleware = require('../middleware');

/**
 * Handle Object Requests, in the case where a QRCode is used, the id parameter
 * of the /object/:id route will represent the qrcode.
 * @returns {*}
 */
module.exports = function () {

    var loadModels = middleware.loadModel();

    var objectController = new Router()

    .get('/object/:id', loadModels, single)
    .get('/object/:id/video', loadModels, video)
    .get('/object/:id/audio', loadModels, audio)
    .get('/object/:id/image', loadModels, image)
    .get('/object/:id/text', loadModels, text);

    //TODO" Maybe I can consolidate all of these controllers into one using a method

    return objectController.routes();
}


/**
 * Handle Object Request
 */
function *single () {
    var object,
        objectId = this.params.id,
        response,
        content;

    //TODO: Check Parameters
    if(!objectId) {
        this.throw('Bad Request', 400);
    }

    try {

        //Get an object
        object = yield this.models['Object'].find({
            where : {
                id : objectId
            }
        });

        //Get content related to that object
        content = yield this.sequelize.query('select * from "Contents" where id in (select "ContentId" from "ObjectContents" where "ObjectId" = :objectId) limit 10;', {
            replacements : {objectId : objectId},
            type: this.sequelize.QueryTypes.SELECT
         });


    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    response = {
        object : object,
        content : content
    }

    this.status = 200;

    this.body = response;
}

/**
 * Get all video content for a given object
 */
function *video () {

    var objectId = this.params.id,
        object,
        content;

        if(!objectId) {
            this.throw('Bad Request', 404);
        }

        try {
            object = yield this.models['Object'].find({
                where : {
                id : objectId
                }
            });

            //TODO: Pagination of results (using offset)
            content = yield this.sequelize.query('select * from "Contents" where "type" = \'video\' and id in (select "ContentId" from "ObjectContents" where "ObjectId" = :objectId) limit 10;', {
                replacements : {objectId : objectId},
                type: this.sequelize.QueryTypes.SELECT
            });
        } catch (err) {
            this.throw(err.message, err.status || 500);
        }

        this.status = 200;

        this.body = {object : object, content : content};

}

function *audio() {
    var objectId = this.params.id,
        object,
        content;

    if(!objectId) {
        this.throw('Bad Request', 404);
    }

    try {
        object = yield this.models['Object'].find({
            where : {
                id : objectId
            }
        });

        //TODO: Pagination of results (using offset)
        content = yield this.sequelize.query('select * from "Contents" where "type" = \'audio\' and id in (select "ContentId" from "ObjectContents" where "ObjectId" = :objectId) limit 10;', {
            replacements : {objectId : objectId},
            type: this.sequelize.QueryTypes.SELECT
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    this.status = 200;

    this.body = {object : object, content : content};
}

function *image() {
    var objectId = this.params.id,
        object,
        content;

    if(!objectId) {
        this.throw('Bad Request', 404);
    }

    try {
        object = yield this.models['Object'].find({
            where : {
                id : objectId
            }
        });

        //TODO: Pagination of results (using offset)
        content = yield this.sequelize.query('select * from "Contents" where "type" = \'image\' and id in (select "ContentId" from "ObjectContents" where "ObjectId" = :objectId) limit 10;', {
            replacements : {objectId : objectId},
            type: this.sequelize.QueryTypes.SELECT
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    this.status = 200;

    this.body = {object : object, content : content};
}

function *text() {
    var objectId = this.params.id,
        object,
        content;

    if(!objectId) {
        this.throw('Bad Request', 404);
    }

    try {
        object = yield this.models['Object'].find({
            where : {
                id : objectId
            }
        });

        //TODO: Pagination of results (using offset)
        content = yield this.sequelize.query('select * from "Contents" where "type" = \'text\' and id in (select "ContentId" from "ObjectContents" where "ObjectId" = :objectId) limit 10;', {
            replacements : {objectId : objectId},
            type: this.sequelize.QueryTypes.SELECT
        });
    } catch (err) {
        this.throw(err.message, err.status || 500);
    }

    this.status = 200;

    this.body = {object : object, content : content};
}