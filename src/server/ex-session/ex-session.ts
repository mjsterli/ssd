import pg from 'pg';
import { Router } from 'express';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import url from 'url';
import { twiml } from 'twilio';

const router = Router();
const paramConfig = url.parse(process.env.DATABASE_URL);
const auth = paramConfig.auth.split(':');
const config = {
  user: auth[0],
  password: auth[1],
  host: paramConfig.hostname,
  port: paramConfig.port,
  database: paramConfig.pathname.split('/')[1],
  ssl: true
};

const pgPool = new pg.Pool(config);
const pSession = new pgSession(session);
router.use(session({
  store: new pSession({
    pool: pgPool,
    table_name: "user_sessions",
  }),
  secret: 'secret',
  resave: false,
  cookie: { maxAge: 10000 }
}));

const twilioReply = async(req, res) => {
  const smsResponse = new twiml.MessagingResponse();
  smsResponse.message(`SessionID: ${req.session.id}`);
  res
    .type('text/xml')
    .send(smsResponse.toString());
};

router.post('/webhook', twilioReply);


export default router;