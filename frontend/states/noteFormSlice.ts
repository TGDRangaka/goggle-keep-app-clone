import { TImage } from "@/types/TImage";
import { TNote } from "@/types/TNote";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TNoteFormSliceState = {
    selectedNoteId: string | null,
    note: TNote,
    isNote: boolean,
    newImgs: TImage[],
    reminderEditModal: boolean,
}

const initialState: TNoteFormSliceState = {
    selectedNoteId: null,
    note: {
        _id: "",
        title: "",
        body: "",
        list: [],
        imgs: [],
        reminder: null,
        color: '',
    },
    isNote: true,
    newImgs: [],
    reminderEditModal: false,
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
            state.note.imgs?.push({ _id: '', path: "", uri: action.payload });
        },
        addNewImg: (state, action) => {
            state.newImgs.push({ _id: '', path: "", uri: action.payload });
        },
        removeImage: (state, action) => {
            state.note.imgs = state.note.imgs?.filter((_, index) => index !== action.payload);
        },
        addTask: (state, action) => {
            state.note.list?.push(action.payload);
        },
        toggleTaskCompleted: (state, action) => {
            const task = state.note.list?.find(t => t._id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        removeTask: (state, action) => {
            state.note.list = state.note.list?.filter((task) => task._id !== action.payload);
        },
        selectCheckboxes: (state) => {
            if (state.isNote) {
                state.isNote = !state.isNote;
                state.note.body = '';
                state.note.list = [{ _id: 'asdf', task: "", completed: false }];
            }

        },
        updateReminder: (state, action) => {
            state.note.reminder = action.payload
        },
        
        setNote: (state, action: PayloadAction<TNote>) => {
            state.note = action.payload;
            state.isNote = action.payload.list?.length == 0;
            state.selectedNoteId = action.payload._id;
        },

        setColor: (state, action: PayloadAction<string>) => {
            state.note.color = action.payload;
        },

        clearNote: state => {
            state.selectedNoteId = null;
            state.note = {
                _id: "",
                title: "",
                body: "",
                list: [],
                imgs: [],
                reminder: null,
                color: '',
            };
            state.isNote = true;
            state.newImgs = [];
        },

        setTaskText: (state, action: PayloadAction<{ id: string, text: string }>) => {
            const task = state.note.list?.find(t => t._id === action.payload.id);
            if (task) {
                task.task = action.payload.text;
            }
        },

        setReminderModalVisible: (state, action) => {
            state.reminderEditModal = action.payload;
        },
    },
})

export const noteformActions = noteFormSlice.actions;
export default noteFormSlice.reducer;