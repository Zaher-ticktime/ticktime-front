// 📁 src/pages/ProjectList.jsx
import React from "react";
import { Link } from "react-router-dom";

const sampleProjects = [
  { id: 1, title: "Survey A", reward: 12 },
  { id: 2, title: "Survey B", reward: 10 },
];

export default function ProjectList() {
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>Available Projects</h1>
      {sampleProjects.map(p => (
        <div key={p.id} style={{ marginBottom: "1rem" }}>
          <h3>{p.title}</h3>
          <p>Reward: {p.reward} SilverTICK</p>
          <Link to={`/projects/${p.id}`}><button>➡️ Participate</button></Link>
        </div>
      ))}
    </div>
  );
}
