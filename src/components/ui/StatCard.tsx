import React from 'react'

interface StatCardProps {
  value: string | number
  label: string
  gradient: string
  icon?: React.ReactNode
  iconBg?: string
  trend?: string
  trendColor?: string
  pulse?: boolean
  className?: string
  onClick?: () => void
}

export default function StatCard({
  value,
  label,
  gradient,
  icon,
  iconBg,
  trend,
  trendColor = 'text-green',
  pulse = false,
  className = '',
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group bg-card border border-border rounded-2xl overflow-hidden hover:border-purple/30 transition-all ${onClick ? 'cursor-pointer hover:shadow-[0_0_16px_rgba(123,94,167,0.2)] active:scale-[0.98]' : 'cursor-default'} ${className}`}
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className={`text-4xl font-bold tracking-tight ${pulse ? 'animate-pulse text-red' : 'text-white'}`}>
              {value}
            </div>
            <div className="text-sm text-lgray mt-1">{label}</div>
            {trend && <div className={`text-xs mt-1 ${trendColor}`}>{trend}</div>}
          </div>
          {icon && iconBg && (
            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
