from fastapi import FastAPI
from pydantic import BaseModel

class ChatResponse(BaseModel):
    prompt: str

app = FastAPI()


@app.post("/")
def ai_prompt(request: ChatResponse):
    return {"your prompt": request.prompt}