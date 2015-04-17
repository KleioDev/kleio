# MuSA API

### Overview

* [Current Version](#version)
* [Schema](#schema)
* [Parameters](#parameters)
* [Errors](#errors)
* [Authentication](#tests)
* [Models] (#models)
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

1. 'POST /authenticate' with valid parameters
2. Upon successful authentification, the server will respond with a Token, store this token for further requests

Each request to a protected route will need to contain the Authorization header, providing the token.


### Models <a id="models"></a>

Information on the model schema for this project is provided [here]()

### Museum <a id="museum"></a>

Information reagarding the museum will be handles under the museum URL structure:

```
GET /museum
```
This will return the Museum's general information, as a JSON object, including:

```
{
  "name": "Museo de Arte De La Universidad de Puerto Rico en Mayagüez",
  "description": "El Colegio de Mayagüez se enorgulleze en presentar el Museo de Arte de la universidad de Puerto Rico",
  "hoursOfOperation": "Lunes a Viernes de 8:00AM a 10:00PM",
  "email": "musa@upr.edu",
  "phone": "787878787",
  "image": "http://i.imgur.com/KN4vh.jpg",
  "location": "http://i.imgur.com/KN4vh.jpg",
  "terms": "No bregues mal",
  "about": "Establecido en Junio 2015"
}
```
### Exhibitions <a id="exhibitions"></a>

Requests regarding museum exhibitions. An exhibition is a *related* collection of artifacts.

```
GET /exhibition?page=page_number
```

Will return a list of 25 exhibitions, sorted in a descending fashion by **most recently updated**. The **page** query parameter is used as an offset to receive a certain page. Each Exhibition entity within the list will contain title, image and description attributes.

```
{
  "exhibitions": [
    {
      "image": "http://i.imgur.com/KN4vh.jpg",
      "title": "Vader",
      "description": "An exhibition showing Cesarangelos best Vader portraits"
    }
  ]
}
```
#### Exhibition - Artifacts View

View all the artifacts for a single exhibitions

```
GET /exhibition/:id
```
An exhibition is selected based on it's **id** parameter.

```
{
  "id": 1,
  "title": "Vader",
  "description": "An exhibition showing Cesarangelos best Vader portraits",
  "image": "http://i.imgur.com/KN4vh.jpg",
  "active": true,
  "MuseumId": 1,
  "createdAt": "2015-03-31T18:58:08.046Z",
  "updatedAt": "2015-03-31T18:58:08.046Z"
}
```

#### Exhibitions - Near Me

Find all exhibitions which can be found near the user's physicall location. This is done using iBeacons.

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
Essentially concatinating ibeacon codes as needed. The result should be:

```
{
  "exhibitions": [
    {
      "id": 1,
      "title": "Vader",
      "description": "An exhibition showing Cesarangelos best Vader portraits",
      "image": "http://i.imgur.com/KN4vh.jpg",
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

### Artifacts <a id="artifacts"></a>

An artifact is essentially any art piece within the Museum. 

Request URL:

```
GET /artifact?page=page_number
```
Response:

A list of artifacts. Pagination is used so only 25 artifacts are receieved at a given time. The page request query parameter can be used to fetch a different page:

```
{
  "artifacts": [
    {
      "image": "https://scontent-atl.xx.fbcdn.net/hphotos-xfa1/v/l/t1.0-9/399196_1405515439661511_227192283_n.jpg?oh=e9ecb5131e950c53bb2ae70c3e42a58e&oe=55B5F870",
      "title": "Hope Vader",
      "description": "Darth Vader posing as the famous 2008 Obama hope poster",
      "id": 2
    }
  ]
}
```

#### Artifacts - Single Artifact

Get a single artifact using and id.

**Request:**

```
GET /artifact/:id
```
**Response:**

The response will include all the information for a given artifact and also include lists of all it's related content, separated by content type.

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
  "qrcode": "https://scontent-atl.xx.fbcdn.net/hphotos-xfa1/v/l/t1.0-9/399196_1405515439661511_227192283_n.jpg?oh=e9ecb5131e950c53bb2ae70c3e42a58e&oe=55B5F870",
  "createdAt": "2015-03-31T19:02:43.088Z",
  "updatedAt": "2015-03-31T19:02:43.088Z",
  "Videos": [
    {
      "id": 1,
      "title": "Volkswagon Vader Commercial",
      "description": "Vader Commercial",
      "link": "https://www.youtube.com/watch?v=R55e-uHQna0",
      "createdAt": "2015-03-31T18:58:08.051Z",
      "updatedAt": "2015-03-31T18:58:08.051Z",
      "ArtifactVideo": {
        "id": 1,
        "ArtifactId": 2,
        "VideoId": 1,
        "createdAt": "2015-03-31T21:22:54.701Z",
        "updatedAt": "2015-03-31T21:22:54.701Z"
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
        "id": 1,
        "ArtifactId": 2,
        "AudibleId": 1,
        "createdAt": "2015-03-31T21:22:54.689Z",
        "updatedAt": "2015-03-31T21:22:54.689Z"
      }
    }
  ],
  "Images": [
    {
      "id": 1,
      "title": "Who is Vader?",
      "description": "A picture depicting who is this vader whos existance we are celebrating",
      "link": "http://wersm.com/wp-content/uploads/2013/12/3474964-darth-vader.jpg",
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
      "link": "http://www.starwars.com/databank/darth-vader",
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
  ]
}
```

### Media Content <a id="media"></a>

Media Content are pieces of information in the form of *images, audibles, videos or archives* that are related somehow to an artifact and as so, are presented alongside the artifact. As was previously mentioned, the media content is delieved once a single artifact is retrieved. 

### Audible <a id="audible"></a>

This refers to contant that is distributed by means of audio files. For now, this content can only be delived by means of a URL that locates the actual content. As of this version, only content related to an existing artifact can be shown.

**Request**

```
GET /artifact/audible/:id?page=page_number
```
In this case, the *id* parameter refers to the id parameter of an *artifact*

**Response**

A list of all the audibles for a given artifact.

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

#### Audible - Single Audible

Get a single audible content, based on it's id attribute.

**Request**

```
GET /audible/:id
```
**Response**

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
### Video <a id="video"></a>

Video content in the form of a URL that points to a video resource.

**Request**

```
GET /artifact/video/:id?page=page_number
```

**Response**

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

#### Video - Single Video

Get a single video content, based on it's id attribute.

**Request**

```
GET /video/:id
```
**Response**

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

### Image <a id="image"></a>

Image content in the form of a URL that points to a image resource.

**Request**

```
GET /artifact/image/:id?page=page_number
```

**Response**

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

#### Image - Single Image

Get a single image content, based on it's id attribute.

**Request**

```
GET /image/:id
```
**Response**

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
### Archive <a id="archive"></a>

Archive content in the form of a URL that points to a archive resource.

**Request**

```
GET /artifact/archive/:id?page=page_number
```

**Response**

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

#### Archive - Single Archive

Get a single archive content, based on it's id attribute.

**Request**

```
GET /archive/:id
```
**Response**

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

### Events <a id="events"></a>

Get a list of Museum events, sorted by the most recently created.

**Request**

```
GET /events?page=page_number
```

**Response**

```
{
  "events": [
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
  ]
}
```

#### Event - Single Event

**Request**

```
GET /events/:id
```

**Response**

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

### News <a id="news"></a>

Get a list of all the news for the museum, sorted by date and time.

**Request**

```
GET /news?page=page_number
```

**Response**

```
{
  "news": [
    {
      "id": 1,
      "title": "MuSA Café",
      "description": "Museum of Art from the University of Puerto Rico Mayagüez Campus is proud to invite you to the MuSA Café Openning",
      "image": "http://media.zenfs.com/en-US/video/video.pd2upload.com/video.yahoofinance.com@0c15ac80-566c-3267-897f-982c3aaddf98_FULL.jpg",
      "AdministratorId": 1,
      "createdAt": "2015-03-31T18:58:08.048Z",
      "updatedAt": "2015-03-31T18:58:08.048Z"
    }
  ]
}
```

#### News - Single News

Get a single news article

**Request**

```
GET /news/:id
```

**Response**

```
{
  "id": 1,
  "title": "MuSA Café",
  "description": "Museum of Art from the University of Puerto Rico Mayagüez Campus is proud to invite you to the MuSA Café Openning",
  "image": "http://media.zenfs.com/en-US/video/video.pd2upload.com/video.yahoofinance.com@0c15ac80-566c-3267-897f-982c3aaddf98_FULL.jpg",
  "AdministratorId": 1,
  "createdAt": "2015-03-31T18:58:08.048Z",
  "updatedAt": "2015-03-31T18:58:08.048Z"
}
```

### Feedback <a id="feedback"></a>
A way for users to submit feedback to the museum

**Request**

```
POST /feedback
```


**Payload**

key | value
----|------
title | A String with the title of the provided feedback 
message | A String with the feedback content
type | A String representing the type of feedback, can be one of three; bug, general or content_problem

### Match Hunt <a id="match"></a>

Match hunt is a game that provides the User with a Clue, the user then tries to match this clue and is then rewarded with points.

####Getting a Clue

**Request**

```
GET /match/:id
```

This id attribute is provided to get either a particular Clue, or a Random Clue. If a *id == 0* a random Clue will be returned, else a Clue with the given *id* will be located.

**Response**

```
{
  "id": 1,
  "image": "https://pbs.twimg.com/profile_images/3103894633/e0d179fc5739a20308331b432e4f3a51_400x400.jpeg",
  "pointsValue": 15,
  "createdAt": "2015-03-31T18:58:08.044Z",
  "updatedAt": "2015-03-31T18:58:08.043Z"
}
```

#### Attempting a Match

A match is attempted using a POST request, this will try to match a given clue to an artifact. 

**Request**

```
POST /match
```

**Payload**

key | value
----|------
UserId | An Integer with the User's Id
ClueId | An Integer pertaining to the current Clue Id
qrcode | The scanned qrcode as a String

### User <a id="user"></a>

Get the leaderboard for the Museum, will give a sorted list of users based on their points total.

**Request**

```
GET /leaderboard
```

**Response**

```
{
  "leaderboard": [
    {
      "firstName": "Luis",
      "lastName": "Medina",
      "points": "500"
    },
    {
      "firstName": "Cesar",
      "lastName": "Cruz",
      "points": "200"
    },
    {
      "firstName": "Jose",
      "lastName": "Martinez",
      "points": "150"
    }
  ]
}
```

### iBeacons <a id="beacon"></a>

### Administrator <a id="administrator"></a>

