import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '图片格式转换工具',
  description: '支持 PNG、JPEG、WEBP、BMP 等格式之间的转换',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
