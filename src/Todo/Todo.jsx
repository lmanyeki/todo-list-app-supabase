import React, { useState, useEffect } from 'react';
import supabase from '../helper/supabaseClient.js';
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import './Todo.css';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [])
  async function fetchTodos() {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) console.error(error);
    else setTodos(data);
  }

  async function addTodo() {
    if (!title.trim() || !description.trim()) {
      toast.warn("Please fill in the blank.");
    return;
  }
    const {error} = await supabase.from("todos").insert([{ title, description, isCompleted: false }]);
    if (error) {
      console.log(error);
      toast.error("Failed to add task!");
    } else {
      setTitle("");
      setDescription("");
      toast.success("Task added!");
      fetchTodos();
    }
  }

  async function deleteTodo(id) {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete task.");
    } else {
      toast.success("Task deleted.");
    fetchTodos();
  }
}

  async function updateTodo(id, newTitle) {
    const { error } = await supabase.from("todos").update({title: newTitle}).eq("id", id);
    if (error) {
      toast.error("Failed to update task.");
    } else {
      toast.success("Task updated.");
    fetchTodos();
  }
}

  async function completeTodo(id) {
    const { error } = await supabase.from("todos").update({isCompleted: true}).eq("id", id);
    if (error) {
      toast.error("Failed to mark as complete.");
    } else {
      toast.info("Task completed!");
    fetchTodos();
  }
}

  return (
    <div>
    <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
/>

    <div className='container' >
      <h1>Todo List</h1>
      <input value={title} 
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Add a new task"/>
      <textarea value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Add a description of the task" rows={4}/>
      <button className="add" onClick={addTodo}>Add</button>
      <h2>Incomplete Tasks</h2>
      <div>
        {todos
          .filter((t) => !t.isCompleted)
          .map((todo) => (
            <div key={todo.id} className='todo-item' >
              <div style={{ flex: 1 }}>
                <span>{todo.title}</span>
                <p>{todo.description}</p>
              </div>  
            <div>
                <button style={{ color: "#10b981" }} onClick={() => completeTodo(todo.id)}><FaCheck /></button>
                <button style={{ color: "#f59e0b" }} onClick={() => updateTodo(todo.id, prompt("New title:", todo.title))}><FaEdit /></button>
                <button style={{ color: "#ef4444" }} onClick={() => deleteTodo(todo.id)}><FaTrash /></button>
              </div>
            </div>
          ))
        }
      </div>
      <h2>Completed Tasks</h2>
      <div>
        {todos
          .filter((t) => t.isCompleted)
          .map((todo) => (
            <div key={todo.id} className="todo-item completed">
              <span>{todo.title}</span>
              <div>
                <button style={{ color: "#ef4444" }} onClick={() => deleteTodo(todo.id)}><FaTrash /></button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
    </div>
  )
}

export default Todo;
