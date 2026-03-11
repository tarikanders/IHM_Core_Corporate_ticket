import { create } from 'zustand'
import type { Ticket, Status, Priority, Message, User } from '../types/ticket'
import { mockTickets } from '../data/mockTickets'
import { mockUsers } from '../data/mockUsers'

interface TicketStore {
  tickets: Ticket[]
  currentUser: User | null
  setUser: (userId: string) => void
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'messages' | 'tags'>) => void
  updateStatus: (id: string, status: Status) => void
  updatePriority: (id: string, priority: Priority) => void
  addMessage: (id: string, message: Message) => void
  assignTicket: (id: string, agentId: string) => void
  addTag: (id: string, tag: string) => void
  removeTag: (id: string, tag: string) => void
}

export const useTicketStore = create<TicketStore>((set, get) => ({
  tickets: mockTickets,
  currentUser: null,

  setUser: (userId: string) => {
    const user = mockUsers.find((u) => u.id === userId) || null
    set({ currentUser: user })
  },

  addTicket: (ticketData) => {
    const { tickets } = get()
    const maxNum = tickets.reduce((max, t) => {
      const num = parseInt(t.id.replace('TK-', ''), 10)
      return isNaN(num) ? max : Math.max(max, num)
    }, 0)
    const newId = `TK-${String(maxNum + 1).padStart(3, '0')}`
    const now = new Date().toISOString()
    const newTicket: Ticket = {
      ...ticketData,
      id: newId,
      createdAt: now,
      updatedAt: now,
      messages: [],
      tags: [],
    }
    set({ tickets: [newTicket, ...tickets] })
  },

  updateStatus: (id, status) => {
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t
      ),
    }))
  },

  updatePriority: (id, priority) => {
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id ? { ...t, priority, updatedAt: new Date().toISOString() } : t
      ),
    }))
  },

  addMessage: (id, message) => {
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id
          ? { ...t, messages: [...t.messages, message], updatedAt: new Date().toISOString() }
          : t
      ),
    }))
  },

  assignTicket: (id, agentId) => {
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id ? { ...t, assignedTo: agentId, updatedAt: new Date().toISOString() } : t
      ),
    }))
  },

  addTag: (id, tag) => {
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id && !t.tags.includes(tag)
          ? { ...t, tags: [...t.tags, tag], updatedAt: new Date().toISOString() }
          : t
      ),
    }))
  },

  removeTag: (id, tag) => {
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id
          ? { ...t, tags: t.tags.filter((tg) => tg !== tag), updatedAt: new Date().toISOString() }
          : t
      ),
    }))
  },
}))
