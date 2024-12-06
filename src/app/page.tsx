'use client'

import { useState } from 'react'
import ImageUploader from '@/components/ImageUploader'
import ImageList from '@/components/ImageList'
import FormatSelector from '@/components/FormatSelector'
import { ImageFile } from '@/types'

export default function Home() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [targetFormat, setTargetFormat] = useState<string>('png')

  const handleClear = () => {
    // 清除所有预览URL
    images.forEach(image => {
      if (image.preview) {
        URL.revokeObjectURL(image.preview)
      }
      if (image.converted) {
        URL.revokeObjectURL(image.converted)
      }
    })
    // 清空图片列表
    setImages([])
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">图片格式转换工具</h1>
        <p className="text-lg mb-8 text-center text-gray-600">
          支持 PNG、JPEG、WEBP、BMP 等格式之间的转换，所有转换在浏览器本地完成，无需上传服务器
        </p>

        {/* 上传区域和格式选择 */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <ImageUploader onUpload={(newImages) => setImages([...images, ...newImages])} />
            </div>
            <div className="w-48">
              <FormatSelector value={targetFormat} onChange={setTargetFormat} />
            </div>
          </div>
        </div>

        {/* 图片列表 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <ImageList 
            images={images} 
            onDelete={(id) => setImages(images.filter(img => img.id !== id))}
            onClear={handleClear}
            targetFormat={targetFormat}
          />
        </div>
      </div>
    </main>
  )
} 