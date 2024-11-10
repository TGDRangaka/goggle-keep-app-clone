import { TUser } from "@/types/TUser"
import { createSlice } from "@reduxjs/toolkit"

type AuthSliceInitialState = {
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null,
    user: TUser | null,
}

const initialState: AuthSliceInitialState = {
    isAuthenticated: false,
    isLoading: true,
    error: null,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        signOut: (state) => {
            state.isAuthenticated = false
            state.user = null
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
    },
})

export const authActions = authSlice.actions;
export default authSlice.reducer;