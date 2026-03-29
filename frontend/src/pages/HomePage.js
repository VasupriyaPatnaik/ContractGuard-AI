import React from "react";

function HomePage({ username, onStart, onLogin, onSignup, onLogout }) {
  
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8FAFC",
      fontFamily: "'Inter', sans-serif",
      color: "#1E293B",
      scrollBehavior: "smooth"
    }}>
      {/* Premium Glass Navbar */}
      <nav style={{
        width: "100%",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(15px)",
        padding: "0 10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "80px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid rgba(203, 213, 225, 0.5)",
        boxSizing: "border-box"
      }}>
        <div style={{ fontWeight: 900, fontSize: 22, color: "#2E7D64", letterSpacing: "-1.5px", display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
           <div style={logoIconStyle}>🛡️</div> ContractGuard <span style={{color: "#1F6E8C", marginLeft: "4px"}}>AI</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {["Features", "About", "Contact"].map((item) => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} style={navLinkStyle}>
              {item}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {username ? (
            <>
              <div style={userBadgeStyle}>
                <i className="fas fa-user-circle" style={{ fontSize: 18, color: "#2E7D64" }}></i>
                {username}
              </div>
              <button onClick={onLogout} style={{ marginLeft: 8, color: "#fff", background: "#2E7D64", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 600, fontSize: 15, cursor: "pointer" }}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={onLogin} style={navLinkStyle}>Login</button>
              <button onClick={onSignup} style={primaryBtnSmall}>Get Started</button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header style={heroSectionStyle}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <h1 style={heroTitleStyle}>
            The Intelligent Shield for <br />
            <span style={{ background: "linear-gradient(90deg, #2E7D64, #1F6E8C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Your Financial Agreements.
            </span>
          </h1>
          <p style={heroSubTitleStyle}>
            Don't sign in the dark. Our AI audits your contracts for hidden risks, 
            predatory interest, and sneaky penalties in under 10 seconds.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            <button onClick={onStart} style={heroBtnStyle}>
               Analyze My Contract
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Features Section */}
        <section id="features" style={{ padding: "100px 0" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={sectionTitleStyle}>Why Global Teams Trust Us</h2>
            <p style={{ color: "#64748B", fontSize: "18px" }}>Enterprise-grade precision for every individual.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
            <FeatureCard icon="🔍" title="Deep Clause Audit" text="Goes beyond keywords to understand the legal intent of every sentence." />
            <FeatureCard icon="⚖️" title="Fairness Scoring" text="Benchmarks your contract against industry standards for fairness." />
            <FeatureCard icon="📂" title="Secure Vault" text="Your documents are encrypted and never used for public training." />
          </div>
        </section>

        {/* REFINED MISSION SECTION */}
        <section id="about" style={aboutContainerStyle}>
          <div style={{ padding: "60px 50px" }}>
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ ...sectionTitleStyle, textAlign: "left", fontSize: "40px", marginBottom: "16px" }}>
                Our Mission <span style={{fontSize: '28px'}}>🌐</span>
              </h2>
              <div style={{ width: "60px", height: "4px", background: "linear-gradient(90deg, #2E7D64, #1F6E8C)", borderRadius: "2px" }}></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px" }}>
              <div style={missionItemStyle}>
                <div style={missionIconCircle}><span style={{fontSize: '20px'}}>💡</span></div>
                <div>
                  <h4 style={missionHeadingStyle}>Clarity Over Complexity</h4>
                  <p style={missionParaStyle}>We believe legal transparency is a right. Our AI translates dense "Legalese" into clear, actionable English so you sign with confidence.</p>
                </div>
              </div>

              <div style={missionItemStyle}>
                <div style={missionIconCircle}><span style={{fontSize: '20px'}}>🛡️</span></div>
                <div>
                  <h4 style={missionHeadingStyle}>Consumer Advocacy</h4>
                  <p style={missionParaStyle}>We provide a professional-grade shield against predatory financial traps and hidden fine-print penalties often used by large institutions.</p>
                </div>
              </div>

              <div style={missionItemStyle}>
                <div style={missionIconCircle}><span style={{fontSize: '20px'}}>⚡</span></div>
                <div>
                  <h4 style={missionHeadingStyle}>Instant Intelligence</h4>
                  <p style={missionParaStyle}>No more waiting days for legal reviews. Our mission is to democratize high-end legal intelligence for everyone, immediately.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Contact Section */}
        <section id="contact" style={{ padding: "120px 0" }}>
          <div style={ctaBoxStyle}>
            <h2 style={{ fontSize: "42px", fontWeight: 800, marginBottom: "20px" }}>Protect your interests today.</h2>
            <p style={{ fontSize: "18px", opacity: 0.9, marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
              Questions about our AI or security? Our team is standing by to help you secure your documents.
            </p>
            <a href="mailto:support@contractguard.ai" style={ctaButtonStyle}>
               Talk to an Expert
            </a>
          </div>
        </section>
      </main>

      <footer style={footerStyle}>
        <div style={{marginBottom: "20px", fontWeight: 700, color: "#2E7D64"}}>ContractGuard AI</div>
        &copy; {new Date().getFullYear()} — Designed for Financial Transparency.
      </footer>
    </div>
  );
}

// --- Enhanced Styles ---

const logoIconStyle = {
  width: "40px", height: "40px", background: "#E6F4F1", 
  borderRadius: "10px", display: "flex", alignItems: "center", 
  justifyContent: "center", marginRight: "12px", fontSize: "20px"
};

const navLinkStyle = {
  background: "none", border: "none", color: "#475569",
  fontWeight: 600, fontSize: "15px", cursor: "pointer",
  transition: "all 0.2s ease"
};

const userBadgeStyle = {
  fontWeight: 700, color: "#1F6E8C", fontSize: "14px", 
  display: "flex", alignItems: "center", gap: "8px",
  background: "#fff", padding: "8px 16px", borderRadius: "30px",
  border: "1px solid #CBD5E1", boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
};

const heroSectionStyle = {
  padding: "140px 20px", textAlign: "center",
  background: "radial-gradient(circle at 50% 0%, #E6F4F1 0%, #F8FAFC 100%)",
};

const heroTitleStyle = {
  color: "#0F172A", fontWeight: 900, fontSize: "72px",
  letterSpacing: "-2.5px", lineHeight: 1, marginBottom: "30px"
};

const heroSubTitleStyle = {
  color: "#64748B", fontSize: "22px", maxWidth: "700px",
  margin: "0 auto 48px", lineHeight: 1.6, fontWeight: 500
};

const heroBtnStyle = {
  background: "linear-gradient(135deg, #2E7D64 0%, #1F6E8C 100%)",
  color: "#fff", border: "none", borderRadius: "12px",
  fontWeight: 700, fontSize: "18px", padding: "20px 40px",
  cursor: "pointer", boxShadow: "0 10px 25px rgba(31, 110, 140, 0.3)"
};

const FeatureCard = ({ icon, title, text }) => (
  <div style={{
    background: "#fff", padding: "50px 40px", borderRadius: "30px",
    border: "1px solid rgba(203, 213, 225, 0.6)", 
    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
    textAlign: "left"
  }}>
    <div style={{ fontSize: "40px", marginBottom: "25px" }}>{icon}</div>
    <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#0F172A", marginBottom: "15px" }}>{title}</h3>
    <p style={{ color: "#64748B", lineHeight: 1.7, fontSize: "16px" }}>{text}</p>
  </div>
);

const aboutContainerStyle = {
  background: "#fff", 
  borderRadius: "40px", 
  border: "1px solid #E2E8F0",
  marginTop: "60px", 
  boxShadow: "0 20px 50px rgba(0,0,0,0.03)"
};

const missionItemStyle = {
  display: "flex",
  gap: "20px",
  alignItems: "flex-start"
};

const missionIconCircle = {
  width: "50px",
  height: "50px",
  background: "#F1F5F9",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  border: "1px solid #E2E8F0"
};

const missionHeadingStyle = {
  fontSize: "20px",
  fontWeight: 800,
  color: "#0F172A",
  marginBottom: "10px",
  marginTop: "5px"
};

const missionParaStyle = {
  fontSize: "16px",
  color: "#475569",
  lineHeight: "1.7",
  margin: 0
};

const ctaBoxStyle = {
  background: "#0F172A", color: "#fff", borderRadius: "40px",
  padding: "100px 40px", textAlign: "center"
};

const ctaButtonStyle = {
  background: "#2E7D64", color: "#fff", padding: "18px 45px",
  borderRadius: "12px", fontWeight: 700, fontSize: "16px",
  textDecoration: "none", display: "inline-block"
};

const primaryBtnSmall = {
  background: "#2E7D64", color: "#fff", border: "none",
  borderRadius: "10px", padding: "10px 24px", fontWeight: 700,
  fontSize: "14px", cursor: "pointer"
};

const sectionTitleStyle = {
  fontSize: "48px", fontWeight: 900, color: "#0F172A",
  letterSpacing: "-1.5px"
};

const footerStyle = {
  padding: "80px", textAlign: "center", color: "#94A3B8",
  borderTop: "1px solid #E2E8F0", background: "#fff"
};

export default HomePage;