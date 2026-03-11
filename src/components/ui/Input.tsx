import React from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface InputProps {
  label?: string
  error?: string
  success?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  name?: string
  className?: string
  required?: boolean
}

export default function Input({
  label,
  error,
  success,
  placeholder,
  value,
  onChange,
  type = 'text',
  name,
  className = '',
  required = false,
}: InputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-white text-sm font-medium mb-2 block">
          {label}
          {required && <span className="text-red ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          bg-dgray border rounded-xl px-4 py-3 text-sm text-white w-full
          placeholder:text-muted outline-none
          focus:border-purple focus:ring-2 focus:ring-purple/20
          ${error ? 'border-red' : success ? 'border-green' : 'border-border'}
        `}
      />
      {error && (
        <span className="text-red text-xs mt-1.5 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </span>
      )}
      {success && !error && (
        <span className="text-green text-xs mt-1.5 flex items-center gap-1">
          <CheckCircle size={12} />
          {success}
        </span>
      )}
    </div>
  )
}
