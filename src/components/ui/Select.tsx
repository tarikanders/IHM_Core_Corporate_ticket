import React from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  options: SelectOption[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
  name?: string
  className?: string
}

export default function Select({
  label,
  options,
  value,
  onChange,
  error,
  name,
  className = '',
}: SelectProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-lgray">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`
            w-full appearance-none bg-dgray border rounded-lg px-3 py-2 pr-8 text-sm text-white
            outline-none transition-all duration-200 cursor-pointer
            focus:border-purple focus:ring-1 focus:ring-purple/30
            ${error ? 'border-red' : 'border-dgray/60'}
          `}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-dgray text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-lgray pointer-events-none"
        />
      </div>
      {error && <span className="text-xs text-red">{error}</span>}
    </div>
  )
}
