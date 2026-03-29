import React from "react";

function RiskReportPage({ result, onBack }) {
  // Helper to determine risk level for styling
  const getRiskColor = (score) => {
    if (score > 70) return "#EF4444"; // Red
    if (score > 30) return "#F59E0B"; // Amber
    return "#10B981"; // Emerald
  };

  // Mock data parsing - In a real app, you'd parse your 'result' JSON here
  const mockScore = 65; 
  const riskColor = getRiskColor(mockScore);

  const downloadReport = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(result, null, 2)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "ContractGuard_Analysis.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8FAFC",
      fontFamily: "'Inter', sans-serif",
      color: "#1E293B",
      padding: "40px 20px"
    }}>
      {/* Container */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <button onClick={onBack} style={backBtnStyle}>
            <i className="fas fa-arrow-left" style={{ marginRight: 10 }}></i> Exit to Dashboard
          </button>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => window.print()} style={secondaryBtnStyle}>
              <i className="fas fa-print" style={{ marginRight: 8 }}></i> Print
            </button>
            <button onClick={downloadReport} style={primaryBtnStyle}>
              <i className="fas fa-download" style={{ marginRight: 8 }}></i> Download PDF Report
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "30px" }}>
          
          {/* Left Column: Summary Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={summaryCardStyle}>
              <h3 style={{ fontSize: "14px", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "20px" }}>Overall Safety Score</h3>
              <div style={{ position: "relative", width: "160px", height: "160px", margin: "0 auto 20px" }}>
                <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={riskColor} strokeWidth="3" strokeDasharray={`${mockScore}, 100`} strokeLinecap="round" />
                </svg>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                  <span style={{ fontSize: "32px", fontWeight: 800, color: "#0F172A" }}>{mockScore}%</span>
                  <div style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>RISK</div>
                </div>
              </div>
              <p style={{ textAlign: "center", fontSize: "15px", color: "#475569", lineHeight: 1.5 }}>
                Your contract contains <b>3 high-risk</b> clauses that require immediate attention.
              </p>
            </div>

            <div style={infoBoxStyle}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>📝 Document Info</h4>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>File: service_agreement_v2.pdf</div>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>Processed: {new Date().toLocaleDateString()}</div>
            </div>
          </div>

          {/* Right Column: Detailed Breakdown */}
          <div style={mainReportAreaStyle}>
            <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "24px", color: "#0F172A" }}>Detected Issues</h2>
            
            {/* Clause Item - Critical */}
            <RiskItem 
              level="Critical" 
              title="Termination Penalty" 
              desc="Clause 14.2 imposes a $5,000 flat fee for early termination regardless of notice period."
              suggestion="Negotiate for a pro-rated fee based on remaining term."
            />

            {/* Clause Item - Warning */}
            <RiskItem 
              level="Warning" 
              title="Automatic Renewal" 
              desc="The contract automatically renews for 12 months unless cancelled 90 days prior."
              suggestion="Request a 30-day notice period instead."
            />

            {/* Raw Data Toggle (Elegant version of your PRE tag) */}
            <details style={{ marginTop: "40px" }}>
              <summary style={{ cursor: "pointer", color: "#64748B", fontWeight: 600, fontSize: "14px" }}>View Raw AI Intelligence Data</summary>
              <div style={rawJsonBoxStyle}>
                <pre style={{ margin: 0 }}>{JSON.stringify(result, null, 2)}</pre>
              </div>
            </details>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- Sub-components & Styles ---

const RiskItem = ({ level, title, desc, suggestion }) => {
  const color = level === "Critical" ? "#EF4444" : "#F59E0B";
  const bg = level === "Critical" ? "#FEF2F2" : "#FFFBEB";

  return (
    <div style={{ background: bg, borderLeft: `5px solid ${color}`, padding: "24px", borderRadius: "12px", marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ color: color, fontWeight: 800, fontSize: "12px", textTransform: "uppercase" }}>{level} RISK</span>
      </div>
      <h4 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#0F172A" }}>{title}</h4>
      <p style={{ margin: "0 0 16px 0", color: "#475569", fontSize: "15px", lineHeight: 1.6 }}>{desc}</p>
      <div style={{ background: "rgba(255,255,255,0.6)", padding: "12px", borderRadius: "8px", fontSize: "14px", border: "1px solid rgba(0,0,0,0.05)" }}>
        <span style={{ fontWeight: 700 }}>Recommendation:</span> {suggestion}
      </div>
    </div>
  );
};

const backBtnStyle = {
  background: "none", border: "none", color: "#64748B",
  fontWeight: 600, fontSize: "15px", cursor: "pointer",
  display: "flex", alignItems: "center"
};

const primaryBtnStyle = {
  background: "linear-gradient(135deg, #2E7D64 0%, #1F6E8C 100%)",
  color: "#fff", border: "none", borderRadius: "8px",
  padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: "14px"
};

const secondaryBtnStyle = {
  background: "#fff", color: "#1E293B", border: "1px solid #E2E8F0",
  borderRadius: "8px", padding: "10px 20px", fontWeight: 600, cursor: "pointer", fontSize: "14px"
};

const summaryCardStyle = {
  background: "#fff", padding: "32px", borderRadius: "24px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.03)", border: "1px solid #E2E8F0"
};

const infoBoxStyle = {
  background: "#1F6E8C", color: "#fff", padding: "24px", borderRadius: "24px"
};

const mainReportAreaStyle = {
  background: "#fff", padding: "40px", borderRadius: "24px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.03)", border: "1px solid #E2E8F0"
};

const rawJsonBoxStyle = {
  marginTop: "16px", background: "#0F172A", color: "#10B981",
  padding: "20px", borderRadius: "12px", fontSize: "13px",
  overflowX: "auto", fontFamily: "monospace"
};

export default RiskReportPage;