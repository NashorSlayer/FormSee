import { User } from "./user.type";

export type Form = {
    id?: string;
    title: string;
    description: string;
    date_start: Date;
    date_end: Date;
    user: User
}


// export type IFormData = {
//     title: string;
//     description: string;
//     date_start: Date;
//     date_end: Date;
//     user: {
//         id: string;
//     }
// }