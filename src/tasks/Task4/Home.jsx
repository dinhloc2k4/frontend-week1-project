import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <h2>Home</h2>
      <p>Welcome to the Router demo. Use the navigation above to go to the Todos page.</p>
      <p>
        Quick links: <Link to="/todos">View Todos</Link>
      </p>
    </section>
  );
}
