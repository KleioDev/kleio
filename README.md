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

1. `POST /authenticate` with valid parameters
2. Upon successful authentification, the server will respond with a Token, store this token for further requests

Each request to a protected route will need to contain the Authorization header, providing the token.


### Models <a id="models"></a>

Information on the model schema for this project is provided [here]()



