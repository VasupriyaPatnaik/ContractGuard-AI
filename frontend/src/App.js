import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AnalysisPage from "./pages/AnalysisPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RiskReportPage from "./pages/RiskReportPage";

function App() {
  // Persist user in localStorage for refresh persistence
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("cgai_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [report, setReport] = useState(null); // risk analysis result
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);
  const [requireSignup, setRequireSignup] = useState(false); // if true, force signup before login

  // Keep user in sync with localStorage
  React.useEffect(() => {
    if (user) {
      localStorage.setItem("cgai_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("cgai_user");
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageWithNav user={user} onLogout={() => setUser(null)} />} />
        <Route path="/analysis" element={<RequireAuth user={user} setRedirectAfterLogin={setRedirectAfterLogin}><AnalysisPageWithNav setReport={setReport} /></RequireAuth>} />
        <Route path="/report" element={<RiskReportPageWithNav result={report} />} />
        <Route path="/login" element={<LoginWithNav setUser={setUser} redirectAfterLogin={redirectAfterLogin} setRedirectAfterLogin={setRedirectAfterLogin} requireSignup={requireSignup} setRequireSignup={setRequireSignup} />} />
        <Route path="/signup" element={<SignupWithNav setUser={setUser} setRequireSignup={setRequireSignup} />} />
      </Routes>
    </Router>
  );
}

function RequireAuth({ user, setRedirectAfterLogin, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    if (!user) {
      setRedirectAfterLogin(location.pathname);
      navigate("/login");
    }
  }, [user, setRedirectAfterLogin, navigate, location]);
  if (!user) return null;
  return children;
}

function HomePageWithNav({ user, onLogout }) {
  const navigate = useNavigate();
  return (
    <HomePage
      username={user?.username}
      onStart={() => {
        if (user) {
          navigate("/analysis");
        } else {
          navigate("/login");
        }
      }}
      onLogin={() => navigate("/login")}
      onSignup={() => navigate("/signup")}
      onAbout={() => window.scrollTo({ top: 600, behavior: "smooth" })}
      onFeatures={() => window.scrollTo({ top: 1200, behavior: "smooth" })}
      onContact={() => window.scrollTo({ top: 2000, behavior: "smooth" })}
      onLogout={onLogout}
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

function LoginWithNav({ setUser, redirectAfterLogin, setRedirectAfterLogin, requireSignup, setRequireSignup }) {
  const navigate = useNavigate();
  return <Login
    onLogin={({ email, password }) => {
      if (requireSignup) {
        setRequireSignup(false);
        navigate("/signup");
        return;
      }
      // Try to get username from localStorage (from signup)
      let userData = localStorage.getItem("cgai_user");
      let username = userData ? JSON.parse(userData).username : email.split("@")[0];
      setUser({ username, email });
      if (redirectAfterLogin) {
        navigate(redirectAfterLogin);
        setRedirectAfterLogin(null);
      } else {
        navigate("/");
      }
    }}
    onSignup={() => {
      setRequireSignup(false);
      navigate("/signup");
    }}
    onGoHome={() => navigate("/")}
  />;
}

function SignupWithNav({ setUser, setRequireSignup }) {
  const navigate = useNavigate();
  return <Signup
    onSignup={({ username, email, password }) => {
      setUser({ username, email });
      // Save username/email to localStorage for login retrieval
      localStorage.setItem("cgai_user", JSON.stringify({ username, email }));
      setRequireSignup(false);
      navigate("/login");
    }}
    onGoHome={() => navigate("/")}
  />;
}

export default App;