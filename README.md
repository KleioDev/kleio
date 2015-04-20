# MuSA API

### Overview

* [Current Version](#version)
* [Schema](#schema)
* [Parameters](#parameters)
* [Payload](#payload)
* [Errors](#errors)
* [Authentication](#tests)
* [Museum](#museum)
* [Exhibitions](#exhibitions)
* [Artifacts](#artifacts) 
* [Media Content](#media)
	* [Audible](#audible)
	* [Video](#video)
	* [Image](#image)
	* [Archive](#archive)
* [Events](#events)
* [News](#news)
* [Feedback](#feedback)
* [Match Hunt](#match)
* [User](#user)
* [iBeacons](#beacon)
* [Administrator](#administrator)
* [Artist](#artist)


 

### Current Version <a id="version"></a>

The purpose of this API is fascilitating information to the MuSA mobile applications. The Museum of the University of Puerto Rico, Mayagüez Campus (MuSA) will allow students to browse all the collections of the museum from the comfort of their smartphone. A few extras are provided for users that make use of the application while inside of the Museum. This API is currently in it's ***Beta*** version, bugs or complains are more than welcomed.


### Schema <a id="schema"></a>

As of the current version, the base URL for this API is `http://136.145.116.229:4567/`, this base API is subject to change do to early development. All communication to and from the API will be managed using *JSON* documents.

### Parameters <a id="parameters"></a>

Support for query parameters exists on a per-route basis, this is described further below under each API Entity. The parameters supported by this API as of this version are:

Parameter | Description
----|------ |-----
page | For pagination purposes, select the page number, defaults to 0.
per_page | For pagination purposes, select the amount of items per page, defaults to 25
beacon_code | An iBeacon code
title | Represent's the title attribute of a resource
exhibition_id |An integer representing an Exhibition id
artist | Represent's the name attribute of an Artist resource
email | Represent's the email attribute of a resource
first_name | Represent's the first_name attribute of a resource
seen | Represent's the seen attribute of a resource
type | Represents the type attribute of a resource
resolved | Represents the resolved attribute of a resource
name | Represents the name attribute of a resource


### Payload <a id="payload"></a>

As previously mentioned, all requests comunication is expected to happen by means of JSON. In the case of edit requests, the payload attributes can be the same as the create requests. Only the provided attributes will be updated in edit requests

### Errors <a id="errors"></a>

When an error is encountered, the API will respond with an appropiate status code and a message in the Body explaining the error. Possible errors are as follows:

Error | Description | Status Code
----|------ |-----
Not Found | The resource resource was not found | 404
Protected Resource | The resource that is trying to be accessed is protected, use proper Authorization header | 401
Invalid Payload | Problems with the current payload. Payload may be unabelable or some attributes may be missing | 400
Unauthorized | The request source does not have access to this route | 403
Invalid Parameters | The provided uri paramters are not acceptable | 400
Internal Server Error | Oh noes, something went horribly wrong, case by case basis | 500

### Authentication <a id="authentication"></a>

Some routes will respond with a 401: Protected Resource error. This means that authentication is needed in order to access this information. The authentication process is as follows:

1. `POST /authenticate` with valid parameters
2. Upon successful authentification, the server will respond with a Token, store this token for further requests

Each request to a protected route will need to contain the Authorization header, providing the token.


<!-- ### Models <a id="models"></a>

Information on the model schema for this project is provided [here]() -->

### Museum <a id="museum"></a>

Handle all information regarding the Museum Model

**Get the most recent Museum instance**

```
GET /museum
```

*Response*

```
{
  "name": "Museo de Arte De La Universidad de Puerto Rico en Mayagüez",
  "description": "El Colegio de Mayagüez se enorgulleze en presentar el Museo de Arte de la universidad de Puerto Rico",
  "hoursOfOperation": "Lunes a Viernes de 8:00AM a 10:00PM",
  "email": "musa@upr.edu",
  "phone": "787878787",
  "image": "http://randomimage.jpg",
  "location": "arandomlocation.com",
  "terms": "No bregues mal",
  "about": "Establecido en Junio 2015"
}
```

**Update Museum**

```
PUT /museum
```

The museum model is unusual since only one instance is expected to ever be created. Any time a Museum instance is modified, changes will be made to the most recent instance of Museum.


### Exhibitions <a id="exhibitions"></a>

Exhibitions are, in essence, a collection of Artifacts. These collections, however, have different attributes, which merit the creation of their own module.

**Security**

Administrator authentication is required to access routes for creating, updating and deleting exhibitions, read Authentication section for mode reference.

**List of Exhibitions**

```
GET /exhibition
```
*Parameters*

Available parameters are: ***page, per_page, and title***

*Response*

```
{
  "exhibitions": [
    {
      "id": 2,
      "title": "iPhone Ultimate Exhibition",
      "description": "An Exhibition about iPhones",
      "image": "http://uritoarandomimage.com/4521",
      "active": true,
      "MuseumId": 1,
      "createdAt": "2015-04-08T03:44:15.201Z",
      "updatedAt": "2015-04-08T03:44:58.793Z",
      "deletedAt": null
    },
    {
      "id": 1,
      "title": "Vader",
      "description": "An exhibition showing Cesarangelos best Vader portraits",
      "image": "http://uritoarandomimage.com/4523",
      "active": true,
      "MuseumId": 1,
      "createdAt": "2015-03-31T18:58:08.046Z",
      "updatedAt": "2015-03-31T18:58:08.046Z",
      "deletedAt": null
    }
  ]
}
```
**Single Exhibition**

```
GET /exhibition/:id
```
A single Exhibition instance is returned, including Artifacts which belong to this exhibtion, if any.

*Response*

```
{
  "id": 2,
  "title": "iPhone Ultimate Exhibition",
  "description": "An Exhibition about iPhones",
  "image": "http://uritoarandomimage.com/4521",
  "active": true,
  "MuseumId": 1,
  "createdAt": "2015-04-08T03:44:15.201Z",
  "updatedAt": "2015-04-08T03:44:58.793Z",
  "deletedAt": null,
  "Artifacts": [
    {
      "id": 2,
      "title": "Hope Vader",
      "description": "Darth Vader posing as the famous 2008 Obama hope poster",
      "medium": "Oil base",
      "classification": "Modern",
      "attribution": null,
      "type": "Painting",
      "dimensions": "8x11.5",
      "dated": "2013",
      "period": "Modern",
      "culture": "Puertorican",
      "department": null,
      "objectNumber": "0927450934875097345-984530980954303980245",
      "image": "https://arandomimage.com",
      "ArtistId": 1,
      "qrcode": "https://arandomqrcode.com",
      "ExhibitionId": 2,
      "createdAt": "2015-03-31T19:02:43.088Z",
      "updatedAt": "2015-04-17T04:16:16.151Z",
      "deletedAt": null
    }
  ]
}
```

**Get Exhibition near me, using iBeacon code**


```
GET /exhibition/near/me?beaconX=beacon_code
```
The beacon code is provided by means of the beaconX request query parameter. If I were to pass a single iBeacon code, the query would be as follows:

```
GET /exhibition/near/me?beacon1=B558CBDA-4472-4211-A350-FF1196FFE8C8
```

If I were to send two iBeacon codes:

```
GET /exhibitions/near/me?beacon1=B558CBDA-4472-4211-A350-FF1196FFE8C8&beacon2=BCC8CBDA-88AA-4211-A350-FF1196FFE8C8
```
Essentially concatinating ibeacon codes as needed.

*Response*

```
{
  "exhibitions": [
    {
      "id": 1,
      "title": "Vader",
      "description": "An exhibition showing Cesarangelos best Vader portraits",
      "image": "http://uritoarandomimage.com/4521",
      "active": true,
      "MuseumId": 1,
      "createdAt": "2015-03-31T18:58:08.046Z",
      "updatedAt": "2015-03-31T18:58:08.046Z",
      "ExhibitionBeacon": {
        "id": 1,
        "ExhibitionId": 1,
        "BeaconId": 1,
        "createdAt": "2015-04-01T03:25:28.787Z",
        "updatedAt": "2015-04-01T03:25:28.787Z"
      }
    }
  ]
}
```
**Create an Exhibition**

```
POST /exhibition
```

*Payload*

Required: title, MuseumId
Optional: description, image, active


*Response*

Status code of 201 if creation was successful.

**Edit an Exhibition**

```
PUT /exhibition/:id
```

*Response*

Status code of 200 if update was successful.

**Delete an Exhibition**

```
DELETE /exhibition/:id
```
*Response*

A status code of 200 if delete was successful.

##### Exhibitions and Beacons

**Show beacons for all Exhibitions**

```
GET /exhibition/beacon
```

*Response*

```
{
    "exhibitionBeacons": [
        {
            "id": 1,
            "ExhibitionId": 1,
            "BeaconId": 1,
            "createdAt": "2015-04-01T03:25:28.787Z",
            "updatedAt": "2015-04-01T03:25:28.787Z"
        },
        {
            "id": 3,
            "ExhibitionId": 1,
            "BeaconId": 1,
            "createdAt": "2015-04-17T03:47:12.854Z",
            "updatedAt": "2015-04-17T03:47:33.338Z"
        }
    ]
}
```

**Get single association iBeacons - Exhibition**

```
GET /exhibition/beacon/:id
```

*Response*

```
{
    "id": 1,
    "ExhibitionId": 1,
    "BeaconId": 1,
    "createdAt": "2015-04-01T03:25:28.787Z",
    "updatedAt": "2015-04-01T03:25:28.787Z"
}
```

**Edit Exhibition iBeacons**

```
PUT /exhibition/beacon/:id
```

*Response*

Status code of 200 if update was successful.

**Delete Exhibition iBeacon**

This route de-associates Exhibitions and iBeacons

```
DELETE /exhibition/beacon/:id
```

*Response*

Status code of 200 if delete was successful.

### Artifacts <a id="artifacts"></a>

An artifact is essentially any art piece within the Museum. 

**Security**
Access to create, edit or delete Artifacts is restricted to administrator users.

**List Artifacts**

```
GET /artifact
```

*Parameters*

Available parameters are: ***page, per_page, artist, title, exhibition_id

*Response*

```
{
    "artifacts": [
        {
            "id": 2,
            "title": "Hope Vader",
            "description": "Darth Vader posing as the famous 2008 Obama hope poster",
            "medium": "Oil base",
            "classification": "Modern",
            "attribution": null,
            "type": "Painting",
            "dimensions": "8x11.5",
            "dated": "2013",
            "period": "Modern",
            "culture": "Puertorican",
            "department": null,
            "objectNumber": "0927450934875097345-984530980954303980245",
            "image": "https://scontent-atl.xx.fbcdn.net/hphotos-xfa1/v/l/t1.0-9/399196_1405515439661511_227192283_n.jpg?oh=e9ecb5131e950c53bb2ae70c3e42a58e&oe=55B5F870",
            "ArtistId": 1,
            "qrcode": "https://scontent-atl.xx.fbcdn.net/hphotos-xfa1/v/l/t1.0-9/399196_1405515439661511_227192283_n.jpg?oh=e9ecb5131e950c53bb2ae70c3e42a58e&oe=55B5F870",
            "ExhibitionId": 2,
            "createdAt": "2015-03-31T19:02:43.088Z",
            "updatedAt": "2015-04-17T04:16:16.151Z",
            "deletedAt": null
        }
    ]
}
```

**Single Artifact**

```
GET /Artifact/:id
```

*Response*

```
{
    "id": 2,
    "title": "Hope Vader",
    "description": "Darth Vader posing as the famous 2008 Obama hope poster",
    "medium": "Oil base",
    "classification": "Modern",
    "attribution": null,
    "type": "Painting",
    "dimensions": "8x11.5",
    "dated": "2013",
    "period": "Modern",
    "culture": "Puertorican",
    "department": null,
    "objectNumber": "0927450934875097345-984530980954303980245",
    "image": "https://scontent-atl.xx.fbcdn.net/hphotos-xfa1/v/l/t1.0-9/399196_1405515439661511_227192283_n.jpg?oh=e9ecb5131e950c53bb2ae70c3e42a58e&oe=55B5F870",
    "ArtistId": 1,
    "qrcode": "",
    "ExhibitionId": 2,
    "createdAt": "2015-03-31T19:02:43.088Z",
    "updatedAt": "2015-04-17T04:16:16.151Z",
    "deletedAt": null,
    "Videos": [
        {
            "id": 1,
            "title": "Volkswagon Vader Commercial",
            "description": "Vader Commercial",
            "link": "https://www.youtube.com/watch?v=R55e-uHQna0",
            "createdAt": "2015-03-31T18:58:08.051Z",
            "updatedAt": "2015-03-31T18:58:08.051Z",
            "ArtifactVideo": {
                "id": 2,
                "ArtifactId": 2,
                "VideoId": 1,
                "createdAt": "2015-03-31T21:24:44.010Z",
                "updatedAt": "2015-03-31T21:24:44.010Z"
            }
        }
    ],
    "Audibles": [
        {
            "id": 1,
            "title": "Emperial March",
            "description": "When you hear this, you know the emperor is comming",
            "link": "https://soundcloud.com/roy-vader/the-imperial-march-darth",
            "createdAt": "2015-03-31T18:58:08.042Z",
            "updatedAt": "2015-03-31T18:58:08.042Z",
            "ArtifactAudible": {
                "id": 2,
                "ArtifactId": 2,
                "AudibleId": 1,
                "createdAt": "2015-03-31T21:24:43.998Z",
                "updatedAt": "2015-03-31T21:24:43.998Z"
            }
        },
        {
            "id": 7,
            "title": "Started From The Bottom",
            "description": "This is the REAL Hustler Anthem",
            "link": "https://soundcloud.com/octobersveryown/drake-started-from-the-bottom",
            "createdAt": "2015-04-08T02:11:21.709Z",
            "updatedAt": "2015-04-08T02:39:41.967Z",
            "ArtifactAudible": {
                "id": 8,
                "ArtifactId": 2,
                "AudibleId": 7,
                "createdAt": "2015-04-08T02:11:21.739Z",
                "updatedAt": "2015-04-08T02:11:21.739Z"
            }
        }
    ],
    "Images": [
        {
            "id": 1,
            "title": "Who is Vader?",
            "description": "A picture depicting who is this vader whos existance we are celebrating",
            "link": "http://somethiing.com/wp-content/uploads/2013/darth-vader.jpg",
            "createdAt": "2015-03-31T18:58:08.047Z",
            "updatedAt": "2015-03-31T18:58:08.047Z",
            "ArtifactImage": {
                "id": 1,
                "ArtifactId": 2,
                "ImageId": 1,
                "createdAt": "2015-03-31T21:22:54.704Z",
                "updatedAt": "2015-03-31T21:22:54.704Z"
            }
        }
    ],
    "Texts": [
        {
            "id": 1,
            "title": "Memoirs of Vader",
            "description": "A journey into the life and death of Darth Vader",
            "link": "http://www.something.com/something/darkside",
            "createdAt": "2015-03-31T18:58:08.050Z",
            "updatedAt": "2015-03-31T18:58:08.050Z",
            "ArtifactText": {
                "id": 2,
                "ArtifactId": 2,
                "TextId": 1,
                "createdAt": "2015-03-31T21:24:44.015Z",
                "updatedAt": "2015-03-31T21:24:44.015Z"
            }
        }
    ],
    "Artist": {
        "id": 1,
        "name": "César",
        "biography": "Nacido en Tatooine",
        "birthDay": "1880",
        "createdAt": "2015-03-31T18:58:08.025Z",
        "updatedAt": "2015-03-31T18:58:08.025Z"
    }
}
```

**Create an Artifact**

Create an instance of Artifact, requires authentification

```
POST /artifact
```

*Payload*

Required: title, image
Optional: description, medium, classification, attribution, type, dated, period, culture, department, objectNumber, ArtistId, qrcode, ExhibitionId

*Response*

Status code 201 if created successfully.

**Edit Artifact**

```
PUT /artifact/:id
```

*Response*

Status code of 200 if successful.

**Delete an Artifact**

```
DELETE /administrator/:id
```

*Response*

Status code of 200 if successful.

### Media Content <a id="media"></a>

Media Content are pieces of information in the form of *images, audibles, videos or archives* that are related by an Administrator (based on their criteria) to an Artifact and as so, are presented alongside the artifact. As was previously mentioned, the media content is delieved once a single artifact is retrieved. 

### Audible <a id="audible"></a>

This refers to contant that is distributed by means of audio files. For now, this content can only be delived by means of a URL that locates the actual content.

**List all Audibles for a given Artifact**

```
GET /artifact/audible/:id
```
In this case, the *id* parameter refers to the id parameter of an *artifact*

*Response*

```
{
  "audibles": [
    {
      "id": 1,
      "title": "Emperial March",
      "description": "When you hear this, you know the emperor is comming",
      "link": "https://soundcloud.com/roy-vader/the-imperial-march-darth",
      "createdAt": "2015-03-31T18:58:08.042Z",
      "updatedAt": "2015-03-31T18:58:08.042Z"
    }
  ]
}
```

**Single Audible**

```
GET /audible/:id
```
*Response*

```
{
  "id": 1,
  "title": "Emperial March",
  "description": "When you hear this, you know the emperor is comming",
  "link": "https://soundcloud.com/roy-vader/the-imperial-march-darth",
  "createdAt": "2015-03-31T18:58:08.042Z",
  "updatedAt": "2015-03-31T18:58:08.042Z"
}
```

**Create Audible**

```
POST /audible
```

*Payload*

Required: title, link
Optional: description

*Response*

Status code 201 if Audible was created successfully.

**Edit Audible**

```
PUT /audible/:id
```

*Response*

Status code of 200 if update was successful.

**Delete Audible**

```
DELETE /audible/:id
```

*Response*

Status code 200 if delete was successful.

### Video <a id="video"></a>

Video content in the form of a URL that points to a video resource.

**List all Videos for a given Artifact**

```
GET /artifact/video/:id
```
In this case, the *id* parameter refers to the id parameter of an *artifact*

*Response*

```
{
    "videos": [
        {
            "id": 1,
            "title": "Volkswagon Vader Commercial",
            "description": "Vader Commercial",
            "link": "https://www.youtube.com/watch?v=R55e-uHQna0",
            "createdAt": "2015-03-31T18:58:08.051Z",
            "updatedAt": "2015-03-31T18:58:08.051Z"
        }
    ]
}
```

**Single Video**

```
GET /video/:id
```
*Response*

```
{
    "id": 1,
    "title": "Volkswagon Vader Commercial",
    "description": "Vader Commercial",
    "link": "https://www.youtube.com/watch?v=R55e-uHQna0",
    "createdAt": "2015-03-31T18:58:08.051Z",
    "updatedAt": "2015-03-31T18:58:08.051Z"
}
```

**Create Video**

```
POST /video
```

*Payload*

Required: title, link
Optional: description

*Response*

Status code 201 if Video was created successfully.

**Edit Video**

```
PUT /video/:id
```

*Response*

Status code of 200 if update was successful.

**Delete Video**

```
DELETE /video/:id
```

*Response*

Status code 200 if delete was successful.


### Image <a id="image"></a>

Image content in the form of a URL that points to a image resource.

**List all Images for a given Artifact**

```
GET /artifact/image/:id
```
In this case, the *id* parameter refers to the id parameter of an *artifact*

*Response*

```
{
    "images": [
        {
            "id": 1,
            "title": "Who is Vader?",
            "description": "A picture depicting who is this vader whos existance we are celebrating",
            "link": "http://wersm.com/wp-content/uploads/2013/12/3474964-darth-vader.jpg",
            "createdAt": "2015-03-31T18:58:08.047Z",
            "updatedAt": "2015-03-31T18:58:08.047Z"
        }
    ]
}
```

**Single Image**

```
GET /image/:id
```
*Response*

```
{
    "id": 1,
    "title": "Who is Vader?",
    "description": "A picture depicting who is this vader whos existance we are celebrating",
    "link": "http://wersm.com/wp-content/uploads/2013/12/3474964-darth-vader.jpg",
    "createdAt": "2015-03-31T18:58:08.047Z",
    "updatedAt": "2015-03-31T18:58:08.047Z"
}
```

**Create Image**

```
POST /image
```

*Payload*

Required: title, link
Optional: description

*Response*

Status code 201 if Image was created successfully.

**Edit Image**

```
PUT /image/:id
```

*Response*

Status code of 200 if update was successful.

**Delete Image**

```
DELETE /image/:id
```

*Response*

Status code 200 if delete was successful.

### Archive <a id="archive"></a>

**List all Archives for a given Artifact**

```
GET /artifact/archive/:id
```
In this case, the *id* parameter refers to the id parameter of an *artifact*

*Response*

```
{
    "archives": [
        {
            "id": 1,
            "title": "Memoirs of Vader",
            "description": "A journey into the life and death of Darth Vader",
            "link": "http://www.starwars.com/databank/darth-vader",
            "createdAt": "2015-03-31T18:58:08.050Z",
            "updatedAt": "2015-03-31T18:58:08.050Z"
        }
    ]
}
```

**Single Archive**

```
GET /archive/:id
```
*Response*

```
{
    "id": 1,
    "title": "Memoirs of Vader",
    "description": "A journey into the life and death of Darth Vader",
    "link": "http://www.starwars.com/databank/darth-vader",
    "createdAt": "2015-03-31T18:58:08.050Z",
    "updatedAt": "2015-03-31T18:58:08.050Z"
}
```

**Create Archive**

```
POST /archive
```

*Payload*

Required: title, link
Optional: description

*Response*

Status code 201 if Archive was created successfully.

**Edit Archive**

```
PUT /archive/:id
```

*Response*

Status code of 200 if update was successful.

**Delete Archive**

```
DELETE /archive/:id
```

*Response*

Status code 200 if delete was successful.

### Events <a id="events"></a>

Events represent actuall events that are handled by the MuSA museum.

**Security**

Events can only be created, edited or deleted by an Administrator user, requires authorization.

**List Events**

```
GET /events
```

*Parameters*

Available parameters are: *page, per_page, title*

*Response*

```
{
  "events": [
    {
      "id": 2,
      "title": "Vader Exhibition",
      "description": "An exhibition showing Cesarangelos best Vader portraits",
      "eventDate": "2015-05-02T07:24:00.000Z",
      "image": "http://somerandomeimage.com/vader.jpeg",
      "location": "http://arandomlocation.com",
      "author": 1,
      "createdAt": "2015-03-31T19:02:43.100Z",
      "updatedAt": "2015-03-31T19:02:43.100Z"
    }
  ]
}
```

**Single Event**

```
GET /events/:id
```

*Response*



**Request**

```
GET /events/:id
```

*Response*

```
{
  "id": 2,
  "title": "Vader Exhibition",
  "description": "An exhibition showing Cesarangelos best Vader portraits",
  "eventDate": "2015-05-02T07:24:00.000Z",
  "image": "http://adsoftheworld.com/sites/default/files/styles/media_retina/public/images/sta-002_portfolio_darthv_ang_lr_1.jpg?itok=98Knqo57",
  "location": "http://adsoftheworld.com/sites/default/files/styles/media_retina/public/images/sta-002_portfolio_darthv_ang_lr_1.jpg?itok=98Knqo57",
  "author": 1,
  "createdAt": "2015-03-31T19:02:43.100Z",
  "updatedAt": "2015-03-31T19:02:43.100Z"
}
```

**Create an Event**

```
POST /events
```

*Payload*

Required: title, description, eventDate
Optional: image, location, author

*Response*

Status code of 201 is entity created successfully.

**Edit Event**

```
PUT /events/:id
```

*Response*

Status code of 200 if entity updated successfully.

**Delete**

```
DELETE /events/:id
```

*Response*

Status code of 200 is delete was successful.

### News <a id="news"></a>

News represent articles created or related to the MuSA.

**Security**

News can only be created, edited or deleted by an Administrator user, requires authorization.

**List News**

```
GET /news
```

*Parameters*

Available parameters are: *page, per_page, title*

*Response*

```
{
    "news": [
        {
            "id": 3,
            "title": "New Dahli Exhibition",
            "description": "An Exhibition by renowned artist Salvador Dahli",
            "image": null,
            "AdministratorId": null,
            "createdAt": "2015-04-18T16:15:13.282Z",
            "updatedAt": "2015-04-18T16:16:42.856Z"
        },
        {
            "id": 1,
            "title": "MuSA Café",
            "description": "Museum of Art from the University of Puerto Rico Mayagüez Campus is proud to invite you to the MuSA Café Openning",
            "image": "http://media.zenfs.com/en-US/video/video.pd2upload.com/video.yahoofinance.com@0c15ac80-566c-3267-897f-982c3aaddf98_FULL.jpg",
            "AdministratorId": null,
            "createdAt": "2015-03-31T18:58:08.048Z",
            "updatedAt": "2015-04-18T16:16:42.856Z"
        }
    ]
}
```

**Single News**

```
GET /news/:id
```

*Response*

{
    "id": 1,
    "title": "MuSA Café",
    "description": "Museum of Art from the University of Puerto Rico Mayagüez Campus is proud to invite you to the MuSA Café Openning",
    "image": "http://media.zenfs.com/en-US/video/video.pd2upload.com/video.yahoofinance.com@0c15ac80-566c-3267-897f-982c3aaddf98_FULL.jpg",
    "AdministratorId": null,
    "createdAt": "2015-03-31T18:58:08.048Z",
    "updatedAt": "2015-04-18T16:16:42.856Z"
}

**Create News**

```
POST /news
```

*Payload*

Required: title, description, image
Optional: AdministratorId

*Response*

Status code of 201 is entity created successfully.

**Edit News**

```
PUT /news/:id
```

*Response*

Status code of 200 if entity updated successfully.

**Delete**

```
DELETE /news/:id
```

*Response*

Status code of 200 if delete was successful.

### Feedback <a id="feedback"></a>

Feedback represents messages sent from users to the musuem, regarding a topic which could be either a bug, a general comment or a content problem.

**Security**

Any user can create feedback content, to view, edit or destroy a feedback instance, administrator priviledges are required.

**List Feedback**

```
GET /feedback
```

*Parameters*

Available query parameters are: ***page, per_page, title, seen, type, resolved***

*Response*

```
{
    "feedbacks": [
        {
            "id": 1,
            "title": "Museum App",
            "message": "The museum apps are very awesome",
            "seen": false,
            "type": "general",
            "resolved": false,
            "MuseumId": 1,
            "createdAt": "2015-03-31T01:20:20.102Z",
            "updatedAt": "2015-03-31T01:20:20.102Z"
        }
    ]
}
```

**Single Feedback**

```
GET /feedback/:id
```

*Response*

```
{
    "feedbacks": [
        {
            "id": 1,
            "title": "Museum App",
            "message": "The museum apps are very awesome",
            "seen": false,
            "type": "general",
            "resolved": false,
            "MuseumId": 1,
            "createdAt": "2015-03-31T01:20:20.102Z",
            "updatedAt": "2015-03-31T01:20:20.102Z"
        }
    ]
}
```

**Creating feedback**

```
POST /feedback
```

*Payload*

Required: title, message, type, MuseumId
Optional: resolved, seen

*Response*

Status code of 201 if Feedback created successfully.

**Edit Feedback**

```
PUT /feedback/:id
```

*Response*

Status code of 200 if update was successful.

**Delete Feedback**

```
DELETE /feedback/:id
```

*Response*

Status code of 200 if delete was successful.

### Match Hunt <a id="match"></a>

Match hunt is a game that provides the User with a Clue, the user then tries to match this clue and is then rewarded with points.

**Getting a Clue**

```
GET /match/:id
```

This id attribute is provided to get either a particular Clue, or a Random Clue. If a *id == 0* a random Clue will be returned, else a Clue with the given *id* will be located.

*Response*

```
{
  "id": 1,
  "image": "https://randomsite.com/profile_images/3103894633/somerandomimage.jpeg",
  "pointsValue": 15,
  "createdAt": "2015-03-31T18:58:08.044Z",
  "updatedAt": "2015-03-31T18:58:08.043Z"
}
```

**Attempting a Match**

A match is attempted using a POST request, this will try to match a given clue to an artifact. 

```
POST /match
```

*Payload*

Required: UserId, ClueId, qrcode

*Response*

If the clue is solved with the provided answer, a status code of 200 will be returned. When the clue is already solved for a given user, a status code of 403 is returned.

### User <a id="user"></a>

Users are considered anyone who is a museum visitor that want to take part of the Museum Match Hunt.

**Get all Users**

```
GET /user
```

**Paramters**

Available query parameters are: *page, per_page, first_name, and email.*

*Response*

```
{
    "users": [
        {
            "id": 1,
            "email": "cesarcruz91@gmail.com",
            "firstName": "Cesar",
            "lastName": "Cruz",
            "gender": "male",
            "age_range": "10-30",
            "points": "0",
            "active": true,
            "facebook_id": null,
            "facebook_link": null,
            "accessToken": null,
            "createdAt": "2015-04-01T04:18:00.185Z",
            "updatedAt": "2015-04-17T04:37:15.059Z"
        },
        {
            "id": 2,
            "email": "jose.martinez60@upr.edu",
            "firstName": "Jose",
            "lastName": "Martinez",
            "gender": "male",
            "age_range": "10-30",
            "points": "0",
            "active": true,
            "facebook_id": null,
            "facebook_link": null,
            "accessToken": null,
            "createdAt": "2015-04-01T04:18:22.641Z",
            "updatedAt": "2015-04-17T04:37:15.059Z"
        }
    ]
}
```
**Single User**

```
GET /user/:id
```

*Response*

```
{
    "id": 1,
    "email": "cesar@musa.com",
    "firstName": "Cesar",
    "lastName": "Cruz",
    "gender": "male",
    "age_range": "10-30",
    "points": "0",
    "active": true,
    "facebook_id": null,
    "facebook_link": null,
    "accessToken": null,
    "createdAt": "2015-04-01T04:18:00.185Z",
    "updatedAt": "2015-04-17T04:37:15.059Z"
}
```

**Create a User**

Users are created using an Facebook Access Token.

*Payload*

Required: accessToken and userID (both acquired from facebook)

*Response*

After a user is successfully created, a status code of 200 is returned as well as a JWT token used to validate each request from the client. This token needs to be sent using the Authorization header in order to access the API

**Edit User**

Update information on a given user

```
PUT /user/:id
```

*Response*

Status code 200 if update was successful.

**Delete User**

```
DELETE /user/:id
```

*Response*

Status code of 200 is delete was successful.

**Get leaderboard**

Leaderboard is a list of users sorted based on their points total.

```
GET /leaderboard
```

*Parameters*

Available query parameters are; *page, per_page*

*Response*

```
{
    "leaderboard": [
        {
            "firstName": "Cesar",
            "lastName": "Cruz",
            "points": "200"
        },
        {
            "firstName": "Jose",
            "lastName": "Martinez",
            "points": "150"
        },
        {
            "firstName": "Luis",
            "lastName": "Medina",
            "points": "100"
        }
    ]
}
```

**Reset Leaderboard**

The reset leaderboards route allows admins to set all user points to 0, a clean slate for everyone.

```
PUT /leaderboard
```

*Response*

Status code of 200 if reset was successful.

### iBeacons <a id="beacon"></a>

The Museum makes use of iBeacons to identify collections of Artifacts (Exhibitions) within the MuSA.

**Security**

To add, edit or delete iBeacons, administrator priviledges are needed.

**List iBeacons**

```
GET /beacon
```

*Parameters*

Available query parameters are: *page, per_page, beacon_code*

*Response*

```
{
    "beacons": [
        {
            "id": 1,
            "code": "B558CBDA-4472-4211-A350-FF1196FFE8C8",
            "RoomId": 2,
            "createdAt": "2015-04-01T03:23:59.569Z",
            "updatedAt": "2015-04-01T03:23:59.569Z",
            "Room": {
                "id": 2,
                "name": "The Room",
                "description": "The Room with all the stuff",
                "createdAt": "2015-04-16T16:14:46.761Z",
                "updatedAt": "2015-04-16T16:14:46.761Z"
            }
        },
        {
            "id": 3,
            "code": "B9407F30-F5F8-466E-AFF9-25556B57FE6D12",
            "RoomId": 1,
            "createdAt": "2015-04-20T14:14:24.098Z",
            "updatedAt": "2015-04-20T14:14:24.098Z",
            "Room": {
                "id": 1,
                "name": "Agustin Stahl",
                "description": "In commemoration to the famous cientist, Agustin Stahl",
                "createdAt": "2015-03-31T18:58:08.049Z",
                "updatedAt": "2015-03-31T18:58:08.049Z"
            }
        }
    ]
}
```

**Single iBeacon**

```
GET /beacon/:id
```

*Response*
```
{
    "id": 1,
    "code": "B558CBDA-4472-4211-A350-FF1196FFE8C8",
    "RoomId": 2,
    "createdAt": "2015-04-01T03:23:59.569Z",
    "updatedAt": "2015-04-01T03:23:59.569Z"
}
```

**Create an iBeacon**

```
POST /beacon
```

*Payload*

required: code
optional: RoomId

*Response*

Status code of 201 if iBeacon was successfully created.

**Edit iBeacon**

```
PUT /beacon/:id
```

*Response*

Status code of 200 if successfully updated.

**Delete an iBeacon**

```
DELETE /beacon/:id
```

*Response*

Status code of 200 if iBeacons succeesfully deleted.

### Administrator <a id="administrator"></a>

Administrators are users in charge of managing the content of the MuSA API. Administrators are assigned by the Museum and can only be created by other administrators. 

**Security**

Administrator routes require de use of Administrator authentification, read Authentication section for more details.

**List Administrators**

```
GET /administrator
```

*Parameters*

Available parameters are: ***page, per_page, first_name, and email***

*Response*
```
{
    "administrators": [
        {
            "id": 1,
            "firstName": "Cesar",
            "lastName": "Cruz",
            "email": "sezal@musa.com",
            "phone": "7874526702"
        },
        {
            "id": 2,
            "firstName": "Cesar",
            "lastName": "Cruz",
            "email": "cesar@admin.com",
            "phone": null
        },
        {
            "id": 3,
            "firstName": "Luis",
            "lastName": "Medina",
            "email": "luis@musa.edu",
            "phone": null
        },
        {
            "id": 7,
            "firstName": "Cesar",
            "lastName": "Cruz",
            "email": "cesar@musa.com",
            "phone": null
        }
    ]
}
```

**Single Administrator**

```
GET /administrator/:id
```

*Response*

```
{
    "id": 7,
    "firstName": "Cesar",
    "lastName": "Cruz",
    "email": "cesar@musa.com",
    "phone": null
}
```

**Create an Administrator**

Create an instance of administrator, requires authentication

```
POST /administrator
```

*Payload*

Required: email, password
Optional (recomended): firstName, lastName, phone

*Response*

Server will respond with a status code of 201 if successful. 

**Edit an Administrator**

Edit values for a given administrator, using id.

```
PUT /administrator/:id
```

*Payload*

Updates to the administrator will be based on values provided, payload may include: email, password, firstName, lastName or phone. Which ever attribute is provided in the payload, that and only that attribute will be updated.

*Response*

Status code 200 if successful.

**Delete an Administrator**

```
DELETE /administrator/:id
```

*Response*

Status code of 200 if successful.

### Artist <a id="artist"></a>

Artifact artists

**Security**

Artists can only be created, edited or deleted by administrator users.

**List Artists**

```
GET /artists
```

*Parameters*

Available query parameters are: *page, per_page, and name*

*Response*

```
{
    "artists": [
        {
            "id": 1,
            "name": "César",
            "biography": "Nacido en el pueblo de Tatooine, se especializa en oleos",
            "birthDay": "1800",
            "createdAt": "2015-03-31T18:58:08.025Z",
            "updatedAt": "2015-03-31T18:58:08.025Z"
        }
    ]
}
```

**Single Artist**

```
GET /artists/:id
```

*Response*

```
{
    "id": 1,
    "name": "César",
    "biography": "Nacido en el pueblo de Tatooine, se especializa en oleos",
    "birthDay": "1800",
    "createdAt": "2015-03-31T18:58:08.025Z",
    "updatedAt": "2015-03-31T18:58:08.025Z"
}
```

**Creating Artist**

```
POST /artists
```

*Payload*

Required: name
Optional: biography, and birthDay

*Response*

Status code of 201 if Artist created successfully.

**Edit Artist**

```
PUT /artist/:id
```

*Response*

Status code of 200 if update was successful.

**Delete Artist**

```
DELETE /artist/:id
```

*Response*

Status code of 200 if delete was successful.






