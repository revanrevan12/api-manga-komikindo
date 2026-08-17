export const validateMangaId = (id: string) => !!id && id.length > 0
export const validateChapterId = (id: string) => !!id && id.length > 0
export const validateQuery = (q: string) => !!q && q.length > 0 && q.length < 100
export const validatePage = (p: number) => p > 0
export const validateLimit = (l: number) => l > 0 && l <= 100
