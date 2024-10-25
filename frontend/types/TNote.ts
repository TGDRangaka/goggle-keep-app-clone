import { TTask } from "./TTask";

export type TNote = {
    id: string,
    title?: string,
    body?: string,
    list?: TTask[],
    imgs?: any[],
    reminder?: string,
    color?: string,
    createdDate?: Date,
}