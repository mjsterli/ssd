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

const states = ['Greeting', 'Selection', 'Confirmation', 'Execution'];

const pgPool = new pg.Pool(config);
const pSession = new pgSession(session);
router.use(session({
  store: new pSession({
    pool: pgPool,
    table_name: "user_sessions",
  }),
  secret: 'secret',
  resave: false,
  cookie: { maxAge: 1000 * 60 * 5 }
}));

const twilioReply = async(req, res) => {
  const smsResponse = new twiml.MessagingResponse();
  req.session.index = req.session.index
                      ? req.session.index + 1
                      : 0;
  smsResponse.message(`Session: ${req.session.index}`);
  res
    .type('text/xml')
    .send(smsResponse.toString());
};

router.post('/webhook', twilioReply);


export default router;