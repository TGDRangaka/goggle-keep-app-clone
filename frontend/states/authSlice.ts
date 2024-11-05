import { createSlice } from "@reduxjs/toolkit"

type AuthSliceInitialState = {
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null,
    user: string | null,
}

const initialState: AuthSliceInitialState = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signInRequest: (state) => {
            state.isLoading = true
            state.error = null
        },
        signInSuccess: (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.user = action.payload
        },
        signInFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        signOut: (state) => {
            state.isAuthenticated = false
            state.user = null
        },
    },
})

export const authActions = authSlice.actions;
export default authSlice.reducer;