from fastapi import APIRouter

from ..services.summary_service import (
    generate_summary
)

from ..schema.notes_schema import (
    NotesChatSchema
)

router = APIRouter(
    prefix="/summary",
    tags=["Summary"]
)


@router.post("/generate")
async def summarize(
    data: NotesChatSchema
):

    result = await generate_summary(data)

    return result