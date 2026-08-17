import axios from 'axios'
import * as cheerio from 'cheerio'
import { API_TIMEOUT, MAX_RETRIES } from '../helpers/utils'

const SOURCE_URL = process.env.SOURCE_URL || 'https://komikindo.ch'
const LIST_URL = 'https://komikindo.ch/'
const SEARCH_URL = 'https://komikindo.ch/'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

async function fetchHtml(url: string): Promise<string> {
  let lastErr: any
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const res = await axios.get(url, { timeout: API_TIMEOUT, headers: { 'User-Agent': UA }, responseType: 'text' })
      return res.data
    } catch (err) {
      lastErr = err
      await new Promise((r) => setTimeout(r, 800 * (i + 1)))
    }
  }
  throw lastErr
}

const fetchList = async (_page: number, _limit: number) => fetchHtml(LIST_URL)

const search = async (query: string) => fetchHtml(SEARCH_URL + encodeURIComponent(query))

// Detail & chapter pages are fetched by their full URL (stored on the manga
// record from the list page). The id passed in is the full source URL.
const fetchDetail = async (id: string) => {
  try { return await fetchHtml(id) } catch { return '' }
}
const fetchChapters = async (id: string) => {
  try { return await fetchHtml(id) } catch { return '' }
}
const fetchChapterDetail = async (id: string) => {
  try { return await fetchHtml(id) } catch { return '' }
}
const fetchPages = async (id: string) => {
  try { return await fetchHtml(id) } catch { return '' }
}

export default { fetchList, fetchDetail, fetchChapters, fetchChapterDetail, fetchPages, search }
