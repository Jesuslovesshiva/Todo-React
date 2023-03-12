import React from 'react'

export default function Todo({ todo, toggleToDo }) {
  function handleTodoClick() {
    toggleToDo(todo.id)
  }
  
  return (
    <div className="flex items-center my-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-6 w-6 border-gray-400 rounded focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        <label className="ml-3 text-lg font-medium text-gray-700">{todo.name}</label>
      </div>
    </div>
  );
}
