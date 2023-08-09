/**
 * Аватарка тайтла
 */
export interface cover {
  low?: string
  mid?: string
  high?: string
}

/**
 * Типы (манга, манхва, маньхуа, комиксы, автор и т.д.)
 */
export interface typeName {
  id: number
  name: string
}

/**
 * Результат поисковой выдачи
 */
export interface searchItem {
  alias: string
  cover: cover
  created_at: string
  id: number
  id_tmp?: number
  licensed?: number
  status_code?: number
  title_eng: string
  title_rus: string
  type: typeName
  updated_at: string
  year?: string | number
}

/**
 * Сортировать по: 
 * рейтингу | кол-ву оценок | просмотрам | дате добавления | дате обновления | кол-ву глав | случано
 */
export type sortType = 'rating' | 'rate' | 'views' | 'created_at' | 'updated_at' | 'chapter_count' | 'random'

/**
 * 'ASC' - По возрастанию | 'DESC' - По убыванию
 */
export type orderType = 'asc' | 'desc' | ''

/**
 * Элемент фильтра
 */
export interface itemFilter {
  id: number
  name: string
  id_adult?: number
}

/**
 * Выбранное или исключённое значение в фильтре
 */
export interface itemFilterSelect {
  id: number
  value: number
}

/**
 * Входные (первоначальные) данные фильтра
 */
export interface libraryInputData {
  adult_ranks: itemFilter[]
  formats: itemFilter[]
  genres: itemFilter[]
  status_of_releases: itemFilter[]
  status_of_translations: itemFilter[]
  tags: itemFilter[]
  types: itemFilter[]
  sortBy?: sortType
  orderBy?: orderType
}

/**
 * Данные тайтла по умолчанию
 */
export interface Manga {
  id: number
  alias: string | string[]
  adult_rank?: adultRankManga
  artists?: typeName[]
  authors?: typeName[]
  chapter_count?: number
  chapter_first?: number
  comment_count?: number
  cover?: string | string[]
  created_at?: string
  description?: string
  formats?: typeName[]
  genres?: typeName[]
  publishers?: typeName[]
  rating: ratingManga
  status_of_releases?: typeName
  status_of_translation?: typeName
  tags?: typeName[]
  teams: teamManga[]
  title_alt?: string
  title_eng?: string
  title_orig?: string
  title_rus?: string
  type?: typeName
  updated_at?: string
  views?: number
  year?: string
}

/**
 * Возрастной рейтинг тайтла
 */
interface adultRankManga {
  id: number,
  name: string,
  max?: number
}

/**
 * Рейтинг тайтла с голосами
 */
interface ratingManga {
  amount: number
  avg: string
  stars: number[]
  your: number
}

/**
 * Команда переводчиков тайтла
 */
interface teamManga {
  id: number
  cover: string | null
  name: string
}