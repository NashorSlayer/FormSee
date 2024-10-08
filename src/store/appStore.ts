import { create } from "zustand";

export interface appType {
    snackBarOpen: boolean;
    modalOpen: boolean;
    loading: boolean;
    error: Error | null;
    message: string;
}


interface appStore {
    app: appType;
    setModalOpen: (open: boolean) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: Error) => void;
    setMessage: (message: string) => void;
    setSnackBarOpen: (open: boolean) => void;
}

export const useAppStore = create<appStore>((set) => ({
    app: {
        snackBarOpen: false,
        modalOpen: false,
        loading: false,
        error: null,
        message: ''
    },
    setModalOpen: (open) => set((state) => ({ app: { ...state.app, modalOpen: open } })),
    setLoading: (loading) => set((state) => ({ app: { ...state.app, loading: loading } })),
    setError: (error) => set((state) => ({ app: { ...state.app, error: error } })),
    setMessage: (message) => set((state) => ({
        app: {
            ...state.app, message: message
        }
    })),
    setSnackBarOpen: (open) => set((state) => ({ app: { ...state.app, snackBarOpen: open } }))
}))