import json
import re
import requests

from ..core.llm import llm


async def check_plagiarism(data):
    try:
        # Download submission file content
        response = requests.get(data.file_url)
        response.raise_for_status()

        submitted_text = response.text

        prompt = f"""
        Analyze plagiarism between submitted text and original text.

        Submitted Text:
        {submitted_text}

        Original Text:
        {data.original_text}

        Return ONLY valid JSON.

        Example:
        {{
            "plagiarism_analysis": {{
                "plagiarism_percentage": 85,
                "copied_sections": [],
                "originality_feedback": {{
                    "summary": "...",
                    "recommendations": [],
                    "originality_score": 15
                }}
            }}
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
            "result": parsed
        }

    except Exception as e:
        print("PLAGIARISM ERROR:", str(e))

        return {
            "success": False,
            "message": str(e)
        }