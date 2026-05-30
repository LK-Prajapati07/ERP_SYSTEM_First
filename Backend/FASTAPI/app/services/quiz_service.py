import json
import re

from .rag_service import retrieve_context
from ..core.llm import llm


async def generate_quiz(data):

    context = await retrieve_context(
        document_id=data.document_id,
        query=data.topic or "Generate Quiz"
    )

    prompt = f"""
    You are an expert academic teacher.

    Using ONLY the provided context,
    generate {data.total_questions}
    high-quality
    {data.question_type}
    questions.

    Difficulty Level:
    {data.difficulty}

    Topic:
    {data.topic}

    Context:
    {context}

    Rules:

    1. Questions must come ONLY from context
    2. Avoid hallucinations
    3. Include 4 options
    4. Include correct answer
    5. Include explanation
    6. Return ONLY valid JSON

    JSON Format:

    [
        {{
    "question":"",
    "options":[],
    "correctAnswer":"",
    "explanation":""
  }}
]
"""
    response = llm.invoke(prompt)

    raw_text = response.content

    cleaned = re.sub(
        r"```json|```",
        "",
        raw_text
    ).strip()

    quiz_json = json.loads(cleaned)

    return {
        "success": True,
        "quiz": quiz_json
    }