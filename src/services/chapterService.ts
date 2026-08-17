import scraper from '../adapters/scraper'
import parser from '../adapters/parser'
import normalizer from '../adapters/normalizer'

const getDetail = async (id: string) => {
  const html = await scraper.fetchChapterDetail(id)
  if (!html) return null
  const raw = parser.parseChapterDetail(html)
  return normalizer.normalizeChapter(raw)
}

const getPages = async (id: string) => {
  const html = await scraper.fetchPages(id)
  const raw = parser.parsePages(html)
  return normalizer.normalizePages(raw)
}

export default { getDetail, getPages }
