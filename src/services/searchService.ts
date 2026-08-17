import scraper from '../adapters/scraper'
import parser from '../adapters/parser'
import normalizer from '../adapters/normalizer'

const search = async (query: string) => {
  const html = await scraper.search(query)
  const raw = parser.parseSearch(html)
  const results = normalizer.normalizeMangaList(raw)
  return { results, total: results.length }
}

export default { search }
