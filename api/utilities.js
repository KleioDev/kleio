/**
 * Created by cesarcruz on 3/21/15.
 */
/**
 * Helper methods
 *
 */
jwt = require('koa-jwt');
qs = require('qs');

module.exports = {
    generateToken : generateToken,
    fbCall : fbCall
}


/**
 * Generate a JWT token based on poarameters
 * @param id
 * @param email
 * @param type
 */
function generateToken(user, type){

    if(!user || !user.id || !user.email){
        this.throw(new TypeError('Invalid User parameters for token generation'))
    }

    return jwt.sign({id : user.id, type : type, email : user.semail}, process.env.APP_JWT_SECRET, { expiresInMinutes: 60 * 24 * 60});
}

function fbCall(parameters){
    var apiCall = "https://graph.facebook.com/v2.3/",
        queryParameters = {}, route;

    if(!parameters || !parameters.accessToken || !parameters.route){
        this.throw(new TypeError('Invalid parameters'));
    }

    queryParameters = qs.stringify({
        access_token : parameters.accessToken,
        client_id : process.env.FACEBOOK_APP_ID,
        client_secret : process.env.FACEBOOK_APP_SECRET
    });

    return apiCall + parameters.route + '?' + queryParameters;
}