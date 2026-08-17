export interface Manga {
  id: string
  title: string
  alternativeTitle?: string
  cover: string
  author?: string
  artist?: string
  status: string
  synopsis: string
  genres: string[]
  rating?: number
  views?: number
  chapters: number
  latestChapter?: string
  latestChapterDate?: string
  source: string
  sourceUrl: string
}

export interface Chapter {
  id: string
  mangaId: string
  number: number
  title?: string
  date?: string
  pages: number
  source: string
}

export interface Page {
  id: string
  chapterId: string
  number: number
  imageUrl: string
  source: string
}

export interface ApiResponse<T> {
  success: boolean
  source: string
  data: T
  error?: string
  code?: string
  pagination?: { page: number; limit: number; total: number }
}
