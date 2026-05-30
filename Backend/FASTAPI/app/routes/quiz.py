from fastapi import APIRouter
from ..schema.quiz_schema import (
    QuizGenerateSchema
)
from ..services.quiz_service import (
    generate_quiz
)
router = APIRouter(
    prefix="/quiz",
    tags=["quiz"]
)
@router.post("/generate")
async def generate_quiz_endpoint(data: QuizGenerateSchema):
    return await generate_quiz(data)
