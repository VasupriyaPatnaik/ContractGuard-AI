import React, { useState } from "react";
import axios from "axios";

function HomePage({ onStart }) {
  return (
    <div style={{
      maxWidth: 700,
      margin: "auto",
      padding: "64px 24px 32px 24px",
      fontFamily: "Segoe UI, Arial, sans-serif",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f8fafc 0%, #e3e9f3 100%)"
    }}>
      <h1 style={{ fontSize: 44, fontWeight: 800, color: "#1976d2", marginBottom: 12 }}>
        ContractGuard AI
      </h1>
      <h2 style={{ fontSize: 22, fontWeight: 600, color: "#333", marginBottom: 24 }}>
        Smarter Risk Detection for Financial Contracts
      </h2>
      <p style={{ fontSize: 18, color: "#444", lineHeight: 1.7, marginBottom: 32, textAlign: "center" }}>
        ContractGuard AI leverages advanced AI to analyze financial contracts and automatically detect risky clauses, hidden fees, penalties, and other financial risks. Upload your contract and get a clear, professional risk report in seconds.<br /><br />
        <strong>Key Features:</strong>
        <ul style={{ fontSize: 17, color: "#444", margin: "18px 0 0 18px", textAlign: "left" }}>
          <li>Automatic clause detection (interest rates, penalties, fees, etc.)</li>
          <li>Risk level assessment for each clause</li>
          <li>Clear explanations for all findings</li>
          <li>Modern, easy-to-read risk report</li>
          <li>Fast, secure, and private</li>
        </ul>
      </p>
      <button
        onClick={onStart}
        style={{
          padding: "16px 40px",
          fontSize: 20,
          fontWeight: 700,
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          boxShadow: "0 2px 8px #1976d222"
        }}
      >
        Start Risk Analysis
      </button>
      <footer style={{ marginTop: 60, color: "#888", fontSize: 15, textAlign: "center" }}>
        &copy; {new Date().getFullYear()} ContractGuard AI. All rights reserved.
      </footer>
    </div>
  );
}

function AnalysisPage({ onBack }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a PDF");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      setResult(null);
      const response = await axios.post(
        "http://127.0.0.1:8000/analyze",
        formData
      );
      setResult(response.data.analysis);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error analyzing document");
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 700,
      margin: "auto",
      padding: "48px 24px 32px 24px",
      fontFamily: "Segoe UI, Arial, sans-serif",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#f8fafc"
    }}>
      <button
        onClick={onBack}
        style={{
          alignSelf: "flex-start",
          marginBottom: 24,
          background: "none",
          border: "none",
          color: "#1976d2",
          fontSize: 17,
          cursor: "pointer"
        }}
      >
        ← Back to Home
      </button>
      <h2 style={{ fontSize: 32, fontWeight: 700, color: "#1976d2", marginBottom: 18 }}>
        Upload Contract for Analysis
      </h2>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ marginBottom: 18, fontSize: 17 }}
      />
      <button
        onClick={handleUpload}
        style={{
          padding: "12px 32px",
          fontSize: 18,
          fontWeight: 600,
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 7,
          cursor: "pointer",
          marginBottom: 24
        }}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      {result && (
        <div style={{
          width: "100%",
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 2px 12px #1976d222",
          padding: 24,
          marginTop: 18,
          marginBottom: 18
        }}>
          <h3 style={{ color: "#1976d2", fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Risk Analysis Report</h3>
          <pre style={{
            background: "#f4f4f4",
            padding: "16px",
            borderRadius: "8px",
            overflowX: "auto",
            fontSize: 16,
            color: "#222"
          }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function App() {
  const [showAnalysis, setShowAnalysis] = useState(false);
  return showAnalysis ? (
    <AnalysisPage onBack={() => setShowAnalysis(false)} />
  ) : (
    <HomePage onStart={() => setShowAnalysis(true)} />
  );
}

export default App;