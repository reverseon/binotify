import { UserType } from '../../config/type'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {} as UserType,
    isLogin: false
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                user: action.payload,
                isLogin: true
            }
        },
        logout: (state) => {
            return {
                ...state,
                user: {} as UserType,
                isLogin: false
            }
        }
    }
})

export const { login, logout } = sessionSlice.actions
export default sessionSlice.reducer
