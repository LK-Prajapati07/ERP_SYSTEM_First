from fastapi import APIRouter
from ..services.question_paper_service import (
    generate_question_paper
)

from ..schema.question_paper_schema import (
    QuestionPaperSchema
)
router = APIRouter(
    prefix="/question-paper",
    tags=["Question Paper"]
)

@router.post("/generate")
async def generate_question_paper_endpoint(data: QuestionPaperSchema):
    result = await generate_question_paper(data)
    return result
