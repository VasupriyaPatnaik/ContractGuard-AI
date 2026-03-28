import os
from groq import Groq
from dotenv import load_dotenv


# load environment variables
load_dotenv()

# initialize Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)



def detect_clauses(contract_text):
    """
    Analyze financial contract text and detect risky clauses
    """

    # limit text length for LLM token safety
    contract_text = contract_text[:12000]


    prompt = f"""

You are an expert financial contract risk analyzer.

Analyze the contract and identify clauses related to:

1. Interest Rate (fixed/variable)
2. Late Payment Penalties
3. Processing Fees
4. Foreclosure / Prepayment Charges
5. Hidden Charges
6. EMI terms
7. Auto-debit rules
8. Loan tenure
9. Default penalties
10. Other financial risks

Instructions:

For each detected clause provide:

- clause_type
- clause_text (exact or partial text from contract)
- risk_level (Low / Medium / High)
- explanation (why it is risky or important)

If a clause is not present, return "Not Found".

IMPORTANT:
Do not hallucinate information.
Only use information present in the contract text.

Return output in JSON format like:

{{
 "overall_risk_level": "",
 "clauses":[
  {{
   "clause_type":"",
   "risk_level":"",
   "clause_text":"",
   "explanation":""
  }}
 ]
}}

Contract text:
{contract_text}

"""

    import json
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2   # lower = more factual
        )
        result = response.choices[0].message.content
        # Clean up LLM output: remove code block markers and whitespace
        cleaned = result.strip()
        if cleaned.startswith('```'):
            cleaned = cleaned.lstrip('`')
            # Remove language marker if present
            cleaned = cleaned.lstrip('json').lstrip()
            # Remove trailing code block
            if cleaned.endswith('```'):
                cleaned = cleaned[:-3].rstrip()
        # Try to parse the cleaned result as JSON
        try:
            parsed = json.loads(cleaned)
            return parsed
        except Exception as json_err:
            return {"error": "Failed to parse LLM output as JSON", "raw": result, "details": str(json_err)}
    except Exception as e:
        return {
            "error": str(e)
        }