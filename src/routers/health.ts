import express from 'express'
import { SOURCE_NAME } from '../helpers/constants'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json({ success: true, source: SOURCE_NAME, status: 'ok', timestamp: new Date().toISOString() })
})

export default router
