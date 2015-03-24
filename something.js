/**
 * Created by cesarcruz on 3/23/15.
 */

var Model = require('./models');
var ObjectContent = Model.sequelize.models['ObjectContent'];

ObjectContent.create({
    ObjectId : 1,
    ContentId : 1,
    createdAt : Date.now(),
    updatedAt : Date.now()
});

ObjectContent.create({
    ObjectId : 1,
    ContentId : 2,
    createdAt : Date.now(),
    updatedAt : Date.now()
});