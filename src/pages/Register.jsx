// 📁 src/pages/Register.jsx
import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    mobile: "",
    password: "",
    country: "",
    city: "",
    address: "",
    dob: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering user:", form);
    // handle upload to backend or blockchain
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "2rem", background: "#111", borderRadius: "10px", color: "#fff" }}>
      <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>🎯 Register Your TickTime Profile</h2>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required style={inputStyle} />

        <label>Mobile Number:</label>
        <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} required style={inputStyle} />

        <label>Password:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required style={inputStyle} />

        <label>Country (required):</label>
        <input type="text" name="country" value={form.country} onChange={handleChange} required style={inputStyle} />

        <label>City (optional):</label>
        <input type="text" name="city" value={form.city} onChange={handleChange} style={inputStyle} />

        <label>Street Address (optional):</label>
        <input type="text" name="address" value={form.address} onChange={handleChange} style={inputStyle} />

        <label>Date of Birth:</label>
        <input type="date" name="dob" value={form.dob} onChange={handleChange} style={inputStyle} />

        <label>Profile Picture (meme or real):</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} style={inputStyle} />

        <button type="submit" style={submitStyle}>✅ Create Profile</button>
      </form>

      <p style={{ marginTop: "1rem" }}>Already have an account? <a href="/login" style={{ color: "#0cf" }}>Login here</a></p>

      <hr style={{ margin: "2rem 0", borderColor: "#333" }} />

      <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
        🎉 Welcome to TickTime! <br/>
        Start earning Silver TICKs by joining projects, sharing ideas, and interacting with the community.
      </p>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginBottom: "1rem",
  padding: "0.5rem",
  borderRadius: "5px",
  border: "1px solid #444",
  backgroundColor: "#222",
  color: "#fff"
};

const submitStyle = {
  padding: "0.6rem 1.5rem",
  backgroundColor: "#0cf",
  border: "none",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "6px",
  fontSize: "1rem"
};
