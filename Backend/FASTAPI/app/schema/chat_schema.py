from pydantic import BaseModel


class ChatSchema(BaseModel):

    document_id: str

    student_id: str

    question: str