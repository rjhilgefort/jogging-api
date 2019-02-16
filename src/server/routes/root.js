import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
  const status = 200

  res.status(status)
  res.json({ status, data: 'OK' })
})

export default router