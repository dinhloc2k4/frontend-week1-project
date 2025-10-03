import React from 'react'

function ES6Demo() {
  const person = { name: 'Alice', age: 25 }
  const { name, age } = person

  const greet = (name) => `Hello, ${name}!`
  const nums = [1, 2, 3]
  const moreNums = [...nums, 4, 5]

  const asyncFetch = async () => {
    return new Promise((resolve) => setTimeout(() => resolve('Data loaded!'), 500))
  }

  return (
    <div>
      <p>let/const demo: const age = {age}</p>
      <p>Arrow function: {greet(name)}</p>
      <p>Spread operator: {moreNums.join(', ')}</p>
    </div>
  )
}

export default ES6Demo
