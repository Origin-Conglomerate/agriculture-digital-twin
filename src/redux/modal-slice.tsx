import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		isModalActive: false,
	},
	reducers: {
		showModal(state, action) {
			state.isModalActive = action.payload;
		},
		hideModal(state, action) {
			state.isModalActive = action.payload;
		},
	},
});

export const modalActions = modalSlice.actions;

export default modalSlice;
