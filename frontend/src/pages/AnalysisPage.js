import React, { useState } from "react";
import axios from "axios";

function AnalysisPage({ onBack, onAnalysisComplete }) {
  const [file, setFile] = useState(null);
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
      const response = await axios.post(
        "http://127.0.0.1:8000/analyze",
        formData
      );
      setLoading(false);
      if (onAnalysisComplete) onAnalysisComplete(response.data.analysis);
    } catch (error) {
      console.error(error);
      alert("Error analyzing document");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #f8fafc 0%, #e3e9f3 100%)",
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        width: 480,
        maxWidth: "95vw",
        background: "#fff",
        borderRadius: 24,
        boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.13), 0 1.5px 6px #1976d211",
        padding: "40px 32px 32px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <button
          onClick={onBack}
          style={{
            alignSelf: "flex-start",
            marginBottom: 18,
            background: "none",
            border: "none",
            color: "#2E7D64",
            fontSize: 18,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
        >
          <span style={{ fontSize: 20, marginRight: 6 }}>←</span> Back to Home
        </button>
        <div style={{
          background: "#e3e9f3",
          borderRadius: "50%",
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18
        }}>
          <i className="fas fa-file-upload" style={{ color: "#2E7D64", fontSize: 28 }}></i>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#2E7D64", marginBottom: 8, textAlign: "center", letterSpacing: "-0.5px" }}>
          Upload Your Contract
        </h2>
        <p style={{ color: "#5e8a98", fontSize: 15, marginBottom: 24, textAlign: "center" }}>
          PDF only. Your document is processed securely and never stored.
        </p>
        <label htmlFor="file-upload" style={{
          display: "block",
          width: "100%",
          marginBottom: 18,
          background: "#f8fafc",
          border: "2px dashed #c7d0e0",
          borderRadius: 10,
          padding: "18px 0",
          textAlign: "center",
          color: file ? "#2E7D64" : "#5e8a98",
          fontWeight: 600,
          fontSize: 16,
          cursor: "pointer",
          transition: "border 0.2s"
        }}>
          {file ? `Selected: ${file.name}` : "Click to select PDF file"}
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
        <button
          onClick={handleUpload}
          style={{
            width: "100%",
            padding: "14px",
            fontSize: 18,
            fontWeight: 700,
            background: loading ? "#b2dfdb" : "linear-gradient(105deg, #2E7D64 0%, #1F6E8C 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: 18,
            boxShadow: "0 2px 8px #1976d222",
            letterSpacing: "0.5px",
            transition: "background 0.2s, transform 0.2s"
          }}
          disabled={loading}
        >
          {loading ? (
            <span><i className="fas fa-spinner fa-spin" style={{ marginRight: 8 }}></i>Analyzing...</span>
          ) : (
            <span><i className="fas fa-magic" style={{ marginRight: 8 }}></i>Analyze</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default AnalysisPage;
