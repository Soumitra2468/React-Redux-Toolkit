// src/components/Todos.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, toggleTodo, editTodo } from '../features/todo/todoSlice';
import Alert from './Alert'; // Import the Alert component

function Todos({ showPrompt }) {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState('');

  const handleToggle = (todo) => {
    dispatch(toggleTodo(todo.id));
    showPrompt('toggle', todo.id);
    const toggledTodo = todos.find((item) => item.id === todo.id);
    setAlertMessage(`Todo "${todo.text}" marked as ${toggledTodo.completed ? 'complete' : 'incomplete'}`);
  };

  const handleEdit = (todo) => {
    const newText = prompt("Edit your Todo:", todo.text);
    if (newText) {
      dispatch(editTodo({ id: todo.id, text: newText }));
      showPrompt('edit', { id: todo.id, text: newText });
    }
  };

  const handleDelete = (todo) => {
    dispatch(removeTodo(todo.id));
    showPrompt('delete', todo.id);
    setAlertMessage(`Todo "${todo.text}" deleted`);
  };

  const handleAlertClose = () => {
    setAlertMessage(''); // Close alert
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-4">Your Todos</h2>
      {alertMessage && <Alert message={alertMessage} onClose={handleAlertClose} />}
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-4 py-3 rounded-xl shadow-md hover:scale-[1.02] transition-transform"
          >
            <div className={`flex-1 ${todo.completed ? 'line-through opacity-70' : ''}`}>
              {todo.text}
            </div>
            <div className="space-x-2 ml-4">
              <button
                onClick={() => handleToggle(todo)}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg shadow-sm"
              >
                Toggle
              </button>
              <button
                onClick={() => handleEdit(todo)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg shadow-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg shadow-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
