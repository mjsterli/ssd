import express from 'express';
import apiRouter from './api/apiRouter';
import twilioRouter from './twilio/twilioRouter';
//import morgan from 'morgan'
//import cors from 'cors'
//import { protect } from './modules/auth'
//import { createNewUser, signin } from './handlers/user'

const app = express()

//app.use(cors())
// app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.get('/', (req, res, next) => {
//   setTimeout(() => {
//     next(new Error('hello'))
//   },1)
// });

app.use('/api', apiRouter);
app.use('/twilio', twilioRouter)
// app.post('/user', createNewUser)
// app.post('/signin', signin)

// app.use((err, req, res, next) => {
//   console.log(err)
//   res.json({message: `had an error: ${err.message}`})
// });

export default app