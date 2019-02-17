import express from 'express'
import passport from 'passport'
import * as U from '../../lib/utils'
import User from '../../models/user'
import { respond, requiredParam } from './lib'

const router = express.Router()

router.post('/register', async ({ body }, res) => {
  const { username, password } = body

  if (!U.isNotEmptyString(username)) {
    return requiredParam(res, 'username')
  }
  if (!U.isNotEmptyString(password)) {
    return requiredParam(res, 'password')
  }

  User.createUser(new User({ username, password }))
    .then(user => respond(res, 200, user))
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  respond(res, 200, req.user)
})

router.get('/current', (req, res) => {
  respond(res, 200, !!req.user ? req.user : null)
})

router.get('/logout', (req, res) => {
  req.logout()
  respond(res, 200, 'logout successful')
})

export default router
