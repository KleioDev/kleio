# Musa Server

Service the set of applications for the Museum of Art for the UPRM.

### Installation

1. Git clone this repository
2. `npm install`
3. `npm start`

The server needs a coonection to a PG Database, details for this database can be found in the **config.json** file. Migrations are located in the **db** folder. 

### API

The MuSA API is meant to serve information to the MuSA set of mobile applications. More information on the API can be found [here](https://github.com/KleioDev/musa/tree/master/api)

### Admin WebApp

Administrator web application to manage the content for the mobile applications. More information can be seen [here](https://github.com/KleioDev/musa/tree/master/admin)