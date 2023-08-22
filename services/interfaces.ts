import { sortType, orderType } from "services/types"


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


/**
 * Стандартный Laravel разделитель на страницы
 */
export interface Paginate {
  // data: [] // лучше не указывать т.к. везде разные данные
  current_page: number
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: {
    active: boolean
    label: string
    url: string | null
  }[] | []
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}


/**
 * Глава в посте
 */
export interface ChapterInPost {
  id: number
  id_branch?: number | null
  id_user?: number
  name: string
  volume: number
  chapter: string
  updated_at: string
  teams: TeamInChapter[] | []
}


/**
 * Список глав в посте
 */
export interface ChaptersInPost extends Paginate {
  data: ChapterInPost[]
}


/**
 * Команда в главе
 */
export interface TeamInChapter {
  checked_at: string
  deleted_at: null | string
  id: number
  id_status: number
  id_tmp?: number
  name: string
}

/**
 * Данные тайтла по умолчанию
 */
export interface Manga {
  id: number
  is_licensed?: boolean
  alias: string
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
  mod_link?: string[]
}

export interface EditMangaCreateData {
  tags: itemFilter[]
  types: typeName[]
  genres: itemFilter[]
  formats: typeName[]
  adult_ranks: typeName[]
  status_of_releases: typeName[]
  status_of_translations: typeName[]
}


/**
 * Создать нового Автора, Художника, Издателя, Команду переводчиков
 */
export interface CreateData {
  id_tmp?: string | number
  name_eng?: string
  name_rus?: string
  name_alt?: string
  description?: string
  website?: string
  social?: string
}


/**
 * Стандартный успешный ответ от сервера
 */
export interface ResponseApi {
  msg?: string
  status?: string
}