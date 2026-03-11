import React from 'react'

interface StatCardProps {
  value: string | number
  label: string
  color: string
  icon?: React.ReactNode
  className?: string
}

export default function StatCard({ value, label, color, icon, className = '' }: StatCardProps) {
  return (
    <div className={`bg-card border border-dgray/30 rounded-xl overflow-hidden ${className}`}>
      <div className="h-1 w-full" style={{ backgroundColor: color }} />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold" style={{ color }}>
              {value}
            </div>
            <div className="text-sm text-lgray mt-1">{label}</div>
          </div>
          {icon && (
            <div className="opacity-60" style={{ color }}>
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
