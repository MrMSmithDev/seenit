import imageUrlToFile from './imageUrlToFile'

describe('imageUrlToFile', () => {
  // Test that the function 'imageUrlToFile' returns a Promise that resolves to a File object
  it('should return a Promise that resolves to a File object', () => {
    global.fetch = jest.fn().mockImplementation(() => {
      const response = new Response(new Blob(), { status: 200 })
      return Promise.resolve(response)
    })

    return imageUrlToFile('https://example.com/image.jpg').then((file) => {
      expect(file).toBeInstanceOf(File)
    })
  })
})

// Test that the function 'imageUrlToFile' handles different image extensions correctly
it('should handle different image extensions correctly', () => {
  global.fetch = jest.fn().mockImplementation(() => {
    const response = new Response(new Blob(), { status: 200 })
    return Promise.resolve(response)
  })

  return Promise.all([
    imageUrlToFile('https://example.com/image.jpg').then((file) => {
      expect(file.name).toBe('file.jpg')
    }),
    imageUrlToFile('https://example.com/image.png').then((file) => {
      expect(file.name).toBe('file.png')
    }),
    imageUrlToFile('https://example.com/image.gif').then((file) => {
      expect(file.name).toBe('file.gif')
    })
  ])
})

// Test that the function 'imageUrlToFile' handles HTTP response with status code 200 correctly
it('should handle HTTP response with status code 200 correctly', () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    blob: jest.fn().mockResolvedValue(new Blob())
  })

  return imageUrlToFile('https://example.com/image.jpg').then((file) => {
    expect(file).toBeInstanceOf(File)
  })
})

// Test that the function 'imageUrlToFile' returns a Promise that rejects with an error when the HTTP response has a status code other than 200.
it('should reject with an error when HTTP response has status code other than 200', () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 404,
    blob: jest.fn().mockResolvedValue(new Blob())
  })

  return imageUrlToFile('https://example.com/image.jpg').catch((error) => {
    expect(error).toBeInstanceOf(Error)
  })
})

// Test that the function 'imageUrlToFile' rejects with an error when the fetch fails.
it('should reject with an error when fetch fails', () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 500,
    blob: jest.fn().mockResolvedValue(new Blob())
  })

  return imageUrlToFile('https://example.com/image.jpg').catch((error) => {
    expect(error).toBeInstanceOf(Error)
  })
})
