import * as R from 'ramda'
import _ from 'lodash/fp'

export const isNotEmpty = R.complement(_.isEmpty)
export const isEmptyString = R.allPass([_.isString, _.isEmpty])
export const isNotEmptyString = R.allPass([_.isString, isNotEmpty])
export const isPopulatedString = R.allPass([_.isString, isNotEmpty])
