import { TImage } from "./TImage";
import { TTask } from "./TTask";

export type TNote = {
    _id: string,
    title?: string,
    body?: string,
    list?: TTask[],
    imgs?: TImage[],
    reminder: { datetime: string, repeat: ERepeat } | null,
    color?: string,
    createdDate?: Date,
}

export enum ERepeat {
    Daily = 'Daily',
    Weekly = 'Weekly',
    Monthly = 'Monthly',
    Yearly = 'Yearly',
    DOES_NOT_REPEAT = 'Does not repeat',
}