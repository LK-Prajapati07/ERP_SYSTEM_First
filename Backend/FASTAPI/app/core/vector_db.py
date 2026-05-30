from langchain_chroma import Chroma
from .config import CHROMA_PERSIST_DIRECTORY
from .embeddings import embeddings

vector_store = Chroma(
    # collection_name="example_collection",  # Optional: specify a collection name for better organization
    embedding_function=embeddings,
    persist_directory=CHROMA_PERSIST_DIRECTORY  # Where to save data locally, remove if not necessary
)
