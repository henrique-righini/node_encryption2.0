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
        console.log(login)
        const decryptedUser = crypto.privateDecrypt(
            {
		    key: privateKey,
		    padding: crypto.constants.RSA_PKCS1_PADDING,
	        },
            login
        );
        
        // let pass = Buffer.from(request.body.pass, 'base64');

        // const decryptedPassword = crypto.privateDecrypt(
        //     {
        //     key: privateKey,
        //     padding: crypto.constants.RSA_PKCS1_PADDING, 
        //     },
        //     pass
        // );
        var obj = JSON.parse(decryptedUser);
        logindec = decryptedUser.toString();
        var obj1 = JSON.parse(logindec);
        // pass = decryptedPassword.toString();
        console.log(JSON.stringify(logindec))
        // response.json({Decrypted : JSON.stringify(logindec) });
         response.json(JSON.stringify(logindec) );
    
    });

    app.post("/debugger", function(request, response) {

        let debug = request.body.login;

        response.json(JSON.stringify("esta aplicacao esta sendo debugada" , debug) );
        
        console.log("debuuger");
    });


    app.listen(8090);