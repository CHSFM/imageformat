'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ImageFile } from '@/types'

interface Props {
  onUpload: (files: ImageFile[]) => void
}

export default function ImageUploader({ onUpload }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: ImageFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).slice(2),
      file,
      preview: URL.createObjectURL(file)
    }))
    onUpload(newImages)
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.bmp']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
    >
      <input {...getInputProps()} />
      <p>拖拽图片到此处，或点击选择图片</p>
      <p className="text-sm text-gray-500 mt-2">支持 PNG、JPEG、WEBP、BMP 格式，单个文件最大 10MB</p>
    </div>
  )
} 