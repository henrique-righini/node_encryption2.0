var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var crypto = require("crypto");
var fs = require('fs'); 


    app.use(bodyParser.json());
    app.post("/login", function(request, response) {

      
        privateKey = fs.readFileSync('priv.key').toString();
        //chave deve ser guardada em local seguro

        let user = new Buffer.from(request.body.user, 'base64');
    
        const decryptedUser = crypto.privateDecrypt(
            {
		    key: privateKey,
		    padding: crypto.constants.RSA_PKCS1_PADDING,
	        },
            user
        );
        


        let pass = Buffer.from(request.body.pass, 'base64');

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