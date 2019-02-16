import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import { Strategy } from 'passport-local'
import env from '../lib/env'
import * as log from '../lib/logger'
import User from '../models/user'
import { cors } from './middleware'
import rootRoutes from './routes/root'
import userRoutes from './routes/user'

const {
  API_PORT,
  API_SESSION_SECRET,
  MORGAN_SETTING,
  MONGO_HOST,
  MONGO_PORT,
} = env

export default async () => {
  const app = express()

  // MIDDLEWARE
  app.use(morgan(MORGAN_SETTING))
  app.use(cors)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(
    session({
      secret: API_SESSION_SECRET,
      saveUninitialized: true,
      resave: true,
    }),
  )

  // Passport
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(
    new Strategy(async (username, password, done) => {
      const user = await User.findOneByUsername(username)
      if (!user) {
        return done(null, false, { message: 'Unknown User' })
      }
      const isMatch = await User.isPasswordMatch(password, user.password)
      if (isMatch) {
        done(null, user)
      } else {
        done(null, false, { message: 'Invalid password' })
      }
    }),
  )
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return User.findById(id).then(
      user => done(null, user),
      err => done(err, null),
    )
  })

  // ROUTES
  app.use('/', rootRoutes)
  app.use('/user', userRoutes)

  log.log('\n')
  log.log('======================================================')
  log.log('\n')

  const mongoUri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/jogging`
  await mongoose.connect(mongoUri).then(
    () => {
      log.info(`Mongo connected at: ${mongoUri}`)
    },
    err => {
      log.error('Mongo connection error', err)
    },
  )

  app.listen(API_PORT, () => {
    log.log('\n')
    log.info('ENVIRONMENT CONFIG:')
    log.info(env)
    log.log('\n')
    log.info('Server started!')
    log.info(`Listening on port: ${API_PORT}`)
  })

  return app
}
