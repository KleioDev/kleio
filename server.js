/**
 * Created by cesarcruz on 3/10/15.
 */
var koa = require('koa'),
    Api = require('./api'),
    mount = require('koa-mount'),
    db = require('./models'),
    jwt = require('koa-jwt'),
    cors = require('koa-cors');
    session = require('koa-session');
    require('dotenv').load();

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

//Don't expose JWT errors
app.use(function *(next){
    try {
        yield next;
    } catch(err) {
        if (err.status == 401){
            this.status = 401;

            this.body = 'protected resource, use Authorization to get access\n';
        } else {
            throw err;
        }
    }
});

app.use(jwt({ secret : 'some-secret', passthrough: true}));

app.use(mount(api));


app.listen(4567);
console.log('listening on port 4567');

exports.app = app;