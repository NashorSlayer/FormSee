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