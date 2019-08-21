import { Router } from 'express';

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
  const user = await req.context.models.User.findAll({
    where:{
      username: email, password: password
    }
  });

  return res.send(user);
});

export default router;