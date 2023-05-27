import React from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import {useState, useEffect} from 'react'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect (() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

//Fetch Task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data
}

  //Fetch Tasks From server 5000
  const fetchTasks = async (id) => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

//toggle reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id ? updTask : task))
}

//Add Task
const addTask = async (task) => {
  // const id = Math.floor(Math.random() *10000) + 1
  // const newTask = {id, ...task}
  // setTasks([...tasks, newTask])
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
    'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()
  console.log(data)
  setTasks([...tasks, data])
  setShowAddTask(false)
}

//Delete Task
const deleteTask = async (id) => {
  //Delete tasks from the server so that they don't appear on reloading the page
  await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
  //setTasks is used to make changes to immutable tasks state.
  setTasks(tasks.filter((task) => task.id !== id))
} 

  return (
    <div className="container">
     <Header onAdd = {() => {setShowAddTask(!showAddTask)}} showAdd = {showAddTask}/>
     {showAddTask && <AddTask onAdd = {addTask}/>}
     {tasks.length > 0 ? <Tasks tasks={tasks} onDelete = {deleteTask} 
     onToggle = {toggleReminder}/> : <h3>No Task to Show Right Now</h3>}
    </div>
  );
}

//same as function App 
// class App extends React.Component{
//   render(){
//     return <h1>Hello from a Class</h1>
//   }
// }

export default App;
