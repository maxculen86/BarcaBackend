//Using Express
const express = require('express');
const app = express();

//Using request promises
var request = require('request-promise');

//User JSON query for getting data from requested API
var jsonQuery = require('json-query');

//Setting Up app and local server
app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port ${port}...`))

//Requesting client API
request({
    method:"GET", 
    uri: "http://www.mocky.io/v2/5808862710000087232b75ac",
    json: true,
}).then(function(apiclients){
    var data = apiclients;
    
    //Get clients by ID
    app.get('/api/clients/getbyid/:id',(req, res) => {
        const query = jsonQuery(['clients[id=?]',req.params.id], {
            data:data
        });

        //If query fails...
        if (!query) res.status(404).send('The client with the given ID was not found')
        
        //If OK, then...
        console.log(query.value);
        res.send(query.value);
    });
    
    //Get clients by name
    app.get('/api/clients/getbyname/:name',(req, res) => {
        const query = jsonQuery(['clients[name=?]',req.params.name], {
            data:data
        });

        //If query fails...
        if (!query) res.status(404).send('The client with the given name was not found')
        
        //If OK, then...
        console.log('### Client data for given name ###');
        console.log(query.value);
        res.send(query.value);
    });
    
    //Get policies linked to a user name
    app.get('/api/clients/getpoliciesbyname/:name',(req, res) => {
        //Quering the clients response
        const clientquery = jsonQuery(['clients[name=?]',req.params.name], {
            data:data
        }).value;

        //If query fails...
        if (!clientquery) res.status(404).send('The client with the given name was not found');
        
        //Checking user roles
        if (clientquery.role != 'admin') {
            console.log('### The client has no permissions ###');
            res.status(404).send('Client has no permissions for the data');
            process.exit(1);
        }
        
        //If OK, then...
        console.log('### Client requested data... ###')
        console.log(clientquery);
        console.log('### Policies linked to a given name ###');
        console.log('Getting Policies...');

        //Then request policies API
        request({
            method:"GET", 
            uri: "http://www.mocky.io/v2/580891a4100000e8242b75c5",
            json: true,
        }).then(function(apipolicies){
            var data = apipolicies;
            //Query policies by the id from the current
            console.log('* Policies getted');
            console.log('* ClientID for client requested:');
            console.log(clientquery.id);
            const poliquery = jsonQuery(['policies[clientId=?]',clientquery.id], {
                data:data
            }).value;

            //If query fails...
            if (!poliquery) res.status(404).send('Not policies found linked to the given name');
            
            //If OK, then...
            console.log('### Policies query ###');
            console.log(poliquery);
            res.send(poliquery);
        });
    });
    //Get user linked to a policy number
    request({
        method:"GET", 
        uri: "http://www.mocky.io/v2/580891a4100000e8242b75c5",
        json: true,
    }).then(function(apipolicies){
        app.get('/api/clients/getuserbypolicy/:id',(req, res) => {
            //Quering the clients response
            var data = apipolicies;
            console.log('### Getting user by policies ###');
            console.log('* Policies getted!');
            console.log('* PolicieID for client requested:');
            console.log(req.params.id);
            const pquery = jsonQuery(['policies[id=?]',req.params.id], {
                data:data
            }).value;

            //If query fails...
            if (!pquery) res.status(404).send('The policie with the given id was not found');
            
            //If OK, then...
            console.log('* Obtained Client ID:');
            console.log(pquery.clientId);

            //Quering the clients response
            var data = apiclients;
            const clientquery = jsonQuery(['clients[id=?]',pquery.clientId], {
                data:data
            }).value;

            //If query fails...
            if (!clientquery) res.status(404).send('No clients were found');

            //If OK, check user roles..
            if (clientquery.role != 'admin') {
                console.log('### Client has no permissions ###');
                res.status(404).send('Client has no permissions to access');
                process.exit(1);
            }

            //If OK, then...
            console.log('### User linked to a given name ###');
            console.log(clientquery );
            res.send(clientquery);
        });
    });
})
.catch(function(error){
    console.log(error)
})