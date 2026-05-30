import json
import re

from .rag_service import (
    retrieve_context
)

from ..core.llm import llm


async def generate_question_paper(data):

    context = await retrieve_context(
        document_id=data.subject_id,
        query=data.topic or "Generate Question Paper"
    )

    print(context)

    prompt = f"""
    You are an expert university examiner.

    Generate a question paper ONLY from the provided context.

    Topic:
    {data.topic}

    Difficulty:
    {data.difficulty}

    Question Type:
    {data.question_type}

    Total Questions:
    {data.total_questions}

    Context:
    {context}

    IMPORTANT:
    - Use ONLY the context
    - Do NOT generate unrelated subjects
    - Return ONLY valid JSON
    """

    res = llm.invoke(prompt)

    raw_text = res.content

    cleaned = re.sub(
        r"```json|```",
        "",
        raw_text
    ).strip()

    parsed = json.loads(cleaned)

    return {
        "success": True,
        "question_paper": parsed
    }