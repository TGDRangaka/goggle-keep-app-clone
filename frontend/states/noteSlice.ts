import { createSlice } from "@reduxjs/toolkit";

type TNoteSliceState = {
    count: number;
}

const initialState: TNoteSliceState = {
    count: 0,
};

const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        increment: (state) => {
            state.count++;
        },
    },
})

export const noteActions = noteSlice.actions;
export default noteSlice.reducer;