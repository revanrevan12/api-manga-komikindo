import { Request, Response, NextFunction } from 'express'
import chapterService from '../services/chapterService'
import { SOURCE_NAME } from '../helpers/constants'

const getDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await chapterService.getDetail(req.params.id)
    if (!data) return res.status(404).json({ success: false, source: SOURCE_NAME, error: 'Chapter not found', code: 'NOT_FOUND' })
    res.json({ success: true, source: SOURCE_NAME, data })
  } catch (error) { next(error) }
}

const getPages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await chapterService.getPages(req.params.id)
    res.json({ success: true, source: SOURCE_NAME, data })
  } catch (error) { next(error) }
}

export default { getDetail, getPages }
