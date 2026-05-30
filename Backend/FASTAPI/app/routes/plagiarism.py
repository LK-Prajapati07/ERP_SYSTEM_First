from fastapi import APIRouter
from ..schema.plagiarism_schema import (
    PlagiarismSchema
)

from ..services.plagiarism_service import (
    check_plagiarism
)
router = APIRouter(
    prefix="/PlagiarismSchama",
    tags=['Plagiaris']
)
@router.post('/')
async def plagiarism_check(data: PlagiarismSchema):
    return await check_plagiarism(data)

