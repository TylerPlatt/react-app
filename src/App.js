import React, { useState , useRef, useEffect} from 'react';
import TodoList from './TodoList';
const {v4: uuidv4} = require('uuid');
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos.length >0 ) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos] )

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]      
    })
    console.log(name)    
    console.log(localStorage.getItem(LOCAL_STORAGE_KEY))
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className='App'>
      <header>&#x2713; To Do </header>
      <div className='CheckBoxes'><TodoList todos={todos} toggleTodo={toggleTodo} /></div>
      <div className='ButtonIn'>
        <input className='InputNew' ref={todoNameRef} type="text" placeholder="Add Item" />
        <button className='AddButton' onClick={handleAddTodo}>Add</button>
      </div>
      <button className='DeleteButton'onClick={handleClearTodos}>Clear Completed ({todos.filter(todo => todo.complete).length})</button>
      <div className='ItemsLeft'>({todos.filter(todo => !todo.complete).length}) Items Left To Do</div>
    </div>
  )
}

export default App;
