import generateAddressTitle from './generateAddressTitle'

describe('generateAddressTitle', () => {
  it('should return a lowercase string with no special characters when given a valid string input', () => {
    const title = '123 Main St. #4'
    const expected = '123 main st 4'
    const result = generateAddressTitle(title)

    expect(result).toEqual(expected)
  })

  it('should return an empty string when given an empty string input', () => {
    const title = ''
    const expected = ''
    const result = generateAddressTitle(title)

    expect(result).toEqual(expected)
  })

  it('should return a lowercase string with no special characters when given a valid string input consisting of only uppercase letters and numbers', () => {
    const title = 'ABC123'
    const expected = 'abc123'
    const result = generateAddressTitle(title)

    expect(result).toEqual(expected)
  })

  it('should return a lowercase string with no special characters when given a valid string input consisting of special characters, numbers, and uppercase and lowercase letters', () => {
    const title = 'AbC123!@#$%^&*()'
    const expected = 'abc123'
    const result = generateAddressTitle(title)

    expect(result).toEqual(expected)
  })

  it('should handle titles with leading/trailing spaces correctly', () => {
    expect(generateAddressTitle('  Title  ')).toBe('title')

    expect(generateAddressTitle('Title test')).toBe('titletest')

    expect(generateAddressTitle('  Title')).toBe('title')

    expect(generateAddressTitle('Title  ')).toBe('title')
  })
})
