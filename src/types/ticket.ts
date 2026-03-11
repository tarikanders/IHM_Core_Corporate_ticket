export type Status = 'pending' | 'in_progress' | 'resolved' | 'closed'
export type Priority = 'critical' | 'high' | 'medium' | 'low'
export type Category = 'distribution' | 'royalties' | 'metadata' | 'account'

export interface Message {
  author: string
  role: 'artist' | 'agent'
  content: string
  createdAt: string
}

export interface Ticket {
  id: string
  subject: string
  category: Category
  priority: Priority
  status: Status
  artistId: string
  releaseId?: string
  createdAt: string
  updatedAt: string
  messages: Message[]
  assignedTo?: string
  tags: string[]
}

export interface User {
  id: string
  name: string
  role: 'artist' | 'agent'
  plan?: string
  city: string
  avatar: string
  color: string
}

export interface Release {
  id: string
  title: string
  type: 'Album' | 'Single' | 'EP'
  artistId: string
  upc?: string
  releaseDate: string
  platforms: {
    spotify: boolean
    appleMusic: boolean
    deezer: boolean
    amazon: boolean
    tidal: boolean
  }
  tracksCount?: number
}
