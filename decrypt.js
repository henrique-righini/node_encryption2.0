var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var crypto = require("crypto");
var fs = require('fs'); 
 
   app.use(bodyParser.json());
   app.post("/login", function(request, response) {
       console.log(request.body.user);
       console.log(request.body.pass);
    
    //privateKey = fs.readFileSync('priv.key').toString();
//const decryptedData = crypto.privateDecrypt(privateKey, request.body)
});

//Start the server and make it listen for connections on port 8080
app.listen(8080)