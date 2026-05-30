from pydantic import BaseModel
from typing import Optional


class QuizGenerateSchema(BaseModel):

    # Notes model ID
    document_id: str

    # Optional topic inside notes
    topic: Optional[str] = None

    # easy | medium | hard
    difficulty: str = "medium"

    # mcq | subjective | true_false
    question_type: str = "mcq"

    # number of questions
    total_questions: int = 10

    # semester filtering
    semester: Optional[int] = None

    # include answers
    include_answers: bool = True