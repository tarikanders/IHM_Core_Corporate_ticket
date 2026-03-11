import React from 'react'

interface CardProps {
  className?: string
  children: React.ReactNode
}

export default function Card({ className = '', children }: CardProps) {
  return (
    <div className={`bg-card border border-dgray/30 rounded-xl p-6 ${className}`}>
      {children}
    </div>
  )
}
