import * as cheerio from 'cheerio'

// CSS selectors detected by the MANGA Pembuat API Manga analyzer.
const S = {
  "mangaItem": "div.animepost",
  "title": "h3",
  "mangaUrl": "a",
  "cover": "img",
  "description": "div#sinopsis",
  "author": "span",
  "artist": "span",
  "status": "span",
  "genre": "a[href*=\"genre\"], a[href*=\"tag\"], a[href*=\"category\"], a[href*=\"genres\"]",
  "alternativeTitles": "span",
  "chapter": "div.epsbr",
  "chapterUrl": "a",
  "chapterNumber": "div.epsbr-box",
  "chapterTitle": "div.epsbr-box",
  "pages": "div#chimg-auh img"
}

const IMG_ATTRS = ['src', 'data-src', 'data-lazy-src', 'data-original', 'srcset']

function imgSrc(el: cheerio.Cheerio<any>): string {
  for (const a of IMG_ATTRS) {
    const v = el.attr(a)
    if (!v) continue
    if (a === 'srcset') return v.split(',')[0].trim().split(/\s+/)[0]
    if (!v.startsWith('data:')) return v
  }
  return ''
}

function absUrl(base: string, url?: string): string {
  if (!url) return ''
  try { return new URL(url, base).href } catch { return url }
}

function textOf(el: cheerio.Cheerio<any>): string {
  return el.text().replace(/\s+/g, ' ').trim()
}

export const parseList = (html: string) => {
  const $ = cheerio.load(html)
  const out: any[] = []
  if (!S.mangaItem) return out
  $(S.mangaItem).each((_, el) => {
    const $el = $(el)
    const title = S.title ? textOf($el.find(S.title).first()) : textOf($el.find('a').first())
    if (!title) return
    const cover = imgSrc($el.find('img').first())
    const href = S.mangaUrl && S.mangaUrl !== '&'
      ? $el.find(S.mangaUrl).first().attr('href')
      : $el.attr('href') || $el.find('a[href]').first().attr('href')
    out.push({ id: href || title, title, cover, url: href || '', sourceUrl: LIST_BASE($) })
  })
  return out
}

function LIST_BASE($: cheerio.CheerioAPI): string {
  return $('base').attr('href') || (process.env.SOURCE_URL as string)
}

export const parseSearch = (html: string) => parseList(html)

export const parseDetail = (html: string) => {
  const $ = cheerio.load(html)
  const base = process.env.SOURCE_URL as string
  const pick = (sel: string) => (sel ? textOf($(sel).first()) : '')
  const cover = imgSrc($(S.cover || 'img').first())
  const genres: string[] = []
  if (S.genre) {
    $(S.genre).slice(0, 12).each((_, g) => {
      const t = textOf($(g))
      if (t && t.length < 40) genres.push(t)
    })
  }
  const alt: string[] = []
  if (S.alternativeTitles) {
    $(S.alternativeTitles).each((_, a) => {
      const t = textOf($(a))
      if (t) alt.push(t)
    })
  }
  return {
    title: pick(S.title) || textOf($('h1, h2, h3').first()),
    cover: cover ? absUrl(base, cover) : '',
    description: pick(S.description),
    author: pick(S.author),
    artist: pick(S.artist),
    status: pick(S.status) || 'Ongoing',
    genres,
    alternativeTitles: alt,
  }
}

export const parseChapters = (html: string) => {
  const $ = cheerio.load(html)
  const out: any[] = []
  if (!S.chapter) return out
  $(S.chapter).each((_, el) => {
    const $el = $(el)
    const href = S.chapterUrl && S.chapterUrl !== '&'
      ? $el.find(S.chapterUrl).first().attr('href')
      : $el.attr('href') || $el.find('a[href]').first().attr('href')
    const title = S.chapterTitle ? textOf($el.find(S.chapterTitle).first()) : textOf($el)
    const numText = S.chapterNumber ? textOf($el.find(S.chapterNumber).first()) : textOf($el)
    const number = parseFloat((numText.match(/[\d.]+/) || ['0'])[0]) || 0
    out.push({ id: href || String(number), url: href || '', title, number })
  })
  return out
}

export const parseChapterDetail = (html: string) => {
  const $ = cheerio.load(html)
  const first = $(S.chapter).first()
  const title = S.chapterTitle ? textOf(first.find(S.chapterTitle).first()) : textOf(first)
  return { title, number: 0 }
}

export const parsePages = (html: string) => {
  const $ = cheerio.load(html)
  const base = process.env.SOURCE_URL as string
  const out: string[] = []
  const sel = S.pages || 'img'
  $(sel).each((_, el) => {
    const src = imgSrc($(el))
    if (src && /\.(jpe?g|png|webp|gif|avif)(\?|$)/i.test(src)) out.push(absUrl(base, src))
  })
  return out
}

export default { parseList, parseSearch, parseDetail, parseChapters, parseChapterDetail, parsePages }
