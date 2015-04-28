/**
 * Created by cesarcruz on 3/10/15.
 */
require('dotenv').load();

var koa = require('koa'),
    Api = require('./api'),
    mount = require('koa-mount'),
    db = require('./models'),
    jwt = require('koa-jwt'),
    cors = require('koa-cors');
    session = require('koa-session');

var app = koa();

//CORS
app.use(cors({
    origin : true,
    methods : ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    headers : ['Content-Type', 'Authorization']
}));

var api = Api(db);

app.keys = ['cesarsalad'];

app.use(session(app));

//Handle errors
app.use(function *(next){
    try {
        yield next;
    } catch(err) {
        switch(err.status){
            case 404:
                this.status = 404;
                this.body = err.message;
                break;
            case 401:
                this.status = 401;
                this.body = err.message;
                break;
            case 400:
                this.status = 400;
                this.body = err.message;
                break;
            case 403:
                this.status = 403;
                this.body = err.message;
                break;
            case 500:
                this.status = 500;
                this.body = err.message;
                break;
        }
    }
});

app.use(jwt({ secret : process.env.APP_JWT_SECRET , passthrough: true}));

app.use(mount(api));


app.listen(4567);
console.log('listening on port 4567');

exports.app = app;