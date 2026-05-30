from langchain_community.vectorstores import (
    Chroma
)
from ..core.config import (CHROMA_DB_DIR)
from ..core.embeddings import embeddings
async def retrieve_context(document_id,query,k=5):
    vector_store = Chroma(
        persist_directory=CHROMA_DB_DIR,
        embedding_function=embeddings,
        collection_name=document_id)
    docs = vector_store.similarity_search(
        query,
        k=k
    )
    context='\n\n'.join([doc.page_content for doc in docs])
    return context
