/**
 * Created by cesarcruz on 3/31/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

/**
 * Handle requests related to Images
 * @returns {*}
 */
module.exports = function(){

    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var imageController = new Router()
        .get('/artifact/image/:id', loadModels, index)
        .get('/image/:id', loadModels, show)
        .post('/image', koaBody, loadModels, adminAuth, create)
        .put('/image/:id', koaBody, loadModels, adminAuth, edit)
        .delete('/image/:id', loadModels, adminAuth, destroy);

    return imageController.routes();
}

/**
 * Get a list of images related to artifacts
 * Parameters: id -> ArtifactId
 *
 */
function *index() {
    var images,
        id = parseInt(this.params.id);

    if(isNaN(id)){
        this.throw('Invalid Parameters', 400);
    }

    try {
        images = yield this.sequelize.query('select * from "Images" where "id" in (select "ImageId" from "ArtifactImages" where "ArtifactId" = '+ id +');', {type: this.sequelize.QueryTypes.SELECT});
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!images || images.length < 1) this.throw('Not Found', 404);

    this.status = 200;

    this.body = { images : images};
}

/**
 * Get an Image
 * Parameter: id -> ImageId
 */
function *show() {
    var image,
        id = this.params.id;

    try {
        image = yield this.models['Image'].find({
            where : {
                id : id
            }
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!image) this.throw('Not Found', 404);

    this.status = 200;

    this.body = image;
}

/**
 * Create an instance of Image
 * Payload: title, description, link, ArtifactId
 */
function *create(){
    var payload = this.request.body.fields,
        Image = this.models['Image'],
        ArtifactImage = this.models['ArtifactImage'],
        imageId;

    if(!payload) this.throw('Invalid Payload', 400);

    try {
        yield this.sequelize.transaction(function(t) {
            return Image.create(payload, {transaction : t}).then(function(image){
                imageId = image.id;
            });
        });

        yield this.sequelize.transaction(function(t) {
            return ArtifactImage.create({
                ImageId : imageId,
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
 * Update an instance of Image
 * Payload: title, description, link, ArtifactId
 * Note: Only attributes included in the Payload will be updated.
 */
function *edit(){
    var payload = this.request.body.fields,
        id = this.params.id,
        result,
        Image = this.models['Image'];

    if(!payload) this.throw('Invalid Payload', 400);


    try {
        result = yield this.sequelize.transaction(function (t){
            return Image.update(payload, {
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
 * Destroy an instance of Image
 * Parameter: id --> Image Id
 */
function *destroy(){
    var id = this.params.id,
        Image = this.models['Image'],
        result;

    try {
        yield this.sequelize.transaction(function(t) {
            return Image.destroy({
                where : {
                    id : id
                }
            }, { transaction : t});
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!result) this.throw('Not Found', 404);

    this.status = 200;
}