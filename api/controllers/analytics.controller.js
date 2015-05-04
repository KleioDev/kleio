/**
 * Created by cesarcruz on 5/3/15.
 */
var middleware = require('../middleware'),
    Router = require('koa-router'),
    koaBody = require('koa-better-body')();

module.exports = function(){
    var loadModels = middleware.loadModel(),
        adminAuth = middleware.adminAuth;

    var analyticsController = new Router()
        .get('/analytics/user', loadModels, adminAuth, index);

    return analyticsController.routes();
}

function *index(){

    var data = {};
    try{
        var months = yield this.models['InteractiveUser'].findAll({
            attributes : ['month']
        });

        months.forEach(function(month){
            data.month = yield getMonthlyUsers(month);
        });

        console.log(data);

    } catch(err){
        this.throw(err.message, err.status || 500);
    }
}

function *getMonthlyUsers(month){
    try{
        var activeUsers = yield this.models['MonthlyActiveUser'].count({
            where : { month : month}
        });

        var interactiveUsers = yield this.models['InteractiveUser'].count({
            where : { month : month}
        });
    }catch(err){
        this.throw(err.message, err.status || 500);
    }

    var result = {
        activeUsers : activeUsers,
        interactiveUsers : interactiveUsers
    }

    return result;
}