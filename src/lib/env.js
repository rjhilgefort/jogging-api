import dotenv from 'dotenv'
import * as R from 'ramda'
import _ from 'lodash/fp'
import * as U from './utils'

dotenv.config()

// `identity` means don't do anything to the var
const serializeEnvsSpec = {
  NODE_ENV: R.identity,
  API_PORT: _.toInteger,
  API_SESSION_SECRET: R.identity,
  MORGAN_SETTING: R.identity,
  MONGO_HOST: R.identity,
  MONGO_PORT: R.identity,
}

// `identity` means there is no default
const defaultEnvs = R.evolve({
  NODE_ENV: R.defaultTo('development'),
  API_PORT: R.defaultTo('4040'),
  API_SESSION_SECRET: R.identity,
  MORGAN_SETTING: R.defaultTo('tiny'),
  MONGO_HOST: R.identity,
  MONGO_PORT: R.identity,
})

const serializeEnvs = R.evolve(serializeEnvsSpec)
const allEnvKeys = R.keys(serializeEnvsSpec)
const pickEnvs = R.pickAll(allEnvKeys)

// Treat empty strings as `null` (so R.defaultTo can work)
const normalizeEnvs = R.map(R.when(U.isEmptyString, () => null))

const parsedEnv = R.compose(
  serializeEnvs,
  defaultEnvs,
  normalizeEnvs,
  pickEnvs,
)(process.env)

export default parsedEnv
