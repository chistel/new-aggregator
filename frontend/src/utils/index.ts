import { defaultSearchDate, formattedDate, formatToDateTime } from './time'
import { newsProviders, newsCategories, mapSelectedPreferences, removeDuplicates } from './article'
import { stripSegmentFromUrl } from './string'
import { isAxiosError } from './miscelleneous'


export {
   formattedDate,
   formatToDateTime,
   defaultSearchDate,
   newsProviders,
   stripSegmentFromUrl,
   newsCategories,
   mapSelectedPreferences,
   removeDuplicates,
   isAxiosError,
}
