from fastapi import APIRouter
from ..services.chat_service import (
    chat_with_notes
)

from ..schema.chat_schema import (
    ChatSchema
)
router = APIRouter(
    prefix="/chat",
    tags=['Chat'])
@router.post("/")
async def chat(data: ChatSchema):
    result = await chat_with_notes(data)
    return result
