from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Table
from sqlalchemy.orm import relationship
from src.models.database import Base
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class QuizDB(Base):
    __tablename__ = "quizzes"

    quiz_id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    scheduled_time = Column(DateTime, index=True)
    questions = relationship("QuestionDB", back_populates="quiz")


class QuestionDB(Base):
    __tablename__ = "questions"

    question_id = Column(Integer, primary_key=True, index=True)
    question_text = Column(String, index=True)
    options = Column(String, index=True)
    correct_option = Column(Integer, index=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.quiz_id"))

    quiz = relationship("QuizDB", back_populates="questions")


# Pydantic models
class Question(BaseModel):
    question_text: str
    options: List[str]
    correct_option: int


class Quiz(BaseModel):
    title: str
    description: Optional[str]
    questions: List[Question]
    scheduled_time: Optional[datetime]

    class Config:
        orm_mode = True


class QuizesResponse(BaseModel):
    quiz_id: int
    title: str
    description: Optional[str]
    # questions: List[Question]
    scheduled_time: Optional[datetime]


class QuestionResponse(BaseModel):
    question_id: int
    question_text: str
    options: List[str]
    correct_option: int


class QuizResponse(BaseModel):
    quiz_id: int
    title: str
    description: Optional[str]
    questions: List[QuestionResponse]
    scheduled_time: Optional[datetime]

    class Config:
        orm_mode = True


class Answer(BaseModel):
    question_id: int
    selected_option: int


class AnswerResult(BaseModel):
    question_id: int
    correct: bool


class QuizResult(BaseModel):
    quiz_id: int
    results: List[AnswerResult]
    score: int
