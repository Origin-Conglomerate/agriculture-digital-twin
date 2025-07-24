import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login-slice";
import modalSlice from "./modal-slice";
import themeReducer from "./theme-slice";
import userReducer from "./user-slice";

const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        modal: modalSlice.reducer,
        theme: themeReducer,
        user: userReducer
    },
});

export default store;
