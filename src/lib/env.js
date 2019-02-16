import dotenv from 'dotenv'
import * as R from 'ramda'
import _ from 'lodash/fp'
import * as U from './utils'

dotenv.config()

const serializeEnvsSpec = {
  NODE_ENV: R.identity,
  API_PORT: _.toInteger,
  MORGAN_SETTING: R.identity
}
const serializeEnvs = R.evolve(serializeEnvsSpec)

const allEnvKeys = R.keys(serializeEnvsSpec)
const pickEnvs = R.pickAll(allEnvKeys)

// Treat empty strings as `null` (so R.defaultTo can work)
const normalizeEnvs = R.map(R.when(U.isEmptyString, () => null))

const defaultEnvs = R.evolve({
  NODE_ENV: R.defaultTo('development'),
  HTTP_PORT: R.defaultTo('4040')
})

const parsedEnv = R.compose(
  serializeEnvs,
  defaultEnvs,
  normalizeEnvs,
  pickEnvs
)(process.env)

export default parsedEnv
