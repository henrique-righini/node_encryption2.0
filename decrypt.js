const express = require('express');
const cors = require('cors');
const {body} = require('express-validator');
const bodyParser = require("body-parser");
const app = express();
const crypto = require('crypto');
const fs = require('fs'); 


    app.use(cors());
    app.options('*', cors());
    app.use(express.json());
    app.post(
        '/login',  
 
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

    app.get('/crypto', function(request, response) {
        response.writeHead(200, { 'content-type': 'text/html' })
        fs.createReadStream('front.html').pipe(response)
        
    });

    app.listen(8080);
    console.log("fala que eu te escuto");