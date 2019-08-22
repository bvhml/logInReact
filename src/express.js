import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { sequelize } from './models';
import routes from './routes';


const app = express();

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  const { email, password } = req.body;

  req.context = {
    models,
    me: await models.User.findByLogin(email||'',password||''),
  };

  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});


const jwtMW = exjwt({
  secret: 'meg the cat'
  });



// Routes

app.use('/session', routes.session);
app.use('/users', routes.user);
//app.use('/messages', routes.message);

// Start

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(process.env.EXPRESS_PORT, () =>
    console.log(`Listening on port ${process.env.EXPRESS_PORT}!`),
  );
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'byrito95@gmail.com',
      password: 'prueba',
      nombre:'Roberto',
      apellido:'Perez',
    },
  );

  await models.User.create(
    {
      username: 'victorh-morales@gmail.com',
      password: 'password',
      nombre:'Alejandro',
      apellido:'Morales',
    },
  );
  console.log("Creation done");
};

