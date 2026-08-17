import cors from 'cors'

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
})

export default corsMiddleware
