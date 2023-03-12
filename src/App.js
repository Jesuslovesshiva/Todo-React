import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import './index.css'
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos( prevTodos => [...prevTodos, ...storedTodos] );
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleToDo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
   const name = todoNameRef.current.value
   if (name === '') return
   setTodos(prevTodos => {
    return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
   })
   todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  
  return (
    <div className="bg-gradient-to-b from-cyan-600 to-purple-600 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-2xl w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Todo List</h1>
        <div className="flex">
          <input
            className="border border-gray-300 rounded-lg w-full py-2 px-4 mr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            ref={todoNameRef}
            type="text"
            placeholder="Add new todo"
          />
          <button
            className="py-2 px-4 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>
        <TodoList todos={todos} toggleToDo={toggleToDo}/>
        <div className="flex justify-end">
          <button
            className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={handleClearTodos}
          >
            Clear Completed
          </button>
        </div>
        <div className="text-sm text-gray-500 mt-4">
          {todos.filter(todo => !todo.complete).length} tasks left
        </div>
      </div>
    </div>
  );
}

export default App;
