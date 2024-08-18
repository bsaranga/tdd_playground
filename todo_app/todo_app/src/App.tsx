import { useEffect } from 'react'
import './App.css'

function App() {

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(data => console.log(data))
  })
  
  return (
    <>
      <p>hello world</p>
    </>
  )
}

export default App
