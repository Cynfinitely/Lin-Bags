import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { Product } from './models/productSchema'
// import session from 'express-session'
// import cookieParser from 'cookie-parser'
import passport from 'passport'
import loginWithGoogle from '../src/passport/google'
import checkAuth from './middlewares/checkAuth'
import productRouter from '../src/routers/productRouter'

import apiErrorHandler from './middlewares/apiErrorHandler'
import { GOOGLE_CLIENT_ID, JWT_SECRET } from './util/secrets'

// import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
  })
)
// app.use(apiContentType)
app.use(express.json())
/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)

app.use(passport.session())
*/
app.use(passport.initialize())
passport.use(loginWithGoogle())

// Set up routers
app.use('/', productRouter)
app.get('/', (req, res) => {
  res.send('hello world')
})

app.post(
  '/login',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    console.log(req.user)
    const user = req.user as any
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )
    res.json({ token })
  }
)

// Custom API error handler
app.use(apiErrorHandler)

export default app
