from langchain_mistralai import ChatMistralAI
from .config import (MISTRAL_API_KEY, CHAT_MODEL)

# instantiate LLM using configured model and API key
llm = ChatMistralAI(
    api_key=MISTRAL_API_KEY,
    model=CHAT_MODEL or "mistral-large-latest",
    temperature=0,
    max_retries=2,
)
