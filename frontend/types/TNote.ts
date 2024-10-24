import { TTask } from "./TTask";

export type TNote = {
    id: string,
    title?: string,
    body?: string,
    list?: TTask[],
    imgs?: string[],
    reminder?: Date,
    color?: string,
    createdDate?: Date,
}