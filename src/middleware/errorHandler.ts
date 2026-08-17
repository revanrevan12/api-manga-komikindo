import { Request, Response, NextFunction } from 'express'
import { SOURCE_NAME } from '../helpers/constants'

const errorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[' + SOURCE_NAME + '] error:', error.message || error)
  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal Server Error'
  res.status(statusCode).json({ success: false, source: SOURCE_NAME, error: message, code: error.code || 'SERVER_ERROR' })
}

export default errorHandler
