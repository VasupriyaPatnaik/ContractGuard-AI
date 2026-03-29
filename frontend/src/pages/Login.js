import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin({ email, password });
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(120deg, #f8fafc 0%, #e3e9f3 100%)",
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif"
    }}>
      <div style={{
        background: "#fff",
        padding: 44,
        borderRadius: 24,
        boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.13), 0 1.5px 6px #1976d211",
        minWidth: 340,
        width: 400,
        maxWidth: "90vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          background: "#e3e9f3",
          borderRadius: "50%",
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24
        }}>
          <i className="fas fa-sign-in-alt" style={{ color: "#2E7D64", fontSize: 28 }}></i>
        </div>
        <div style={{ marginBottom: 10, textAlign: "center" }}>
          <h2 style={{ color: "#2E7D64", fontWeight: 800, fontSize: 32, letterSpacing: "-0.5px", margin: 0 }}>Welcome to ContractGuard AI</h2>
          <div style={{ color: "#1F6E8C", fontWeight: 600, fontSize: 18, marginTop: 6, marginBottom: 8 }}>
            <span role="img" aria-label="shield">🛡️</span> Secure your contracts with intelligence!
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#234" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "1.5px solid #c7d0e0",
                fontSize: 16,
                background: "#f8fafc",
                marginBottom: 2,
                outline: "none",
                transition: "border 0.2s"
              }}
              placeholder="you@email.com"
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#234" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 14px",
                  borderRadius: 8,
                  border: "1.5px solid #c7d0e0",
                  fontSize: 16,
                  background: "#f8fafc",
                  outline: "none",
                  transition: "border 0.2s"
                }}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  background: "none",
                  border: "none",
                  color: "#2E7D64",
                  cursor: "pointer",
                  fontSize: 16
                }}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(105deg, #2E7D64 0%, #1F6E8C 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 18,
              cursor: "pointer",
              marginTop: 8,
              boxShadow: "0 2px 8px #1976d222",
              letterSpacing: "0.5px",
              transition: "background 0.2s, transform 0.2s"
            }}
            onMouseOver={e => e.target.style.background = "#2E7D64"}
            onMouseOut={e => e.target.style.background = "linear-gradient(105deg, #2E7D64 0%, #1F6E8C 100%)"}
          >
            <i className="fas fa-sign-in-alt" style={{ marginRight: 8 }}></i> Log In
          </button>
        </form>
        <div style={{ marginTop: 18, textAlign: "center", color: "#5e8a98", fontSize: 15 }}>
          Don't have an account? <Link to="/signup" style={{ color: "#1F6E8C", fontWeight: 600, textDecoration: "underline", marginLeft: 4 }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;