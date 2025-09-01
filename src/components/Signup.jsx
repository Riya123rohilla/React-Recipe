import React, { useState } from "react";

export default function Signup({ setCurrentUser }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === form.email)) {
      setError("❌ Email already exists!");
      return;
    }
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    setCurrentUser(form);
  };

  return (
    <div className="card">
      <h2>Signup</h2>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      {/* Password box with eye inside */}
      <div style={{ position: "relative", width: "100%" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ width: "93%", paddingRight: "35px" }}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>

      <button onClick={handleSignup}>Signup</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
