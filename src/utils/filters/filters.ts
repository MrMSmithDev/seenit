import { FilterQuery } from 'src/customTypes/types'

interface Filters {
  text: string
  id: string
}

export const filters: Filters[] = [
  { text: 'Newest', id: 'new' },
  { text: 'Oldest', id: 'oldest' },
  { text: 'Top Rated', id: 'top' },
  { text: 'Low Rated', id: 'lowest' }
]

export function filterSwitch(filter: string): FilterQuery {
  // default is set to newest
  switch (filter.toLowerCase()) {
    case 'newest':
      return { attribute: 'timeStamp', order: 'desc' }
    case 'oldest':
      return { attribute: 'timeStamp', order: 'asc' }
    case 'top rated':
      return { attribute: 'favorites', order: 'desc' }
    case 'low rated':
      return { attribute: 'favorites', order: 'asc' }
    default:
      return { attribute: 'timeStamp', order: 'desc' }
  }
}

export default filters
