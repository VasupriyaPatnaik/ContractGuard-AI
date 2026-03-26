from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from pdf_utils import extract_text_from_pdf, limit_text_length
from clause_detector import detect_clauses


app = FastAPI(title="ContractGuard AI API")


# allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "ContractGuard AI API is running"
    }


@app.post("/analyze")
async def analyze_contract(file: UploadFile = File(...)):

    try:

        # check file type
        if not file.filename.endswith(".pdf"):

            return {
                "error": "Please upload a PDF file"
            }


        # extract text from PDF
        contract_text = extract_text_from_pdf(file.file)

        # limit size for LLM
        contract_text = limit_text_length(contract_text)


        # check empty text
        if not contract_text:

            return {
                "error": "Could not extract text from PDF"
            }


        # detect clauses using Groq LLM
        analysis_result = detect_clauses(contract_text)


        return {

            "filename": file.filename,

            "analysis": analysis_result

        }


    except Exception as e:

        return {

            "error": str(e)

        }