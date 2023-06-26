interface Filters {
  text: string
  id: string
}

const filters: Filters[] = [
  { text: 'Newest', id: 'new' },
  { text: 'Oldest', id: 'oldest' },
  { text: 'Top Rated', id: 'top' },
  { text: 'Low Rated', id: 'lowest' }
]

export default filters
