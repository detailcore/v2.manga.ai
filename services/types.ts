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
 * Вкладки в Fullstory
 */
export type MangaTabs = 'desc' | 'chapters' | 'comm' | 'reviews'


/**
 * Ключи и создаваемый контент
 */
export type FindKeys = 'authors' | 'artists' | 'publishers' | 'teams'

