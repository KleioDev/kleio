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
        .get('/analytics/active/user', loadModels, active);

    return analyticsController.routes();
}

function *active(){
    var monthlyActiveUser = this.models['MonthlyActiveUser'];

    var data = {};
    try{
        var months = yield monthlyActiveUser.findAll({
            attributes : ['month']
        });

        months.forEach(function(month){

            data.month.active =  monthlyActiveUser.count({ where : { month : month.month}});
        });



    } catch(err){
        this.throw(err.message, err.status || 500);
    }
}

function getMonthlyUsers(month){
    try{
        var activeUsers =  this.models['MonthlyActiveUser'].count({
            where : { month : month}
        });

        var interactiveUsers =  this.models['InteractiveUser'].count({
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