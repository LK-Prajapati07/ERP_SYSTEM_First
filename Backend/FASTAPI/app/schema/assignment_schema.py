from pydantic import BaseModel
from typing import Optional


class AssignmentEvaluationSchema(BaseModel):

    assignment_id: str

    submission_id: str

    student_id: str

    file_url: str

    assignment_title: str

    subject_id: str

    total_marks: int

    rubric: Optional[str] = None