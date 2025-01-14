import { Router } from 'express';
import { smsReplyGreeting } from './handlers/greeting';

const router = Router();

router.post('/webhook', smsReplyGreeting);

export default router;