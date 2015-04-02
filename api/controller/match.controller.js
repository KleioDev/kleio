/**
 * Created by cesarcruz on 4/1/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

module.exports = function(){

    var loadModels = middleware.loadModel(),
        matchController = new Router()

        .get('/match/:id', loadModels, index)
        .post('/match', loadModels, koaBody, create);

    return matchController.routes();
}

function *index(){
    var clue,
        id = parseInt(this.params.id),
        count;

    //TODO: Fix NaN, should do a proper check
    if(isNaN(id)){
        this.throw('Invalid Parameters', 400);
    }

    try {
        if(id === 0){ //GET a random Clue
            count = yield this.models['Clue'].count();
            clue = yield this.models['Clue'].find({
                where : {
                    id : Math.random() * (count - 1) + 1
                }
            });
        } else {
            clue = yield this.models['Clue'].find({
                where : {
                    id : id
                }
            });
        }
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!clue) {
        this.throw('Not Found', 404);
    }

    this.status = 200;

    this.body = clue;


}

function *create(){
    var match,
        artifact,
        attempt = this.request.body.fields;

    try {
        //Check to see if the user has tried this before.
        match = yield this.models['Match'].find({
            where : {
                UserId : attempt.UserId,
                ClueId : attempt.ClueId
            }
        });

        artifact = yield this.models['Artifact'].find({
            where : {
                qrcode : attempt.qrcode
            }
        });

        if(artifact){
            attempt['correct'] = true;

            if(match){
                match['correct'] = true;
            }
        }

        if(!match){

            attempt['attempts'] = 1;

            console.log(attempt);

            yield this.models['Match'].create(attempt);

        } else {
            match.attempts++;

            if(match.attempts > 3){
                this.throw('Forbidden', 403);
            }

            if(match.correct){
               this.throw('Clue already solved', 403);
            }
            match.save();
        }
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    this.status = 200;

    this.body = 'Worked';
}