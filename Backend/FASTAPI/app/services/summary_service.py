from .rag_service import retrieve_context
from ..core.llm import llm
async def generate_summary(data):
    context = await retrieve_context(
        document_id=data.document_id,
        query='Generate summary based on the document.',
    )
    prompt = f"""
    Summarize this content.

    Context:
    {context}

    Generate:
    - summary
    - key points
    """
    res=llm.invoke(prompt)
    return {
        "success":True,
        "data": res.content
    }