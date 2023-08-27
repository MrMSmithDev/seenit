import { FilterQuery } from '@customTypes/types'

import { filterSwitch } from './filters'

describe('filterSwitch', () => {
  it('should return a FilterQuery object of attribute: timeStamp, order: desc when an invalid string is passed in', () => {
    const result: FilterQuery = filterSwitch('not accepted')

    expect(result.attribute).toBe('timeStamp')
    expect(result.order).toBe('desc')
  })

  it('should return a FilterQuery object of attribute: favorites, order: asc when passed low rated', () => {
    const result: FilterQuery = filterSwitch('low rated')

    expect(result.attribute).toBe('favorites')
    expect(result.order).toBe('asc')
  })

  it('should return correct FilterQuery object regardless of letter case', () => {
    const result: FilterQuery = filterSwitch('OlDESt')

    expect(result.attribute).toBe('timeStamp')
    expect(result.order).toBe('asc')
  })
})
