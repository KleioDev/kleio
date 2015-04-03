/**
 * Created by cesarcruz on 3/10/15.
 */
var koa = require('koa'),
    Api = require('./api'),
    mount = require('koa-mount'),
    db = require('./models'),
    session = require('koa-session');

var app = koa();

var api = Api(db);

app.keys = ['cesarsalad'];

app.use(session(app));

app.use(mount(api));


app.listen(4567);
console.log('listening on port 4567');

exports.app = app;