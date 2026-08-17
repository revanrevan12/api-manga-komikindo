import { Manga, Chapter, Page } from '../helpers/types'

const slug = (s: string) =>
  String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)

const normalizeManga = (raw: any): Manga => ({
  id: raw.id || slug(raw.title),
  title: raw.title || '',
  alternativeTitle: (raw.alternativeTitles && raw.alternativeTitles[0]) || '',
  cover: raw.cover || '',
  author: raw.author || '',
  artist: raw.artist || '',
  status: raw.status || 'Ongoing',
  synopsis: raw.description || '',
  genres: raw.genres || [],
  rating: raw.rating ?? 0,
  views: raw.views ?? 0,
  chapters: raw.chapters ?? 0,
  latestChapter: raw.latestChapter || '',
  latestChapterDate: raw.latestChapterDate || '',
  source: 'KomikIndo',
  sourceUrl: raw.url || raw.sourceUrl || '',
})

const normalizeMangaList = (raw: any[]) => raw.map(normalizeManga)

const normalizeChapter = (raw: any): Chapter => ({
  id: raw.id || slug(`${raw.mangaId}-${raw.number}`),
  mangaId: raw.mangaId || '',
  number: raw.number || 0,
  title: raw.title || '',
  date: raw.date || '',
  pages: raw.pages || 0,
  source: 'KomikIndo',
})

const normalizeChapters = (raw: any[]) => raw.map(normalizeChapter)

const normalizePages = (raw: string[]): Page[] =>
  raw.map((imageUrl, i) => ({ id: `page-${i + 1}`, chapterId: '', number: i + 1, imageUrl, source: 'KomikIndo' }))

export default { normalizeMangaList, normalizeManga, normalizeChapters, normalizeChapter, normalizePages }
