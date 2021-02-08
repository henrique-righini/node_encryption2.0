var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var crypto = require("crypto");
var fs = require('fs'); 


    app.use(bodyParser.json());
    app.post("/login", function(request, response) {
      // console.log(request.body.user);
      // console.log(request.body.pass);
      
    privateKeyTxt = fs.readFileSync('priv.key').toString();
    privateKey = crypto.createPrivateKey(privateKeyTxt);
    //conferir objeto de chave privada
    //console.log(privateKey);
   
    let user = new Buffer.from(request.body.user, 'base64');
    
    console.log(user);
    
    const decryptedUser = crypto.privateDecrypt(
        {
		key: privateKey,
		padding: crypto.constants.RSA_PKCS1_PADDING,
		//oaepHash: "sha1",
	    },
        user
    );
        console.log(user.toString);

    let pass = Buffer.from(request.body.pass, 'utf-8');
   // console.log(pass.toString('utf-8'));
    const decryptedPassword = crypto.privateDecrypt(privateKey, pass);

    });


    app.listen(8080);
    //console.log('funciona');

