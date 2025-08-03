// 📁 src/pages/CreateLimitedMeme.jsx
import React, { useState } from "react";

export default function CreateLimitedMeme() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [silverPower, setSilverPower] = useState(10);
  const [goldenBoost, setGoldenBoost] = useState(0);
  const [visibility, setVisibility] = useState("public");
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !caption || silverPower < 1) {
      alert("Please complete all fields");
      return;
    }
    const totalPower = silverPower + goldenBoost * 1000;
    alert(`✅ Meme created with total power ${totalPower} [Silver + Golden boost] and visibility: ${visibility}`);
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto", color: "#fff" }}>
      <h2>🛡️ Create Powered Meme</h2>
      {submitted ? (
        <p style={{ backgroundColor: "#222", padding: "1rem", borderRadius: "6px" }}>✅ Meme submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Select Image:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          {preview && (
            <img src={preview} alt="preview" style={{ width: "100px", height: "100px", borderRadius: "10px", marginBottom: "1rem" }} />
          )}
          <div style={{ marginBottom: "1rem" }}>
            <label>Caption:</label>
            <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>SilverTICK Power:</label>
            <input type="number" min={1} value={silverPower} onChange={(e) => setSilverPower(parseInt(e.target.value))} style={inputStyle} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Burn GoldenTICK for Boost (×1000):</label>
            <input type="number" min={0} value={goldenBoost} onChange={(e) => setGoldenBoost(parseInt(e.target.value))} style={inputStyle} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Visibility:</label>
            <select value={visibility} onChange={(e) => setVisibility(e.target.value)} style={inputStyle}>
              <option value="public">🌐 Public</option>
              <option value="private">🔒 Private</option>
            </select>
          </div>
          <button type="submit" style={buttonStyle}>Mint Meme</button>
        </form>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "4px",
  backgroundColor: "#111",
  color: "white",
  border: "1px solid #444",
  marginTop: "0.3rem"
};

const buttonStyle = {
  padding: "0.7rem 1.5rem",
  backgroundColor: "#0cf",
  color: "black",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer"
};
