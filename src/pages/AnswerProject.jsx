// 📁 src/pages/AnswerProject.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function AnswerProject() {
  const { id } = useParams();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const questions = ["Q1?", "Q2?", "Q3?"];

  const handleChange = (i, val) => setAnswers({ ...answers, [i]: val });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(answers).length < questions.length) return alert("Please answer all.");
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>Answer Project #{id}</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {questions.map((q, i) => (
            <div key={i}>
              <label>{q}</label>
              <textarea onChange={(e) => handleChange(i, e.target.value)} />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      ) : <p>✅ Answers submitted!</p>}
    </div>
  );
}
