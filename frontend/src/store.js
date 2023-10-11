import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authentication";
import userSlice from "./slices/UserSlice";

const store = configureStore({
    reducer : {
        auth: authSlice,
        user: userSlice
    }
})

export default store;