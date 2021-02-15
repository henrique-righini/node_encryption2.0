const express = require('express');
const cors = require('cors');
const {body} = require('express-validator');
const bodyParser = require("body-parser");
const app = express();
const crypto = require('crypto');
const fs = require('fs'); 

    app.use(cors());
    app.use(express.json());
    app.post(
        '/login',  
        body('login').blacklist('!@#$%^&*(){}[]/?<>"'),
        //descobrir como fazer blacklist pois .escape() quebra a criptografia
        function(request, response) {

        console.log(request.body);

        privateKey = fs.readFileSync('priv.key').toString();
        //chave deve ser guardada em local seguro

        let login = new Buffer.from(request.body.login, 'base64');
        //input para descriptografar deve ser do tipo Buffer
        //console.log(login)
        const decryptedUser = crypto.privateDecrypt(
            {
		    key: privateKey,
		    padding: crypto.constants.RSA_PKCS1_PADDING,
	        },
            login
        );
        
        var obj = JSON.parse(decryptedUser);
         console.log(obj);
         response.json(obj);
    
    });

    app.post('/debugger', function(request, response) {

        let debug = request.body.login;

        response.json(JSON.stringify('esta aplicacao esta sendo debugada' , debug) );
        
        console.log('debugger');
    });

    app.listen(8080);