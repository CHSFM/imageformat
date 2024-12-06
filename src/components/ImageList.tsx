'use client'

import { useState } from 'react'
import { ImageFile } from '@/types'
import { convertImage } from '@/lib/imageConverter'
import JSZip from 'jszip'

interface Props {
  images: ImageFile[]
  onDelete: (id: string) => void
  targetFormat: string
}

export default function ImageList({ images, onDelete, targetFormat }: Props) {
  const [converting, setConverting] = useState<Record<string, boolean>>({})

  const handleConvert = async (image: ImageFile) => {
    setConverting(prev => ({ ...prev, [image.id]: true }))
    try {
      const converted = await convertImage(image.file, targetFormat)
      image.converted = converted
    } finally {
      setConverting(prev => ({ ...prev, [image.id]: false }))
    }
  }

  const downloadAll = async () => {
    const zip = new JSZip()
    
    // 确保所有图片都已转换
    await Promise.all(
      images.map(async (image) => {
        if (!image.converted) {
          await handleConvert(image)
        }
      })
    )

    // 添加到zip
    images.forEach((image, index) => {
      if (image.converted) {
        const base64Data = image.converted.split(',')[1]
        zip.file(`image_${index + 1}.${targetFormat}`, base64Data, { base64: true })
      }
    })

    // 下载zip
    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const link = document.createElement('a')
    link.href = url
    link.download = `converted_images.zip`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (images.length === 0) {
    return <div className="text-center text-gray-500">暂无图片</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">已上传图片</h2>
        {images.length > 0 && (
          <button
            onClick={downloadAll}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            批量下载
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {images.map(image => (
          <div key={image.id} className="relative">
            <img
              src={image.preview}
              alt="preview"
              className="w-full aspect-video object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 rounded-b-lg flex items-center justify-center space-x-2">
              <button
                onClick={() => handleConvert(image)}
                disabled={converting[image.id]}
                className="bg-white text-black px-3 py-1 rounded text-sm"
              >
                {converting[image.id] ? '转换中...' : '转换'}
              </button>
              {image.converted && (
                <a
                  href={image.converted}
                  download={`converted.${targetFormat}`}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                  下载
                </a>
              )}
              <button
                onClick={() => onDelete(image.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 