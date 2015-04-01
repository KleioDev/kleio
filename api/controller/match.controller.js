/**
 * Created by cesarcruz on 4/1/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router');

module.exports = function(){

    var loadModels = middleware.loadModel(),
        matchController = new Router()

        .get('/match/:id', loadModels, index)
        .post('/match', loadModels, create);

    return matchController.routes();
}

function *index(){
    var match,
        id = parseInt(this.params.id),
        count;

    //TODO: Fix NaN, should do a proper check
    if(isNaN(id)){
        this.throw('Invalid Parameters', 400);
    }

    try {
        if(id === 0){ //GET a random Clue
            count = yield this.models['Clue'].count();
            match = yield this.models['Clue'].find({
                where : {
                    id : Math.random() * (count - 1) + 1
                }
            });
        } else {
            match = yield this.models['Clue'].find({
                where : {
                    id : id
                }
            });
        }
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!match) {
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = match;


}

function *create(){

}