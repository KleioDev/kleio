/**
 * Created by cesarcruz on 3/23/15.
 */

var Router = require('koa-router');
var middleware = require('../middleware');

module.exports = function () {

    var loadModels = middleware.loadModel();

    var objectController = new Router()

    .get('/object/:id', loadModels, single)
    .get('/object/:id/video', loadModels, video)
    .get('/object/:id/audio', loadModels, audio)
    .get('/object/:id/image', loadModels, image)
    .get('/object/:id/text', loadModels, text)
    .get('/object/qr/:qrcode', loadModels, qrcode);

    return objectController.routes();
}


/**
 * Handle Object Request
 */
function *single () {
    var object,
        objectId = this.params.id,
        Content = this.models['Content'],
        ObjectContent = this.models['ObjectContent'];

    if(!objectId) {
        this.throw('Bad Request', 400);
    }

    try {
        object = yield this.models['Object']
            .findOne({
            where : {
                id : objectId
            },
            include : [Content]
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    this.status = 200;

    this.body = object;
}

function *video () {}

function *audio() {}

function *image() {}

function *text() {}

function *qrcode() {}