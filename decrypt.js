var express = require("express");
var myParser = require("body-parser");
var app = express();
var crypto = require("crypto");
var fs = require('fs'); 
 
   app.use(myParser.urlencoded({extended : true}));
   app.post("/login", function(request, response) {
    
    privateKey = fs.readFileSync('priv.key').toString();
    const decryptedData = crypto.privateDecrypt(privateKey, request.body)
});

//Start the server and make it listen for connections on port 8080
app.listen(8080)