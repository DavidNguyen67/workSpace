import express from 'express';
import {
  findUser,
  findUsers,
  loginUser,
  registerUser,
} from '../controllers/user.controller';
import { cookieJwtAuth } from '../middlewares/cookieJwtAuth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/find/:id', cookieJwtAuth, findUser);
router.get('/', cookieJwtAuth, findUsers);

export default router;
