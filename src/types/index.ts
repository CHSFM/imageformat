export interface ImageFile {
  id: string
  file: File
  preview: string
  converted?: string
}

export type SupportedFormat = 'png' | 'jpeg' | 'webp' | 'bmp' 