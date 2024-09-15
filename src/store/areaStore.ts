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
    editArea: (oldName: string, newNam: string) => void;
    getAreas: () => Array<Area>;
    clearAreas: () => void;
    AreaExists: (area: string) => boolean;
    setAreasForm: (areas: Array<Area>) => void;
}

export const useAreaStore = create<AreaStore>()(persist((set, get) => {

    const storedAreas = localStorage.getItem('areas-store');
    return {
        areasFetch: [],
        areasForm: storedAreas ? JSON.parse(storedAreas) : [],
        addArea: (name) => set((state) => (
            get().areasForm.some((a: Area) => a.name === name) ? state :
                {
                    areasForm: [...state.areasForm, { name: name }]
                })),
        removeArea: (area) => set((state) => ({
            areasForm: get().areasForm.some((a: Area) => a.name === area.name) ?
                state.areasForm.filter((a: Area) => a.name !== area.name)
                : state.areasForm
        })),
        getAreas: () => get().areasFetch,
        clearAreas: () => set({
            areasForm: []
        }),
        editArea(oldName, newName) {
            set((state) => {
                const index = state.areasForm.findIndex((a: Area) => a.name === oldName);
                state.areasForm[index] = { name: newName };
                return state;
            })
        },
        AreaExists: (area) => {
            return get().areasForm.some((a: Area) => a.name === area)
        },
        setAreasForm: (areas) => set({
            areasForm: areas
        })
    }
}, {
    name: "areas-store"
}))