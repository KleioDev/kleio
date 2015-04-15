/**
 * Created by cesarcruz on 3/29/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router');

/**
 * Handle Requests Related to the Museum
 * @returns {*}
 */
module.exports = function(){
    var loadModels =  middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var museumController = new Router()

        .get('/museum', loadModels, index)
        .put('/museum/:id', koaBody, loadModels, adminAuth, edit);

    return museumController.routes();
}

/**
 * Get the most recently updated version of the Museum instance
 */
function *index(){

    try{
        var museum = yield this.models['Museum'].findAll({
            order : '"updatedAt" DESC',
            limit : 1
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!museum || museum.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = museum[0];
}

/**
 * Update an instance of Museum
 * Parameter: id --> Museum Id
 * Payload: name, description, terms, about, hoursOfOperation, socialMediaLinks, phone, extension, image, location, email
 */
function *edit(){
    var museum = this.request.body.fields,
        Museum = this.models['Museum'],
        id = this.params.id,
        result;

        if(!museum) {
            this.throw('Bad Request', 400);
        }

        try {
            result = yield this.sequelize.transaction( function (t) {
                return Museum.update(museum, {
                    where : {
                        id : id
                    }
                }, { transaction : t});
            });
        } catch(err) {
            this.throw(err.message, err.status || 500);
        }

        if(!result) {
            this.throw('Not Found', 404);
        }

        this.status = 200;
}