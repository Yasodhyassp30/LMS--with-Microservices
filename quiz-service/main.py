from fastapi import FastAPI
from src.routes.quiz_routes import router as quiz_router
from src.models.database import Base, engine

# Create the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(quiz_router)
