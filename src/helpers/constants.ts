export const SOURCE_NAME = 'KomikIndo'
export const SOURCE_URL = process.env.SOURCE_URL || 'https://komikindo.ch'
export const API_TIMEOUT = 30000
export const MAX_RETRIES = 3
export const CACHE_TTL = 3600

export const MANGA_STATUS = {
  ONGOING: 'Ongoing',
  COMPLETED: 'Completed',
  HIATUS: 'Hiatus',
  DROPPED: 'Dropped',
} as const

export const ERROR_CODES = {
  NOT_FOUND: 'NOT_FOUND',
  INVALID_REQUEST: 'INVALID_REQUEST',
  SERVER_ERROR: 'SERVER_ERROR',
  TIMEOUT: 'TIMEOUT',
  RATE_LIMIT: 'RATE_LIMIT',
} as const
