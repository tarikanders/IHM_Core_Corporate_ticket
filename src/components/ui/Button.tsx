import React from 'react'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'danger' | 'ghost' | 'success'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: Variant
  size?: Size
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-purple hover:bg-purple/80 text-white border border-purple/50',
  danger: 'bg-red hover:bg-red/80 text-white border border-red/50',
  ghost: 'bg-transparent hover:bg-dgray/50 text-lgray border border-dgray',
  success: 'bg-green hover:bg-green/80 text-bg border border-green/50',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  children,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  )
}
