from pydantic import BaseModel
from typing import Optional


class QuestionPaperSchema(BaseModel):

    subject_id: str

    course_id: str

    semester: int

    difficulty: str = "medium"

    total_questions: int = 10

    question_type: str = "mixed"

    topic: Optional[str] = None