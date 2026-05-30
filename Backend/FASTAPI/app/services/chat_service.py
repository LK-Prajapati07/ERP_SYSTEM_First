from .rag_service import retrieve_context
from ..core.llm import llm

async def chat_with_notes(data):
    context = await retrieve_context(
        document_id=data.document_id,
        query=data.question,
    )

    prompt = f"""
    Context:
    {context}

    Student Question:
    {data.question}

    Answer clearly.
    """

    res = llm.invoke(prompt)

    return {
        "success": True,
        "answer": res.content
    }