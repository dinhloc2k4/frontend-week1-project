import React, { useState, useEffect } from 'react'

function FormDemo() {
  const [name, setName] = useState('')

  useEffect(() => {
    if (name) {
      console.log('Name updated:', name)
    }
  }, [name])

  return (
    <div style={{ marginTop: '10px' }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>You typed: {name}</p>
    </div>
  )
}

export default FormDemo
