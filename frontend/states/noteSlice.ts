import { TNote } from "@/types/TNote";
import { createSlice } from "@reduxjs/toolkit";

type TNoteSliceState = {
    notes: TNote[],
    loading: boolean,
}

const initialState: TNoteSliceState = {
    notes: [],
    loading: false,
 
};

const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        setNotes: (state, action) => {
            state.notes = [...action.payload];
            state.loading = false;
        },
        addNote: (state, action) => {
            state.notes.unshift(action.payload);
        },
        updateNote: (state, action) => {
            const noteIndex = state.notes.findIndex(n => n._id === action.payload._id);
            if (noteIndex >= 0) {
                state.notes[noteIndex] = action.payload;
            }
        },
        deleteNote: (state, action) => {
            state.notes = state.notes.filter(n => n._id!== action.payload);
        },

        startLoading: (state) => {
            state.loading = true;
        },
        stopLoading: (state) => {
            state.loading = false;
        },
    },
})

export const noteActions = noteSlice.actions;
export default noteSlice.reducer;