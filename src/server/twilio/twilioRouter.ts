import { Router } from 'express';
import { smsTwilioReply } from './handlers/greeting';

const router = Router();

router.post('/webhook', smsTwilioReply);

export default router;