'use client'

import { SupportedFormat } from '@/types'

interface Props {
  value: string
  onChange: (format: string) => void
}

const formats: SupportedFormat[] = ['png', 'jpeg', 'webp', 'bmp']

export default function FormatSelector({ value, onChange }: Props) {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium mb-2">选择目标格式</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-lg"
      >
        {formats.map(format => (
          <option key={format} value={format}>
            {format.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
} 