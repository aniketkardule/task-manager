
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setuser: (state, actions) => {
            state.user = actions.payload;
            localStorage.setItem('user', JSON.stringify(actions.payload))
        },
        removeuser : (state) => {
            state.user = null;
            
        },
        updatetask: (state, actions) => {
            const taskUpdate = state.user.tasks.findIndex((task) => {
                return task._id == actions.payload._id;
            })
            state.user.tasks[taskUpdate] = actions.payload;
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        deletetask: (state, actions) => {
            const taskDelete = state.user.tasks.findIndex((task) => {
                return task._id == actions.payload;
            })
            state.user.tasks.splice(taskDelete,1);
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        addtask: (state, actions) => {
            state.user.tasks.unshift(actions.payload);
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(state.user))
        } 
    }
})

export const { setuser, removeuser, updatetask, deletetask, addtask } = userSlice.actions;

export default userSlice.reducer;