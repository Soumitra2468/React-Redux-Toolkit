import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo, editTodo } from '../features/todo/todoSlice';
import { setPrompt } from '../features/prompt/promptSlice';

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
    dispatch(setPrompt({
      message: `Marked as ${todo.completed ? 'incomplete' : 'complete'}`,
      action: toggleTodo,
      data: todo.id,
    }));
  };

  const handleDelete = () => {
    dispatch(removeTodo(todo.id));
    dispatch(setPrompt({
      message: `Todo deleted`,
      action: removeTodo,
      data: todo.id,
    }));
  };

  const handleEdit = () => {
    if (!editText.trim()) return;
    dispatch(editTodo({ id: todo.id, text: editText }));
    setIsEditing(false);
    dispatch(setPrompt({
      message: `Todo updated`,
      action: editTodo,
      data: { id: todo.id, text: editText },
    }));
  };

  return (
    <li className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg flex items-center justify-between shadow">
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 mr-4 px-2 py-1 rounded bg-gray-600 text-white"
        />
      ) : (
        <span
          onClick={handleToggle}
          className={`flex-1 mr-4 cursor-pointer ${todo.completed ? '' : 'line-through text-gray-400'}`}
        >
          {todo.text}
        </span>
      )}
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
