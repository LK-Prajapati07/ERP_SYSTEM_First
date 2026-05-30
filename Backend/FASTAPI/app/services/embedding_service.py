from langchain_text_splitters import (
    RecursiveCharacterTextSplitter
)

from langchain_community.vectorstores import (
    Chroma
)

from ..core.embeddings import embeddings

from ..core.config import (
    CHUNK_SIZE,
    CHUNK_OVERLAP,
    CHROMA_DB_DIR
)


async def create_embeddings(
    documents,
    document_id,
    subject_id,
    teacher_id,
    semester
):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP
    )

    chunks = splitter.split_documents(
        documents
    )

    texts = []
    metadatas = []

    for chunk in chunks:

        texts.append(
            chunk.page_content
        )

        metadatas.append({
            "document_id": document_id,
            "subject_id": subject_id,
            "teacher_id": teacher_id,
            "semester": str(semester)
        })

    vector_store = Chroma(
        embedding_function=embeddings,
        persist_directory=CHROMA_DB_DIR,
        collection_name="erp_notes"
    )

    vector_store.add_texts(
        texts=texts,
        metadatas=metadatas
    )

    return vector_store