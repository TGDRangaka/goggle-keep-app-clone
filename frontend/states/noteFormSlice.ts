import { TNote } from "@/types/TNote";
import { TTask } from "@/types/TTask";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TNoteFormSliceState = {
    selectedNoteId: string | null,
    note: TNote,
    isNote: boolean,
    newImgs: any[],
}

const initialState: TNoteFormSliceState = {
    selectedNoteId: null,
    note: {
        id: "",
        title: "",
        body: "",
        list: [],
        imgs: [],
        reminder: '',
        color: '',
    },
    isNote: true,
    newImgs: [],
};

const noteFormSlice = createSlice({
    name: "noteForm",
    initialState,
    reducers: {
        updateTitle: (state, action) => {
            state.note.title = action.payload;
        },
        updateBody: (state, action) => {
            state.note.body = action.payload;
        },
        addImage: (state, action) => {
            state.note.imgs?.push(action.payload);
        },
        addNewImg: (state, action) => {
            state.newImgs.push(action.payload);
        },
        removeImage: (state, action) => {
            state.note.imgs = state.note.imgs?.filter((_, index) => index !== action.payload);
        },
        addTask: (state, action) => {
            state.note.list?.push(action.payload);
        },
        toggleTaskCompleted: (state, action) => {
            const task = state.note.list?.find(t => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        removeTask: (state, action) => {
            state.note.list = state.note.list?.filter((task) => task.id !== action.payload);
        },
        toggleIsNote: (state) => {
            state.isNote = !state.isNote;
        },
        updateReminder: (state, action) => {
            state.note.reminder = action.payload
        },

        setNote: (state, action: PayloadAction<TNote>) => {
            state.note = action.payload;
            state.isNote = action.payload.body != null;
        },

        clearNote: state => {
            state.selectedNoteId = null;
            state.note = {
                id: "",
                title: "",
                body: "",
                list: [],
                imgs: [],
                reminder: '',
                color: '',
            };
            state.isNote = true;
        }
    },
})

export const noteformActions = noteFormSlice.actions;
export default noteFormSlice.reducer;