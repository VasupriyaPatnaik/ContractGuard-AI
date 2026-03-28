import React, { useState } from "react";
import axios from "axios";

export default function AnalysisPage() {
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
      maxWidth: "800px",
      margin: "auto",
      padding: "40px",
      fontFamily: "Arial"
    }}>
      <h1>ContractGuard AI</h1>
      <p>Upload financial contract to detect risks</p>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <br /><br />
      <button
        onClick={handleUpload}
        style={{
          padding: "10px 20px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Analyze
      </button>
      <br /><br />
      {loading && <p>Processing...</p>}
      {/* Risk report rendering logic will be reused from previous App.js */}
      {result && (() => {
        if (result.error) {
          return (
            <div style={{background: '#ffeaea', color: '#a00', padding: 16, borderRadius: 8, marginTop: 16}}>
              <strong>Error:</strong> {result.error}
              {result.raw && <pre style={{marginTop: 8, fontSize: 12, color: '#333'}}>{result.raw}</pre>}
            </div>
          );
        }
        let parsed = result;
        if (typeof result === 'string') {
          try {
            parsed = JSON.parse(result);
          } catch {
            return (
              <div style={{background: '#ffeaea', color: '#a00', padding: 16, borderRadius: 8, marginTop: 16}}>
                <strong>Could not parse analysis result.</strong>
                <pre style={{marginTop: 8, fontSize: 12, color: '#333'}}>{result}</pre>
              </div>
            );
          }
        }
        if (!parsed || !parsed.overall_risk_level || !Array.isArray(parsed.clauses)) {
          return (
            <div style={{background: '#ffeaea', color: '#a00', padding: 16, borderRadius: 8, marginTop: 16}}>
              <strong>Analysis data is incomplete or missing.</strong>
              <pre style={{marginTop: 8, fontSize: 12, color: '#333'}}>{JSON.stringify(parsed, null, 2)}</pre>
            </div>
          );
        }
        return (
          <div style={{
            background: "#f8fafc",
            padding: "28px 20px 20px 20px",
            borderRadius: "14px",
            boxShadow: "0 2px 8px 0 #e0e7ef33",
            marginTop: 24
          }}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: 18}}>
              <span style={{fontSize: 28, marginRight: 10}}>🛡️</span>
              <h2 style={{margin: 0, fontWeight: 700, fontSize: 24, color: '#222'}}>Risk Report</h2>
            </div>
            <div style={{marginBottom: 24, padding: '12px 0', borderBottom: '1px solid #e5e7eb'}}>
              <span style={{fontWeight: 600, color: '#555'}}>Overall Risk Level:</span>
              <span style={{
                marginLeft: "10px",
                color: parsed.overall_risk_level === 'High' ? '#d32f2f' : parsed.overall_risk_level === 'Medium' ? '#f57c00' : '#388e3c',
                fontWeight: 'bold',
                fontSize: '1.1em',
                letterSpacing: 1
              }}>{parsed.overall_risk_level}</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
              {parsed.clauses.map((clause, idx) => (
                <div key={idx} style={{
                  border: "1px solid #e0e7ef",
                  borderRadius: "10px",
                  padding: "16px 18px 12px 18px",
                  background: "#fff",
                  boxShadow: "0 1px 3px 0 #e0e7ef22"
                }}>
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: 6}}>
                    <span style={{fontWeight: 600, color: '#1976d2', fontSize: 16, marginRight: 8}}>{idx+1}.</span>
                    <span style={{fontWeight: 600, color: '#222', fontSize: 16}}>{clause.clause_type}</span>
                    <span style={{
                      marginLeft: 'auto',
                      fontWeight: 600,
                      color: clause.risk_level === 'High' ? '#d32f2f' : clause.risk_level === 'Medium' ? '#f57c00' : '#388e3c',
                      fontSize: 15,
                      border: '1px solid #e0e7ef',
                      borderRadius: 6,
                      padding: '2px 10px',
                      background: clause.risk_level === 'High' ? '#ffebee' : clause.risk_level === 'Medium' ? '#fff8e1' : '#e8f5e9'
                    }}>{clause.risk_level}</span>
                  </div>
                  <div style={{margin: '8px 0 6px 0'}}>
                    <span style={{fontWeight: 500, color: '#555'}}>Clause:</span>
                    <div style={{background: '#f3f6fa', padding: '8px', borderRadius: '5px', marginTop: '4px', fontStyle: 'italic', color: '#333', fontSize: 15}}>{clause.clause_text}</div>
                  </div>
                  <div style={{margin: '8px 0 0 0'}}>
                    <span style={{fontWeight: 500, color: '#555'}}>Explanation:</span>
                    <div style={{marginTop: '4px', color: '#444', fontSize: 15}}>{clause.explanation}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
