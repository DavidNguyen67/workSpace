import express from 'express';
import {
  createRoom,
  findUserRoom,
  findUsersRoom,
} from '../controllers/room.controller';
import { cookieJwtAuth } from '../middlewares/cookieJwtAuth';

const router = express.Router();

router.post('/', createRoom);
router.get('/:userId', cookieJwtAuth, findUserRoom);
router.get('/find/:firstUserId/:secondUserId', cookieJwtAuth, findUsersRoom);

export default router;
