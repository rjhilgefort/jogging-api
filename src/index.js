import env from './lib/env'
import * as log from './lib/logger'

const app = setInterval(() => {
  log.log('\n\n\n')
  log.info(env.API_PORT)
  log.info(env.NODE_ENV)
}, 1 * 1000)
