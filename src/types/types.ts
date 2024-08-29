export type IFormData = {
    title: string;
    description: string;
    date_start: Date;
    date_end: Date;
    type: string;
    range: number;
    user: {
        id: string;
    }
}

export type ExperienceItem = {
    id: string
    content: string
    start: number
    end: number
}


