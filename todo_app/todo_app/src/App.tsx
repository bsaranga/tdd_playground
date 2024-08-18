import { useEffect } from 'react'
import config from '../config'
import './App.css'

const { todoApi } = config

function App() {

  useEffect(() => {
    fetch(`${todoApi}/tasks`)
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
