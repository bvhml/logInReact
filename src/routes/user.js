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

router.post('/log-in', async (req, res) => {
  const {email,password} = req.body;
  const saltRounds = 10;
  
  bcrypt.hash(password, saltRounds,(err, hash) => {
    req.context.models.User.findOne({
      where:{
        username: email, password: password
      },
      attributes: ['id','username']
    }).then((user) => {
      console.log("User found: ", user);
      res.json("Login Correcto");
      return res.send(user);
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
        password: password,
        nombre:nombre,
        apellido:apellido,
      },
    ).then((user) => {
      console.log("User created: ", user);
      res.json("Login Correcto");
      return res.send(user);
    })
    
  });
});
export default router;