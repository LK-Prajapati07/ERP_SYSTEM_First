from dotenv import load_dotenv
import os
load_dotenv()
MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
CHAT_MODEL = os.getenv("CHAT_MODEL", "mistral-large-latest")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "mistral-embed")
CHUNK_SIZE = int(os.getenv("CHUNK_SIZE"))
CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP"))
CHROMA_DB_DIR = os.getenv("CHROMA_DB_DIR")