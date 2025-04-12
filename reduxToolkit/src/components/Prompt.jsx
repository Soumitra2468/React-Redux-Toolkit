import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPrompt, clearPrompt } from '../features/prompt/promptSlice';

function Prompt() {
  const { message, action, data } = useSelector((state) => state.prompt);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (action && data) {
      dispatch(action(data));
      dispatch(clearPrompt());
    }
  };

  if (!message) return null;

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer text-center mb-6 p-3 bg-yellow-400 text-black font-medium rounded hover:opacity-90 transition"
    >
      {message} – Click to repeat
    </div>
  );
}

export default Prompt;
