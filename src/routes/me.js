import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  console.log("/me API Runned");
  
   res.json({
    status:200,
    success: true,
    message:"/me",
  });

});

export default router;