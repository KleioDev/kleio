# MuSA API

### Overview

* [Current Version Description](#description)
* [Schema](#schema)
* [Content](#content)
* [API Routes Definition](#api-routes)
	* [Museum](#museum)
	* [Exhibitions](#exhibitions)
	* [Artifacts](#artifacts) 
	* [Media Content](#media)
		* [Audible](#audible)
		* [Video](#video)
		* [Image](#image)
		* [Archive](#archive)
	* [User](#user)
	* [Events](#events)
	* [News](#news)
	* [Feedback](#feedback)
	* [Match Hunt](#match)
* [Errors](#errors)

### Current Version Description <a id="description"></a>

The purpose of this API is fascilitating information to the MuSA mobile applications. The Museum of the University of Puerto Rico, Mayagüez Campus (MuSA) will allow students to browse all the collections of the museum from the comfort of their smartphone. A few extras are provided for users that make use of the application while inside of the Museum. This API is currently in it's ***Beta*** version, bugs or complains are more than welcomed.

### Schema <a id="schema"></a>

This API follows a *flat* schema for all requests. For example:

```
GET /museum?page=2
```
Will result in a requests for all museums, starting at the second paginataion page. More on this on [API Routes Definition](#api-routes)

### Content <a id="content"></a>

Communication to and from the API server will happen through the use of HTTP Verbs and using JSON data, for both response and requests.

### API Routes Definition <a id="api-routes"></a>

Functionality is broken up into several components. Each components will have similar URL structure. Components are as follows:

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