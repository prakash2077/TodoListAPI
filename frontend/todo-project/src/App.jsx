import { useState, useEffect } from 'react'

const API = '/api'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    fetch(`${API}/tasks`)
      .then((r) => r.json())
      .then((d) => setTasks(d.tasks))
      .catch(() => {})
  }, [])

  const addTask = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const res = await fetch(`${API}/create-task`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: input.trim() }),
    })
    if (res.ok) {
      const data = await res.json()
      if (data.task) {
        setTasks((prev) => [...prev, data.task])
      } else {
        const r = await fetch(`${API}/tasks`)
        const d = await r.json()
        setTasks(d.tasks)
      }
      setInput('')
    }
  }

  const finishTask = async (id) => {
    const res = await fetch(`${API}/finish-task/${id}`, { method: 'PATCH' })
    if (res.ok) {
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, isFinished: true } : t))
      )
    }
  }

  return (
    <div>
      <h1>tasks</h1>
      <form onSubmit={addTask}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="add a new task"
        />
        <button type="submit">+</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <label>
              <input
                type="checkbox"
                checked={task.isFinished}
                onChange={() => finishTask(task._id)}
              />
              <span className={task.isFinished ? 'done' : ''}>{task.task}</span>
            </label>
          </li>
        ))}
      </ul>
      <style>{`
        h1 {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 20px;
          color: #1a1a1a;
        }
        form {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }
        input[type="text"] {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #d1d1d1;
          border-radius: 8px;
          font-size: 15px;
          outline: none;
          background: #fff;
        }
        input[type="text"]:focus {
          border-color: #0066ff;
        }
        button {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 8px;
          background: #0066ff;
          color: #fff;
          font-size: 22px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        button:hover {
          background: #0052cc;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          padding: 10px 0;
          border-bottom: 1px solid #e5e5e5;
        }
        li:last-child {
          border-bottom: none;
        }
        label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }
        input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #0066ff;
          cursor: pointer;
        }
        .done {
          text-decoration: line-through;
          color: #999;
        }
      `}</style>
    </div>
  )
}
