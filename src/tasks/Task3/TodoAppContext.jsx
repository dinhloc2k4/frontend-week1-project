import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const completedCount = useMemo(
    () => todos.filter((t) => t.done).length,
    [todos]
  );

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, completedCount }}
    >
      {children}
    </TodoContext.Provider>
  );
}

function TodoForm() {
  const { addTodo } = useContext(TodoContext);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Thêm task..."
      />
      <button type="submit">Add</button>
    </form>
  );
}

function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useContext(TodoContext);

  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id}>
          <input
            type="checkbox"
            checked={t.done}
            onChange={() => toggleTodo(t.id)}
          />
          <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
            {t.text}
          </span>
          <button onClick={() => deleteTodo(t.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

function TodoStats() {
  const { todos, completedCount } = useContext(TodoContext);
  return (
    <p>
      Completed {completedCount}/{todos.length} tasks
    </p>
  );
}

export default function TodoAppContext() {
  return (
    <TodoProvider>
      <div style={{ padding: 20 }}>
        <h2>Todo App (useContext + useMemo + useCallback)</h2>
        <TodoForm />
        <TodoList />
        <TodoStats />
      </div>
    </TodoProvider>
  );
}
