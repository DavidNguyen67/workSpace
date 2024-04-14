import express from 'express';
import {
  findUser,
  findUsers,
  loginUser,
  registerUser,
} from '../controllers/user.controller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/find/:id', findUser);
router.get('/', findUsers);

export default router;
