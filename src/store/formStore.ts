import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//todo: try date typeof string

export interface Form {
    id?: string;
    title: string;
    description: string;
    date_start: Date;
    date_end: Date;
    activeStep: number;
}

interface FormStore {
    form: Form;
    setForm: (form: Form) => void;
    nextStep: () => void;
    prevStep: () => void;
    getForm: () => Form;
    clearForm: () => void;
}
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);



export const useFormStore = create<FormStore>()(persist((set, get) => {

    const storedForm = localStorage.getItem('form-store');
    return {
        form: storedForm ? JSON.parse(storedForm) : {
            title: '',
            description: '',
            date_start: today,
            date_end: tomorrow,
            activeStep: 1
        },
        setForm: (form) => set((state) => ({ form: { ...state.form, ...form } })),
        nextStep: () => set((state) => ({ form: { ...state.form, activeStep: state.form.activeStep + 1 } })),
        prevStep: () => set((state) => ({ form: { ...state.form, activeStep: state.form.activeStep - 1 } })),
        getForm: () => get().form,
        clearForm: () => set({
            form: {
                title: '',
                description: '',
                date_start: today,
                date_end: tomorrow,
                activeStep: 1
            }
        }),

    }
},
    {
        name: 'form-store',
    }))
