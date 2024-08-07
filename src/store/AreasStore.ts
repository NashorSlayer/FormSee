import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export interface Area {
    name: string;
    inputValue?: string;
}

interface AreaStore {
    areasFetch: Array<Area>;
    areasForm: Array<Area>;
    addArea: (area: string) => void;
    removeArea: (area: Area) => void;
    getAreas: () => Array<Area>;
    clearAreas: () => void;
}

export const useAreaStore = create<AreaStore>()(persist((set, get) => {

    const storedAreas = localStorage.getItem('areas-store');
    return {
        areasFetch: [],
        areasForm: storedAreas ? JSON.parse(storedAreas) : [],
        addArea: (name) => set((state) => (
            {
                areasForm: [...state.areasForm, { name: name }]
            })),
        removeArea: (area) => set((state) => ({
            areasForm: state.areasForm.filter((a: Area) => a.name !== area.name)
        })),
        getAreas: () => get().areasFetch,
        clearAreas: () => set({
            areasForm: []
        })
    }
}, {
    name: "areas-store"
}))