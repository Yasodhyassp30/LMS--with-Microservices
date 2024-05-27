# app/crud.py
from sqlalchemy.orm import Session
from . import models, schemas

def get_grades_by_student(db: Session, student_id: int):
    return db.query(models.Grade).filter(models.Grade.student_id == student_id).all()

def get_grades_by_course(db: Session, course_id: int):
    return db.query(models.Grade).filter(models.Grade.course_id == course_id).all()

def create_grade(db: Session, grade: schemas.GradeCreate):
    db_grade = models.Grade(**grade.dict())
    db.add(db_grade)
    db.commit()
    db.refresh(db_grade)
    return db_grade

def update_grade(db: Session, grade_id: int, grade: schemas.GradeCreate):
    db_grade = db.query(models.Grade).filter(models.Grade.id == grade_id).first()
    db_grade.student_id = grade.student_id
    db_grade.course_id = grade.course_id
    db_grade.score = grade.score
    db.commit()
    db.refresh(db_grade)
    return db_grade
