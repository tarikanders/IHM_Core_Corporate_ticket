import React from 'react'

interface InputProps {
  label?: string
  error?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  name?: string
  className?: string
}

export default function Input({
  label,
  error,
  placeholder,
  value,
  onChange,
  type = 'text',
  name,
  className = '',
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-lgray">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          bg-dgray border rounded-lg px-3 py-2 text-sm text-white
          placeholder-muted outline-none transition-all duration-200
          focus:border-purple focus:ring-1 focus:ring-purple/30
          ${error ? 'border-red' : 'border-dgray/60'}
        `}
      />
      {error && <span className="text-xs text-red">{error}</span>}
    </div>
  )
}
