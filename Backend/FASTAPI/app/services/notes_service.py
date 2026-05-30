from .pdf_service import load_pdf_from_url

from .embedding_service import create_embeddings


async def ingest_notes(data):

    documents = await load_pdf_from_url(
        data.pdf_url
    )

    vector_db_id = await create_embeddings(

        documents=documents,

        document_id=data.document_id,

        subject_id=data.subject_id,

        teacher_id=data.teacher_id,

        semester=data.semester
    )

    extracted_text = "\n".join(

        [doc.page_content for doc in documents]
    )

    total_pages = len(documents)

    ai_summary = extracted_text[:1000]

    return {

        "message":
        "Notes ingested successfully",

        "success": True,

        "extractedText":
        extracted_text,

        "aiSummary":
        ai_summary,

        "vectorDbId":
        str(vector_db_id),

        "totalPages":
        total_pages
    }