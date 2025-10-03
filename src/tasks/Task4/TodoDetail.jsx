import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TodoDetail({ todos = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return (
      <div>
        <p>Todo not found.</p>
        <button onClick={() => navigate("/todos")}>Back to list</button>
      </div>
    );
  }

  return (
    <div>
      <h4>Todo Detail</h4>
      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>Text:</strong> {todo.text}</p>
      <p><strong>Completed:</strong> {todo.completed ? "Yes" : "No"}</p>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate(-1)} style={{ marginRight: 8 }}>Go back</button>
        <button onClick={() => navigate("/todos")}>Back to Todos</button>
        <button onClick={() => navigate("/") } style={{ marginLeft: 8 }}>Go Home</button>
      </div>
    </div>
  );
}
