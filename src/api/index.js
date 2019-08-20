const express = require("express");
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:NAC4VDH6@localhost:5432/tecgt");

db.one("SELECT $1 AS value", 123)
    .then(function (data) {
        console.log("DATA:", data.value);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let usuario = {
 nombre:'',
 apellido: ''
};
let respuesta = {
 error: false,
 codigo: 200,
 mensaje: ''
};



app.post('/usuario', function (req, res) {
    if(!req.body.nombre || !req.body.apellido) {
     respuesta = {
      error: true,
      codigo: 502,
      mensaje: 'Username and Password required.'
     };
    } else {
     if(usuario.nombre !== '' || usuario.apellido !== '') {
      respuesta = {
       error: true,
       codigo: 503,
       mensaje: 'The user had been created previously, try with a different username.'
      };
     } else {
      usuario = {
       nombre: req.body.nombre,
       apellido: req.body.apellido
      };
      respuesta = {
       error: false,
       codigo: 200,
       mensaje: 'User created successfully.',
       respuesta: usuario
      };
     }
    }
    
    res.send(respuesta);
   });

   app.get('/', function (req, res) {
    
      
      respuesta = {
       error: false,
       codigo: 200,
       mensaje: 'GET OK'
      };
    
    
    
    res.send(respuesta);
   });
   

app.listen(80, () => {
 console.log("PORT: 80, press Ctrl + C to stop server.");
});