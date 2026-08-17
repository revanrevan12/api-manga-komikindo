import rateLimit from 'express-rate-limit'

const rateLimitMiddleware = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '15') * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  message: { success: false, error: 'Too many requests, please try again later', code: 'RATE_LIMIT' },
})

export default rateLimitMiddleware
