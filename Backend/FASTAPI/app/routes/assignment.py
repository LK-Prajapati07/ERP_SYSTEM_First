from fastapi import APIRouter, Depends
from ..services.assignment_service import (
    evaluate_Assignment
)

from ..schema.assignment_schema import (
    AssignmentEvaluationSchema
)
router = APIRouter(
    prefix="/assignment",
    tags=["assignment"]
)
@router.post("/evaluate")
async def evaluate_assignment_route(data: AssignmentEvaluationSchema):
    result = await evaluate_Assignment(data)
    return result
