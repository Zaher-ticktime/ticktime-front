// 📁 src/pages/ProjectResults.jsx
import React from "react";
import { useParams } from "react-router-dom";

export default function ProjectResults() {
  const { id } = useParams();
  const results = [
    { participant: "User A", score: 10 },
    { participant: "User B", score: 12 },
  ];
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>Results for Project #{id}</h1>
      <table>
        <thead><tr><th>User</th><th>Score</th></tr></thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}><td>{r.participant}</td><td>{r.score}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
