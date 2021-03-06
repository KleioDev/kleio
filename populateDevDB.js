/**
 * Created by cesarcruz on 3/23/15.
 */

var Model = require('./models');
var Artifact = Model.sequelize.models['Artifact'];
var Artist = Model.sequelize.models['Artist'];
var Audible = Model.sequelize.models['Audible'];
var Clue = Model.sequelize.models['Clue'];
var Events = Model.sequelize.models['Event'];
var Exhibition = Model.sequelize.models['Exhibition'];
var Image = Model.sequelize.models['Image'];
var News = Model.sequelize.models['News'];
var Room = Model.sequelize.models['Room'];
var Text = Model.sequelize.models['Text'];
var Video = Model.sequelize.models['Video'];
var Administrator = Model.sequelize.models['Administrator'];
var ArtifactAudible = Model.sequelize.models['ArtifactAudible'];
var ArtifactVideo = Model.sequelize.models['ArtifactVideo'];
var ArtifactImage = Model.sequelize.models['ArtifactImage'];
var ArtifactText = Model.sequelize.models['ArtifactText'];
var Beacon = Model.sequelize.models['Beacon'];
var ExhibitionBeacon = Model.sequelize.models['ExhibitionBeacon'];
var User = Model.sequelize.models['User'];
var Match = Model.sequelize.models['Match'];

//Artist.create({
//    name : 'César',
//    biography : 'Nacido en el pueblo de Humacao, se especializa en oleos',
//    birthDay : '1991'
//})
//
//Artifact.create({
//    title : 'Signal Destroyer',
//    description : 'A signal, and a destroyer too',
//    medium : 'Oil base',
//    classification : 'Modern',
//    type : 'Painting',
//    dimensions : '8x11.5',
//    dated : '2013',
//    period : 'Modern',
//    culture : 'Puertorican',
//    image : 'http://somerandomeimage.jpeg',
//    objectNumber : '0927450934875097345-984530980954303980245',
//    ArtistId : 1,
//    qrcode : 'someRadomQue',
//
//});

//Administrator.create({
//    email : 'cesar@admin.com',
//    firstName : 'Cesar',
//    lastName : 'Cruz',
//    password : 'NotPlainText'
//});

//Audible.create({
//  title : 'Emperial March',
//  description : 'When you hear this, you know the emperor is comming',
//  link : 'https://soundcloud.com/roy-vader/the-imperial-march-darth'
//});

//Clue.create({
//  image : 'https://pbs.twimg.com/profile_images/3103894633/e0d179fc5739a20308331b432e4f3a51_400x400.jpeg'
//});

//Events.create({
//  title : 'Vader Exhibition',
//  description : 'An exhibition showing Cesarangelos best Vader portraits',
//  eventDate : new Date('May 2, 2015 03:24:00'),
//  image : 'http://adsoftheworld.com/sites/default/files/styles/media_retina/public/images/sta-002_portfolio_darthv_ang_lr_1.jpg?itok=98Knqo57',
//  location : 'http://adsoftheworld.com/sites/default/files/styles/media_retina/public/images/sta-002_portfolio_darthv_ang_lr_1.jpg?itok=98Knqo57',
//  author : 1
//});

//Exhibition.create({
//  title : 'Vader',
//  description : 'An exhibition showing Cesarangelos best Vader portraits',
//  image : 'http://adsoftheworld.com/sites/default/files/styles/media_retina/public/images/sta-002_portfolio_darthv_ang_lr_1.jpg?itok=98Knqo57',
//  MuseumId : 1
//});

//Image.create({
//  title : 'Who is Vader?',
//  description : 'A picture depicting who is this vader whos existance we are celebrating',
//  link : 'http://wersm.com/wp-content/uploads/2013/12/3474964-darth-vader.jpg'
//});

//News.create({
//  title : 'MuSA Café',
//  description : 'Museum of Art from the University of Puerto Rico Mayagüez Campus is proud to invite you to the MuSA Café Openning',
//  image : 'http://media.zenfs.com/en-US/video/video.pd2upload.com/video.yahoofinance.com@0c15ac80-566c-3267-897f-982c3aaddf98_FULL.jpg',
//  AdministratorId : 1
//});

//Room.create({
//  name : 'Agustin Stahl',
//  description : 'In commemoration to the famous cientist, Agustin Stahl',
//  ibeacons : ['B558CBDA-4472-4211-A350-FF1196FFE8C8']
//});

//Text.create({
//  title : 'Memoirs of Vader',
//  description : 'A journey into the life and death of Darth Vader',
//  link : 'http://www.starwars.com/databank/darth-vader'
//});

//Video.create({
//    title : 'Volkswagon Vader Commercial',
//    link : 'https://www.youtube.com/watch?v=R55e-uHQna0',
//    description : 'Vader Commercial',
//})


//ArtifactAudible.create({
//    ArtifactId : 2,
//    AudibleId : 1
//})
//ArtifactVideo.create({
//    ArtifactId : 2,
//    VideoId : 1
//})
//ArtifactImage.create({
//    ArtifactId : 2,
//    ImageId : 1
//})
//ArtifactText.create({
//    ArtifactId : 2,
//    TextId : 1
//})

//Beacon.create({
//    code : 'B558CBDA-4472-4211-A350-FF1196FFE8C8'
//});

//ExhibitionBeacon.create({
//    ExhibitionId : 1,
//    BeaconId : 1
//});

//User.create({
//    email : 'luis.medina14@upr.edu',
//    firstName : 'Luis',
//    lastName : 'Medina',
//    gender : 'male',
//    age_range : '10-30',
//    points : 500,
//    active : true
//});

//Match.create({
//    UserId : 1,
//    ArtifactId : 2,
//    attempts : 1,
//    correct : false
//})

var hoursOfOperation = {
    "monday" : {
        "open" : Date.now(),
        "close" : Date.now(),
        "closed" : false
    },
    "monday" : {
    "   open" : Date.now(),
        "close" : Date.now(),
        "closed" : false
    },
    "monday" : {
        "open" : Date.now(),
        "close" : Date.now(),
        "closed" : false
    },
    "monday" : {
        "open" : Date.now(),
        "close" : Date.now(),
        "closed" : false
    },
    "friday" : {
        "open" : Date.now(),
        "close" : Date.now(),
        "closed" : false
    },
    "saturday" : {
        "open" : Date.now(),
        "close" : Date.now(),
        "closed" : false
    },
    "sunday" : {
        "open" : Date.now(),
        "close" : Date.now(),
        "closed" : false
    }
}

var exp = JSON.stringify(hoursOfOperation);



console.log(exp);

