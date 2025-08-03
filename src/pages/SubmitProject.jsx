// 📁 src/pages/SubmitProject.jsx
import React, { useState } from "react";
export default function SubmitProject() {
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a project file.");
    setSubmitted(true);
  };
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>Submit a Project</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add contract notes..."></textarea>
        <button type="submit">Submit</button>
      </form>
      {submitted && <p>✅ Project submitted!</p>}
    </div>
  );
}
