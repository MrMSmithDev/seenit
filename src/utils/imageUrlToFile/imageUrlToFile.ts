async function imageUrlToFile(imageUrl: string): Promise<File> {
  return new Promise((resolve) => {
    fetch(imageUrl).then((result) => {
      result.blob().then((blob) => {
        const imageFile = new File([blob], 'file.extension', { type: blob.type })
        resolve(imageFile)
      })
    })
  })
}

export default imageUrlToFile
