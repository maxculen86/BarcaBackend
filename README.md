# BarcaBackend
Backend Assesment for Barcelona company

This node.js app was created following the requierements on https://www.dropbox.com/sh/gfqisikrhuslbu0/AADUE52toTZKPjM6AHmNrkKMa?dl=0&file_subpath=%2FBackend_developer_assessment_NODEJS.pdf&preview=Assessment+full+stack.zip

- To run this app it requieres to have installed the las node js version
  For install please follow the instructions listed on the official site:
  https://nodejs.org/en/
  
- List of libraries/framework used:
  * Express:
    . Official site: 
      https://expressjs.com/
    . On project root folder run:
      $ npm install express --save
      
  * Request promisses:
    . Official site: 
      https://www.npmjs.com/package/request#promises--asyncawait
      
    . On project root folder run:
      $ npm i request
    
  * Json Query:
    . Official site: 
      https://www.npmjs.com/package/json-query
      
    . On project root folder run:
      $ npm i json-query
      
#Running App

- In order to test the app please in command promnt run node index.js

By default server will be listening 3000 port.
On your browser please enter:

-- Get user data filtered by user id:
http://localhost:3000/api/clients/getbyid/"REQUESTED_ID"
EX:
http://localhost:3000/api/clients/getbyid/a0ece5db-cd14-4f21-812f-966633e7be86


-- Get user data filtered by user name
http://localhost:3000/api/clients/getbyname/"REQUESTED_NAME"
EX:
http://localhost:3000/api/clients/getbyname/Britney


-- Get list of policies linked to a user name
http://localhost:3000/api/clients/getpoliciesbyname/"REQUESTED_NAME"
EX:
http://localhost:3000/api/clients/getpoliciesbyname/Britney


-- Get user linked to a police number
http://localhost:3000/api/clients/getuserbypolicy/"REQUESTED_POLICIEID"
EX:
http://localhost:3000/api/clients/getuserbypolicy/64cceef9-3a01-49ae-a23b-3761b604800b

While running please check on your terminal for log information



