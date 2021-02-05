var express = require("express");
var myParser = require("body-parser");
var app = express();
var crypto = require("crypto");
 
   app.use(myParser.urlencoded({extended : true}));
   app.post("/login", function(request, response) {

    const decryptedData = crypto.privateDecrypt(
	{
		key: privateKey,
		// In order to decrypt the data, we need to specify the
		// same hashing function and padding scheme that we used to
		// encrypt the data in the previous step
		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		oaepHash: "sha256",
	},
	request.body
)
       //console.log(request.body); //This prints the JSON document received (if it is a JSON document)
});

//Start the server and make it listen for connections on port 8080
app.listen(8080)