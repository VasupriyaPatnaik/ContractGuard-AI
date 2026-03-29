
<div align="center">
	<h1>🛡️ ContractGuard-AI</h1>
	<p><b>AI-powered Financial Contract Risk Analyzer</b></p>
	<img src="https://img.shields.io/badge/Backend-FastAPI-blue?style=flat-square" />
	<img src="https://img.shields.io/badge/Frontend-React-61dafb?style=flat-square" />
	<img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
</div>

---

<p align="center">
	<b>ContractGuard-AI</b> is a modern, full-stack application for instant, AI-powered risk analysis of financial contracts. Upload your PDF, sign up, and get a detailed, downloadable risk report in seconds.<br>
	<i>Elegant UI. Secure. Fast. Professional.</i>
</p>

---

## ✨ Features

- Modern, elegant UI with authentication (signup/login/logout)
- Upload PDF contracts for instant AI risk analysis
- Downloadable, detailed risk reports
- Clause detection: interest, penalties, fees, hidden charges, and more
- Responsive, user-friendly design

---

## 🗂️ Project Structure

```text
ContractGuard-AI/
│
├── backend/         # FastAPI backend (Python)
│   ├── main.py
│   ├── clause_detector.py
│   ├── pdf_utils.py
│   ├── requirements.txt
│   └── .env         # (add your GROQ_API_KEY here)
│
├── frontend/        # React frontend (JavaScript)
│   ├── src/
│   │   ├── App.js
│   │   └── pages/
│   │       ├── HomePage.js
│   │       ├── Login.js
│   │       ├── Signup.js
│   │       ├── AnalysisPage.js
│   │       └── RiskReportPage.js
│   ├── package.json
│   └── README.md
│
└── README.md        # (this file)
```

---

## 🚀 Quickstart

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt

# Add your Groq API key to .env:
echo GROQ_API_KEY=your_groq_api_key_here > .env

uvicorn main:app --reload
# API: http://127.0.0.1:8000
```

### 2. Frontend (React)

```bash
cd frontend
npm install
npm start
# App: http://localhost:3000
```

---

## 🧑‍💻 Usage

1. <b>Sign up</b> with a username, email, and password
2. <b>Login</b> to your account
3. <b>Upload a PDF contract</b> on the analysis page
4. <b>View & download</b> your detailed risk analysis report

---

## 🔗 API Endpoints

- <b>POST /analyze</b> &nbsp;→&nbsp; Upload a PDF for contract analysis
	- <i>Request:</i> <code>multipart/form-data</code> with <code>file</code> field
	- <i>Response:</i> JSON with detected clauses and risk levels

---

## ⚙️ Customization & Security

- <b>Backend LLM:</b> Uses Groq API for clause detection (see <code>clause_detector.py</code>)
- <b>Frontend:</b> All UI logic in <code>frontend/src/pages/</code>
- <b>Authentication:</b> Demo only (not production-secure). For production, implement secure authentication and HTTPS.

---

## 🤝 Contributing

Pull requests and suggestions are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT — for educational/demo use. Adapt and extend as needed.

---

<div align="center">
	<sub>Made with ❤️ for contract safety</sub>
</div>
