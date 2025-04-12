import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  action: null,  // This will store the last action (toggle, delete, edit)
  data: null,    // This will store the data (id, text, etc.) related to the action
};

export const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    setPrompt: (state, action) => {
      state.message = action.payload.message;
      state.action = action.payload.action;
      state.data = action.payload.data;
    },
    clearPrompt: (state) => {
      state.message = '';
      state.action = null;
      state.data = null;
    },
  },
});

export const { setPrompt, clearPrompt } = promptSlice.actions;
export default promptSlice.reducer;
