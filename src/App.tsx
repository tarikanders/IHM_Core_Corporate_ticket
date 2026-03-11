import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ArtistDashboard from './pages/ArtistDashboard'
import NewTicketPage from './pages/NewTicketPage'
import TicketTrackingPage from './pages/TicketTrackingPage'
import AgentDashboard from './pages/AgentDashboard'
import AgentTicketPage from './pages/AgentTicketPage'
import MyReleasesPage from './pages/artist/MyReleasesPage'
import TicketConfirmationPage from './pages/artist/TicketConfirmationPage'
import StatsPage from './pages/agent/StatsPage'

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  {
    path: '/artist',
    element: <Layout role="artist" />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: 'dashboard', element: <ArtistDashboard /> },
      { path: 'new-ticket', element: <NewTicketPage /> },
      { path: 'tickets', element: <TicketTrackingPage /> },
      { path: 'tickets/:id', element: <TicketTrackingPage /> },
      { path: 'tickets/confirm', element: <TicketConfirmationPage /> },
      { path: 'releases', element: <MyReleasesPage /> },
    ]
  },
  {
    path: '/agent',
    element: <Layout role="agent" />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: 'dashboard', element: <AgentDashboard /> },
      { path: 'tickets/:id', element: <AgentTicketPage /> },
      { path: 'stats', element: <StatsPage /> },
    ]
  },
  { path: '*', element: <NotFoundPage /> }
])

export default function App() {
  return <RouterProvider router={router} />
}
