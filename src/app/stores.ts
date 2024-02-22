import { create } from 'zustand'
import { PersonData } from './types/person'

export const usePersonStore = create<{ person: PersonData } & { setPerson: (person: PersonData) => void }>((set) => ({
    person: null,
    setPerson: (person) => set(() => ({ person: person })),
}))