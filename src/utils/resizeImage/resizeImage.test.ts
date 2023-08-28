import resizeImage from './resizeImage'

describe('resizeImage', () => {
  // Test that the 'resizeImage' function correctly resizes an image with valid file and maxSize inputs.
  it('should resize the image when valid file and maxSize inputs are provided', async () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' })

    const resizedFile = await resizeImage(file, 500)

    expect(resizedFile).toBeInstanceOf(File)
    expect(resizedFile.name).toBe('test.jpg')
    expect(resizedFile.type).toBe('image/jpeg')

    const image = new Image()
    image.src = URL.createObjectURL(resizedFile)
    await image.decode()
    expect(image.width).toBeLessThanOrEqual(500)
    expect(image.height).toBeLessThanOrEqual(500)
  })

  // Test that the 'resizeImage' function correctly resizes an image with valid file and maxSize inputs when the image is already smaller than maxSize.
  it('should resize the image when valid file and maxSize inputs are provided and the image is already smaller than maxSize', async () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' })

    const resizedFile = await resizeImage(file, 500)

    expect(resizedFile).toBeInstanceOf(File)
    expect(resizedFile.name).toBe('test.jpg')
    expect(resizedFile.type).toBe('image/jpeg')

    const image = new Image()
    image.src = URL.createObjectURL(resizedFile)
    await image.decode()
    expect(image.width).toBeLessThanOrEqual(500)
    expect(image.height).toBeLessThanOrEqual(500)
  })

  // Test that the 'resizeImage' function returns the original file when the file type is not an image.
  it('should return the original file when the file type is not an image', async () => {
    const file = new File([''], 'test.txt', { type: 'text/plain' })

    const resizedFile = await resizeImage(file, 500)

    expect(resizedFile).toBe(file)
  })

  // Test that the 'resizeImage' function correctly resizes an image with valid file and maxSize inputs when the image is a PNG.
  it('should resize the image when valid file and maxSize inputs are provided and the image is a PNG', async () => {
    const file = new File([''], 'test.png', { type: 'image/png' })

    const resizedFile = await resizeImage(file, 500)

    expect(resizedFile).toBeInstanceOf(File)
    expect(resizedFile.name).toBe('test.png')
    expect(resizedFile.type).toBe('image/png')

    const image = new Image()
    image.src = URL.createObjectURL(resizedFile)
    await image.decode()
    expect(image.width).toBeLessThanOrEqual(500)
    expect(image.height).toBeLessThanOrEqual(500)
  })

  // Test that the 'resizeImage' function correctly resizes an image with valid file and maxSize inputs when the image is a GIF.
  it('should resize the image when valid file and maxSize inputs are provided and the image is a GIF', async () => {
    const file = new File([''], 'test.gif', { type: 'image/gif' })

    const resizedFile = await resizeImage(file, 500)

    expect(resizedFile).toBeInstanceOf(File)
    expect(resizedFile.name).toBe('test.gif')
    expect(resizedFile.type).toBe('image/gif')

    const image = new Image()
    image.src = URL.createObjectURL(resizedFile)
    await image.decode()
    expect(image.width).toBeLessThanOrEqual(500)
    expect(image.height).toBeLessThanOrEqual(500)
  })

  // Test that the 'resizeImage' function correctly resizes an image with valid file and maxSize inputs when the image is a BMP.
  it('should resize the image when valid file and maxSize inputs are provided and the image is a BMP', async () => {
    const file = new File([''], 'test.bmp', { type: 'image/bmp' })

    const resizedFile = await resizeImage(file, 500)

    expect(resizedFile).toBeInstanceOf(File)
    expect(resizedFile.name).toBe('test.bmp')
    expect(resizedFile.type).toBe('image/bmp')

    const image = new Image()
    image.src = URL.createObjectURL(resizedFile)
    await image.decode()
    expect(image.width).toBeLessThanOrEqual(500)
    expect(image.height).toBeLessThanOrEqual(500)
  })
})
