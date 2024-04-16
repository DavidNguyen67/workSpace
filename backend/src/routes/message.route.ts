import express from 'express';
import { createMessage, getMessage } from '../controllers/message.controller';
import { cookieJwtAuth } from '../middlewares/cookieJwtAuth';

const router = express.Router();

router.post('/', cookieJwtAuth, createMessage);
router.get('/:messageId', cookieJwtAuth, getMessage);

export default router;
