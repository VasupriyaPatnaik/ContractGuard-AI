import React from "react";

function HomePage({ username, onStart, onLogin, onSignup }) {
  
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
            <div style={userBadgeStyle}>
              <i className="fas fa-user-circle" style={{ fontSize: 18, color: "#2E7D64" }}></i>
              {username}
            </div>
          ) : (
            <>
              <button onClick={onLogin} style={navLinkStyle}>Login</button>
              <button onClick={onSignup} style={primaryBtnSmall}>Get Started</button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section with Depth */}
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

      {/* Features Grid */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
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

        {/* Improved About Section with Emojis */}
        <section id="about" style={aboutContainerStyle}>
          <div style={{ flex: 1, padding: "40px" }}>
            <h2 style={{ ...sectionTitleStyle, textAlign: "left", marginBottom: "20px" }}>
              Our Mission 🌐
            </h2>
            <p style={aboutTextStyle}>
              <span style={emojiTagStyle}>💡</span> **Clarity Over Complexity:** We believe law should be readable. Our AI translates "Legalese" into plain English.
            </p>
            <p style={aboutTextStyle}>
              <span style={emojiTagStyle}>🛡️</span> **Consumer Protection:** We provide the shield you need against predatory financial traps found in fine print.
            </p>
            <p style={aboutTextStyle}>
              <span style={emojiTagStyle}>⚡</span> **Instant Intelligence:** No more waiting days for legal reviews. Get professional-grade insights immediately.
            </p>
          </div>
          <div style={aboutImagePlaceholder}>
             <div style={{fontSize: "80px"}}>📊</div>
             <p style={{color: "#fff", fontWeight: 600, marginTop: "20px"}}>Visual Risk Mapping</p>
          </div>
        </section>

        {/* CTA Contact Section */}
        <section id="contact" style={{ padding: "120px 0" }}>
          <div style={ctaBoxStyle}>
            <h2 style={{ fontSize: "42px", fontWeight: 800, marginBottom: "20px" }}>Protect your interests today. 📩</h2>
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

// --- Top-Notch Styles ---

const logoIconStyle = {
  width: "40px", height: "40px", background: "#E6F4F1", 
  borderRadius: "10px", display: "flex", alignItems: "center", 
  justifyContent: "center", marginRight: "12px", fontSize: "20px"
};

const navLinkStyle = {
  background: "none", border: "none", color: "#475569",
  fontWeight: 600, fontSize: "15px", cursor: "pointer",
  transition: "all 0.2s ease",
  ":hover": { color: "#2E7D64" }
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

const badgeStyle = {
  display: "inline-block", background: "#fff", color: "#2E7D64",
  padding: "8px 20px", borderRadius: "50px", fontSize: "13px",
  fontWeight: 700, marginBottom: "32px", border: "1px solid #CBD5E1",
  boxShadow: "0 4px 10px rgba(0,0,0,0.03)"
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

const secondaryBtnStyle = {
  background: "#fff", color: "#1E293B", border: "1px solid #CBD5E1",
  borderRadius: "12px", fontWeight: 700, fontSize: "18px",
  padding: "20px 40px", cursor: "pointer"
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
  background: "#fff", borderRadius: "40px", overflow: "hidden",
  display: "flex", flexWrap: "wrap", border: "1px solid #E2E8F0",
  marginTop: "60px", boxShadow: "0 20px 50px rgba(0,0,0,0.03)"
};

const aboutTextStyle = {
  fontSize: "18px", color: "#475569", lineHeight: "1.8", 
  display: "flex", alignItems: "flex-start", marginBottom: "25px"
};

const emojiTagStyle = {
  marginRight: "15px", fontSize: "22px"
};

const aboutImagePlaceholder = {
  flex: 1, minWidth: "300px", background: "#1F6E8C",
  display: "flex", flexDirection: "column", alignItems: "center", 
  justifyContent: "center"
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