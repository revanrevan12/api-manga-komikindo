import express from 'express'
import chapterController from '../controllers/chapterController'

const router = express.Router()

router.get('/:id/pages', chapterController.getPages)
router.get('/:id', chapterController.getDetail)

export default router
