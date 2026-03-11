import React from 'react'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'success'
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
  primary:   'bg-gradient-to-r from-purple to-pink text-white hover:opacity-90 hover:shadow-[0_0_20px_rgba(123,94,167,0.35)] active:scale-95',
  secondary: 'bg-dgray border border-border text-lgray hover:border-purple/50 hover:bg-purple/10 hover:text-white active:scale-95',
  danger:    'bg-red/15 text-red border border-red/30 hover:bg-red/25 active:scale-95',
  success:   'bg-green/15 text-green border border-green/30 hover:bg-green/25 active:scale-95',
  ghost:     'bg-transparent text-lgray hover:text-white hover:bg-white/5 active:scale-95',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl',
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
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : children}
    </button>
  )
}
