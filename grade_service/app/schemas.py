# app/schemas.py
from pydantic import BaseModel

class GradeBase(BaseModel):
    student_id: int
    course_id: int
    score: float

class GradeCreate(GradeBase):
    pass

class Grade(GradeBase):
    id: int

    class Config:
        orm_mode = True
