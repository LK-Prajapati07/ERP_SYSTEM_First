from ..core.llm import llm
from .pdf_service import load_pdf_from_url
import json
import re

async def  evaluate_answer(data):

    document = await load_pdf_from_url(
        data.file_url
    )

    prompt = f"""
    You are an expert examiner.

    Evaluate the following assignment submission.

    Content:

    {document}

    Return ONLY JSON:

    {{
        "obtainedMarks": 85,
        "feedback": "Good work",
        "aiAnalysis": "Strong understanding of concepts"
    }}
    """

    response = llm.invoke(prompt)

    cleaned = re.sub(
        r"```json|```",
        "",
        response.content
    ).strip()

    return json.loads(cleaned)