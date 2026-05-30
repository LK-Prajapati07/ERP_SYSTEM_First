import os
import requests

from langchain_community.document_loaders import PyPDFLoader


async def load_pdf_from_url(url: str):

    print("PDF URL:", url)

    response = requests.get(url)

    if response.status_code != 200:
        print("STATUS CODE:", response.status_code)
        print("RESPONSE TEXT:", response.text)


        raise Exception(
        f"Failed to download PDF: {response.status_code}"
        )

    pdf_path = "temp.pdf"

    with open(pdf_path, "wb") as f:
        f.write(response.content)

    loader = PyPDFLoader(pdf_path)

    documents = loader.load()

    os.remove(pdf_path)

    return documents