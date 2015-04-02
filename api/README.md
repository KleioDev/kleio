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
GET /museum?page=page_number
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







