import * as log from './lib/logger'

const app = setInterval(() => {
  log.log('\n\n\n')
  log.debug('debug')
  log.info('info')
  log.warn('warn')
  log.error('error')
}, 1 * 1000)
