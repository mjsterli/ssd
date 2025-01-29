import express from 'express';
import apiRouter from './api/apiRouter';
import twilioRouter from './twilio/twilioRouter';
import sessionRouter from './ex-session/ex-session';
//import morgan from 'morgan'
//import cors from 'cors'
//import { protect } from './modules/auth'
//import { createNewUser, signin } from './handlers/user'

const app = express()

//app.use(cors())
//app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', apiRouter);
app.use('/twilio', twilioRouter);
// app.use('/ex-session', );

export default app