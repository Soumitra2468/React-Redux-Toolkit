import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';
import promptReducer from '../features/prompt/promptSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    prompt: promptReducer,
  },
});
