import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  message: null,
  description: null,
  status: '',
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.id = action.payload.id;
      state.message = action.payload.message;
      state.description = action.payload.description;
      state.status = action.payload.status;
    },
  },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;
