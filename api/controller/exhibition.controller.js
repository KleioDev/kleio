/**
 * Created by cesarcruz on 3/30/15.
 */

var middleware  = require('../middleware'),
    Router = require('koa-router');

module.exports = function(){

    var loadModels = middleware.loadModel();

    var exhibitionController = new Router()

        .get('/exhibition', loadModels, index);

    return exhibitionController.routes();
}

/**
 *
 */
function *index() {
    var exhibitions,
        offset = this.query.page;

    if(!offset || offset < 1){
        offset = 1;
    }

    //TODO: Show(return) number of objects in an exhibition
    try {
        exhibitions = yield this.models['Exhibition'].findAll({
            order : '"createdAt" DESC',
            limit : 10,
            attributes : ['image', 'title', 'description']
        });
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!exhibitions || exhibitions.length < 1){
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = { exhibitions : exhibitions};

}