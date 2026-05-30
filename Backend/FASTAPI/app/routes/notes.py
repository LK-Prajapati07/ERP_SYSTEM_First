from fastapi import APIRouter
from ..schema.notes_schema import (
    NotesIngestSchema
)
from ..services.notes_service import (
    ingest_notes
)
router = APIRouter(
    prefix="/notes",
    tags=["notes"]
)

@router.post("/ingest")
async def create_note(note: NotesIngestSchema):
    return await ingest_notes(note)