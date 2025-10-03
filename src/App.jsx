import React from 'react'
import ES6Demo from './tasks/Task1_ES6'
import FormDemo from './tasks/Task2_Hooks/FormDemo'
import TodoApp from './tasks/Task2_Hooks/TodoApp'

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Frontend Week 1 Demo</h1>
      <h2>Task 1 - ES6+</h2>
      <ES6Demo />

      <h2>Task 2 - React Hooks</h2>
      <FormDemo />
      <TodoApp />
    </div>
  )
}

export default App
