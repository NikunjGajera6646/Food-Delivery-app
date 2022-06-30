import { createSlice } from '@reduxjs/toolkit'

export const userDataSlice = createSlice({
    name: 'userinfo',
    initialState: {
        isLoggedIn: false,
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLogIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, setLogIn } = userDataSlice.actions

export default userDataSlice.reducer