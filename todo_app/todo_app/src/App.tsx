import { useEffect, useState } from 'react'
import config from '../config'
import './App.css'

const { todoApi } = config

interface Task {
  id: number
  title: string
  description: string
  done: boolean
  dueDate: string
  priority: 'High' | 'Medium' | 'Low'
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  
  useEffect(() => {
    fetch(`${todoApi}/tasks`)
      .then(response => response.json())
      .then(data => setTasks(data))
  }, [])

  function handleDelete(id: number) {
    fetch(`${todoApi}/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setTasks(data)
        }
      })
  }
  
  return (
    <>
      {
        tasks.map(t => {
          return (
            <div key={t.id}>
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </div>
          )
        })
      }
    </>
  )
}

export default App
