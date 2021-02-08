var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var crypto = require("crypto");
var fs = require('fs'); 


    app.use(bodyParser.json());
    app.post("/login", function(request, response) {
      // console.log(request.body.user);
      // console.log(request.body.pass);
      
        privateKey = fs.readFileSync('priv.key').toString();
        privateKey = crypto.createPrivateKey(privateKey);
        //conferir objeto de chave privada
        //console.log(privateKey);
   
        //console.log(request.body.user);

        let user = new Buffer.from(request.body.user, 'base64');
    
        //console.log(user.toString());
    
        const decryptedUser = crypto.privateDecrypt(
            {
		    key: privateKey,
		    padding: crypto.constants.RSA_PKCS1_PADDING,
		    //oaepHash: "sha1",
	        },
            user
        );
        

        let pass = Buffer.from(request.body.pass, 'base64');
        // console.log(pass.toString('utf-8'));
        const decryptedPassword = crypto.privateDecrypt(
            {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PADDING, 
            },
            pass
        );

        user = decryptedUser.toString();
        pass = decryptedPassword.toString();
    
        response.json({usernameDecrypted : user, passDecrypted : pass});
    
    });


    app.listen(8080);
    //console.log('funciona');

