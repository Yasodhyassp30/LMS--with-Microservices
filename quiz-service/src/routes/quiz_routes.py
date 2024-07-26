from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from src.models.quiz_model import Quiz, Answer, QuizResult, QuizResponse, QuizesResponse
from src.services.quiz_service import QuizService
from src.models.database import get_db
from typing import List

router = APIRouter()


@router.post("/quiz")
def create_quiz(quiz: Quiz, db: Session = Depends(get_db)):
    print(quiz)
    res = QuizService.create_quiz(db, quiz)
    print(res)
    return res


@router.get("/quiz/{quiz_id}", response_model=QuizResponse)
def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    quiz = QuizService.get_quiz(db, quiz_id)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz


@router.get("/quizzes", response_model=List[QuizesResponse])
def list_quizzes(db: Session = Depends(get_db)):
    return QuizService.list_quizzes(db)


@router.post("/quiz/{quiz_id}/check-answers", response_model=QuizResult)
def check_answers(quiz_id: int, answers: List[Answer], db: Session = Depends(get_db)):
    result = QuizService.check_answers(db, quiz_id, answers)
    if not result:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return result


@router.delete("/quiz/{quiz_id}", response_model=bool)
def delete_quiz(quiz_id: int, db: Session = Depends(get_db)):
    success = QuizService.delete_quiz(db, quiz_id)
    if not success:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return success
