// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { addTodo, removeTodo, toggleTodo, editTodo } from './features/todo/todoSlice';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';

function App() {
  const dispatch = useDispatch();
  const [isPromptVisible, setPromptVisible] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  const handlePromptClick = () => {
    if (lastAction) {
      lastAction();
      setPromptVisible(false);
    }
  };

  const showPrompt = (actionType, actionData) => {
    setLastAction(() => () => {
      switch (actionType) {
        case 'toggle':
          dispatch(toggleTodo(actionData));
          break;
        case 'edit':
          dispatch(editTodo(actionData));
          break;
        case 'delete':
          dispatch(removeTodo(actionData));
          break;
        default:
          break;
      }
    });
    setPromptVisible(true);
  };

  return (
    <>
      <h1>Learn about Redux Toolkit</h1>
      <AddTodo showPrompt={showPrompt} />
      <Todos showPrompt={showPrompt} />
      {isPromptVisible && (
        <div className="prompt">
          <div>
            <p>Action was performed. Click to repeat.</p>
            <button onClick={handlePromptClick}>Repeat Action</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
