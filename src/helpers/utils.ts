export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const API_TIMEOUT = parseInt(process.env.API_TIMEOUT || '30000')
export const MAX_RETRIES = parseInt(process.env.MAX_RETRIES || '3')

export async function retry<T>(fn: () => Promise<T>, maxRetries = MAX_RETRIES): Promise<T> {
  let lastErr: any
  for (let i = 0; i < maxRetries; i++) {
    try { return await fn() } catch (err) { lastErr = err; await sleep(800 * (i + 1)) }
  }
  throw lastErr
}

export const normalizeUrl = (url: string, baseUrl: string): string => {
  if (!url) return ''
  if (/^https?:/i.test(url)) return url
  try { return new URL(url, baseUrl).href } catch { return url }
}

export const sanitizeHtml = (html: string): string => html.replace(/<[^>]*>/g, '').trim()
