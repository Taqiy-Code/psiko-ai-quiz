from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI(title="Personality Quiz API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://psiko-ai-quiz.vercel.app"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

options = [
    {"option": "Agree", "score": 3},
    {"option": "Neutral", "score": 2},
    {"option": "Disagree", "score": 1},
]

questions = [
    {"id": 1, "question": "Saya lebih suka bekerja secara mandiri daripada dalam tim."},
    {"id": 2, "question": "Saya lebih mengandalkan logika daripada perasaan saat membuat keputusan."},
    {"id": 3, "question": "Saya mudah beradaptasi dengan perubahan mendadak dalam rutinitas saya."},
    {"id": 4, "question": "Saya merasa berenergi setelah menghabiskan waktu di keramaian."},
    {"id": 5, "question": "Saya selalu menjaga ruang kerja saya tetap bersih dan teratur."},
    {"id": 6, "question": "Saya biasanya memulai percakapan saat bertemu orang baru."},
    {"id": 7, "question": "Saya selalu mencari pengalaman baru dan petualangan."},
    {"id": 8, "question": "Saya cenderung menghindari konflik dan perdebatan sebisa mungkin."},
    {"id": 9, "question": "Saya jarang menyimpan dendam terhadap orang yang pernah berbuat salah pada saya."},
    {"id": 10, "question": "Saya bisa tetap tenang dan bekerja secara efektif di bawah tenggat waktu yang ketat."}
]

class AnswerItem(BaseModel):
    question_id: int
    answer: str  

class CalculateRequest(BaseModel):
    answers: List[AnswerItem]

@app.get("/api/questions")
def get_questions():
    """
    Mengembalikan daftar 10 pertanyaan kepribadian beserta pilihan jawaban yang tersedia.
    """
    return {
        "questions": questions,
        "options": [opt["option"] for opt in options]
    }

@app.post("/api/calculate")
def calculate_score(request: CalculateRequest):
    """
    Menerima jawaban pengguna, menghitung skor total.
    Agree = 3, Neutral = 2, Disagree = 1
    """
    total_score = 0
    score_map = {opt["option"]: opt["score"] for opt in options}
    
    for item in request.answers:
        score = score_map.get(item.answer, 2)
        total_score += score
        
    return {
        "total_score": total_score
    }

def main():
    uvicorn.run(app="main:app", host="127.0.0.1", port=8000, reload=True)

if __name__ == "__main__":
    main()