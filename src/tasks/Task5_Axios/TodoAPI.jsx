import React, { useEffect, useState, useRef } from "react";
import api from "./api";

export default function TodoAPI() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const controllerRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    controllerRef.current = controller;
    const fetchTodos = async () => {
      setLoading(true); setError("");
      try {
        const res = await api.get("/todos?_limit=10", { signal: controller.signal });
        setTodos(res.data);
      } catch (err) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(err.message || 'Failed to fetch todos');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
    return () => controller.abort();
  }, []);

  const addTodo = async (e) => {
    e?.preventDefault();
    if (!text.trim()) return;
    setLoading(true); setError("");
    try {
      const res = await api.post("/todos", { title: text.trim(), completed: false, userId: 1 });
      setTodos(prev => [res.data, ...prev]); setText("");
    } catch (err) {
      setError(err.message || "Failed to add todo");
    } finally { setLoading(false); }
  };

  const toggleTodo = async (todo) => {
    setLoading(true); setError("");
    try {
      const res = await api.put(`/todos/${todo.id}`, { ...todo, completed: !todo.completed });
      setTodos(prev => prev.map(t => t.id === todo.id ? res.data : t));
    } catch (err) {
      setError(err.message || "Failed to update todo");
    } finally { setLoading(false); }
  };

  const deleteTodo = async (id) => {
    setLoading(true); setError("");
    try {
      await api.delete(`/todos/${id}`);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete todo");
    } finally { setLoading(false); }
  };

  return (
    <section>
      <h3>Axios Todo API (Task5)</h3>

      <form onSubmit={addTodo}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="New todo..." />
        <button type="submit" disabled={loading}>Add</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{color:'crimson'}}>Error: {error}</p>}

      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <input type="checkbox" checked={!!t.completed} onChange={()=>toggleTodo(t)} />
            <span style={{ textDecoration: t.completed ? 'line-through' : 'none'}}>{t.title || t.text || '(no title)'}</span>
            <button onClick={()=>deleteTodo(t.id)} style={{ marginLeft: 8 }}>Delete</button>
            <small style={{ marginLeft: 8, color:'#666' }}>ID: {t.id}</small>
          </li>
        ))}
      </ul>

      <div style={{ marginTop:12 }}>
        <button onClick={async ()=>{
          if (controllerRef.current) controllerRef.current.abort();
          controllerRef.current = new AbortController();
          setLoading(true); setError("");
          try {
            const res = await api.get("/todos?_limit=10", { signal: controllerRef.current.signal});
            setTodos(res.data);
          } catch (err) {
            setError(err.message || "Refetch failed");
          } finally { setLoading(false); }
        }}>Refetch todos</button>
      </div>
    </section>
  );
}
