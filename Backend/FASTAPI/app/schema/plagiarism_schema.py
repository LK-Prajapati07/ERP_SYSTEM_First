from pydantic import BaseModel


class PlagiarismSchema(BaseModel):
    submission_id: str
    assignment_id: str
    student_id: str
    file_url: str
    original_text: str