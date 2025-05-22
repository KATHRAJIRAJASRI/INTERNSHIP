import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    await axios.post('http://localhost:5000/todos', { title: input });
    setInput('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  const sendSummary = async () => {
    try {
      await axios.post('http://localhost:5000/summarize');
      toast.success('Summary sent to Slack!');
    } catch (error) {
      toast.error('Failed to send summary.');
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  return (
    <div className="App">
      <h1>Todo Summary Assistant</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={sendSummary}>Summarize & Send to Slack</button>
      <ToastContainer />
    </div>
  );
}

export default App;
