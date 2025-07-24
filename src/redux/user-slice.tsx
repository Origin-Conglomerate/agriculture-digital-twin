import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: "admin",
    fullName: "Admin User",
};

const userSlice = createSlice({
    name: "themeMode",
    initialState,
    reducers: {
    },
});

export default userSlice.reducer
