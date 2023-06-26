async function resizeImage(file: File, maxSize: number): Promise<File | boolean> {
  if (!file || !file.type.match(/image.*/)) return false

  const image = new Image()
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  image.src = URL.createObjectURL(file)
  await image.decode()
  let [width, height] = [image.width, image.height]

  // Resizing the image and keeping its aspect ratio
  if (width > height) {
    if (width > maxSize) {
      height *= maxSize / width
      width = maxSize
    }
  } else {
    if (height > maxSize) {
      width *= maxSize / height
      height = maxSize
    }
  }

  canvas.width = width
  canvas.height = height
  canvas.getContext('2d')!.drawImage(image, 0, 0, width, height)
  const resizedImage: Blob | null = await new Promise((rs) => canvas.toBlob(rs, 'image/jpeg', 1))

  if (resizedImage) return new File([resizedImage], file.name, { type: resizedImage.type })
  else return false
}

export default resizeImage
