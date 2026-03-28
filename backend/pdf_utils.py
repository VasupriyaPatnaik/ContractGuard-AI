from pypdf import PdfReader


def extract_text_from_pdf(file):
    """
    Extract text from uploaded PDF file
    Returns cleaned text string
    """

    reader = PdfReader(file)

    text = ""

    for page_num, page in enumerate(reader.pages):

        try:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        except Exception as e:
            print(f"Error reading page {page_num}: {e}")

    cleaned_text = clean_text(text)

    return cleaned_text



def clean_text(text):
    """
    Clean extracted PDF text
    Improves LLM performance
    """

    if not text:
        return ""

    # remove extra spaces
    text = text.replace("\n", " ")

    # remove multiple spaces
    text = " ".join(text.split())

    # optional: remove very long repeating characters
    text = text.replace("  ", " ")

    return text



def limit_text_length(text, max_chars=12000):
    """
    Limit text size for LLM token limits
    """

    if len(text) > max_chars:

        return text[:max_chars]

    return text