var express = require("express");
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();
var crypto = require("crypto");
var fs = require('fs'); 

    app.use(cors());
    //adicionado sem configuração alguma apenas para fins de PoC
    app.use(bodyParser.json());
    app.post("/login", function(request, response) {

      
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

    app.post("/debugger", function(request, response) {

        let debug = request.body.login;

        response.json(JSON.stringify("esta aplicacao esta sendo debugada" , debug) );
        
        console.log("debugger");
    });


    app.listen(8090);