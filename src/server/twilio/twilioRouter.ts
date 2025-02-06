import { Router } from 'express';
import { smsTwilioReply } from './handlers/smsTwilioReply';
import smsTwilioResponse from './handlers/smsTwilioResponse';
import smsTwilioValidate from './middleware/smsTwilioValidator';
import session from 'express-session';
import url from 'url';
import pg from 'pg';
import pgSimpleConnect from 'connect-pg-simple';

const router = Router();
function getSessionConfig(){
  const databaseConfig = url.parse(process.env.DATABASE_URL);
  const [username, password] = databaseConfig.auth.split(':');
  const [, database] = databaseConfig.pathname.split('/');

  return {
    user: username,
    password: password,
    host: databaseConfig.hostname,
    port: databaseConfig.port,
    database: database,
    ssl: false
  };
};

const pgPool = new pg.Pool(getSessionConfig());
const pgSession = new pgSimpleConnect(session);

router.use(session({
  store: new pgSession({
    pool: pgPool,
    table_name: "user_sessions"
  }),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 5}
}));

router.post('/webhook', smsTwilioValidate, smsTwilioResponse, smsTwilioReply);

export default router;