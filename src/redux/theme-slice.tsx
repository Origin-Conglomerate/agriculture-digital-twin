import { createSlice } from "@reduxjs/toolkit";

const initialState = { darkTheme: false };

const themeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    switchModes: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { switchModes } = themeSlice.actions;

export default themeSlice.reducer
