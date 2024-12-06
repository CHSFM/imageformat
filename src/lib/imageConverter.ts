export const convertImage = (file: File, format: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      try {
        const dataURL = canvas.toDataURL(`image/${format}`)
        resolve(dataURL)
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
} 