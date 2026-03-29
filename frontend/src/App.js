import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AnalysisPage from "./pages/AnalysisPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RiskReportPage from "./pages/RiskReportPage";

function App() {
  const [user, setUser] = useState(null); // { username, email }
  const [report, setReport] = useState(null); // risk analysis result
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageWithNav user={user} />} />
        <Route path="/analysis" element={<AnalysisPageWithNav setReport={setReport} />} />
        <Route path="/report" element={<RiskReportPageWithNav result={report} />} />
        <Route path="/login" element={<LoginWithNav setUser={setUser} />} />
        <Route path="/signup" element={<SignupWithNav setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

function HomePageWithNav({ user }) {
  const navigate = useNavigate();
  return (
    <HomePage
      username={user?.username}
      onStart={() => navigate("/analysis")}
      onLogin={() => navigate("/login")}
      onSignup={() => navigate("/signup")}
      onAbout={() => window.scrollTo({ top: 600, behavior: "smooth" })}
      onFeatures={() => window.scrollTo({ top: 1200, behavior: "smooth" })}
      onContact={() => window.scrollTo({ top: 2000, behavior: "smooth" })}
    />
  );
}

function AnalysisPageWithNav({ setReport }) {
  const navigate = useNavigate();
  return <AnalysisPage onBack={() => navigate("/")} onAnalysisComplete={(result) => {
    setReport(result);
    navigate("/report");
  }} />;
}

function RiskReportPageWithNav({ result }) {
  const navigate = useNavigate();
  return <RiskReportPage result={result} onBack={() => navigate("/")} />;
}

function LoginWithNav({ setUser }) {
  const navigate = useNavigate();
  return <Login onLogin={({ email, password }) => {
    setUser({ username: email.split("@")[0], email });
    navigate("/");
  }} />;
}

function SignupWithNav({ setUser }) {
  const navigate = useNavigate();
  return <Signup onSignup={({ username, email, password }) => {
    setUser({ username, email });
    navigate("/");
  }} />;
}

export default App;