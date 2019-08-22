import { Router } from 'express';
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const jwtMW = exjwt({
  secret: 'meg the cat'
  });

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );
  return res.send(user);
});

router.post('/', async (req, res) => {
  const {email,password} = req.body;
  const saltRounds = 10;
  
  bcrypt.hash(password, saltRounds,(err, hash) => {
    req.context.models.User.findOne({
      where:{
        username: email
      },
      attributes: ['id','username','password','nombre','apellido']
    }).then((user) => {
      
      if (user === null) {
        res.status(400).json({
          sucess: false,
          token: null,
          message: 'Usuario/Password no son correctos',
          user:user
        });
      }
      else{

      bcrypt.compare(password, user.password, function(err, result) {
        if(result === true){
          console.log("Valid!");
          let token = jwt.sign({ id:user.id,nombre:user.nombre,apellido:user.apellido,username: user.username }, 'meg the cat', { expiresIn: 3600 }); // Signing the token
          res.json({
            sucess: true,
            err: null,
            token
          });
        }
        else {
          console.log("Entered Password and Hash do not match!");
          res.status(401).json({
            sucess: false,
            token: null,
            err: 'Entered Password and Hash do not match!',
            user:user
          });
        }
      });
    }
    })
  


    
  });
});

router.post('/register', async (req, res) => {
  const {email,password,nombre,apellido} = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds,(err, hash) => {
    req.context.models.User.create(
      {
        username: email,
        password: hash,
        nombre:nombre,
        apellido:apellido,
      },
    ).then((user) => {
      if (user === null) {
        res.status(400).json({
          sucess: true,
          token: null,
          err: 'Ha ocurrido un error al insertar nuevo usuario'
        });
      }
      else{
        res.status(200).json({
          sucess: true,
          token: null,
          msg: 'Creado con exito '
        });
      }
      
      
    })
    .catch(function(err) {
      // print the error details
      res.status(400).json({
        sucess: false,
        token: null,
        err: 'El Correo ya esta en uso'
      });
      //console.log(err, request.body.email);
  });
    
  });
});
export default router;