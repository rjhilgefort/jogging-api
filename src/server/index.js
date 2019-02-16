import * as bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import env from '../lib/env'
import * as log from '../lib/logger'
import { cors } from './middleware'
import root from './routes/root'

const { API_PORT, MORGAN_SETTING } = env

export default async () => {
  const app = express()

  app.use(morgan(MORGAN_SETTING))
  app.use(cors)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use('/', root)

  app.listen(API_PORT, () => {
    log.log('\n')
    log.log('======================================================')
    log.log('\n')
    log.info('ENVIRONMENT CONFIG:')
    log.info(env)
    log.log('\n')
    log.info('Server started!')
    log.info(`Listening on port: ${API_PORT}`)
  })

  return app
}
