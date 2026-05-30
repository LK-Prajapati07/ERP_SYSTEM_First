from fastapi import FastAPI

from .routes import (
    notes,
    quiz,
    evaluation,
    assignment,
    question_paper,
    summary,
    chat,
    plagiarism
)

app = FastAPI(
    title="AI ERP Service"
)

app.include_router(notes.router)
app.include_router(quiz.router)
app.include_router(evaluation.router)
app.include_router(assignment.router)
app.include_router(question_paper.router)
app.include_router(summary.router)
app.include_router(chat.router)
app.include_router(plagiarism.router)


@app.get("/")
async def root():

    return {
        "message": "AI Service Running"
    }