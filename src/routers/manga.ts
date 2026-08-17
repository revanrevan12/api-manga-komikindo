import express from 'express'
import mangaController from '../controllers/mangaController'

const router = express.Router()

router.get('/', mangaController.getList)
router.get('/:id/chapters', mangaController.getChapters)
router.get('/:id', mangaController.getDetail)

export default router
