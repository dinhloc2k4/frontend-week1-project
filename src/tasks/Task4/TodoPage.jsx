import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import TodoDetail from "./TodoDetail";

const initialTodos = [
  { id: "1", text: "Learn ES6+", completed: false },
  { id: "2", text: "Practice React Hooks", completed: true },
  { id: "3", text: "Integrate React Router", completed: false },
];

export default function TodoPage() {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    };
    setTodos((t) => [...t, newTodo]);
    setText("");
    // Programmatic navigation to the new todo detail
    navigate(`/todos/${newTodo.id}`);
  };

  const toggle = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const remove = (id) => {
    setTodos((prev) => {
      const next = prev.filter((t) => t.id !== id);
      // If the user is currently viewing the removed todo, redirect back to list
      const currentId = location.pathname.split("/").pop();
      if (currentId === id) {
        // use setTimeout to ensure state update happens first (not strictly required but safe)
        setTimeout(() => navigate("/todos"), 0);
      }
      return next;
    });
  };

  return (
    <section>
      {" "}
      <h2>Todos</h2>
      <div style={{ marginBottom: 12 }}>
        <form onSubmit={addTodo}>
          <input
            placeholder="New todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" style={{ marginLeft: 8 }}>
            Add & View
          </button>
        </form>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ minWidth: 320 }}>
          <h3>List</h3>
          <ul>
            {todos.map((t) => (
              <li key={t.id} style={{ marginBottom: 8 }}>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggle(t.id)}
                  style={{ marginRight: 8 }}
                />
                {/* Use relative link to support nested routing */}
                <Link to={t.id} style={{ marginRight: 8 }}>
                  {t.text}
                </Link>
                <button onClick={() => remove(t.id)} style={{ marginLeft: 8 }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: 1 }}>
          <h3>Detail (nested route)</h3>
          <Routes>
            <Route path=":id" element={<TodoDetail todos={todos} />} />
            <Route path="" element={<p>Select a todo</p>} />
          </Routes>
        </div>
      </div>
    </section>
  );
}
