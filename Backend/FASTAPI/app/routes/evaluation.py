from fastapi import APIRouter
from ..services.evaluation_service import (
    evaluate_answer
)

from ..schema.evaluation_schema import (
    EvaluationSchema
)

router = APIRouter(
    prefix="/evaluation",
    tags=["evaluation"]
)
@router.post("/")
async def evaluate(evaluation: EvaluationSchema):
    result = await evaluate_answer(evaluation)
    return {"result": result}