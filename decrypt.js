var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var crypto = require("crypto");
var fs = require('fs'); 


    app.use(bodyParser.json());
    app.post("/login", function(request, response) {
       //console.log(request.body.user);
       //console.log(request.body.pass);
      
    privateKeyTxt = fs.readFileSync('priv.key').toString();
    privateKey = create.privateKey(privateKeyTxt);
    //conferir objeto de chave privada
    console.log(privateKey);
   
    let user = new Buffer(request.body.user, 'base64');
    
    const decryptedUser = crypto.privateDecrypt(
        {
		key: privateKey,
		padding: crypto.constants.RSA_PKCS1_OAEP_mgf1,
		oaepHash: "sha256",
	    },
        user
    );

    let pass = Buffer.from(request.body.pass, 'utf-8');
    console.log(pass.toString('utf-8'));
    const decryptedPassword = crypto.privateDecrypt(privateKey, pass);

    });


    app.listen(8080);
    //console.log('funciona');

