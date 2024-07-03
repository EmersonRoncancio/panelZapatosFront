import { create } from 'zustand'

type Aunthenticated = {
  aunthenticated: boolean
  setAunthenticated: () => void
}

export const useAunthenticated = create<Aunthenticated>((set) => ({
  aunthenticated: false,
  setAunthenticated: () => {
    set({aunthenticated: true})
  }
}))
