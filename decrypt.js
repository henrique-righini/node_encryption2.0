const express = require("express");
const {validate} = require("express-validator")
const bodyParser = require("body-parser");
const app = express();
const crypto = require("crypto");
const fs = require('fs'); 


    app.use(bodyParser.json());
    app.post("/login", function(request, response) {

        console.log(request.body);
        validate.('login').escape();
        console.log(request.body);
        
        privateKey = fs.readFileSync('priv.key').toString();
        //chave deve ser guardada em local seguro

        let user = new Buffer.from(request.body.user, 'base64');
        //input para descriptografar deve ser do tipo Buffer
    
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