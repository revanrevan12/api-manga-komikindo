import scraper from '../adapters/scraper'
import parser from '../adapters/parser'
import normalizer from '../adapters/normalizer'

const getList = async (page: number, limit: number) => {
  const html = await scraper.fetchList(page, limit)
  const raw = parser.parseList(html)
  const manga = normalizer.normalizeMangaList(raw)
  const start = (page - 1) * limit
  const slice = manga.slice(start, start + limit)
  return { manga: slice, page, limit, total: manga.length }
}

const getDetail = async (id: string) => {
  const html = await scraper.fetchDetail(id)
  if (!html) return null
  const raw = parser.parseDetail(html)
  return normalizer.normalizeManga(raw)
}

const getChapters = async (id: string) => {
  const html = await scraper.fetchChapters(id)
  const raw = parser.parseChapters(html)
  const chapters = normalizer.normalizeChapters(raw)
  return { chapters, total: chapters.length }
}

export default { getList, getDetail, getChapters }
