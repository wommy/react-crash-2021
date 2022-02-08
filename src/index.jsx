import React, { useEffect, useState } from 'react'
import Header from './_includes/Header'
import AddTask from './_includes/AddTask'
import Tasks from './_includes/Tasks'
import Footer from './_includes/Footer'

export const frontMatter = {
  layout: 'layout',
  hydrate: 'eager',
  title: 'Task Tracker',
}

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const DB_URL = `http://localhost:3000/tasks`
  const headers = { 'Content-type': 'application/json' }

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(DB_URL)
    return await res.json()
  }

  // fetch task
  const fetchTask = async id => {
    const res = await fetch(`${DB_URL}/${id}`)
    return await res.json()
  }

  // add task
  const addTask = async task => {
    const res = await fetch(DB_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  // delete task
  const deleteTask = async id => {
    await fetch(`${DB_URL}/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter(task => task.id !== id))
  }

  // toggle reminder
  const toggleReminder = async id => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`${DB_URL}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updTask),
    })
    const data = await res.json()
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: data.reminder } : task,
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
      <Footer />
    </div>
  )
}

export default App
