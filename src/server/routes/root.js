import express from 'express'
import { respond } from './lib'

const router = express.Router()

router.get('/', (_req, res) => {
  respond(res, 200, 'OK')
})

export default router
