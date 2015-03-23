/**
 * Created by cesarcruz on 3/23/15.
 */

var supertest = require('supertest-as-promised'),
    expect = require('chai').expect,
    utilities = require('../../utilities'),
    app = utilities.server;
request = supertest(app.callback()),
    object = require('./dummy').object,
    Artifact = utilities.models['Object'];

describe('Object', function() {

    //TODO: Create a Museum object, insert into the database
    before(function() {
        Artifact.create(object);
    });

    describe('GET /something', function(){


    });
});