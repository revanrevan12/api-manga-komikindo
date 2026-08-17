import express from 'express'
import dotenv from 'dotenv'
import routers from './routers'
import errorHandler from './middleware/errorHandler'
import corsMiddleware from './middleware/cors'
import rateLimitMiddleware from './middleware/rateLimit'
import { SOURCE_NAME } from './helpers/constants'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(corsMiddleware)
app.use(rateLimitMiddleware)
app.use(express.json())

app.use('/api', routers)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', source: SOURCE_NAME, timestamp: new Date().toISOString() })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`[${SOURCE_NAME}] API running on port ${PORT}`)
})
