import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();
// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('rwieruch'),
  };
  next();
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

  app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      password: 'rwieruch',
    },
  );

  await models.User.create(
    {
      username: 'ddavids',
    },
  );
  console.log("Creation done");
};

