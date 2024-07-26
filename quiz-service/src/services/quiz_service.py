from sqlalchemy.orm import Session
from src.models.quiz_model import (
    QuizDB,
    QuestionDB,
    Quiz,
    Answer,
    QuizResult,
    AnswerResult,
    QuestionResponse,
    QuizResponse,
)
from typing import List


class QuizService:

    @staticmethod
    def create_quiz(db: Session, quiz: Quiz):
        print(quiz)
        db_quiz = QuizDB(
            title=quiz.title,
            description=quiz.description,
            scheduled_time=quiz.scheduled_time,
        )
        db.add(db_quiz)
        db.commit()
        db.refresh(db_quiz)
        print("done")
        for q in quiz.questions:
            db_question = QuestionDB(
                question_text=q.question_text,
                options=",".join(q.options),
                correct_option=q.correct_option,
                quiz_id=db_quiz.quiz_id,
            )
            db.add(db_question)
        db.commit()
        return db_quiz

    @staticmethod
    def get_quiz(db: Session, quiz_id: int) -> QuizResponse:
        quiz = db.query(QuizDB).filter(QuizDB.quiz_id == quiz_id).first()
        if quiz:
            questions = db.query(QuestionDB).filter(QuestionDB.quiz_id == quiz_id).all()
            question_responses = [
                QuestionResponse(
                    question_id=q.question_id,
                    question_text=q.question_text,
                    options=q.options.split(","),
                    correct_option=q.correct_option,
                )
                for q in questions
            ]
            return QuizResponse(
                quiz_id=quiz.quiz_id,
                title=quiz.title,
                description=quiz.description,
                questions=question_responses,
                scheduled_time=quiz.scheduled_time,
            )
        return None

    @staticmethod
    def list_quizzes(db: Session):
        return db.query(QuizDB).all()

    @staticmethod
    def check_answers(db: Session, quiz_id: int, answers: List[Answer]) -> QuizResult:
        quiz = db.query(QuizDB).filter(QuizDB.quiz_id == quiz_id).first()
        print("Hello")
        if not quiz:
            return None

        results = []
        correct_answers = 0

        for answer in answers:
            question = (
                db.query(QuestionDB)
                .filter(QuestionDB.question_id == answer.question_id)
                .first()
            )
            print(question)
            if question and question.correct_option == answer.selected_option:
                results.append(
                    AnswerResult(
                        question_id=answer.question_id,
                        correct=True,
                        correct_option=question.correct_option,
                    )
                )
                correct_answers += 1
            else:
                results.append(
                    AnswerResult(
                        question_id=answer.question_id,
                        correct=False,
                        correct_option=question.correct_option,
                    )
                )

        score = (correct_answers / len(answers)) * 100 if answers else 0

        return QuizResult(quiz_id=quiz_id, results=results, score=int(score))

    @staticmethod
    def delete_quiz(db: Session, quiz_id: int):
        quiz = db.query(QuizDB).filter(QuizDB.quiz_id == quiz_id).first()
        if quiz:
            db.delete(quiz)
            db.commit()
            return True
        return False
