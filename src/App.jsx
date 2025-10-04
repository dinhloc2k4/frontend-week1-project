import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ES6Demo from "./tasks/Task1_ES6";
import FormDemo from "./tasks/Task2_Hooks/FormDemo";
import TodoApp from "./tasks/Task2_Hooks/TodoApp";
import Task3_HooksAdvanced from "./tasks/Task3/Task3_HooksAdvanced";
import TodoAppContext from "./tasks/Task3/TodoAppContext";

import Home from "./tasks/Task4/Home";
import TodoPage from "./tasks/Task4/TodoPage";
import TodoDetail from "./tasks/Task4/TodoDetail";
import TodoAPI from "./tasks/Task5_Axios/TodoAPI";
function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h1>Frontend Week 1 Demo</h1>

        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>
            Home
          </Link>
          <Link to="/todos" style={{ marginRight: "10px" }}>
            Todos
          </Link>
          <Link to="/axios" style={{ marginRight: "10px" }}>
            Axios Demo
          </Link>
          {/* Example direct link to a todo detail */}
          <Link to="/todos/1">Detail (example)</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          {/* NOTE: include trailing * to allow nested routes inside TodoPage */}
          <Route path="/todos/*" element={<TodoPage />} />
          {/* Task 5 route (Axios demo) */}
          <Route path="/axios" element={<TodoAPI />} />
          <Route path="/detail/:id" element={<TodoDetail />} />

          <Route path="*" element={<p>404 — Page not found</p>} />
        </Routes>

        <hr />

        <h2>Task 1 - ES6+</h2>
        <ES6Demo />

        <h2>Task 2 - React Hooks</h2>
        <FormDemo />
        <TodoApp />

        <h2>Task 3 - Hooks nâng cao</h2>
        <Task3_HooksAdvanced />
        <TodoAppContext />
      </div>
    </BrowserRouter>
  );
}

export default App;
