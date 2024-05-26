from fastapi import FastAPI
from src.routes.quiz_routes import router as quiz_router
from src.models.database import Base, engine
import py_eureka_client.eureka_client as eureka_client
from contextlib import asynccontextmanager


Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def init_eureka(app: FastAPI):
    await eureka_client.init_async(
        eureka_server="http://localhost:8761/eureka/",
        app_name="quiz-service",
        instance_port=8000,
        instance_host="localhost",
    )
    yield


app = FastAPI(lifespan=init_eureka)

app.include_router(quiz_router)
