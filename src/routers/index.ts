import express from 'express'
import healthRouter from './health'
import mangaRouter from './manga'
import chapterRouter from './chapter'
import searchRouter from './search'

const router = express.Router()

router.use('/health', healthRouter)
router.use('/sources', (_req, res) => res.json({ success: true, data: [{ name: process.env.SOURCE_URL }] }))
router.use('/manga', mangaRouter)
router.use('/chapter', chapterRouter)
router.use('/search', searchRouter)
router.get('/genres', (_req, res) => res.json({ success: true, data: [] }))
router.get('/popular', (_req, res) => res.json({ success: true, data: [] }))
router.get('/latest', (_req, res) => res.json({ success: true, data: [] }))
router.get('/manhwa', (_req, res) => res.json({ success: true, data: [] }))
router.get('/manhua', (_req, res) => res.json({ success: true, data: [] }))

export default router
