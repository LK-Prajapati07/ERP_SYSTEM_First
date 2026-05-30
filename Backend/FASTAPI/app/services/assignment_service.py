import json
import re

from ..core.llm import llm


async def evaluate_Assignment(data):

    prompt = f"""
    You are an AI university examiner.

    Evaluate the student's assignment answers.

    Assignment Title:
    {data.assignment_title}

    Questions:
    {data.questions}

    Student Answers:
    {data.student_answers}

    Rubric:
    {data.rubric}

    Total Marks:
    {data.total_marks}

    IMPORTANT:
    - Evaluate accuracy
    - Evaluate completeness
    - Evaluate technical correctness
    - Give improvement suggestions

    Return ONLY valid JSON.

    Example:
    {{
        "total_score": 7,
        "feedback": [
            {{
                "question": "...",
                "score": 4,
                "feedback": "...",
                "improvement": "..."
            }}
        ]
    }}
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
        "evaluation": parsed
    }