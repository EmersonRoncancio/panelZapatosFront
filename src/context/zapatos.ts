import { create } from 'zustand'
import { Zapato } from './helpers/types'

type Zapatos = {
    getzapatos: Zapato[]
    setZapatos: (zapatos: Zapato[]) => void
}

export const useZapatos = create<Zapatos>((set) => ({
    getzapatos: [],
    setZapatos: (getzapatos) => {
        console.log(getzapatos)
        set({ getzapatos })
    }
}))