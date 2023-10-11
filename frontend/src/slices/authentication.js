import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state, actions) => {
            state.userInfo =actions.payload;
            localStorage.setItem('userInfo', JSON.stringify(actions.payload));
        },
        logout: (state) => {
            state.userInfo = null
            localStorage.removeItem('userInfo');
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;