import type { User } from '../types/ticket'

export const mockUsers: User[] = [
  { id: 'user-lea', name: 'Léa Rousseau', role: 'artist', plan: 'premium', city: 'Lyon', avatar: 'L', color: '#E040FB', balance: 1847.50 },
  { id: 'user-karim', name: 'Karim Benali', role: 'artist', plan: 'label', city: 'Paris', avatar: 'K', color: '#00BCD4', balance: 342.00 },
  { id: 'agent-ines', name: 'Inès Morel', role: 'agent', city: 'Strasbourg', avatar: 'I', color: '#7B5EA7' },
]
