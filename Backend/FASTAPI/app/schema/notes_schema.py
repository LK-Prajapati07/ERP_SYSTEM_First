from typing import Optional
from pydantic import BaseModel


class NotesIngestSchema(BaseModel):

    document_id: str

    title: str

    subject_id: str

    teacher_id: str

    pdf_url: str

    semester: int

    tags: Optional[list[str]] = []


class NotesChatSchema(BaseModel):

    document_id: str

   

class Summary(BaseModel):
    text:str