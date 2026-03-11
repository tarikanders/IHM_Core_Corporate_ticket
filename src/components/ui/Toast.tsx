import { useEffect } from 'react'
import { CheckCircle, AlertCircle, X } from 'lucide-react'

interface ToastProps {
  show: boolean
  title: string
  subtitle?: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
  duration?: number
}

export default function Toast({ show, title, subtitle, type = 'success', onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (!show) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [show, duration, onClose])

  if (!show) return null

  const configs = {
    success: { icon: <CheckCircle size={18} className="text-green flex-shrink-0" />, border: 'border-green/40' },
    error:   { icon: <AlertCircle size={18} className="text-red flex-shrink-0" />,   border: 'border-red/40' },
    info:    { icon: <CheckCircle size={18} className="text-teal flex-shrink-0" />,  border: 'border-teal/40' },
  }
  const { icon, border } = configs[type]

  return (
    <div className={`fixed bottom-6 right-6 z-50 animate-slide-up bg-card border ${border} rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3 min-w-64`}>
      {icon}
      <div className="flex-1">
        <p className="text-white font-semibold text-sm">{title}</p>
        {subtitle && <p className="text-lgray text-xs mt-0.5">{subtitle}</p>}
      </div>
      <button onClick={onClose} className="text-muted hover:text-white flex-shrink-0 cursor-pointer">
        <X size={14} />
      </button>
    </div>
  )
}
