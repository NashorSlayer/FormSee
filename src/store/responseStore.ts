import { create } from "zustand";
import { persist } from "zustand/middleware";


export interface Response {
    index: number;
    area: string;
    date_start: Date;
    date_end: Date;
}

interface ResponseStore {
    response: Response[];
    setResponse: (response: Response[]) => void;
    addResponse: (response: Response) => void;
    removeResponse: (index: number) => void;
    editResponse: (index: number, response: Response) => void;
    clearResponse: () => void;
}


export const useResponseStore = create<ResponseStore>()(persist((set, get) => {
    const storedResponse = localStorage.getItem('response-store');
    return {
        response: storedResponse ? JSON.parse(storedResponse) : [],
        setResponse: (response) => set({ response }),
        addResponse: (newResponse) => set((state) => ({
            response: [...state.response, newResponse]
        })),
        removeResponse: (index) => set((state) => ({
            response: state.response.filter((_, i) => i !== index)
        })),
        editResponse: (index, newResponse) => set((state) => ({
            response: state.response.map((response, i) =>
                i === index ? newResponse : response)
        })),
        clearResponse: () => {
            set({ response: [] });
        }
    }
}, {
    name: 'response-store'
}))