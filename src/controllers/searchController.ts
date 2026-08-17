import { Request, Response, NextFunction } from 'express'
import searchService from '../services/searchService'
import { SOURCE_NAME } from '../helpers/constants'

const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = (req.query.query as string) || ''
    if (!query) return res.status(400).json({ success: false, source: SOURCE_NAME, error: 'Query parameter required', code: 'INVALID_REQUEST' })
    const data = await searchService.search(query)
    res.json({ success: true, source: SOURCE_NAME, data: data.results, pagination: { page: 1, limit: data.total, total: data.total } })
  } catch (error) { next(error) }
}

export default { search }
