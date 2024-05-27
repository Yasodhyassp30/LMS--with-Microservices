# app/main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    dummy_data = [
        {"student_id": 1, "course_id": 101, "score": 95.0},
        {"student_id": 1, "course_id": 102, "score": 88.5},
        {"student_id": 2, "course_id": 101, "score": 92.0},
        {"student_id": 2, "course_id": 103, "score": 76.0},
        {"student_id": 3, "course_id": 104, "score": 84.0},
        {"student_id": 3, "course_id": 101, "score": 89.0},
    ]
    for grade in dummy_data:
        crud.create_grade(db, schemas.GradeCreate(**grade))
    db.close()

@app.post("/grades/", response_model=schemas.Grade)
def create_grade(grade: schemas.GradeCreate, db: Session = Depends(get_db)):
    return crud.create_grade(db=db, grade=grade)

@app.get("/grades/{student_id}", response_model=list[schemas.Grade])
def get_grades_by_student(student_id: int, db: Session = Depends(get_db)):
    return crud.get_grades_by_student(db=db, student_id=student_id)

@app.get("/grades/course/{course_id}", response_model=list[schemas.Grade])
def get_grades_by_course(course_id: int, db: Session = Depends(get_db)):
    return crud.get_grades_by_course(db=db, course_id=course_id)

@app.put("/grades/{grade_id}", response_model=schemas.Grade)
def update_grade(grade_id: int, grade: schemas.GradeCreate, db: Session = Depends(get_db)):
    db_grade = crud.update_grade(db=db, grade_id=grade_id, grade=grade)
    if db_grade is None:
        raise HTTPException(status_code=404, detail="Grade not found")
    return db_grade
