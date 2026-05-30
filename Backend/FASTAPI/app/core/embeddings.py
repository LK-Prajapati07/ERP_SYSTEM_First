from langchain_mistralai import MistralAIEmbeddings
from .config import EMBEDDING_MODEL, MISTRAL_API_KEY
embeddings = MistralAIEmbeddings(
    api_key=MISTRAL_API_KEY,
    model=EMBEDDING_MODEL
)