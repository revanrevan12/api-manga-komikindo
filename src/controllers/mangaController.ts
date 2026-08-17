import { Request, Response, NextFunction } from 'express'
import mangaService from '../services/mangaService'
import { SOURCE_NAME } from '../helpers/constants'

const getList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const data = await mangaService.getList(page, limit)
    res.json({ success: true, source: SOURCE_NAME, data: data.manga, pagination: { page: data.page, limit: data.limit, total: data.total } })
  } catch (error) { next(error) }
}

const getDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await mangaService.getDetail(req.params.id)
    if (!data) return res.status(404).json({ success: false, source: SOURCE_NAME, error: 'Manga not found', code: 'NOT_FOUND' })
    res.json({ success: true, source: SOURCE_NAME, data })
  } catch (error) { next(error) }
}

const getChapters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await mangaService.getChapters(req.params.id)
    res.json({ success: true, source: SOURCE_NAME, data: data.chapters, pagination: { page: 1, limit: data.total, total: data.total } })
  } catch (error) { next(error) }
}

export default { getList, getDetail, getChapters }
