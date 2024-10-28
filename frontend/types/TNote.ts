import { TImage } from "./TImage";
import { TTask } from "./TTask";

export type TNote = {
    _id: string,
    title?: string,
    body?: string,
    list?: TTask[],
    imgs?: TImage[],
    reminder?: string,
    color?: string,
    createdDate?: Date,
}