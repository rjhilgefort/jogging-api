import express from 'express'
import passport from 'passport'
import * as U from '../../lib/utils'
import Jog from '../../models/jog'
import { respond, requiredParam } from './lib'

const router = express.Router()

router.post('/create', async ({ body, user }, res) => {
  const { name, duration } = body

  if (!U.isNotEmptyString(name)) {
    return requiredParam(res, 'username')
  }
  // `duration` is optional

  Jog.createJog(new Jog({ name, duration }), user)
    .then(jog => respond(res, 200, jog))
})

router.get('/list', async ({ user }, res) => {
  const jogs = await Jog.find({ user: user._id })
  respond(res, 200, jogs)
})

export default router
