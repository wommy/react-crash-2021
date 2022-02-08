import React, { useEffect, useState } from 'react'
import AddTask from './_includes/AddTask'
import Header from './_includes/Header'
import Tasks from './_includes/Tasks'

export const frontMatter = {
  layout: 'layout',
  hydrate: 'eager',
  title: 'Task Tracker',
}

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:3000/tasks')
      const data = await res.json()
      console.log(data)
    }
    fetchTasks()
  }, [])

  // add task
  const addTask = task => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // delete task
  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // toggle reminder
  const toggleReminder = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: !task.reminder } : task,
      ),
    )
  }

  return (
    <div className='container'>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No Tasks to Show'
      )}
    </div>
  )
}

export default App
