
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

interface LayoutProps {
  role: 'artist' | 'agent'
}

export default function Layout({ role }: LayoutProps) {
  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar role={role} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
