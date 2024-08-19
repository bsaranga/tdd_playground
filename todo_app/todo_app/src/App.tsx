import { useEffect, useState } from 'react'
import config from '../config'
import ITask from './types/ITask'
import Task from './components/Task'

const { todoApi } = config

function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  
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

  function handleDone(id: number, doneState: boolean) {
    fetch(`${todoApi}/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ done: doneState }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setTasks(data)
        }
      })
  }
  
  return (
    <div className='flex flex-col gap-2'>
      {
        tasks.length == 0 ? <div>No Tasks</div> :
        tasks.map(t => {
          return (
            <Task task={t} handleDelete={handleDelete} handleDone={handleDone} key={t.id} />
          )
        })
      }
    </div>
  )
}

export default App
