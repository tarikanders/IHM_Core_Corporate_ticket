import React from 'react'
import { ChevronDown, AlertCircle } from 'lucide-react'

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
  required?: boolean
}

export default function Select({
  label,
  options,
  value,
  onChange,
  error,
  name,
  className = '',
  required = false,
}: SelectProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-white text-sm font-medium mb-2 block">
          {label}
          {required && <span className="text-red ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`
            w-full appearance-none bg-dgray border rounded-xl px-4 py-3 pr-10 text-sm text-white
            outline-none cursor-pointer
            focus:border-purple focus:ring-2 focus:ring-purple/20
            ${error ? 'border-red' : 'border-border'}
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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-lgray pointer-events-none"
        />
      </div>
      {error && (
        <span className="text-red text-xs mt-1.5 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </span>
      )}
    </div>
  )
}
