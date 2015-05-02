/**
 * Created by cesarcruz on 4/1/15.
 */

var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

/**
 * Handle requests related to Matches
 * @returns {*}
 */
module.exports = function(){

    var loadModels = middleware.loadModel(),
        auth = middleware.authentication,
        matchController = new Router()

        .get('/match/:id', loadModels, auth, index)
        .post('/match', loadModels, koaBody, auth, create)
        .put('/match/:id', loadModels, koaBody, auth, edit);

    return matchController.routes();
}

/**
 *
 */
function *index(){
    var clue, clues,
        id = parseInt(this.params.id),
        Match = this.models['Match'],
        userId = this.state.user.id;

    if(isNaN(id)){
        this.throw('Invalid Parameters', 400);
    }

    try {
        if(id == 0){

            //Get me all the clues the user hasn't played.
            clues = yield this.sequelize.query('select id, image, "pointsValue" from "Clues" where id not in (select "ClueId" from "Matches" where "UserId" = '+ userId +');', {type: this.sequelize.QueryTypes.SELECT});

            if(clues.length < 1) this.throw('Not Found', 404); //The user has played all of the clues, so sorry.

            //Get a single, random, clue from all of the available clues.
            clue = clues[Math.floor(Math.random() * (clues.length - 1))];

            //Create a match
            var match = yield this.sequelize.transaction(function(t){
                return Match.create({
                    UserId : userId,
                    ClueId : clue.id,
                    attempts : 0
                }, {transaction : t})
            });

            //Add the attempts to the clue
            clue.Matches = [{
                attempts : match.attempts
            }];

        } else {

            //Get a clue that I know of
            clue = yield this.models['Clue'].find({
                where : {
                    id : id
                },
                include : [{
                    model : Match,
                    attributes : ['attempts', 'correct']

                }],
                attributes : ['image', 'pointsValue', 'id']
            });
        }
    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    if(!clue) this.throw('Not Found', 404);

    this.status = 200;

    this.body = clue;


}

/**
 * Submit a guess to a given Clue
 * Payload : {
 *  ClueId : An Integer with the id of the Clue,
 *  UserId : An Integer with the id of the User trying to match.
 */
function *create(){
    var match,
        payload = this.request.body.fields,
        Clue = this.models['Clue'];

    if(!payload || !payload.UserId || !payload.ClueId || !payload.qrcode) this.throw('Invalid Payload', 404);

    try {

        match = yield this.models['Match'].find({
            where : {
                UserId : payload.UserId,
                ClueId : payload.ClueId
            },
            include : [Clue]
        });

        if(!match) this.throw('Not Found', 404);

        //Pay up
        match.attempts = match.attempts + 1;

        if(match.Clue.ArtifactId == payload.qrcode){
            match.correct = true;
            var user = yield this.models['User'].find({ where : { id : payload.UserId}});

            var points = user.points;

            user.points = points + 15; //TODO: Change points to clue points value

            yield this.sequelize.transaction(function(t){
                return user.save({ transaction : t});
            });

        } else {
            match.correct = false;
        }

        yield this.sequelize.transaction(function(t){
            return match.save({transaction : t});
        });

    } catch(err) {
        this.throw(err.message, err.status || 500);
    }

    this.status = 201;

    this.body = { correct : match.correct, attempts : match.attempts};
}

function *edit(){
    var ClueId = this.params.id,
        result, Match = this.models['Match'],
        userId = this.state.user.id;

    try{
        result = yield this.sequelize.transaction(function(t){
            return Match.update({
                attempts : 3
            }, {
                where: {
                    ClueId: ClueId,
                    UserId: userId
                }
            }, { transaction : t})
        });
    } catch(err){
        this.throw(err.message, err.status || 500);
    }

    if(!result) this.throw('Not Found', 404);

    this.status = 200;
}