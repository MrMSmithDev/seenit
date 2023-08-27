import formatTime from './formatTime'

describe('formatTime', () => {
  it('should return a formatted string with the time, date, and month', () => {
    const timePosted = new Date(2022, 0, 1, 10, 30) // January 1, 2022 10:30 AM
    const result = formatTime(timePosted)

    expect(result).toBe('10:30 1 Jan 2022')
  })

  it('should format hours and minutes with leading zeros when given a timePosted', () => {
    const timePosted = new Date(2022, 0, 1, 7, 30) // January 1, 2022 07:30 AM
    const result = formatTime(timePosted)

    expect(result).toBe('07:30 1 Jan 2022')
  })

  it('should return a formatted string with the time, date, and month when timePosted is the minimum date value', () => {
    const timePosted = new Date(1970, 0, 1, 0, 0) // January 1, 1970 00:00 AM
    const result = formatTime(timePosted)

    expect(result).toBe('00:00 1 Jan 1970')
  })

  it('should return a formatted string with the time, date, and month when timePosted is the maximum date value', () => {
    const timePosted = new Date(9999, 11, 31, 23, 59) // December 31, 9999 11:59 PM
    const result = formatTime(timePosted)

    expect(result).toBe('23:59 31 Dec 9999')
  })

  it('should handle daylight saving time changes correctly', () => {
    const timePosted = new Date(2022, 2, 13, 1, 30) // March 13, 2022 01:30 AM
    const result = formatTime(timePosted)

    expect(result).toBe('01:30 13 Mar 2022')
  })
})
